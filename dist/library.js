(function (root) {
  'use strict';
  const safeId = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(value) && !['__proto__', 'constructor', 'prototype'].includes(value);
  const text = (value, max, required = false) => typeof value === 'string' && value.length <= max && (!required || value.trim().length > 0);
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  const clone = value => JSON.parse(JSON.stringify(value));
  function validate(data) {
    if (!object(data) || data.version !== 2 || !Array.isArray(data.subjects) || !data.subjects.length || !Array.isArray(data.questions) || !Array.isArray(data.exams)) throw new Error('Dữ liệu phải có phiên bản 2, ít nhất một môn học, danh sách câu hỏi và đề thi.');
    const ids = new Set(), subjects = new Map(), chapterMaps = new Map();
    function entityId(value, type) { if (!safeId(value) || ids.has(value)) throw new Error('Mã ' + type + ' không hợp lệ hoặc bị trùng.'); ids.add(value); }
    for (const subject of data.subjects) {
      if (!object(subject)) throw new Error('Môn học không hợp lệ.');
      entityId(subject.id, 'môn học');
      if (!text(subject.name, 150, true) || (subject.code !== undefined && !text(subject.code, 50)) || (subject.description !== undefined && !text(subject.description, 2000)) || !Array.isArray(subject.chapters)) throw new Error('Môn học cần tên tối đa 150 ký tự và danh sách chương hợp lệ.');
      if (subject.examDate && (!text(subject.examDate, 10) || !/^\d{4}-\d{2}-\d{2}$/.test(subject.examDate) || !Number.isFinite(Date.parse(subject.examDate)) || new Date(subject.examDate).toISOString().slice(0, 10) !== subject.examDate)) throw new Error('Ngày kiểm tra cần có dạng năm-tháng-ngày và là ngày tồn tại.');
      const chapters = new Map();
      for (const c of subject.chapters) {
        if (!object(c) || !Number.isInteger(c.id) || c.id < 1 || chapters.has(c.id) || !text(c.title, 150, true) || (c.short !== undefined && !text(c.short, 100)) || (c.detail !== undefined && !text(c.detail, 1000)) || (c.color !== undefined && !['sage','sand','blue','rose','lilac'].includes(c.color))) throw new Error('Chương của môn ' + subject.name + ' có mã trùng, thiếu tên hoặc thông tin không hợp lệ.');
        chapters.set(c.id, c);
      }
      subjects.set(subject.id, subject); chapterMaps.set(subject.id, chapters);
    }
    const counts = new Map();
    for (const q of data.questions) {
      if (!object(q)) throw new Error('Câu hỏi không hợp lệ.');
      entityId(q.id, 'câu hỏi');
      if (!subjects.has(q.subjectId) || !chapterMaps.get(q.subjectId).has(q.chapter)) throw new Error('Câu hỏi phải thuộc một môn học và chương đang tồn tại.');
      if (!text(q.question, 10000, true) || !Array.isArray(q.options) || q.options.length !== 4 || !q.options.every(o => text(o, 4000, true)) || new Set(q.options.map(o => o.trim())).size !== 4 || !Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) throw new Error('Câu hỏi cần nội dung, 4 lựa chọn khác nhau và một đáp án đúng từ 0 đến 3.');
      if ((q.explanation !== undefined && !text(q.explanation, 10000)) || (q.source !== undefined && !text(q.source, 2000)) || (q.topic !== undefined && !text(q.topic, 200)) || (q.level !== undefined && !['Cơ bản','Vận dụng'].includes(q.level))) throw new Error('Giải thích, nguồn, chủ đề hoặc mức độ của câu hỏi không hợp lệ.');
      const key = q.subjectId + ':' + q.chapter; counts.set(key, (counts.get(key) || 0) + 1);
    }
    for (const exam of data.exams) {
      if (!object(exam)) throw new Error('Đề thi không hợp lệ.');
      entityId(exam.id, 'đề thi');
      if (!subjects.has(exam.subjectId) || !text(exam.name, 150, true) || (exam.description !== undefined && !text(exam.description, 2000)) || !Number.isInteger(exam.durationMinutes) || exam.durationMinutes < 1 || exam.durationMinutes > 180 || !Array.isArray(exam.chapterCounts) || !exam.chapterCounts.length || !Number.isInteger(exam.seed) || exam.seed < 0 || exam.seed > 4294967295) throw new Error('Đề thi cần môn học, tên, thời gian 1–180 phút, mã trộn và cấu trúc câu hỏi hợp lệ.');
      if (exam.presetNumber !== undefined && exam.presetNumber !== null && (!Number.isInteger(exam.presetNumber) || exam.presetNumber < 1 || exam.presetNumber > 12)) throw new Error('Mã đề cố định chỉ nhận số từ 1 đến 12.');
      let total = 0; const seen = new Set();
      for (const allocation of exam.chapterCounts) {
        if (!object(allocation) || !chapterMaps.get(exam.subjectId).has(allocation.chapterId) || seen.has(allocation.chapterId) || !Number.isInteger(allocation.count) || allocation.count < 1 || allocation.count > 200) throw new Error('Cấu trúc đề phải chỉ rõ số câu dương cho từng chương, không trùng chương.');
        if ((counts.get(exam.subjectId + ':' + allocation.chapterId) || 0) < allocation.count) throw new Error('Chương ' + allocation.chapterId + ' của đề “' + exam.name + '” chưa đủ ' + allocation.count + ' câu hỏi.');
        seen.add(allocation.chapterId); total += allocation.count;
      }
      if (total > 200) throw new Error('Một đề thi chỉ được có tối đa 200 câu hỏi.');
    }
    return true;
  }
  function createDefault(bank, chapters) {
    const subjectId = 'software-testing';
    const data = {
      version: 2,
      subjects: [{ id: subjectId, name: 'Kiểm thử phần mềm', code: 'SOTE', description: 'Ôn tập theo Bài 1–5 trong tài liệu môn học.', examDate: '2026-11-13', chapters: clone(chapters) }],
      questions: bank.map(q => ({ ...clone(q), subjectId })),
      exams: Array.from({ length: 12 }, (_, i) => ({ id: 'default-exam-' + String(i + 1).padStart(2, '0'), subjectId, name: 'Đề luyện ' + String(i + 1).padStart(2, '0'), description: 'Đề tổng hợp cân bằng 5 bài học.', durationMinutes: 45, chapterCounts: chapters.map(c => ({ chapterId: c.id, count: 6 })), seed: 20261101 + i, presetNumber: i + 1 }))
    };
    validate(data); return data;
  }
  const api = { createDefault, validate, clone };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.StudyLibrary = api;
})(globalThis);
