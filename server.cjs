const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID, createHash } = require('node:crypto');

const MAX_LIBRARY = 5 * 1024 * 1024;
const MAX_FILE = 25 * 1024 * 1024;
const TYPES = {
  '.pdf': 'application/pdf', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.txt': 'text/plain',
  '.csv': 'text/csv', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.zip': 'application/zip'
};
const STATIC_TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const FILE_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;

function problem(status, message) { return Object.assign(new Error(message), { status }); }
function validName(name) { return typeof name === 'string' && name.length > 0 && name.length <= 180 && name === name.trim() && !/[<>:"/\\|?*\x00-\x1f\x7f]/.test(name) && !['.', '..'].includes(name); }
function contentType(name) { return TYPES[path.extname(name).toLowerCase()]; }
function revisionOf(library) { return library === null ? null : createHash('sha256').update(JSON.stringify(library)).digest('hex'); }
function validateLibrary(library) {
  try { require('./dist/library.js').validate(library); }
  catch (error) { throw problem(422, error.message || 'Dữ liệu thư viện không hợp lệ.'); }
}
async function readJson(filename, fallback) {
  try { return JSON.parse(await fs.readFile(filename, 'utf8')); }
  catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw problem(500, 'Dữ liệu trên máy bị lỗi hoặc không đọc được. Hãy kiểm tra thư mục data và bản sao lưu; dữ liệu chưa bị ghi đè.');
  }
}
async function writeJson(filename, data) {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  const temp = filename + '.' + randomUUID() + '.tmp';
  try { await fs.writeFile(temp, JSON.stringify(data, null, 2) + '\n', { flag: 'wx', mode: 0o600 }); await fs.rename(temp, filename); }
  finally { await fs.unlink(temp).catch(error => { if (error.code !== 'ENOENT') throw error; }); }
}
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0, chunks = [], ended = false;
    const fail = error => { if (!ended) { ended = true; chunks = []; reject(error); } };
    if (req.headers['content-length'] && (!/^\d+$/.test(req.headers['content-length']) || Number(req.headers['content-length']) > limit)) {
      req.resume(); fail(problem(413, `Tệp hoặc dữ liệu vượt quá giới hạn ${limit / 1024 / 1024} MB.`)); return;
    }
    req.on('data', chunk => { size += chunk.length; if (size > limit) fail(problem(413, `Tệp hoặc dữ liệu vượt quá giới hạn ${limit / 1024 / 1024} MB.`)); else if (!ended) chunks.push(chunk); });
    req.on('end', () => { if (!ended) { ended = true; resolve(Buffer.concat(chunks)); } });
    req.on('aborted', () => fail(problem(400, 'Quá trình gửi dữ liệu đã bị ngắt.')));
    req.on('error', () => fail(problem(400, 'Không nhận được đầy đủ dữ liệu.')));
  });
}
function createServer({ dataDir = path.join(__dirname, 'data'), staticDir = path.join(__dirname, 'dist') } = {}) {
  const libraryPath = path.join(dataDir, 'library.json'), indexPath = path.join(dataDir, 'files.json'), uploadDir = path.join(dataDir, 'uploads');
  // shortcut: hàng đợi ghi chỉ bảo vệ một tiến trình; dùng cơ sở dữ liệu khi cần nhiều máy chủ cùng sửa.
  let mutations = Promise.resolve();
  const change = action => { const result = mutations.then(action); mutations = result.catch(() => {}); return result; };
  const readLibrary = async () => {
    const missing = Symbol('missing-library');
    const data = await readJson(libraryPath, missing);
    if (data === missing) return null;
    try { validateLibrary(data); } catch { throw problem(500, 'Thư viện trên máy không hợp lệ. Hãy kiểm tra bản sao lưu; dữ liệu chưa bị ghi đè.'); }
    return data;
  };
  const readFiles = async () => {
    const files = await readJson(indexPath, []);
    if (!Array.isArray(files) || !files.every(file => file && FILE_ID.test(file.id) && validName(file.name) && contentType(file.name) === file.type && Number.isInteger(file.size) && file.size > 0 && file.size <= MAX_FILE && typeof file.subjectId === 'string' && typeof file.createdAt === 'string') || new Set(files.map(file => file.id)).size !== files.length) throw problem(500, 'Danh sách tệp trên máy bị lỗi. Dữ liệu chưa bị ghi đè.');
    return files;
  };
  const hasSubject = (library, id) => library ? library.subjects.some(subject => subject.id === id) : id === 'software-testing';
  const json = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Tram-Local', '1');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
    try {
      const port = server.address()?.port, host = req.headers.host;
      if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(host)) throw problem(403, 'Máy chủ chỉ phục vụ tại địa chỉ localhost của máy này.');
      const mutating = !['GET', 'HEAD'].includes(req.method);
      if (mutating && (req.headers['sec-fetch-site'] === 'cross-site' || req.headers.origin && req.headers.origin !== `http://${host}`)) throw problem(403, 'Yêu cầu phải được gửi từ website đang chạy trên máy này.');
      const url = new URL(req.url, `http://${host}`);
      if (url.pathname === '/api/library') {
        if (req.method === 'GET') { await mutations; const library = await readLibrary(); json(res, 200, { library, revision: revisionOf(library) }); return; }
        if (req.method !== 'PUT') throw problem(405, 'Phương thức không được hỗ trợ.');
        if (!(req.headers['content-type'] || '').startsWith('application/json')) throw problem(415, 'Thư viện phải được gửi dưới dạng JSON.');
        const raw = await readBody(req, MAX_LIBRARY);
        let parsed; try { parsed = JSON.parse(raw.toString('utf8')); } catch { throw problem(400, 'Nội dung JSON không hợp lệ.'); }
        if (!parsed || !Object.hasOwn(parsed, 'library')) throw problem(422, 'Thiếu dữ liệu thư viện.');
        if (!Object.hasOwn(parsed, 'expectedRevision') || parsed.expectedRevision !== null && typeof parsed.expectedRevision !== 'string') throw problem(422, 'Thiếu mã phiên bản thư viện. Hãy tải lại trang trước khi lưu.');
        validateLibrary(parsed.library);
        await change(async () => {
          const current = await readLibrary();
          if (revisionOf(current) !== parsed.expectedRevision) throw problem(409, 'Dữ liệu đã thay đổi ở cửa sổ khác. Tải lại trang để lấy dữ liệu mới nhất trước khi lưu.');
          const files = await readFiles();
          if (files.some(file => !hasSubject(parsed.library, file.subjectId))) throw problem(409, 'Môn học này vẫn còn tệp. Hãy xóa các tệp của môn trước khi xóa môn hoặc thay thế thư viện.');
          await writeJson(libraryPath, parsed.library);
        });
        json(res, 200, { saved: true, revision: revisionOf(parsed.library) }); return;
      }
      if (url.pathname === '/api/files') {
        const subjectId = url.searchParams.get('subjectId');
        if (req.method === 'GET') {
          await mutations;
          const files = await readFiles();
          json(res, 200, { files: subjectId ? files.filter(file => file.subjectId === subjectId) : files }); return;
        }
        if (req.method !== 'POST') throw problem(405, 'Phương thức không được hỗ trợ.');
        const name = url.searchParams.get('name');
        if (!validName(name)) throw problem(422, 'Tên tệp không hợp lệ: tối đa 180 ký tự, không chứa đường dẫn hoặc ký tự điều khiển.');
        const type = contentType(name);
        if (!type) throw problem(415, 'Chỉ hỗ trợ PDF, DOCX, PPTX, XLSX, TXT, CSV, JSON, PNG, JPG và ZIP.');
        if (!subjectId) throw problem(422, 'Hãy chọn môn học cho tệp.');
        const body = await readBody(req, MAX_FILE);
        if (!body.length) throw problem(422, 'Không thể tải lên tệp rỗng.');
        const file = await change(async () => {
          if (!hasSubject(await readLibrary(), subjectId)) throw problem(422, 'Môn học không tồn tại. Hãy lưu môn trước khi tải tệp lên.');
          const files = await readFiles();
          const item = { id: randomUUID(), subjectId, name, size: body.length, type, createdAt: new Date().toISOString() };
          await fs.mkdir(uploadDir, { recursive: true });
          const destination = path.join(uploadDir, item.id), temp = destination + '.tmp';
          try {
            await fs.writeFile(temp, body, { flag: 'wx', mode: 0o600 }); await fs.rename(temp, destination);
            try { await writeJson(indexPath, [...files, item]); } catch (error) { await fs.unlink(destination); throw error; }
          } finally { await fs.unlink(temp).catch(error => { if (error.code !== 'ENOENT') throw error; }); }
          return item;
        });
        json(res, 201, { file }); return;
      }
      if (url.pathname.startsWith('/api/files/')) {
        const id = url.pathname.slice('/api/files/'.length);
        if (!FILE_ID.test(id)) throw problem(404, 'Không tìm thấy tệp.');
        if (req.method === 'DELETE') {
          await change(async () => {
            const files = await readFiles(), file = files.find(item => item.id === id);
            if (!file) throw problem(404, 'Không tìm thấy tệp.');
            const filename = path.join(uploadDir, id), removed = filename + '.deleted';
            try { await fs.rename(filename, removed); } catch (error) { if (error.code !== 'ENOENT') throw error; }
            try { await writeJson(indexPath, files.filter(item => item.id !== id)); }
            catch (error) { await fs.rename(removed, filename).catch(() => {}); throw error; }
            try { await fs.unlink(removed); }
            catch (error) {
              if (error.code !== 'ENOENT') { await writeJson(indexPath, files); await fs.rename(removed, filename); throw error; }
            }
          });
          json(res, 200, { deleted: true }); return;
        }
        if (!['GET', 'HEAD'].includes(req.method)) throw problem(405, 'Phương thức không được hỗ trợ.');
        await mutations;
        const file = (await readFiles()).find(item => item.id === id);
        if (!file) throw problem(404, 'Không tìm thấy tệp.');
        let handle;
        try {
          const filename = path.join(uploadDir, id), resolved = await fs.realpath(filename), actualRoot = await fs.realpath(uploadDir);
          if (path.dirname(resolved) !== actualRoot || !(await fs.lstat(filename)).isFile()) throw problem(404, 'Không tìm thấy tệp.');
          handle = await fs.open(filename, 'r');
        } catch (error) { if (error.code === 'ENOENT') throw problem(404, 'Tệp không còn trên máy.'); throw error; }
        const length = (await handle.stat()).size;
        res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': length, 'Content-Disposition': `attachment; filename="download${path.extname(file.name).toLowerCase()}"; filename*=UTF-8''${encodeURIComponent(file.name).replace(/['()*]/g, char => '%' + char.charCodeAt(0).toString(16))}`, 'Cache-Control': 'no-store' });
        if (req.method === 'HEAD') { await handle.close(); res.end(); }
        else { const stream = handle.createReadStream(); stream.on('error', () => res.destroy()); stream.pipe(res); res.on('close', () => stream.destroy()); }
        return;
      }
      if (url.pathname.startsWith('/api/')) throw problem(404, 'Không tìm thấy chức năng này.');
      if (!['GET', 'HEAD'].includes(req.method)) throw problem(405, 'Phương thức không được hỗ trợ.');
      let decoded; try { decoded = decodeURIComponent(url.pathname); } catch { throw problem(400, 'Đường dẫn không hợp lệ.'); }
      if (decoded.includes('\\') || decoded.includes('\0') || decoded.split('/').some(part => part.startsWith('.'))) throw problem(404, 'Không tìm thấy trang.');
      const target = path.resolve(staticDir, '.' + (decoded === '/' ? '/index.html' : decoded));
      const root = await fs.realpath(staticDir);
      let resolved; try { resolved = await fs.realpath(target); } catch { throw problem(404, 'Không tìm thấy trang.'); }
      if (!resolved.startsWith(root + path.sep) || !(await fs.stat(resolved)).isFile()) throw problem(404, 'Không tìm thấy trang.');
      const type = STATIC_TYPES[path.extname(resolved).toLowerCase()];
      if (!type) throw problem(404, 'Không tìm thấy trang.');
      const body = await fs.readFile(resolved);
      res.writeHead(200, { 'Content-Type': type + (['.html', '.css', '.js', '.svg'].includes(path.extname(resolved).toLowerCase()) ? '; charset=utf-8' : ''), 'Content-Length': body.length, 'Cache-Control': 'no-cache' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
      if (res.headersSent) { res.destroy(); return; }
      json(res, error.status || 500, { error: error.status ? error.message : 'Không thể lưu hoặc đọc dữ liệu trên máy. Hãy kiểm tra quyền truy cập thư mục data và dung lượng trống.' });
    }
  });
  server.requestTimeout = 60000;
  server.headersTimeout = 15000;
  server.maxHeadersCount = 100;
  return server;
}

if (require.main === module) {
  const port = process.env.PORT === undefined ? 4173 : Number(process.env.PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) { console.error('PORT phải là số nguyên từ 1 đến 65535.'); process.exitCode = 1; }
  else {
    const server = createServer();
    server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `Cổng ${port} đang được sử dụng. Đóng bản đang chạy hoặc chọn biến PORT khác.` : 'Không thể mở máy chủ trên máy này.'); process.exitCode = 1; });
    server.listen(port, '127.0.0.1', () => { console.log(`Trạm ôn tập đang chạy: http://127.0.0.1:${port}`); console.log('Dữ liệu và tệp được lưu trong thư mục data. Giữ cửa sổ này mở khi sử dụng; nhấn Ctrl+C để dừng.'); });
  }
}
module.exports = { createServer, MAX_FILE, MAX_LIBRARY };
