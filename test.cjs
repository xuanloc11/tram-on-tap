const assert = require('node:assert/strict');
require('./dist/questions-1-2.js');
require('./dist/questions-3.js');
require('./dist/questions-4-5.js');
const E = require('./dist/engine.js');
const bank = [...QUESTION_PART_12, ...QUESTION_PART_3, ...QUESTION_PART_45];
assert.equal(E.validateBank(bank), true);
assert.equal(new Set(bank.map(q => q.question.trim())).size, bank.length, 'Duplicate questions');
const now = 1794330000000;
for (let seed = 1; seed <= 200; seed++) {
  const a = E.makeAttempt(bank, { seed, now });
  assert.equal(a.questions.length, 30);
  assert.equal(E.isValidAttempt(a, bank), true);
  assert.equal(new Set(a.questions.map(q => q.id)).size, 30);
  for (const c of E.CHAPTERS) assert.equal(a.questions.filter(item => bank.find(q => q.id === item.id).chapter === c.id).length, 6);
  assert.equal(E.remaining(a, now), 2700);
  assert.equal(E.remaining(a, now + E.DURATION + 5000), 0);
  assert.deepEqual(a, E.makeAttempt(bank, { seed, now }));
}
const variants = Array.from({ length: 12 }, (_, i) => E.makeAttempt(bank, { seed: 20261101+i, setNumber: i+1, now }));
assert.equal(new Set(variants.map(a => a.questions.map(q => q.id).join())).size, 12);
assert.equal(new Set(variants.slice(0,6).flatMap(a => a.questions.map(q => q.id))).size, bank.length, 'First 6 fixed exams cover the whole bank');
const a = variants[0];
assert.equal(E.grade(a, bank).correct, 0);
assert.equal(E.grade(a, bank).unanswered, 30);
a.questions.forEach(item => { a.answers[item.id] = bank.find(q => q.id === item.id).answer; });
assert.equal(E.grade(a, bank).score, 10, 'Shuffled answers retain original correct index');
const first = a.questions[0].id;
a.answers[first] = (a.answers[first]+1)%4;
assert.equal(E.grade(a, bank).correct, 29);
assert.equal(E.isValidAttempt({ ...a, deadline: 0 }, bank), false);
assert.equal(E.isValidAttempt({ ...a, answers: { ...a.answers, evil: 7 } }, bank), false);
assert.equal(E.isValidAttempt({ ...a, questions: a.questions.map(q => ({ ...q, order: [0,0,2,3] })) }, bank), false);
assert.equal(E.isValidAttempt(null, bank), false);
assert.equal(E.isValidAttempt({ ...a, questions: [null, ...a.questions.slice(1)] }, bank), false);
assert.equal(E.isValidAttempt({ ...a, questions: a.questions.map(q => ({ ...q, order: ['0','1','2','3'] })) }, bank), false);
const other = E.makeAttempt(bank, { seed: 72, previousIds: a.questions.map(q => q.id), now });
assert.equal(other.questions.some(q => a.questions.some(old => old.id === q.id)), false);
for (const c of E.CHAPTERS) {
  const practice = E.makeAttempt(bank, { seed: 99, mode: 'practice', chapter: c.id, now });
  assert.equal(practice.questions.length, 12);
  assert.equal(practice.deadline, null);
  assert.equal(E.remaining(practice, now), null);
  assert.equal(E.isValidAttempt(practice, bank), true);
}
console.log(`PASS: ${bank.length} questions; 200 balanced exams; 12 distinct fixed exams; grading, shuffle, resume validation, expiry, fresh questions, all 5 practice modes.`);
