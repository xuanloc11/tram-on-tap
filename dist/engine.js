(function (root) {
  'use strict';
  const DURATION = 45 * 60 * 1000;
  const CHAPTERS = [
    { id: 1, title: 'Tổng quan kiểm thử', detail: 'Khái niệm, nguyên lý & mục tiêu', short: 'Tổng quan', color: 'sage' },
    { id: 2, title: 'Kiểm thử trong vòng đời', detail: 'Quy trình, mức & loại kiểm thử', short: 'Vòng đời', color: 'sand' },
    { id: 3, title: 'Yêu cầu & kiểm thử tĩnh', detail: 'Chất lượng yêu cầu, review & phân tích', short: 'Kiểm thử tĩnh', color: 'blue' },
    { id: 4, title: 'Test case & test plan', detail: 'Thiết kế ca kiểm thử & lập kế hoạch', short: 'Case & plan', color: 'rose' },
    { id: 5, title: 'Kỹ thuật hộp đen', detail: 'Phân vùng tương đương, biên & bảng quyết định', short: 'Hộp đen', color: 'lilac' }
  ];
  function rng(seed) {
    let n = seed >>> 0;
    return () => { n += 0x6D2B79F5; let t = n; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function shuffle(items, random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
    return result;
  }
  function validQuestion(q) {
    return q && typeof q.id === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(q.id) && !['__proto__', 'constructor', 'prototype'].includes(q.id) && Number.isInteger(q.chapter) && q.chapter > 0 && typeof q.question === 'string' && q.question.trim() && Array.isArray(q.options) && q.options.length === 4 && q.options.every(x => typeof x === 'string' && x.trim()) && new Set(q.options.map(x => x.trim())).size === 4 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3 && (q.explanation === undefined || typeof q.explanation === 'string') && (q.source === undefined || typeof q.source === 'string');
  }
  function validChapters(chapters) {
    return Array.isArray(chapters) && chapters.length > 0 && new Set(chapters.map(c => c?.id)).size === chapters.length && chapters.every(c => c && Number.isInteger(c.id) && c.id > 0 && typeof c.title === 'string' && c.title.trim());
  }
  function validateBank(bank, chapters = CHAPTERS, minimum = 12) {
    if (!Array.isArray(bank) || !validChapters(chapters)) throw new Error('Ngân hàng câu hỏi hoặc chương không hợp lệ.');
    const ids = new Set();
    for (const q of bank) {
      if (!validQuestion(q) || ids.has(q.id) || !chapters.some(c => c.id === q.chapter)) throw new Error('Ngân hàng câu hỏi có dữ liệu không hợp lệ.');
      ids.add(q.id);
    }
    for (const c of chapters) if (bank.filter(q => q.chapter === c.id).length < minimum) throw new Error('Chương ' + c.id + ' chưa đủ ' + minimum + ' câu hỏi.');
    return true;
  }
  function makeAttempt(bank, { seed, mode = 'exam', chapter = null, setNumber = null, presetNumber = null, previousIds = [], label = 'Đề ngẫu nhiên', now = Date.now(), subjectId = 'software-testing', subjectName = 'Kiểm thử phần mềm', chapters = CHAPTERS, chapterCounts = null, durationMinutes = 45, examId = null }) {
    if (!Array.isArray(bank) || !['exam', 'practice'].includes(mode) || !Number.isInteger(seed) || seed < 0 || seed > 4294967295 || !Number.isFinite(now) || !validChapters(chapters)) throw new Error('Thông tin bài làm hoặc chương không hợp lệ.');
    const subjectBank = bank.filter(q => !q.subjectId || q.subjectId === subjectId);
    validateBank(subjectBank, chapters, 0);
    const random = rng(seed);
    const allocations = mode === 'practice' ? [{ chapterId: chapter, count: Math.min(12, subjectBank.filter(q => q.chapter === chapter).length) }] : chapterCounts || chapters.map(c => ({ chapterId: c.id, count: 6 }));
    if (!Array.isArray(allocations) || !allocations.length || new Set(allocations.map(a => a?.chapterId)).size !== allocations.length || !allocations.every(a => a && chapters.some(c => c.id === a.chapterId) && Number.isInteger(a.count) && a.count > 0) || allocations.reduce((total, a) => total + a.count, 0) > 200) throw new Error('Cấu trúc đề hoặc chương chưa có câu hỏi phù hợp.');
    if (mode === 'exam' && (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 180)) throw new Error('Thời gian làm bài phải từ 1 đến 180 phút.');
    const snapshots = [];
    const number = presetNumber ?? setNumber;
    const questions = allocations.flatMap(({ chapterId, count }) => {
      const available = subjectBank.filter(q => q.chapter === chapterId);
      if (available.length < count) throw new Error('Chương ' + chapterId + ' cần ' + count + ' câu nhưng chỉ có ' + available.length + ' câu hỏi.');
      let pool = shuffle(available, random);
      if (mode === 'exam' && Number.isInteger(number) && number >= 1 && number <= 12) {
        const deck = shuffle(available, rng(20261100 + chapterId));
        pool = Array.from({ length: count }, (_, i) => deck[((number - 1) * count + i) % deck.length]);
      }
      // shortcut: ưu tiên câu khác lần làm gần nhất; mở rộng thành lịch ôn khi cần lặp lại ngắt quãng.
      if (previousIds.length) pool = [...pool.filter(q => !previousIds.includes(q.id)), ...pool.filter(q => previousIds.includes(q.id))];
      return pool.slice(0, count).map(q => { snapshots.push(JSON.parse(JSON.stringify({ ...q, subjectId }))); return { id: q.id, order: shuffle([0, 1, 2, 3], random) }; });
    });
    return { id: now + '-' + seed, seed, mode, chapter, label, subjectId, subjectName, examId, durationMinutes: mode === 'exam' ? durationMinutes : null, chapterCounts: JSON.parse(JSON.stringify(allocations)), questionSnapshots: snapshots, chapterSnapshots: JSON.parse(JSON.stringify(chapters.filter(c => allocations.some(a => a.chapterId === c.id)))), questions, answers: {}, flags: [], current: 0, startedAt: now, deadline: mode === 'exam' ? now + durationMinutes * 60000 : null, status: 'active' };
  }
  function isValidAttempt(a, bank) {
    if (!a || !['exam', 'practice'].includes(a.mode) || !['active', 'done'].includes(a.status) || typeof a.id !== 'string' || typeof a.label !== 'string' || !Number.isFinite(a.startedAt) || !Array.isArray(a.questions) || a.questions.length < 1 || a.questions.length > 200 || !Number.isInteger(a.current) || a.current < 0 || a.current >= a.questions.length || !a.answers || typeof a.answers !== 'object' || Array.isArray(a.answers) || !Array.isArray(a.flags)) return false;
    const snapshots = Object.prototype.hasOwnProperty.call(a, 'questionSnapshots');
    if (snapshots && (!Array.isArray(a.questionSnapshots) || a.questionSnapshots.length !== a.questions.length || !a.questionSnapshots.every(validQuestion) || !validChapters(a.chapterSnapshots) || typeof a.subjectId !== 'string' || typeof a.subjectName !== 'string' || !Array.isArray(a.chapterCounts))) return false;
    if (!snapshots && a.questions.length !== (a.mode === 'exam' ? 30 : 12)) return false;
    const source = snapshots ? a.questionSnapshots : bank;
    if (!Array.isArray(source)) return false;
    const lookup = new Map(source.map(q => [q.id, q]));
    if (!a.questions.every(q => q && typeof q === 'object' && typeof q.id === 'string')) return false;
    const ids = a.questions.map(q => q.id);
    if (snapshots && lookup.size !== ids.length) return false;
    if (new Set(ids).size !== ids.length || !a.questions.every(q => lookup.has(q.id) && Array.isArray(q.order) && q.order.every(Number.isInteger) && [...q.order].sort().join() === '0,1,2,3')) return false;
    if (!Object.entries(a.answers).every(([id, v]) => ids.includes(id) && Number.isInteger(v) && v >= 0 && v <= 3) || !a.flags.every(id => ids.includes(id))) return false;
    const chapters = snapshots ? a.chapterSnapshots : CHAPTERS;
    if (!a.questions.every(q => chapters.some(c => c.id === lookup.get(q.id).chapter))) return false;
    if (snapshots) {
      if (new Set(a.chapterCounts.map(c => c?.chapterId)).size !== a.chapterCounts.length || !a.chapterCounts.every(c => c && chapters.some(ch => ch.id === c.chapterId) && Number.isInteger(c.count) && c.count > 0 && a.questions.filter(q => lookup.get(q.id).chapter === c.chapterId).length === c.count) || a.chapterCounts.reduce((sum, c) => sum + c.count, 0) !== a.questions.length) return false;
      if (!a.questionSnapshots.every(q => q.subjectId === a.subjectId)) return false;
    }
    const duration = snapshots ? a.durationMinutes * 60000 : DURATION;
    if (a.mode === 'exam' && (!Number.isFinite(a.deadline) || a.deadline !== a.startedAt + duration || (snapshots ? !Number.isInteger(a.durationMinutes) || a.durationMinutes < 1 || a.durationMinutes > 180 : !CHAPTERS.every(c => a.questions.filter(q => lookup.get(q.id).chapter === c.id).length === 6)))) return false;
    if (a.mode === 'practice' && (a.deadline !== null || a.questions.length > 12 || !chapters.some(c => c.id === a.chapter) || !a.questions.every(q => lookup.get(q.id).chapter === a.chapter))) return false;
    return true;
  }
  function grade(a, bank) {
    const lookup = new Map((a.questionSnapshots || bank).map(q => [q.id, q]));
    const rows = a.questions.map(item => { const q = lookup.get(item.id); const selected = a.answers[q.id]; return { ...q, order: item.order, selected, correct: selected === q.answer }; });
    const correct = rows.filter(q => q.correct).length;
    return { rows, correct, unanswered: rows.filter(q => q.selected === undefined).length, score: correct / rows.length * 10, chapters: (a.chapterSnapshots || CHAPTERS).filter(c => rows.some(q => q.chapter === c.id)).map(c => ({ ...c, total: rows.filter(q => q.chapter === c.id).length, correct: rows.filter(q => q.chapter === c.id && q.correct).length })) };
  }
  function upgradeAttempt(a, legacyBank) {
    if (!isValidAttempt(a, legacyBank)) return null;
    const result = JSON.parse(JSON.stringify(a));
    if (result.questionSnapshots) return result;
    const lookup = new Map(legacyBank.map(q => [q.id, q]));
    result.subjectId = 'software-testing'; result.subjectName = 'Kiểm thử phần mềm';
    result.durationMinutes = result.mode === 'exam' ? 45 : null;
    result.questionSnapshots = result.questions.map(q => JSON.parse(JSON.stringify({ ...lookup.get(q.id), subjectId: result.subjectId })));
    result.chapterSnapshots = JSON.parse(JSON.stringify(CHAPTERS.filter(c => result.questionSnapshots.some(q => q.chapter === c.id))));
    result.chapterCounts = result.chapterSnapshots.map(c => ({ chapterId: c.id, count: result.questionSnapshots.filter(q => q.chapter === c.id).length }));
    return isValidAttempt(result, legacyBank) ? result : null;
  }
  function remaining(a, now = Date.now()) { return a.deadline === null ? null : Math.max(0, Math.ceil((a.deadline - now) / 1000)); }
  const api = { CHAPTERS, DURATION, rng, shuffle, validateBank, makeAttempt, isValidAttempt, grade, upgradeAttempt, remaining };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.QuizEngine = api;
})(globalThis);
