import test from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyDraft,
  filterQuestions,
  groupBySubject,
  importIssueText,
  optionLetter,
  questionProblem,
  setCorrect,
  setMultiple,
  toQuestionRequest,
} from '../src/lib/question-bank.ts';
import type { BankQuestion, QuestionBankSummary, QuestionDraft } from '../src/lib/question-bank.ts';

const question = (id: string, patch: Partial<BankQuestion> = {}): BankQuestion => ({
  id,
  body: `Câu ${id}`,
  multiple: false,
  difficulty: 1,
  explanation: null,
  options: [
    { body: 'Đúng', correct: true },
    { body: 'Sai', correct: false },
  ],
  createdAt: '2026-10-23T01:00:00Z',
  updatedAt: '2026-10-23T01:00:00Z',
  ...patch,
});

const draft = (patch: Partial<QuestionDraft> = {}): QuestionDraft => ({
  body: 'Java chạy trên gì?',
  multiple: false,
  difficulty: 1,
  explanation: '',
  options: [
    { body: 'JVM', correct: true },
    { body: 'CLR', correct: false },
  ],
  ...patch,
});

test('optionLetter đánh chữ cái từ A', () => {
  assert.equal(optionLetter(0), 'A');
  assert.equal(optionLetter(9), 'J');
});

test('emptyDraft có 4 đáp án trống và giữ kiểu câu, mức độ khi được truyền', () => {
  const fresh = emptyDraft();
  assert.equal(fresh.options.length, 4);
  assert.equal(fresh.multiple, false);
  assert.equal(fresh.difficulty, 1);
  const kept = emptyDraft({ multiple: true, difficulty: 2 });
  assert.equal(kept.multiple, true);
  assert.equal(kept.difficulty, 2);
  assert.ok(kept.options.every((option) => !option.body && !option.correct));
});

test('setCorrect: câu chọn một chỉ giữ một đáp án đúng, câu chọn nhiều bật/tắt từng đáp án', () => {
  const single = setCorrect(draft(), 1, true);
  assert.deepEqual(
    single.options.map((option) => option.correct),
    [false, true],
  );
  const multiple = setCorrect(draft({ multiple: true }), 1, true);
  assert.deepEqual(
    multiple.options.map((option) => option.correct),
    [true, true],
  );
  assert.deepEqual(
    setCorrect(multiple, 0, false).options.map((option) => option.correct),
    [false, true],
  );
});

test('setMultiple(false) chỉ giữ đáp án đúng đầu tiên', () => {
  const many = draft({
    multiple: true,
    options: [
      { body: 'a', correct: false },
      { body: 'b', correct: true },
      { body: 'c', correct: true },
    ],
  });
  assert.deepEqual(
    setMultiple(many, false).options.map((option) => option.correct),
    [false, true, false],
  );
  assert.equal(setMultiple(draft(), true).multiple, true);
});

test('questionProblem báo lỗi giống server', () => {
  assert.equal(questionProblem(draft()), null);
  assert.match(questionProblem(draft({ body: '  ' })) ?? '', /nội dung/);
  assert.match(
    questionProblem(
      draft({
        options: [
          { body: 'a', correct: true },
          { body: ' ', correct: false },
        ],
      }),
    ) ?? '',
    /Đáp án B đang trống/,
  );
  assert.match(
    questionProblem(draft({ options: [{ body: 'a', correct: true }] })) ?? '',
    /ít nhất 2/,
  );
  assert.match(
    questionProblem(
      draft({
        options: [
          { body: 'a', correct: false },
          { body: 'b', correct: false },
        ],
      }),
    ) ?? '',
    /đáp án đúng/,
  );
  const twoCorrect = [
    { body: 'a', correct: true },
    { body: 'b', correct: true },
  ];
  assert.match(questionProblem(draft({ options: twoCorrect })) ?? '', /chỉ được có một/);
  assert.equal(questionProblem(draft({ multiple: true, options: twoCorrect })), null);
});

test('toQuestionRequest cắt khoảng trắng thừa', () => {
  const body = toQuestionRequest(
    draft({ body: '  Hỏi  ', explanation: ' ', options: [{ body: ' x ', correct: true }] }),
  );
  assert.equal(body.body, 'Hỏi');
  assert.equal(body.explanation, '');
  assert.equal(body.options[0].body, 'x');
});

test('filterQuestions tìm không dấu trong câu hỏi và đáp án, lọc theo mức độ', () => {
  const list = [
    question('1', { body: 'Máy ảo Java', difficulty: 0 }),
    question('2', {
      body: 'Kiểu dữ liệu',
      options: [
        { body: 'boolean', correct: true },
        { body: 'String', correct: false },
      ],
    }),
    question('3', { body: 'Vòng lặp', difficulty: 2 }),
  ];
  assert.deepEqual(
    filterQuestions(list, { search: 'may ao', difficulty: 'all' }).map((q) => q.id),
    ['1'],
  );
  assert.deepEqual(
    filterQuestions(list, { search: 'BOOLEAN', difficulty: 'all' }).map((q) => q.id),
    ['2'],
  );
  assert.deepEqual(
    filterQuestions(list, { search: '', difficulty: 2 }).map((q) => q.id),
    ['3'],
  );
});

test('importIssueText ghi số dòng và lý do', () => {
  assert.match(
    importIssueText({ line: 7, reason: 'MISSING_ANSWER' }),
    /^Dòng 7: Chưa có đáp án đúng/,
  );
  assert.equal(importIssueText({ line: 1, reason: 'LẠ' }), 'Dòng 1: LẠ');
});

const bank = (id: string, subjectCode: string | null): QuestionBankSummary => ({
  id,
  name: `Ngân hàng ${id}`,
  description: null,
  subjectCode,
  subjectName: subjectCode ? `Môn ${subjectCode}` : null,
  questionCount: 0,
  createdAt: '2026-10-23T01:00:00Z',
  updatedAt: '2026-10-23T01:00:00Z',
});

test('groupBySubject gom theo mã môn (không phân biệt hoa thường), chưa gắn môn để cuối', () => {
  const groups = groupBySubject([
    bank('1', 'INT1340'),
    bank('2', null),
    bank('3', 'BAS1150'),
    bank('4', 'int1340'),
  ]);
  assert.deepEqual(
    groups.map((group) => [group.subject?.code ?? null, group.banks.map((b) => b.id)]),
    [
      ['BAS1150', ['3']],
      ['INT1340', ['1', '4']],
      [null, ['2']],
    ],
  );
  assert.equal(groups[1].subject?.name, 'Môn INT1340');
  assert.deepEqual(groupBySubject([]), []);
});
