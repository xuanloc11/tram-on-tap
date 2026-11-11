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
  function validateBank(bank) {
    const ids = new Set();
    for (const q of bank) {
      if (!q || ids.has(q.id) || !CHAPTERS.some(c => c.id === q.chapter) || !q.question || !q.explanation || !q.source || !Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4 || !q.options.every(x => typeof x === 'string' && x.trim()) || !Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) throw new Error('Ngân hàng câu hỏi có dữ liệu không hợp lệ.');
      ids.add(q.id);
    }
    for (const c of CHAPTERS) if (bank.filter(q => q.chapter === c.id).length < 12) throw new Error('Bài ' + c.id + ' chưa đủ câu hỏi.');
    return true;
  }
  function makeAttempt(bank, { seed, mode = 'exam', chapter = null, setNumber = null, previousIds = [], label = 'Đề ngẫu nhiên', now = Date.now() }) {
    const random = rng(seed);
    const chapters = mode === 'practice' ? CHAPTERS.filter(c => c.id === chapter) : CHAPTERS;
    if (!chapters.length) throw new Error('Bài học không hợp lệ.');
    const questions = chapters.flatMap(c => {
      let pool = shuffle(bank.filter(q => q.chapter === c.id), random);
      if (mode === 'exam' && Number.isInteger(setNumber) && setNumber >= 1 && setNumber <= 12) {
        const deck = shuffle(bank.filter(q => q.chapter === c.id), rng(20261100 + c.id));
        pool = Array.from({ length: 6 }, (_, i) => deck[((setNumber - 1) * 6 + i) % deck.length]);
      }
      // shortcut: ưu tiên câu khác lần làm gần nhất; mở rộng thành lịch ôn khi cần lặp lại ngắt quãng.
      if (previousIds.length) pool = [...pool.filter(q => !previousIds.includes(q.id)), ...pool.filter(q => previousIds.includes(q.id))];
      return pool.slice(0, mode === 'practice' ? 12 : 6).map(q => ({ id: q.id, order: shuffle([0, 1, 2, 3], random) }));
    });
    return { id: now + '-' + seed, seed, mode, chapter, label, questions, answers: {}, flags: [], current: 0, startedAt: now, deadline: mode === 'exam' ? now + DURATION : null, status: 'active' };
  }
  function isValidAttempt(a, bank) {
    if (!a || !['exam', 'practice'].includes(a.mode) || !['active', 'done'].includes(a.status) || typeof a.id !== 'string' || typeof a.label !== 'string' || !Number.isFinite(a.startedAt) || !Array.isArray(a.questions) || a.questions.length !== (a.mode === 'exam' ? 30 : 12) || !Number.isInteger(a.current) || a.current < 0 || a.current >= a.questions.length || !a.answers || typeof a.answers !== 'object' || Array.isArray(a.answers) || !Array.isArray(a.flags)) return false;
    const lookup = new Map(bank.map(q => [q.id, q]));
    if (!a.questions.every(q => q && typeof q === 'object' && typeof q.id === 'string')) return false;
    const ids = a.questions.map(q => q.id);
    if (new Set(ids).size !== ids.length || !a.questions.every(q => lookup.has(q.id) && Array.isArray(q.order) && q.order.every(Number.isInteger) && [...q.order].sort().join() === '0,1,2,3')) return false;
    if (!Object.entries(a.answers).every(([id, v]) => ids.includes(id) && Number.isInteger(v) && v >= 0 && v <= 3) || !a.flags.every(id => ids.includes(id))) return false;
    if (a.mode === 'exam' && (!Number.isFinite(a.deadline) || a.deadline !== a.startedAt + DURATION || !CHAPTERS.every(c => a.questions.filter(q => lookup.get(q.id).chapter === c.id).length === 6))) return false;
    if (a.mode === 'practice' && (!CHAPTERS.some(c => c.id === a.chapter) || !a.questions.every(q => lookup.get(q.id).chapter === a.chapter))) return false;
    return true;
  }
  function grade(a, bank) {
    const lookup = new Map(bank.map(q => [q.id, q]));
    const rows = a.questions.map(item => { const q = lookup.get(item.id); const selected = a.answers[q.id]; return { ...q, order: item.order, selected, correct: selected === q.answer }; });
    const correct = rows.filter(q => q.correct).length;
    return { rows, correct, unanswered: rows.filter(q => q.selected === undefined).length, score: correct / rows.length * 10, chapters: CHAPTERS.filter(c => rows.some(q => q.chapter === c.id)).map(c => ({ ...c, total: rows.filter(q => q.chapter === c.id).length, correct: rows.filter(q => q.chapter === c.id && q.correct).length })) };
  }
  function remaining(a, now = Date.now()) { return a.deadline === null ? null : Math.max(0, Math.ceil((a.deadline - now) / 1000)); }
  const api = { CHAPTERS, DURATION, rng, shuffle, validateBank, makeAttempt, isValidAttempt, grade, remaining };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.QuizEngine = api;
})(globalThis);
