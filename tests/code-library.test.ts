import test from 'node:test';
import assert from 'node:assert/strict';
import {
  codeRequest,
  emptyProblem,
  problemDraftProblem,
  testCount,
  type ProblemDraft,
} from '../src/lib/code.ts';
import {
  ALL_SUBJECTS,
  filterLibrary,
  libraryBatches,
  libraryDraft,
  librarySubjects,
  sourcedDraft,
  type LibraryDetail,
  type LibraryProblem,
} from '../src/lib/code-library.ts';

const summary = (patch: Partial<LibraryProblem> = {}): LibraryProblem => ({
  id: 'p1',
  title: 'Tổng hai số',
  subjectCode: 'INT1340',
  subjectName: 'Lập trình mạng',
  timeLimitMs: 1500,
  memoryLimitMb: 128,
  maxAttempts: null,
  testCount: 12,
  sampleCount: 2,
  createdAt: null,
  updatedAt: null,
  ...patch,
});

const detail: LibraryDetail = {
  summary: summary(),
  statement: 'In a + b.',
  tests: [
    {
      id: 't1',
      name: 'sample',
      input: '1 2',
      expected: '3',
      inputTruncated: false,
      expectedTruncated: false,
      inputSize: 3,
      expectedSize: 1,
      sample: true,
    },
  ],
};

test('câu chọn từ kho: chép bộ test, không gửi test hay ZIP, vẫn sửa được đề và giới hạn', () => {
  const draft = sourcedDraft(detail);
  assert.equal(draft.id, null);
  assert.equal(draft.timeLimit, '1,5');
  assert.deepEqual(draft.source, { id: 'p1', tests: 12, samples: 2 });
  assert.equal(testCount(draft), 12);
  assert.equal(problemDraftProblem(draft), null);
  assert.match(problemDraftProblem({ ...draft, statement: '' }) ?? '', /đề bài/);
  const request = codeRequest({ languages: ['cpp'], problems: [draft] });
  assert.deepEqual(request.files, []);
  assert.equal(request.code.problems[0].source, 'p1');
  assert.deepEqual(request.code.problems[0].tests, []);
  assert.equal(request.code.problems[0].archive, null);
});

test('libraryDraft: sửa câu trong kho như câu đã lưu (giữ id test)', () => {
  const draft = libraryDraft(detail);
  assert.equal(draft.id, 'p1');
  assert.equal(draft.source, null);
  assert.equal(draft.tests[0].id, 't1');
  assert.equal(codeRequest({ languages: ['c'], problems: [draft] }).code.problems[0].source, null);
});

test('libraryBatches: tối đa 50 câu và 80 MB file ZIP mỗi lần gửi', () => {
  const zip = (mb: number) => new File([new Uint8Array(mb * 1024 * 1024)], 'tests.zip');
  const problem = (archive: File | null = null): ProblemDraft => ({ ...emptyProblem(), archive });
  assert.deepEqual(
    libraryBatches(Array.from({ length: 120 }, () => problem())).map((batch) => batch.length),
    [50, 50, 20],
  );
  assert.deepEqual(
    libraryBatches([
      problem(zip(20)),
      problem(zip(20)),
      problem(zip(20)),
      problem(zip(20)),
      problem(zip(5)),
    ]).map((batch) => batch.length),
    [4, 1],
  );
});

test('filterLibrary và librarySubjects: tìm không dấu, lọc theo môn, câu chưa gắn môn ở cuối', () => {
  const list = [
    summary(),
    summary({ id: 'p2', title: 'Số nguyên tố', subjectCode: 'INT1111', subjectName: 'TEST' }),
    summary({ id: 'p3', title: 'Fibonacci', subjectCode: null, subjectName: null }),
  ];
  assert.deepEqual(
    filterLibrary(list, 'so nguyen', ALL_SUBJECTS).map((item) => item.id),
    ['p2'],
  );
  assert.deepEqual(
    filterLibrary(list, '', 'int1340').map((item) => item.id),
    ['p1'],
  );
  assert.deepEqual(
    filterLibrary(list, '', '').map((item) => item.id),
    ['p3'],
  );
  assert.deepEqual(
    librarySubjects(list).map((item) => [item.code, item.count]),
    [
      ['INT1111', 1],
      ['INT1340', 1],
      ['', 1],
    ],
  );
});
