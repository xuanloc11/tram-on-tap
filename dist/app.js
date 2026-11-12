(async () => {
  'use strict';
  const E = globalThis.QuizEngine;
  const seedBank = [...(globalThis.QUESTION_PART_12 || []), ...(globalThis.QUESTION_PART_3 || []), ...(globalThis.QUESTION_PART_45 || [])];
  const L = globalThis.StudyLibrary;
  const LIBRARY_KEY = 'tram-on-tap-library-v2';
  let library = L.createDefault(seedBank, E.CHAPTERS), localMode = false, localRevision = null;
  let bank = [], lookup = new Map();
  const app = document.getElementById('app');
  const dialog = document.getElementById('confirm-dialog');
  const KEY = 'tram-on-tap-v1';
  const icons = { grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z', book: 'M3 4h6a4 4 0 0 1 3 1 4 4 0 0 1 3-1h6v16h-6a4 4 0 0 0-3 1 4 4 0 0 0-3-1H3z M12 5v16', file: 'M14 2H5v20h14V7z M14 2v6h5 M8 12h8 M8 16h6', clock: 'M12 8v5l3 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0', arrow: 'M4 12h16 M14 6l6 6-6 6', check: 'M5 12l4 4L19 6', flag: 'M5 22V3 M5 3c5-4 9 4 14 0v10c-5 4-9-4-14 0', history: 'M3 3v6h6 M3 9a9 9 0 1 1 0 6 M12 7v6l4 2', leaf: 'M20 3c-13-2-18 7-13 12 5 5 14 0 13-12z M4 21L15 9', close: 'M6 6l12 12 M6 18L18 6', bolt: 'M13 2L4 14h7l-1 8 10-13h-7z' };
  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name] || icons.book}"/></svg>`;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const btn = (action, text, cls = 'primary', attrs = '') => `<button class="btn ${cls}" data-action="${action}" ${attrs}>${text}</button>`;
  let state = { active: null, history: [], reviewId: null, subjectId: 'software-testing' }, route = 'home', review = null, reviewFilter = 'all', historyAll = false, confirmAction = null, storageWarning = false;
  try { const savedLibrary = localStorage.getItem(LIBRARY_KEY); if (savedLibrary) { const parsed = JSON.parse(savedLibrary); L.validate(parsed); library = parsed; } } catch { storageWarning = true; }
  if (location.protocol !== 'file:') {
    try {
      const response = await fetch('/api/library', { cache: 'no-store', signal: AbortSignal.timeout(3000) });
      if (response.headers.get('X-Tram-Local') === '1') {
        localMode = true;
        if (!response.ok) throw new Error('Không đọc được dữ liệu trên máy. Hãy kiểm tra tệp data/library.json hoặc khôi phục bản sao lưu.');
        const payload = await response.json();
        localRevision = payload.revision;
        if (payload.library) { L.validate(payload.library); library = payload.library; }
        else { const initialized = await fetch('/api/library', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ library, expectedRevision: localRevision }) }); if (!initialized.ok) throw new Error('Không khởi tạo được thư viện trên máy.'); localRevision = (await initialized.json()).revision; }
      }
    } catch (error) {
      if (localMode) { app.innerHTML = `<main class="fatal"><h1>Chưa mở được thư viện</h1><p>${esc(error.message)}</p><p>Dữ liệu hiện có được giữ nguyên. Hãy kiểm tra cửa sổ máy chủ rồi tải lại trang.</p></main>`; return; }
    }
  }
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) { state.active = E.upgradeAttempt(saved.active, seedBank); state.history = Array.isArray(saved.history) ? saved.history.map(a => E.upgradeAttempt(a, seedBank)).filter(a => a && a.status === 'done').slice(0, 50) : []; state.reviewId = typeof saved.reviewId === 'string' ? saved.reviewId : null; state.subjectId = library.subjects.some(s => s.id === saved.subjectId) ? saved.subjectId : library.subjects[0].id; }
  } catch { storageWarning = true; }
  function subject() { return library.subjects.find(s => s.id === state.subjectId) || library.subjects[0]; }
  function subjectExams() { return library.exams.filter(e => e.subjectId === subject().id); }
  function subjectHistory() { return state.history.filter(a => a.subjectId === subject().id); }
  function syncBank() { state.subjectId = subject().id; bank = library.questions.filter(q => q.subjectId === state.subjectId); lookup = new Map(bank.map(q => [q.id, q])); }
  syncBank();
  function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.classList.add('visible'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('visible'), 4500); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { if (!storageWarning) toast('Trình duyệt không lưu được tiến độ. Hãy giữ trang mở khi làm bài.'); storageWarning = true; } }
  async function saveLibrary(next) {
    L.validate(next);
    if (localMode) { const response = await fetch('/api/library', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ library: next, expectedRevision: localRevision }) }); if (!response.ok) { let message = 'Không lưu được dữ liệu. Máy chủ có thể đã dừng.'; try { message = (await response.json()).error || message; } catch {} throw new Error(message); } localRevision = (await response.json()).revision; }
    else { try { localStorage.setItem(LIBRARY_KEY, JSON.stringify(next)); } catch { throw new Error('Bộ nhớ trình duyệt đã đầy hoặc bị chặn. Hãy xuất bản sao lưu trước khi tiếp tục.'); } }
    library = L.clone(next); syncBank(); save();
  }
  function selectSubject(id) { if (!library.subjects.some(s => s.id === id)) return; state.subjectId = id; syncBank(); save(); }
  function confirm(title, copy, action, label) { document.getElementById('dialog-title').textContent = title; document.getElementById('dialog-copy').textContent = copy; dialog.querySelector('[value="submit"]').textContent = label; confirmAction = action; dialog.returnValue = ''; dialog.showModal(); }
  dialog.addEventListener('close', () => { const action = confirmAction; confirmAction = null; if (dialog.returnValue === 'submit' && action) action(); });
  function summary() {
    const grades = subjectHistory().map(a => E.grade(a, bank));
    return { count: grades.length, best: grades.length ? Math.max(...grades.map(g => g.score)).toFixed(1) : '—', average: grades.length ? (grades.reduce((s, g) => s + g.score, 0) / grades.length).toFixed(1) : '—' };
  }
  function chapterStats(id) { const rows = subjectHistory().flatMap(a => E.grade(a, bank).rows).filter(q => q.chapter === id); return { count: rows.length, percent: rows.length ? Math.round(rows.filter(q => q.correct).length / rows.length * 100) : 0 }; }
  function shell(content, selected = route) {
    const navs = [['home', 'grid', 'Góc học tập'], ['exams', 'file', 'Kho đề thi thử'], ['chapters', 'book', 'Luyện theo bài'], ['history', 'history', 'Lịch sử làm bài'], ['sources', 'leaf', 'Phạm vi ôn tập']];
    const management = [['manage-subjects','book','Môn học & chương'],['manage-questions','grid','Ngân hàng câu hỏi'],['manage-exams','file','Quản lý đề thi'],['manage-files','file','Tệp tài liệu'],['manage-data','history','Sao lưu & khôi phục']];
    const nav = items => items.map(([id,i,label]) => `<a href="#${id}" class="nav-item ${selected === id ? 'active' : ''}" ${selected === id ? 'aria-current="page"' : ''}>${icon(i)}<span>${label}</span>${id === 'exams' ? `<span class="nav-count">${subjectExams().length}</span>` : ''}</a>`).join('');
    app.innerHTML = `<aside class="sidebar"><a href="#home" class="brand"><span class="brand-mark">${icon('check')}</span><span>trạm ôn tập<span class="brand-sub">HỌC CHẮC, THI TỰ TIN.</span></span></a><div class="course-label">KHÔNG GIAN HỌC TẬP</div><nav aria-label="Điều hướng học tập">${nav(navs)}</nav><div class="course-label management-label">QUẢN LÝ CỦA BẠN</div><nav aria-label="Điều hướng quản lý">${nav(management)}</nav><div class="sidebar-bottom"><span class="status-dot"></span>${localMode ? 'Dữ liệu lưu trên máy chủ local' : 'Dữ liệu lưu trong trình duyệt'}</div></aside><div class="workspace"><header class="topbar"><label class="subject-picker">${icon('book')}<span class="sr-only">Môn học đang chọn</span><select id="subject-select" aria-label="Chọn môn học">${library.subjects.map(s => `<option value="${esc(s.id)}" ${s.id === subject().id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select></label><span class="language">${localMode ? 'LOCAL' : 'VI'} <span>${localMode ? 'Trên máy bạn' : 'Tiếng Việt'}</span></span></header><main id="main" tabindex="-1">${content}</main><footer><span>trạm ôn tập <span class="footer-dot">·</span> Một lần luyện, một bước chắc hơn.</span><span>${library.subjects.length} môn học · ${library.questions.length} câu hỏi</span></footer></div>`;
  }
  function heading(kicker, title, sub, aside = '') { return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1 tabindex="-1">${title}</h1><p class="page-sub">${sub}</p></div>${aside}</div>`; }
  function home() {
    const stats = summary(), course = subject(), config = subjectExams()[0], active = state.active?.status === 'active';
    const count = config ? config.chapterCounts.reduce((sum,c) => sum+c.count,0) : 0;
    const date = course.examDate ? new Date(course.examDate+'T12:00:00').toLocaleDateString('vi-VN') : null;
    shell(`${heading('KHÔNG GIAN HỌC TẬP CỦA BẠN', 'Học điều mới. Chắc từng bước.', 'Chọn môn, luyện đề và tự xây ngân hàng kiến thức của mình.', date ? `<div class="exam-date">${icon('clock')}<div><small>NGÀY KIỂM TRA</small><strong>${esc(date)}</strong></div></div>` : '')}
      <div class="home-grid"><section class="exam-feature"><div class="feature-content"><span class="pill light"><span class="status-dot"></span>${esc(course.name)}</span><h2>Một đề thử.<br>Thêm một lần tự tin.</h2><p>${config ? `Luyện ${count} câu từ ${config.chapterCounts.length} chương theo cấu trúc bạn chọn.` : 'Thêm câu hỏi và tạo đề đầu tiên cho môn học này.'}<br>Hiểu lời giải, rồi tiến thêm một bước.</p><div class="exam-facts"><div><strong>${count || '—'}</strong><span>câu / đề</span></div><div><strong>${config?.durationMinutes || '—'}</strong><span>phút</span></div><div><strong>${course.chapters.length}</strong><span>chương</span></div></div>${active ? btn('resume','Tiếp tục bài đang làm '+icon('arrow'),'cream') : config ? btn('random','Bắt đầu đề ngẫu nhiên '+icon('arrow'),'cream') : '<a href="#manage-exams" class="btn cream">Tạo đề đầu tiên '+icon('arrow')+'</a>'}<span class="feature-note">${active ? esc(state.active.subjectName || 'Kiểm thử phần mềm')+' · Tiến độ đã được lưu' : 'Có đáp án & giải thích sau khi nộp bài'}</span></div><div class="paper-art" aria-hidden="true"><div class="paper-back"></div><div class="paper-sheet"><div class="paper-top">TRẠM ÔN TẬP <span>✓</span></div><div class="paper-rule"></div><div class="paper-question">Sẵn sàng<br>thử sức?</div><div class="paper-option"><i></i><span></span></div><div class="paper-option checked"><i>✓</i><span></span></div><div class="paper-option"><i></i><span></span></div><div class="paper-option"><i></i><span></span></div><div class="paper-stamp">HỌC CHẮC<br><b>NHỚ LÂU</b></div></div><div class="spark s1">✳</div></div></section><aside class="study-note"><div class="note-pin"></div><span class="eyebrow">THƯ VIỆN CỦA BẠN</span><h2>Thêm môn mới.<br>Mở rộng kiến thức.</h2><p>Tạo môn học, chia chương, thêm câu hỏi và đặt cấu trúc đề theo cách bạn cần.</p><a href="#manage-subjects" class="note-bottom">Quản lý môn học <span>↗</span></a></aside></div>
      <section class="stats-row" aria-label="Tiến độ học tập"><div>${icon('file')}<span><strong>${stats.count}</strong><small>Bài đã hoàn thành</small></span></div><div>${icon('bolt')}<span><strong>${stats.best}<em> / 10</em></strong><small>Điểm cao nhất</small></span></div><div>${icon('check')}<span><strong>${subjectExams().length}</strong><small>Đề của môn đang chọn</small></span></div><div>${icon('book')}<span><strong>${bank.length}</strong><small>Câu hỏi trong môn</small></span></div></section>
      <section><div class="section-heading"><div><h2>Ôn chắc từng chương</h2><p>${course.chapters.length} chương · ${esc(course.name)}</p></div><a href="#chapters" class="text-link">Luyện theo chương ${icon('arrow')}</a></div>${chapterList()}</section>
      <section class="bottom-strip"><div class="strip-icon">${icon('file')}</div><div><h2>Thư viện học tập, do bạn xây dựng</h2><p>${localMode ? 'Tài liệu và ngân hàng câu hỏi được lưu trên máy chủ local của bạn.' : 'Quản lý môn, câu hỏi và đề thi. Xuất bản sao lưu để dùng trên máy khác.'}</p></div><a href="#manage-questions" class="btn secondary">Quản lý câu hỏi ${icon('arrow')}</a></section>`, 'home');
  }
  function chapterList() {
    if (!subject().chapters.length) return `<div class="empty-state compact"><h2>Môn học chưa có chương.</h2><p>Thêm chương để sắp xếp câu hỏi trước khi luyện tập.</p><a href="#manage-subjects" class="btn primary">Thêm chương</a></div>`;
    return `<div class="chapter-list">${subject().chapters.map(c => { const progress = chapterStats(c.id), count = bank.filter(q => q.chapter === c.id).length; return `<div class="chapter-row"><span class="chapter-number ${c.color || 'sage'}">${String(c.id).padStart(2,'0')}</span><div class="chapter-info"><h3>${esc(c.title)}</h3><p>${esc(c.detail || 'Luyện câu hỏi thuộc chương này')}</p></div><span class="question-count">${count} câu hỏi</span><div class="chapter-progress"><span>${progress.count ? progress.percent+'% trả lời đúng' : 'Chưa luyện tập'}</span><div class="track"><i style="width:${progress.percent}%"></i></div></div><button class="round-button" data-action="practice" data-chapter="${c.id}" aria-label="Luyện Bài ${c.id}: ${esc(c.title)}" ${count ? '' : 'disabled'}>${icon('arrow')}</button></div>`; }).join('')}</div>`;
  }
  function exams() {
    const configs = subjectExams();
    let coverage = 'Mỗi đề lấy câu hỏi theo số lượng từng chương bạn đã thiết lập.';
    if (configs.length >= 6 && configs.slice(0,6).every(e => e.presetNumber)) {
      const covered = new Set(configs.slice(0,6).flatMap(config => E.makeAttempt(bank, { seed: config.seed, presetNumber: config.presetNumber, chapters: subject().chapters, chapterCounts: config.chapterCounts, durationMinutes: config.durationMinutes, subjectId: subject().id, subjectName: subject().name }).questions.map(q => q.id)));
      coverage = `6 đề đầu dùng ${covered.size}/${bank.length} câu trong ngân hàng hiện tại.`;
    }
    shell(`${heading('THI THỬ THEO CÁCH CỦA BẠN','Kho đề thi thử',esc(subject().name)+' · '+coverage,'<a href="#manage-exams" class="btn secondary">'+icon('file')+' Quản lý đề thi</a>')}${configs.length ? `<div class="random-strip"><span class="strip-icon">${icon('bolt')}</span><div><h2>Đổi câu hỏi, giữ đúng cấu trúc.</h2><p>Đề ngẫu nhiên dùng cấu trúc của ${esc(configs[0].name)}, ưu tiên câu khác lần trước.</p></div>${btn('random','Tạo đề ngẫu nhiên '+icon('arrow'))}</div><div class="section-heading"><h2>${configs.length} đề trong môn học</h2><span class="muted">Cấu trúc và thời gian có thể chỉnh trong Quản lý đề thi</span></div><div class="exam-grid">${configs.map((config,i) => { const count = config.chapterCounts.reduce((sum,c) => sum+c.count,0), done = subjectHistory().filter(a => a.examId === config.id || !a.examId && a.seed === config.seed), best = done.length ? Math.max(...done.map(a => E.grade(a,bank).score)).toFixed(1) : null; return `<article class="exam-card"><div class="card-top"><span class="exam-symbol">${icon('file')}</span><span class="pill">${best === null ? 'Chưa làm' : 'Cao nhất '+best+'/10'}</span></div><span class="eyebrow">${config.chapterCounts.length} CHƯƠNG</span><h2>${esc(config.name)}</h2><p>${esc(config.description || 'Luyện theo cấu trúc đã thiết lập cho môn học.')}</p><div class="card-facts"><span>${icon('book')}${count} câu</span><span>${icon('clock')}${config.durationMinutes} phút</span></div>${btn('preset','Làm đề này '+icon('arrow'),'secondary',`data-id="${esc(config.id)}" data-number="${i+1}"`)}</article>`; }).join('')}</div>` : '<div class="empty-state"><div class="empty-icon">'+icon('file')+'</div><h2>Đề đầu tiên bắt đầu từ câu hỏi đầu tiên.</h2><p>Thêm câu hỏi, rồi chọn thời gian và số câu cho từng chương.</p><a href="#manage-exams" class="btn primary">Tạo đề thi</a></div>'}`, 'exams');
  }
  function chapters() { shell(`${heading('LẤP ĐẦY TỪNG KHOẢNG TRỐNG','Luyện theo chương',esc(subject().name)+' · Mỗi lượt tối đa 12 câu, không giới hạn thời gian.')}<div class="info-banner">${icon('book')}<span>Chọn chương để luyện tập. Giải thích xuất hiện sau lần trả lời đầu tiên; chương ít câu sẽ lấy toàn bộ câu đang có.</span></div>${chapterList()}`, 'chapters'); }
  function history() {
    const attempts = historyAll ? state.history : subjectHistory();
    shell(`${heading('NHÌN LẠI ĐỂ TIẾN BỘ','Lịch sử làm bài',esc(historyAll ? 'Tất cả các môn' : subject().name)+' · Giữ 50 lượt gần nhất trên trình duyệt này.',btn('history-all',historyAll ? 'Chỉ môn đang chọn' : 'Xem tất cả các môn','secondary'))} ${attempts.length ? `<div class="history-table"><div class="history-head"><span>BÀI LÀM</span><span>THỜI ĐIỂM</span><span>KẾT QUẢ</span><span></span></div>${attempts.map(a => { const g = E.grade(a,bank); return `<div class="history-row"><div class="history-name">${icon(a.mode === 'exam' ? 'file' : 'book')}<div><strong>${esc(a.label)}</strong><small>${a.mode === 'exam' ? 'Thi thử' : 'Luyện tập'} · ${a.questions.length} câu</small></div></div><span class="history-date">${new Date(a.finishedAt || a.startedAt).toLocaleString('vi-VN')}</span><div><strong class="history-score">${g.score.toFixed(1)}<small>/10</small></strong><span class="history-correct">${g.correct}/${g.rows.length} câu đúng</span></div>${btn('review','Xem lại '+icon('arrow'),'text',`data-id="${esc(a.id)}"`)}</div>`; }).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">${icon('history')}</div><h2>Hành trình bắt đầu từ đề đầu tiên.</h2><p>Kết quả và các câu cần ôn lại của môn học sẽ xuất hiện ở đây.</p><a href="#exams" class="btn primary">Chọn một đề thi ${icon('arrow')}</a></div>`}`, 'history');
  }
  function sources() {
    const chapters = subject().chapters;
    shell(`${heading('BIẾT MÌNH ĐANG ÔN GÌ','Phạm vi ôn tập',esc(subject().name)+' · Chủ đề và tài liệu tham chiếu của ngân hàng hiện tại.')}<div class="source-intro"><h2>${bank.length} câu hỏi · ${chapters.length} chương · ${subjectExams().length} đề thi</h2><p>${esc(subject().description || 'Bạn có thể bổ sung nội dung cho môn học trong phần quản lý.')}</p><p>Câu hỏi phục vụ ôn tập. Đọc lời giải và đối chiếu nguồn; bộ câu hỏi không bảo đảm mọi chi tiết có thể xuất hiện trong đề thi chính thức.</p></div><div class="sources-list">${chapters.map(c => { const questions = bank.filter(q => q.chapter === c.id); const topics = [...new Set(questions.map(q => q.topic).filter(Boolean))]; return `<article><span class="chapter-number ${c.color || 'sage'}">${String(c.id).padStart(2,'0')}</span><div><h2>${esc(c.title)}</h2><p>${questions.length} câu hỏi · ${esc(c.detail || '')}</p><details class="scope-details"><summary>Xem chủ đề & nguồn tham chiếu</summary><p>${esc(topics.join(' · ') || 'Chưa có chủ đề.')}</p>${[...new Set(questions.map(q => q.source).filter(Boolean))].map(source => `<p class="filename">${esc(source)}</p>`).join('')}</details></div></article>`; }).join('')}</div><div class="source-intro"><h2>Dữ liệu và tệp tài liệu</h2><p>${localMode ? 'Môn, chương, câu hỏi và đề được lưu trên máy chủ local; tệp tải lên nằm trong thư mục data/uploads. Bài đang làm và lịch sử vẫn lưu tại trình duyệt này.' : 'Môn, câu hỏi và đề đang được lưu trong trình duyệt này. Để tải tệp lên ổ đĩa và dùng máy chủ local, chạy start-local.cmd trong bản mã nguồn.'}</p><p>Xuất dữ liệu trong Sao lưu & khôi phục để chuyển ngân hàng học tập sang máy khác. Tệp tài liệu không nằm trong bản sao lưu JSON; sao lưu cả thư mục data nếu dùng bản local.</p><a href="#manage-files" class="btn secondary">${icon('file')} Quản lý tệp tài liệu</a></div>`, 'sources');
  }
  function start(options) {
    const go = () => {
      try {
        const course = library.subjects.find(s => s.id === (options.subjectId || subject().id));
        if (!course) throw new Error('Môn học này đã được xóa. Hãy chọn môn đang có để luyện tiếp.');
        const config = options.config || library.exams.find(e => e.id === options.examId) || library.exams.find(e => e.subjectId === course.id);
        if (options.mode !== 'practice' && !config) throw new Error('Môn học chưa có đề thi. Hãy tạo đề trong Quản lý đề thi.');
        const attempt = E.makeAttempt(library.questions.filter(q => q.subjectId === course.id), { ...options, subjectId: course.id, subjectName: course.name, chapters: course.chapters, chapterCounts: config?.chapterCounts, durationMinutes: config?.durationMinutes, examId: options.mode === 'practice' ? null : config.id, previousIds: options.previousIds || [] });
        state.subjectId = course.id; syncBank(); state.active = attempt; save(); route = 'exam'; if (location.hash !== '#exam') location.hash = 'exam'; else render();
      } catch (error) { toast(error.message); }
    };
    if (state.active?.status === 'active') confirm('Bắt đầu bài mới?', 'Bài đang làm chưa được nộp. Bắt đầu bài mới sẽ thay thế phần làm dở hiện tại.', go, 'Bắt đầu bài mới'); else go();
  }
  function finish(reason = 'manual') {
    const a = state.active; if (!a || a.status !== 'active') return;
    if (dialog.open) { confirmAction = null; dialog.close('cancel'); }
    a.status = 'done'; a.finishedAt = reason === 'timeout' ? a.deadline : Date.now(); a.reason = reason;
    state.history = [a, ...state.history.filter(x => x.id !== a.id)].slice(0,50); state.reviewId = a.id; review = a; reviewFilter = 'all'; save(); route = 'result';
    if (location.hash !== '#result') location.hash = 'result'; else render();
  }
  function timeText(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`; }
  function tick() {
    const a = state.active; if (!a || a.status !== 'active' || a.mode !== 'exam') return;
    const left = E.remaining(a); const el = document.getElementById('timer');
    if (el) { el.textContent = timeText(left); el.parentElement.classList.toggle('urgent', left <= 300); }
    if (left === 300 && !a.warned) { a.warned = true; save(); toast('Còn 5 phút. Bạn hãy kiểm tra các câu chưa trả lời.'); }
    if (left === 0) { finish('timeout'); toast('Đã hết thời gian. Bài làm đã được tự động nộp.'); }
  }
  function exam() {
    const a = state.active; if (!a || a.status !== 'active') { route = 'exams'; exams(); return; }
    if (a.mode === 'exam' && E.remaining(a) === 0) { finish('timeout'); return; }
    const item = a.questions[a.current], q = (a.questionSnapshots || seedBank).find(q => q.id === item.id), answered = Object.keys(a.answers).length;
    const selected = a.answers[q.id], revealed = a.mode === 'practice' && selected !== undefined;
    shell(`<div class="exam-heading"><div><a href="#home" class="back-link">← Góc học tập</a><h1 tabindex="-1">${esc(a.label)}</h1><p>${a.mode === 'exam' ? a.questions.length+' câu · '+(esc(a.subjectName || 'Kiểm thử phần mềm'))+' · Mỗi câu một đáp án đúng' : 'Luyện '+a.questions.length+' câu · Không giới hạn thời gian · Giải thích ngay'}</p></div><div class="timer-box ${a.mode === 'practice' ? 'practice-timer' : ''}">${icon(a.mode === 'exam' ? 'clock' : 'book')}<div><small>${a.mode === 'exam' ? 'THỜI GIAN CÒN LẠI' : 'CHẾ ĐỘ LUYỆN TẬP'}</small><strong id="timer" ${a.mode === 'exam' ? 'role="timer" aria-label="Thời gian còn lại"' : ''}>${a.mode === 'exam' ? timeText(E.remaining(a)) : 'Cứ bình tĩnh'}</strong></div></div></div><div class="exam-layout"><section class="question-card"><div class="question-top"><span class="pill">Bài ${q.chapter} · ${esc((a.chapterSnapshots || E.CHAPTERS).find(c => c.id === q.chapter)?.short || (a.chapterSnapshots || E.CHAPTERS).find(c => c.id === q.chapter)?.title || 'Chương '+q.chapter)}</span><button class="flag-button ${a.flags.includes(q.id) ? 'flagged' : ''}" data-action="flag" aria-pressed="${a.flags.includes(q.id)}">${icon('flag')} ${a.flags.includes(q.id) ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</button></div><p class="question-counter">CÂU ${String(a.current+1).padStart(2,'0')} <span>/ ${a.questions.length}</span></p><fieldset class="answers" ${revealed ? 'disabled' : ''}><legend><h2 id="question-title" tabindex="-1">${esc(q.question)}</h2></legend>${item.order.map((original,i) => `<label class="answer ${selected === original ? 'selected' : ''} ${revealed && original === q.answer ? 'correct' : ''} ${revealed && selected === original && original !== q.answer ? 'incorrect' : ''}"><input type="radio" name="answer" value="${original}" ${selected === original ? 'checked' : ''}><span class="answer-letter">${'ABCD'[i]}</span><span class="answer-text">${esc(q.options[original])}</span>${revealed && original === q.answer ? '<span class="answer-status">✓ Đúng</span>' : revealed && original === selected ? '<span class="answer-status">✕ Sai</span>' : '<span class="radio-mark"></span>'}</label>`).join('')}</fieldset>${revealed ? `<div class="explanation"><strong>${selected === q.answer ? '✓ Chính xác!' : 'Cùng xem lại nhé.'}</strong><p>${esc(q.explanation)}</p><small>${esc(q.source)}</small></div>` : ''}<div class="question-controls">${btn('prev', '← Câu trước', 'secondary', a.current === 0 ? 'disabled' : '')}<span>${a.current+1} / ${a.questions.length}</span>${a.current === a.questions.length-1 ? btn('submit', 'Nộp bài '+icon('check')) : btn('next', 'Câu tiếp '+icon('arrow'))}</div></section><aside class="question-sidebar"><div class="navigator"><h2>Phiếu trả lời</h2><div class="answer-progress"><strong>${answered}<span>/${a.questions.length} câu đã làm</span></strong><span>${Math.round(answered/a.questions.length*100)}%</span></div><div class="track"><i style="width:${answered/a.questions.length*100}%"></i></div><div class="question-grid">${a.questions.map((item,i) => `<button class="q-dot ${a.answers[item.id] !== undefined ? 'answered' : ''} ${i === a.current ? 'current' : ''} ${a.flags.includes(item.id) ? 'has-flag' : ''}" data-action="jump" data-index="${i}" aria-label="Câu ${i+1}${a.answers[item.id] !== undefined ? ', đã trả lời' : ', chưa trả lời'}${a.flags.includes(item.id) ? ', đã đánh dấu' : ''}" ${i === a.current ? 'aria-current="step"' : ''}>${i+1}</button>`).join('')}</div><div class="nav-legend"><span><i class="legend-dot done"></i>Đã trả lời</span><span><i class="legend-dot"></i>Chưa trả lời</span><span><i class="legend-dot marked"></i>Đánh dấu</span></div>${btn('submit', 'Nộp bài & xem kết quả', 'primary wide')}</div><p class="save-hint">${icon('check')} ${storageWarning ? 'Chưa lưu được tiến độ. Hãy giữ trang mở.' : 'Tự động lưu sau mỗi câu trả lời.'}${a.mode === 'exam' ? '<br>Đồng hồ vẫn chạy khi bạn rời trang.' : ''}</p></aside></div>`, a.mode === 'exam' ? 'exams' : 'chapters');
  }
  function results() {
    const a = review || state.history.find(x => x.id === state.reviewId) || (state.active?.status === 'done' ? state.active : state.history[0]); if (!a) { history(); return; } review = a;
    const g = E.grade(a, bank); const filtered = g.rows.filter(q => reviewFilter === 'all' || reviewFilter === 'wrong' && !q.correct || reviewFilter === 'flags' && a.flags.includes(q.id));
    const elapsed = Math.max(0, Math.floor(((a.finishedAt || Date.now())-a.startedAt)/1000));
    shell(`${heading('MỖI LẦN LÀM LÀ MỘT LẦN HỌC', 'Bạn đã hoàn thành bài làm.', esc(a.label)+(a.reason === 'timeout' ? ' · Tự động nộp khi hết giờ' : ' · Cảm ơn bạn đã dành thời gian luyện tập.'))}<section class="result-overview"><div class="score-circle"><strong>${g.score.toFixed(1)}</strong><span>ĐIỂM / 10</span></div><div class="result-message"><span class="eyebrow">${g.score >= 8 ? 'GIỮ VỮNG PHONG ĐỘ' : g.score >= 5 ? 'BẠN ĐANG TIẾN BỘ' : 'CỨ TỪNG BƯỚC MỘT'}</span><h2>${g.score >= 8 ? 'Một lượt luyện rất chắc tay.' : g.score >= 5 ? 'Thêm một chút ôn, thêm nhiều tự tin.' : 'Đã biết chỗ cần ôn. Mình tiếp tục nhé.'}</h2><p><b>${g.correct}</b> câu đúng <span>·</span> <b>${g.rows.length-g.correct-g.unanswered}</b> câu sai <span>·</span> <b>${g.unanswered}</b> chưa trả lời <span>·</span> ${Math.floor(elapsed/60)} phút ${elapsed%60} giây</p><div class="result-actions">${btn('retry', 'Luyện một lượt khác '+icon('arrow'))}<a href="#history" class="btn secondary">Xem lịch sử</a></div></div></section><section class="chapter-results">${g.chapters.map(c => `<div><span>Bài ${c.id} · ${esc(c.short || c.title)}</span><strong>${c.correct}<small>/${c.total} đúng</small></strong><div class="track"><i style="width:${c.correct/c.total*100}%"></i></div></div>`).join('')}</section><div class="section-heading review-heading"><div><h2>Xem lại để nhớ lâu hơn</h2><p>Mỗi câu đúng tính 10/${g.rows.length} điểm; câu sai hoặc bỏ trống không có điểm.</p></div><div class="filter-group" aria-label="Lọc câu xem lại">${[['all','Tất cả ('+g.rows.length+')'],['wrong','Sai & bỏ trống ('+(g.rows.length-g.correct)+')'],['flags','Đánh dấu ('+a.flags.length+')']].map(([value,label]) => `<button data-action="filter" data-filter="${value}" class="${reviewFilter===value ? 'active' : ''}" aria-pressed="${reviewFilter===value}">${label}</button>`).join('')}</div></div><div class="review-list">${filtered.length ? filtered.map(q => `<article class="review-card"><div class="review-meta"><span>BÀI ${q.chapter} <span>·</span> CÂU ${g.rows.findIndex(x => x.id === q.id)+1}</span><span class="result-badge ${q.correct ? 'right' : 'wrong'}">${q.correct ? '✓ Đúng' : q.selected === undefined ? '— Chưa trả lời' : '✕ Sai'}</span></div><h3>${esc(q.question)}</h3><div class="review-options">${q.order.map((original,i) => `<div class="review-option ${original === q.answer ? 'right' : q.selected === original ? 'wrong' : ''}"><b>${'ABCD'[i]}.</b><span>${esc(q.options[original])}</span><small>${original === q.answer ? '✓ Đáp án đúng' : original === q.selected ? '✕ Bạn đã chọn' : ''}</small></div>`).join('')}</div><div class="review-explanation"><strong>Vì sao?</strong><p>${esc(q.explanation)}</p><small>${esc(q.source)}</small></div></article>`).join('') : '<div class="empty-state compact"><h3>Không có câu nào trong nhóm này.</h3><p>Bạn có thể chuyển sang Tất cả để xem lại bài làm.</p></div>'}</div>`, 'history');
  }
  function render() {
    if (route.startsWith('manage-')) shell(globalThis.StudyManagement.render(route, managementContext), route); else if (route === 'exam') exam(); else if (route === 'exams') exams(); else if (route === 'chapters') chapters(); else if (route === 'history') history(); else if (route === 'sources') sources(); else if (route === 'result') results(); else home();
    tick();
  }
  function goQuestion(index) { const a = state.active; a.current = Math.max(0, Math.min(a.questions.length-1,index)); save(); exam(); document.getElementById('question-title')?.focus({ preventScroll: true }); if (innerWidth < 850) window.scrollTo({ top: 0, behavior: 'smooth' }); }
  const managementContext = { getLibrary: () => library, getSubjectId: () => subject().id, isLocalServer: () => localMode, onSave: saveLibrary, onSelectSubject: selectSubject, navigate: next => { location.hash = next; }, refresh: render, toast, confirm, esc, icon, heading };
  globalThis.StudyManagement.mount(managementContext);
  app.addEventListener('click', event => {
    const target = event.target.closest('[data-action]'); if (!target) return;
    const action = target.dataset.action, a = state.active;
    if (action === 'random') start({ seed: crypto.getRandomValues(new Uint32Array(1))[0], label: 'Đề ngẫu nhiên', previousIds: subjectHistory().find(x => x.mode === 'exam')?.questions.map(q => q.id) || [] });
    else if (action === 'preset') { const config = library.exams.find(e => e.id === target.dataset.id); if (config) start({ config, examId: config.id, seed: config.presetNumber ? config.seed : crypto.getRandomValues(new Uint32Array(1))[0], presetNumber: config.presetNumber, label: config.name }); }
    else if (action === 'practice') start({ seed: crypto.getRandomValues(new Uint32Array(1))[0], mode: 'practice', chapter: Number(target.dataset.chapter), label: 'Luyện Bài '+target.dataset.chapter+' · '+(subject().chapters.find(c => c.id === Number(target.dataset.chapter))?.short || 'Luyện tập') });
    else if (action === 'resume') { if (a?.subjectId) selectSubject(a.subjectId); location.hash = 'exam'; }
    else if (action === 'review') { review = state.history.find(x => x.id === target.dataset.id); state.reviewId = review?.id || null; save(); reviewFilter = 'all'; location.hash = 'result'; if (route === 'result') results(); }
    else if (action === 'history-all') { historyAll = !historyAll; history(); }
    else if (action === 'filter') { reviewFilter = target.dataset.filter; results(); }
    else if (action === 'retry' && review) { start({ seed: crypto.getRandomValues(new Uint32Array(1))[0], mode: review.mode, chapter: review.chapter, subjectId: review.subjectId, examId: review.examId, label: review.mode === 'exam' ? 'Đề ngẫu nhiên' : review.label, previousIds: review.questions.map(q => q.id) }); }
    else if (a?.status === 'active') {
      if (a.mode === 'exam' && E.remaining(a) === 0) { tick(); return; }
      if (action === 'next') goQuestion(a.current+1);
      if (action === 'prev') goQuestion(a.current-1);
      if (action === 'jump') goQuestion(Number(target.dataset.index));
      if (action === 'flag') { const id = a.questions[a.current].id; a.flags = a.flags.includes(id) ? a.flags.filter(x => x !== id) : [...a.flags,id]; save(); exam(); app.querySelector('[data-action="flag"]')?.focus(); }
      if (action === 'submit') { const left = a.questions.length-Object.keys(a.answers).length; confirm('Nộp bài làm?', left ? `Bạn còn ${left} câu chưa trả lời. Câu bỏ trống không được tính điểm. Bạn vẫn có thể quay lại làm tiếp.` : 'Bạn đã trả lời tất cả câu hỏi. Nộp bài để xem điểm, đáp án và giải thích.', () => finish(), 'Nộp bài & xem kết quả'); }
    }
  });
  app.addEventListener('change', event => {
    if (event.target.id === 'subject-select') { selectSubject(event.target.value); review = null; if (route === 'exam' || route === 'result') { location.hash = 'home'; } else render(); return; }
    if (!event.target.matches('input[name="answer"]')) return;
    const a = state.active; if (!a || a.status !== 'active') return;
    if (a.mode === 'exam' && E.remaining(a) === 0) { tick(); return; }
    const id = a.questions[a.current].id;
    if (a.mode === 'practice' && a.answers[id] !== undefined) return;
    const value = Number(event.target.value); if (!Number.isInteger(value) || value < 0 || value > 3) return;
    a.answers[id] = value; save(); exam();
    if (a.mode === 'exam') app.querySelector(`input[value="${value}"]`)?.focus(); else app.querySelector('[data-action="next"], [data-action="submit"]')?.focus({ preventScroll: true });
  });
  window.addEventListener('hashchange', () => { route = location.hash.slice(1) || 'home'; render(); document.querySelector('h1')?.focus({ preventScroll: true }); window.scrollTo(0,0); });
  document.querySelector('.skip').addEventListener('click', event => { event.preventDefault(); document.getElementById('main')?.focus(); document.getElementById('main')?.scrollIntoView(); });
  document.addEventListener('visibilitychange', tick);
  window.addEventListener('pageshow', tick);
  route = location.hash.slice(1) || 'home'; render(); setInterval(tick, 1000);
  if (storageWarning) toast('Một phần dữ liệu trình duyệt không đọc được. Hãy giữ bản sao lưu; các dữ liệu đã lưu chưa bị thay thế.');
})();
