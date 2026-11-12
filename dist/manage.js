(function (root) {
  'use strict';
  let mounted = false, context, currentRoute = '', currentSubject = '', page = 1;
  let filters = { query: '', chapter: '', level: '' };
  let files = { subjectId: '', loading: false, items: [], error: '', request: 0 };
  const colors = ['sage', 'sand', 'blue', 'rose', 'lilac'];
  const copy = value => JSON.parse(JSON.stringify(value));
  const uid = prefix => prefix + '-' + crypto.randomUUID();
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const button = (action, label, attrs = '', cls = 'secondary') => `<button type="button" class="btn ${cls}" data-manage-action="${action}" ${attrs}>${label}</button>`;
  const field = (label, name, value = '', attrs = '', type = 'text') => `<label class="manage-field"><span>${label}</span><input name="${name}" type="${type}" value="${escape(value)}" ${attrs}></label>`;
  const area = (label, name, value = '', attrs = '') => `<label class="manage-field"><span>${label}</span><textarea name="${name}" ${attrs}>${escape(value)}</textarea></label>`;
  const selected = (a, b) => String(a) === String(b) ? ' selected' : '';
  const attrsId = id => `data-id="${escape(id)}"`;
  const subject = ctx => ctx.getLibrary().subjects.find(s => s.id === ctx.getSubjectId()) || ctx.getLibrary().subjects[0];
  function refresh(ctx = context) { if (ctx?.refresh) ctx.refresh(); }
  function heading(ctx, title, description, action = '') {
    return ctx.heading ? ctx.heading('QUẢN LÝ KHÔNG GIAN HỌC', title, description, action) : `<div class="page-heading"><div><div class="eyebrow">QUẢN LÝ KHÔNG GIAN HỌC</div><h1 tabindex="-1">${title}</h1><p class="page-sub">${description}</p></div>${action}</div>`;
  }
  function tabs(route) {
    const items = [['manage-subjects', 'Môn học'], ['manage-questions', 'Câu hỏi'], ['manage-exams', 'Đề thi'], ['manage-files', 'Tệp tài liệu'], ['manage-data', 'Sao lưu']];
    return `<nav class="manage-tabs" aria-label="Các mục quản lý">${items.map(([id, title]) => `<a href="#${id}" ${id === route ? 'class="active" aria-current="page"' : ''}>${title}</a>`).join('')}</nav>`;
  }
  function empty(title, description, action = '') { return `<div class="empty-state manage-empty"><h2>${title}</h2><p>${description}</p>${action}</div>`; }
  function stats(data, s) { return { questions: data.questions.filter(q => q.subjectId === s.id).length, exams: data.exams.filter(e => e.subjectId === s.id).length }; }
  function subjects(ctx) {
    const data = ctx.getLibrary();
    return heading(ctx, 'Mỗi môn một không gian riêng.', 'Thêm môn học, chia chương và xây ngân hàng câu hỏi theo cách bạn học.', button('new-subject', '+ Thêm môn học', '', 'primary')) + `<div class="manage-subject-grid">${data.subjects.map((s, i) => { const counts = stats(data, s); return `<article class="manage-subject-card"><div class="manage-card-top"><span class="chapter-number ${colors[i % colors.length]}">${escape(s.code || String(i+1).padStart(2,'0'))}</span>${s.id === ctx.getSubjectId() ? '<span class="pill">Đang chọn</span>' : ''}</div><h2>${escape(s.name)}</h2><p>${escape(s.description || 'Thêm câu hỏi và đề thi để bắt đầu ôn tập môn này.')}</p><div class="manage-card-stats"><span><b>${s.chapters.length}</b> chương</span><span><b>${counts.questions}</b> câu hỏi</span><span><b>${counts.exams}</b> đề thi</span></div>${s.examDate ? `<div class="manage-date">Ngày kiểm tra: ${escape(new Date(s.examDate+'T00:00:00').toLocaleDateString('vi-VN'))}</div>` : ''}<div class="manage-actions">${button('select-subject', 'Mở môn học →', attrsId(s.id), 'primary')}${button('chapters', 'Chương', attrsId(s.id))}${button('edit-subject', 'Sửa', attrsId(s.id))}${button('delete-subject', 'Xóa', attrsId(s.id), 'danger')}</div></article>`; }).join('')}</div>`;
  }
  function questions(ctx) {
    const data = ctx.getLibrary(), s = subject(ctx);
    const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('vi');
    const list = data.questions.filter(q => q.subjectId === s.id && (!filters.chapter || String(q.chapter) === filters.chapter) && (!filters.level || q.level === filters.level) && (!filters.query || normalize(q.question+' '+q.topic+' '+q.id).includes(normalize(filters.query))));
    const pageCount = Math.max(1, Math.ceil(list.length/12)); page = Math.min(pageCount, page);
    return heading(ctx, 'Ngân hàng câu hỏi', `Môn ${escape(s.name)} · Thêm, chỉnh sửa và tìm lại từng câu hỏi.`, button('new-question', '+ Thêm câu hỏi', '', 'primary')) + `<form class="manage-filter" data-manage-form="filter"><label class="manage-search"><span class="sr-only">Tìm câu hỏi</span><input name="query" type="search" placeholder="Tìm nội dung hoặc chủ đề…" value="${escape(filters.query)}" maxlength="200"></label><label><span class="sr-only">Lọc chương</span><select name="chapter" data-manage-filter="chapter"><option value="">Tất cả chương</option>${s.chapters.map(c => `<option value="${c.id}"${selected(c.id,filters.chapter)}>${escape(c.title)}</option>`).join('')}</select></label><label><span class="sr-only">Lọc mức độ</span><select name="level" data-manage-filter="level"><option value="">Mọi mức độ</option><option${selected('Cơ bản',filters.level)}>Cơ bản</option><option${selected('Vận dụng',filters.level)}>Vận dụng</option></select></label><button class="btn secondary" type="submit">Tìm kiếm</button></form><div class="manage-list-summary"><span>${list.length} câu hỏi${filters.query || filters.chapter || filters.level ? ' phù hợp' : ''}</span><span>Chọn Sửa để xem đủ nội dung và đáp án.</span></div>${list.length ? `<div class="manage-question-list">${list.slice((page-1)*12,page*12).map((q,i) => `<article class="manage-question-item"><div class="manage-question-index">${(page-1)*12+i+1}</div><div class="manage-question-body"><div class="manage-item-meta"><span class="pill">${escape(s.chapters.find(c => c.id === q.chapter)?.title || '')}</span><span>${escape(q.level || 'Cơ bản')}</span>${q.topic ? `<span>${escape(q.topic)}</span>` : ''}</div><h2>${escape(q.question)}</h2><p><b>Đáp án đúng:</b> ${escape(q.options[q.answer])}</p></div><div class="manage-item-actions">${button('edit-question','Sửa',attrsId(q.id))}${button('delete-question','Xóa',attrsId(q.id),'danger')}</div></article>`).join('')}</div><div class="manage-pagination">${button('prev-page','← Trước', page === 1 ? 'disabled' : '')}<span>Trang ${page} / ${pageCount}</span>${button('next-page','Sau →',page === pageCount ? 'disabled' : '')}</div>` : empty('Chưa có câu hỏi phù hợp.', 'Bạn có thể đổi bộ lọc hoặc thêm câu hỏi mới.', button('new-question','+ Thêm câu hỏi','','primary'))}`;
  }
  function exams(ctx) {
    const data = ctx.getLibrary(), s = subject(ctx), list = data.exams.filter(e => e.subjectId === s.id);
    return heading(ctx, 'Quản lý đề thi', `Môn ${escape(s.name)} · Tự chọn thời gian và số câu cho từng chương.`, button('new-exam','+ Tạo đề thi','','primary')) + `<div class="info-banner"><span>Mỗi đề lấy câu từ ngân hàng của môn. Hệ thống sẽ kiểm tra số câu còn đủ trước khi lưu cấu trúc đề.</span></div>${list.length ? `<div class="manage-exam-grid">${list.map(e => `<article class="manage-exam-card"><div class="manage-card-top"><span class="eyebrow">ĐỀ THI THỬ</span><span class="pill">${e.presetNumber ? 'Đề cố định' : 'Trộn câu mỗi lần'}</span></div><h2>${escape(e.name)}</h2><p>${escape(e.description || 'Đề luyện được tạo từ ngân hàng câu hỏi của môn.')}</p><div class="manage-card-stats"><span><b>${e.chapterCounts.reduce((n,c) => n+c.count,0)}</b> câu hỏi</span><span><b>${e.durationMinutes}</b> phút</span></div><div class="manage-exam-allocation">${e.chapterCounts.filter(c => c.count).map(c => `<span>${escape(s.chapters.find(ch => ch.id === c.chapterId)?.title || 'Chương '+c.chapterId)} <b>${c.count}</b></span>`).join('')}</div><div class="manage-actions">${button('edit-exam','Sửa cấu trúc',attrsId(e.id))}${button('delete-exam','Xóa đề',attrsId(e.id),'danger')}</div></article>`).join('')}</div>` : empty('Chưa có đề thi cho môn này.', 'Hãy thêm câu hỏi, rồi tạo cấu trúc đề phù hợp với bài kiểm tra của bạn.', button('new-exam','+ Tạo đề thi','','primary'))}`;
  }
  function backup(ctx) {
    const data = ctx.getLibrary();
    return heading(ctx, 'Giữ lại công sức học tập.', 'Xuất một bản dữ liệu trước khi đổi máy hoặc nhập một thư viện mới.') + `<div class="manage-backup-grid"><section class="manage-panel"><span class="eyebrow">01 · XUẤT DỮ LIỆU</span><h2>Một bản sao để an tâm.</h2><p>Bản JSON gồm ${data.subjects.length} môn học, ${data.questions.length} câu hỏi và ${data.exams.length} đề thi.</p><p>Các tệp đã tải lên và lịch sử làm bài không nằm trong bản JSON này. Tệp trên máy cần được sao lưu riêng cùng thư mục dữ liệu.</p>${button('export','Tải bản sao JSON ↓','','primary')}</section><section class="manage-panel"><span class="eyebrow">02 · NHẬP DỮ LIỆU</span><h2>Khôi phục thư viện học tập.</h2><p>Chọn bản JSON đã xuất từ Trạm ôn tập. Hệ thống sẽ kiểm tra dữ liệu và hỏi lại trước khi thay thế thư viện hiện tại.</p><form data-manage-form="import" class="manage-import-form"><label class="manage-field"><span>Bản sao lưu JSON (tối đa 5 MB)</span><input type="file" name="backup" accept=".json,application/json" required></label><button class="btn secondary" type="submit">Kiểm tra & nhập dữ liệu</button></form></section></div><div class="manage-panel manage-backup-note"><h2>Không cần tài khoản.</h2><p>Dữ liệu được lưu trên bản ứng dụng bạn đang dùng. Khi chạy máy chủ local, hãy giữ thư mục dữ liệu và xuất bản sao định kỳ. Trên bản website tĩnh, dữ liệu được lưu trong trình duyệt và không tự đồng bộ sang thiết bị khác.</p></div>`;
  }
  function fileSize(size) { return size < 1024*1024 ? `${Math.max(1,Math.round(size/1024))} KB` : `${(size/(1024*1024)).toFixed(1)} MB`; }
  function filesView(ctx) {
    const s = subject(ctx);
    if (files.subjectId !== s.id) { files = { subjectId: s.id, loading: false, items: [], error: '', request: files.request+1 }; queueMicrotask(() => loadFiles(ctx)); }
    return heading(ctx, 'Tài liệu của môn học', `Môn ${escape(s.name)} · Giữ slide, đề cương và tài liệu ngay trên máy bạn.`, button('refresh-files','↻ Làm mới')) + `<section class="manage-upload"><div><span class="eyebrow">LƯU TRÊN MÁY CHỦ LOCAL</span><h2>Thêm tài liệu cho môn này.</h2><p>PDF, Word, PowerPoint, Excel, văn bản, JSON, ảnh hoặc ZIP. Mỗi tệp tối đa 25 MB.</p></div><form data-manage-form="upload"><label class="manage-field"><span>Chọn tệp tài liệu</span><input type="file" name="document" accept=".pdf,.docx,.pptx,.xlsx,.txt,.csv,.json,.png,.jpg,.jpeg,.zip" required></label><button type="submit" class="btn primary" ${files.error ? 'disabled' : ''}>Tải lên máy này ↑</button></form></section>${files.error ? `<div class="manage-file-warning" role="status"><h2>Chưa kết nối máy chủ local.</h2><p>${escape(files.error)}</p><p>Mở tệp <b>start-local.cmd</b> trong bản tải về, rồi truy cập địa chỉ ứng dụng hiện trong cửa sổ khởi động. Các phần môn học, câu hỏi và đề thi vẫn dùng được trên bản website tĩnh.</p></div>` : files.loading ? '<div class="manage-loading" role="status">Đang đọc danh sách tài liệu…</div>' : files.items.length ? `<div class="manage-files-list">${files.items.map(f => `<article class="manage-file-item"><span class="manage-file-extension">${escape(f.name.split('.').pop().toUpperCase())}</span><div><h2>${escape(f.name)}</h2><p>${fileSize(f.size)} · ${escape(new Date(f.createdAt).toLocaleString('vi-VN'))}</p></div><div class="manage-item-actions"><a class="btn secondary" href="/api/files/${encodeURIComponent(f.id)}" download>Tải xuống</a>${button('delete-file','Xóa',attrsId(f.id),'danger')}</div></article>`).join('')}</div>` : empty('Chưa có tài liệu trong môn này.', 'Chọn tệp ở phía trên để bắt đầu. Tệp được lưu trên máy chủ local, không gửi lên dịch vụ bên ngoài.')}`;
  }
  async function api(url, options) {
    const response = await fetch(url, options);
    if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('Bản đang mở chưa có dịch vụ lưu tệp local.');
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Không thể hoàn thành thao tác với tệp.');
    return data;
  }
  async function loadFiles(ctx) {
    const id = subject(ctx).id, request = ++files.request; files.subjectId = id; files.loading = true; files.error = ''; refresh(ctx);
    try { const data = await api('/api/files?subjectId='+encodeURIComponent(id)); if (files.request !== request) return; if (!Array.isArray(data.files)) throw new Error('Danh sách tệp trả về không hợp lệ.'); files.items = data.files; }
    catch (error) { if (files.request === request) { files.error = error.message; files.items = []; } }
    finally { if (files.request === request) { files.loading = false; if (currentRoute === 'manage-files') refresh(ctx); } }
  }
  function render(route, ctx) {
    context = ctx; currentRoute = route;
    const id = subject(ctx).id;
    if (currentSubject !== id) { currentSubject = id; page = 1; filters = { query: '', chapter: '', level: '' }; }
    const views = { 'manage-subjects': subjects, 'manage-questions': questions, 'manage-exams': exams, 'manage-data': backup, 'manage-files': filesView };
    return `<div class="management">${tabs(route)}${(views[route] || subjects)(ctx)}</div>`;
  }
  function editor() {
    let el = document.getElementById('manage-editor');
    if (!el) { el = document.createElement('dialog'); el.id = 'manage-editor'; el.className = 'manage-editor'; el.setAttribute('aria-labelledby','manage-editor-title'); document.body.appendChild(el); }
    return el;
  }
  function openEditor(type, title, body, meta = '', submit = 'Lưu thay đổi') {
    const el = editor(); if (el.open) el.close();
    el.innerHTML = `<form data-manage-form="${type}" ${meta}><div class="manage-editor-top"><div><span class="eyebrow">TRẠM ÔN TẬP · QUẢN LÝ</span><h2 id="manage-editor-title">${title}</h2></div>${button('close-editor','×','aria-label="Đóng biểu mẫu"','manage-close')}</div>${body}<p class="manage-form-error" role="alert"></p><div class="dialog-actions">${button('close-editor','Hủy')}<button type="submit" class="btn primary">${submit}</button></div></form>`;
    el.returnValue = ''; el.showModal();
  }
  function closeEditor() { const el = document.getElementById('manage-editor'); if (el?.open) el.close(); }
  function showError(error, ctx, form) { const target = form?.querySelector('.manage-form-error'); if (target) target.textContent = error.message; else ctx.toast(error.message || 'Không thể lưu thay đổi.'); }
  async function persist(ctx, next, message, form, after) {
    const submit = form?.querySelector('[type="submit"]'); if (submit) submit.disabled = true;
    try { root.StudyLibrary.validate(next); await ctx.onSave(next); closeEditor(); if (after) after(); refresh(ctx); ctx.toast(message); return true; }
    catch (error) { showError(error, ctx, form); return false; }
    finally { if (submit) submit.disabled = false; }
  }
  function subjectEditor(ctx, id) {
    const s = ctx.getLibrary().subjects.find(x => x.id === id);
    openEditor('subject', s ? 'Chỉnh sửa môn học' : 'Thêm môn học', `<div class="manage-form-grid">${field('Tên môn học','name',s?.name,'required maxlength="120" placeholder="Ví dụ: Cơ sở dữ liệu"')}${field('Mã môn','code',s?.code,'maxlength="30" placeholder="Ví dụ: CSDL"')}${field('Ngày kiểm tra (nếu có)','examDate',s?.examDate,'','date')}${area('Mô tả ngắn','description',s?.description,'maxlength="1000" rows="3"')}</div>`, id ? attrsId(id) : '', s ? 'Lưu môn học' : 'Tạo môn học');
  }
  function chaptersEditor(ctx, id) {
    const s = ctx.getLibrary().subjects.find(x => x.id === id); if (!s) return;
    openEditor('chapter-list', 'Chương của '+escape(s.name), `<div class="manage-chapter-editor">${s.chapters.map(c => `<div><span class="chapter-number ${colors[(c.id-1)%colors.length]}">${c.id}</span><strong>${escape(c.title)}</strong><div>${button('edit-chapter','Sửa',`data-subject="${escape(id)}" ${attrsId(c.id)}`)}${button('delete-chapter','Xóa',`data-subject="${escape(id)}" ${attrsId(c.id)}`,'danger')}</div></div>`).join('')}</div>${button('new-chapter','+ Thêm chương',`data-subject="${escape(id)}"`)}<p class="manage-help">Xóa chương cũng xóa câu hỏi của chương và điều chỉnh các đề liên quan. Lịch sử bài đã làm được giữ nguyên.</p>`, attrsId(id), 'Đóng');
  }
  function chapterEditor(ctx, subjectId, chapterId) {
    const s = ctx.getLibrary().subjects.find(x => x.id === subjectId), c = s?.chapters.find(x => x.id === Number(chapterId)); if (!s) return;
    openEditor('chapter', c ? 'Chỉnh sửa chương' : 'Thêm chương', `<div class="manage-form-grid">${field('Tên chương','title',c?.title,'required maxlength="120"')}${field('Tên ngắn','short',c?.short,'maxlength="50"')}${area('Nội dung chính','detail',c?.detail,'maxlength="500" rows="3"')}</div>`, `data-subject="${escape(subjectId)}" ${c ? attrsId(c.id) : ''}`, c ? 'Lưu chương' : 'Thêm chương');
  }
  function questionEditor(ctx, id) {
    const data = ctx.getLibrary(), q = data.questions.find(x => x.id === id), s = q ? data.subjects.find(x => x.id === q.subjectId) : subject(ctx);
    if (!s.chapters.length) { ctx.toast('Hãy thêm ít nhất một chương cho môn trước.'); return; }
    openEditor('question', q ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi', `<div class="manage-form-grid"><label class="manage-field"><span>Chương</span><select name="chapter" required>${s.chapters.map(c => `<option value="${c.id}"${selected(c.id,q?.chapter)}>${escape(c.title)}</option>`).join('')}</select></label><label class="manage-field"><span>Mức độ</span><select name="level"><option${selected('Cơ bản',q?.level)}>Cơ bản</option><option${selected('Vận dụng',q?.level)}>Vận dụng</option></select></label>${field('Chủ đề','topic',q?.topic,'maxlength="120"')}${area('Nội dung câu hỏi','question',q?.question,'required maxlength="5000" rows="4" class="manage-full"')}</div><fieldset class="manage-option-editor"><legend>4 lựa chọn · Đánh dấu một đáp án đúng</legend>${Array.from({length:4},(_,i) => `<div><label class="manage-correct-radio"><input type="radio" name="answer" value="${i}" required ${q?.answer === i ? 'checked' : ''}><span>${'ABCD'[i]}</span></label><label class="manage-option-text"><span class="sr-only">Nội dung lựa chọn ${'ABCD'[i]}</span><textarea name="option-${i}" required maxlength="2000" rows="2">${escape(q?.options[i] || '')}</textarea></label></div>`).join('')}</fieldset>${area('Giải thích đáp án','explanation',q?.explanation,'required maxlength="5000" rows="3"')}${field('Nguồn tài liệu','source',q?.source,'required maxlength="500" placeholder="Ví dụ: Slide Chương 1, trang 12"')}<p class="manage-help">Nội dung mới không làm thay đổi đáp án và điểm của các lượt đã làm.</p>`, `data-subject="${escape(s.id)}" ${q ? attrsId(q.id) : ''}`, q ? 'Lưu câu hỏi' : 'Thêm câu hỏi');
  }
  function examEditor(ctx, id) {
    const data = ctx.getLibrary(), e = data.exams.find(x => x.id === id), s = e ? data.subjects.find(x => x.id === e.subjectId) : subject(ctx);
    if (!s.chapters.length) { ctx.toast('Hãy thêm chương và câu hỏi trước khi tạo đề.'); return; }
    openEditor('exam', e ? 'Chỉnh sửa đề thi' : 'Tạo đề thi', `<div class="manage-form-grid">${field('Tên đề thi','name',e?.name,'required maxlength="120" placeholder="Ví dụ: Ôn tập giữa kỳ"')}${field('Thời gian làm bài (phút)','durationMinutes',e?.durationMinutes || 45,'required min="1" max="180" step="1"','number')}${area('Mô tả','description',e?.description,'maxlength="1000" rows="2"')}</div><fieldset class="manage-allocation"><legend>Chọn số câu theo từng chương</legend>${s.chapters.map(c => { const available = data.questions.filter(q => q.subjectId === s.id && q.chapter === c.id).length; const count = e?.chapterCounts.find(x => x.chapterId === c.id)?.count || 0; return `<label><span>${escape(c.title)}<small>Có ${available} câu trong ngân hàng</small></span><input name="count-${c.id}" type="number" min="0" max="${available}" step="1" value="${count}" required data-manage-count aria-label="Số câu ${escape(c.title)}"></label>`; }).join('')}<div class="manage-total">Tổng số câu <strong id="manage-exam-total">${e?.chapterCounts.reduce((n,c) => n+c.count,0) || 0}</strong></div></fieldset><p class="manage-help">Tối đa 200 câu. Cấu trúc đã chỉnh sửa sẽ lấy câu ngẫu nhiên khi bắt đầu mỗi lượt; đáp án được đảo vị trí.</p>`, `data-subject="${escape(s.id)}" ${e ? attrsId(e.id) : ''}`, e ? 'Lưu cấu trúc đề' : 'Tạo đề thi');
  }
  function confirmDelete(ctx, title, detail, next, message) { closeEditor(); ctx.confirm(title, detail, () => persist(ctx,next,message), 'Xóa'); }
  async function handleClick(event, ctx = context) {
    const el = event.target.closest('[data-manage-action]'); if (!el || !ctx) return; event.preventDefault();
    const action = el.dataset.manageAction, id = el.dataset.id, data = ctx.getLibrary();
    if (action === 'close-editor') closeEditor();
    else if (action === 'new-subject') subjectEditor(ctx);
    else if (action === 'edit-subject') subjectEditor(ctx,id);
    else if (action === 'select-subject') { ctx.onSelectSubject(id); ctx.navigate('home'); }
    else if (action === 'chapters') chaptersEditor(ctx,id);
    else if (action === 'new-chapter') chapterEditor(ctx,el.dataset.subject);
    else if (action === 'edit-chapter') chapterEditor(ctx,el.dataset.subject,id);
    else if (action === 'new-question') questionEditor(ctx);
    else if (action === 'edit-question') questionEditor(ctx,id);
    else if (action === 'new-exam') examEditor(ctx);
    else if (action === 'edit-exam') examEditor(ctx,id);
    else if (action === 'prev-page' || action === 'next-page') { page += action === 'next-page' ? 1 : -1; refresh(ctx); document.querySelector('.manage-question-list')?.scrollIntoView({block:'start'}); }
    else if (action === 'delete-subject') {
      if (data.subjects.length <= 1) { ctx.toast('Hãy giữ lại ít nhất một môn học.'); return; }
      const s = data.subjects.find(x => x.id === id); if (!s) return;
      const next = copy(data); next.subjects = next.subjects.filter(x => x.id !== id); next.questions = next.questions.filter(x => x.subjectId !== id); next.exams = next.exams.filter(x => x.subjectId !== id);
      confirmDelete(ctx,'Xóa môn '+s.name+'?', 'Môn học, các chương, câu hỏi và đề thi của môn sẽ bị xóa. Lịch sử bài đã làm vẫn được giữ. Nếu môn có tệp tài liệu trên máy chủ local, hãy xóa các tệp trước.', next,'Đã xóa môn học.');
    } else if (action === 'delete-chapter') {
      const next = copy(data), s = next.subjects.find(x => x.id === el.dataset.subject), chapterId = Number(id), c = s?.chapters.find(x => x.id === chapterId); if (!c) return;
      s.chapters = s.chapters.filter(x => x.id !== chapterId); next.questions = next.questions.filter(q => q.subjectId !== s.id || q.chapter !== chapterId);
      next.exams = next.exams.map(e => e.subjectId !== s.id ? e : { ...e, chapterCounts: e.chapterCounts.filter(x => x.chapterId !== chapterId), presetNumber: undefined, seed: crypto.getRandomValues(new Uint32Array(1))[0] }).filter(e => e.chapterCounts.length);
      confirmDelete(ctx,'Xóa '+c.title+'?', 'Câu hỏi trong chương sẽ bị xóa. Các đề được bỏ phần chương này; đề không còn câu hỏi sẽ bị xóa. Lịch sử bài đã làm vẫn được giữ.',next,'Đã xóa chương và cập nhật đề liên quan.');
    } else if (action === 'delete-question') {
      const next = copy(data); next.questions = next.questions.filter(q => q.id !== id);
      confirmDelete(ctx,'Xóa câu hỏi này?', 'Câu hỏi sẽ không còn được chọn trong lượt làm bài mới. Nếu một đề không còn đủ câu, bạn cần sửa cấu trúc đề trước khi xóa.',next,'Đã xóa câu hỏi.');
    } else if (action === 'delete-exam') {
      const next = copy(data); next.exams = next.exams.filter(e => e.id !== id);
      confirmDelete(ctx,'Xóa đề thi này?', 'Đề thi sẽ được xóa khỏi kho đề. Câu hỏi trong ngân hàng và lịch sử bài đã làm vẫn được giữ.',next,'Đã xóa đề thi.');
    } else if (action === 'export') {
      const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}), url = URL.createObjectURL(blob), a = document.createElement('a'); a.href=url; a.download='tram-on-tap-sao-luu-'+new Date().toISOString().slice(0,10)+'.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); ctx.toast('Đã tạo bản sao lưu môn học, câu hỏi và đề thi.');
    } else if (action === 'refresh-files') { await loadFiles(ctx); }
    else if (action === 'delete-file') { const f = files.items.find(x => x.id === id); if (!f) return; ctx.confirm('Xóa tệp '+f.name+'?', 'Tệp sẽ bị xóa khỏi thư mục dữ liệu trên máy chủ local. Thao tác này không thể hoàn tác.', async () => { try { await api('/api/files/'+encodeURIComponent(id),{method:'DELETE'}); await loadFiles(ctx); ctx.toast('Đã xóa tệp tài liệu.'); } catch(error) { ctx.toast(error.message); } },'Xóa tệp'); }
  }
  async function handleSubmit(event, ctx = context) {
    const form = event.target.closest('form[data-manage-form]'); if (!form || !ctx) return; event.preventDefault();
    if (!form.reportValidity()) return;
    const type = form.dataset.manageForm, values = new FormData(form), data = ctx.getLibrary();
    if (type === 'chapter-list') { closeEditor(); return; }
    if (type === 'filter') { filters = {query: String(values.get('query') || '').trim(),chapter:String(values.get('chapter') || ''),level:String(values.get('level') || '')}; page=1; refresh(ctx); return; }
    if (type === 'import') {
      const file = values.get('backup'); if (!file?.size) return;
      try { if (file.size > 5*1024*1024) throw new Error('Bản sao JSON vượt quá 5 MB.'); const next = JSON.parse(await file.text()); root.StudyLibrary.validate(next); ctx.confirm('Thay thế thư viện hiện tại?', `Bản nhập có ${next.subjects.length} môn học, ${next.questions.length} câu hỏi và ${next.exams.length} đề thi. Hãy xuất bản sao hiện tại trước nếu bạn muốn giữ lại. Lịch sử làm bài không bị thay thế.`, () => persist(ctx,next,'Đã nhập thư viện học tập.'), 'Nhập & thay thế'); } catch(error) { ctx.toast(error instanceof SyntaxError ? 'Tệp không phải JSON hợp lệ.' : error.message); } return;
    }
    if (type === 'upload') {
      const file = values.get('document'), id = subject(ctx).id, submit = form.querySelector('[type="submit"]');
      try {
        if (!file?.size) throw new Error('Hãy chọn tệp có nội dung.');
        if (file.size > 25*1024*1024) throw new Error('Mỗi tệp tối đa 25 MB.');
        if (!/\.(pdf|docx|pptx|xlsx|txt|csv|json|png|jpe?g|zip)$/i.test(file.name)) throw new Error('Định dạng tệp chưa được hỗ trợ.');
        submit.disabled=true; submit.textContent='Đang tải lên…';
        await api('/api/files?subjectId='+encodeURIComponent(id)+'&name='+encodeURIComponent(file.name), {method:'POST',headers:{'Content-Type':file.type || 'application/octet-stream'},body:file}); await loadFiles(ctx); ctx.toast('Đã lưu tệp vào máy chủ local.');
      } catch(error) { ctx.toast(error.message); } finally { submit.disabled=false; submit.textContent='Tải lên máy này ↑'; } return;
    }
    const next = copy(data), text = key => String(values.get(key) || '').trim();
    if (type === 'subject') {
      const existing = next.subjects.find(x => x.id === form.dataset.id), item = { ...(existing || {id:uid('subject'),chapters:[{id:1,title:'Chương 1',detail:'',short:'Chương 1',color:'sage'}]}), name:text('name'),code:text('code'),description:text('description'),examDate:text('examDate') };
      if (existing) next.subjects[next.subjects.indexOf(existing)] = item; else next.subjects.push(item);
      await persist(ctx,next,existing?'Đã cập nhật môn học.':'Đã tạo môn học mới.',form);
    } else if (type === 'chapter') {
      const s = next.subjects.find(x => x.id === form.dataset.subject); if (!s) return;
      const existing = s.chapters.find(x => x.id === Number(form.dataset.id)), id = existing?.id || Math.max(0,...s.chapters.map(c=>c.id))+1;
      const item = {...(existing || {}),id,title:text('title'),short:text('short') || text('title').slice(0,50),detail:text('detail'),color:existing?.color || colors[(id-1)%colors.length]};
      if (existing) s.chapters[s.chapters.indexOf(existing)] = item; else s.chapters.push(item);
      await persist(ctx,next,existing?'Đã cập nhật chương.':'Đã thêm chương.',form);
    } else if (type === 'question') {
      const existing = next.questions.find(q => q.id === form.dataset.id), item = {...(existing || {id:uid('question')}),subjectId:form.dataset.subject,chapter:Number(values.get('chapter')),topic:text('topic'),level:text('level'),question:text('question'),options:Array.from({length:4},(_,i)=>text('option-'+i)),answer:Number(values.get('answer')),explanation:text('explanation'),source:text('source')};
      if (existing) next.questions[next.questions.indexOf(existing)] = item; else next.questions.push(item);
      await persist(ctx,next,existing?'Đã cập nhật câu hỏi.':'Đã thêm câu hỏi.',form);
    } else if (type === 'exam') {
      const existing = next.exams.find(e => e.id === form.dataset.id), s = next.subjects.find(x => x.id === form.dataset.subject); if (!s) return;
      const item = {...(existing || {id:uid('exam')}),subjectId:s.id,name:text('name'),description:text('description'),durationMinutes:Number(values.get('durationMinutes')),chapterCounts:s.chapters.map(c => ({chapterId:c.id,count:Number(values.get('count-'+c.id))})).filter(c=>c.count),seed:crypto.getRandomValues(new Uint32Array(1))[0]}; delete item.presetNumber;
      if (existing) next.exams[next.exams.indexOf(existing)] = item; else next.exams.push(item);
      await persist(ctx,next,existing?'Đã cập nhật cấu trúc đề thi.':'Đã tạo đề thi.',form);
    }
  }
  function handleChange(event, ctx = context) {
    if (event.target.matches('[data-manage-filter]')) { const form = event.target.closest('form'); form.requestSubmit(); }
    if (event.target.matches('[data-manage-count]')) { const form = event.target.closest('form'); const total = [...form.querySelectorAll('[data-manage-count]')].reduce((n,input)=>n+Math.max(0,Number(input.value)||0),0); form.querySelector('#manage-exam-total').textContent=total; }
  }
  function mount(ctx) { context=ctx; if (mounted) return; mounted=true; document.addEventListener('click',event=>handleClick(event,context)); document.addEventListener('submit',event=>handleSubmit(event,context)); document.addEventListener('change',event=>handleChange(event,context)); document.addEventListener('input',event=>{if(event.target.matches('[data-manage-count]')) handleChange(event,context);}); }
  root.StudyManagement = { mount, render, handleClick, handleSubmit, handleChange };
})(globalThis);
