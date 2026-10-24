import test from 'node:test';
import assert from 'node:assert/strict';
import {
  archiveProblemText,
  attemptLabel,
  codeBody,
  codeDraftProblem,
  codeRequest,
  draftFromTeacher,
  emptyCode,
  emptyProblem,
  emptyTest,
  hasPending,
  parseSeconds,
  problemLabel,
  testCount,
  testSizes,
  verdictText,
} from '../src/lib/code.ts';
import type { ArchiveCheck, CodeDraft, ProblemDraft, TestDraft } from '../src/lib/code.ts';

const t = (patch: Partial<TestDraft>): TestDraft => ({ ...emptyTest(), ...patch });

const problem = (patch: Partial<ProblemDraft> = {}): ProblemDraft => ({
  ...emptyProblem(),
  title: 'Tổng hai số',
  statement: 'Tính a + b',
  tests: [t({ input: '1 2', expected: '3', sample: true }), t({ input: '5 5', expected: '10' })],
  ...patch,
});

const code = (patch: Partial<CodeDraft> = {}): CodeDraft => ({
  ...emptyCode(),
  problems: [problem()],
  ...patch,
});

/** Test lớn đã lưu trên server: chỉ có bản xem trước. */
const big = (patch: Partial<TestDraft> = {}) =>
  t({
    id: 'T1',
    key: 'T1',
    name: 'test05',
    input: '1 2 3',
    expected: '6',
    truncated: true,
    inputSize: 2_000_000,
    expectedSize: 2,
    ...patch,
  });

const check = (count: number, problems: ArchiveCheck['problems'] = []): ArchiveCheck => ({
  tests: Array.from({ length: count }, (_, i) => ({
    name: String(i),
    inputSize: 1,
    expectedSize: 1,
  })),
  problems,
  ignored: 0,
});

test('parseSeconds nhận dấu phẩy hoặc chấm, trả mili giây', () => {
  assert.equal(parseSeconds('1'), 1000);
  assert.equal(parseSeconds('1,5'), 1500);
  assert.equal(parseSeconds('0.25'), 250);
  assert.equal(parseSeconds(''), null);
  assert.equal(parseSeconds('abc'), null);
});

test('codeDraftProblem kiểm tra ngôn ngữ, số câu và từng câu (báo số câu)', () => {
  assert.equal(codeDraftProblem(code()), null);
  assert.equal(codeDraftProblem(code({ languages: [] })), 'Chọn ít nhất một ngôn ngữ.');
  assert.equal(codeDraftProblem(code({ problems: [] })), 'Thêm ít nhất một câu.');
  assert.equal(
    codeDraftProblem(code({ problems: [problem(), problem({ title: ' ' })] })),
    'Câu 2: nhập tiêu đề câu.',
  );
  assert.equal(
    codeDraftProblem(code({ problems: [problem({ statement: '' })] })),
    'Câu 1: nhập đề bài.',
  );
  assert.match(codeDraftProblem(code({ problems: [problem({ timeLimit: '20' })] }))!, /thời gian/);
  assert.match(codeDraftProblem(code({ problems: [problem({ memoryLimit: '8' })] }))!, /bộ nhớ/);
  assert.match(codeDraftProblem(code({ problems: [problem({ maxAttempts: '0' })] }))!, /lần nộp/);
  assert.equal(
    codeDraftProblem(code({ problems: [problem({ tests: [] })] })),
    'Câu 1: thêm ít nhất một test.',
  );
  assert.equal(
    codeDraftProblem(code({ problems: [problem({ tests: [t({ input: '1', expected: ' ' })] })] })),
    'Câu 1: test 1: nhập output mong đợi.',
  );
});

test('test lớn không kiểm tra nội dung nhưng không được làm test mẫu', () => {
  assert.equal(codeDraftProblem(code({ problems: [problem({ tests: [big()] })] })), null);
  assert.match(
    codeDraftProblem(code({ problems: [problem({ tests: [big({ sample: true })] })] }))!,
    /test mẫu tối đa 8 KB/,
  );
  assert.match(
    codeDraftProblem(
      code({ problems: [problem({ tests: [t({ expected: 'x'.repeat(9000), sample: true })] })] }),
    )!,
    /test mẫu tối đa 8 KB/,
  );
  assert.deepEqual(testSizes(big()), { input: 2_000_000, expected: 2 });
  assert.deepEqual(testSizes(t({ input: 'ă', expected: '' })), { input: 2, expected: 0 });
});

test('file ZIP: đợi đọc thử, chặn khi có lỗi, tính vào số test', () => {
  const archive = new File(['x'], 'tests.zip');
  assert.match(codeDraftProblem(code({ problems: [problem({ archive })] }))!, /đang đọc file ZIP/);
  assert.match(
    codeDraftProblem(
      code({
        problems: [
          problem({ archive, archiveCheck: check(1, [{ name: '2', reason: 'MISSING_OUTPUT' }]) }),
        ],
      }),
    )!,
    /có lỗi/,
  );
  const withZip = problem({ tests: [], archive, archiveCheck: check(5) });
  assert.equal(codeDraftProblem(code({ problems: [withZip] })), null);
  assert.equal(testCount(withZip), 5);
  assert.match(
    codeDraftProblem(code({ problems: [problem({ archive, archiveCheck: check(199) })] }))!,
    /tối đa 200 test/,
  );
  assert.equal(archiveProblemText({ name: '2', reason: 'MISSING_OUTPUT' }), '2: thiếu file output');
  assert.equal(
    archiveProblemText({ name: null, reason: 'NOT_ZIP' }),
    'File không phải ZIP hoặc bị hỏng.',
  );
});

test('codeRequest: test đã lưu chưa sửa chỉ gửi id; ZIP đi theo part riêng của câu', () => {
  const archive = new File(['x'], 'tests.zip');
  const { code: body, files } = codeRequest(
    code({
      problems: [
        problem({
          id: 'P1',
          timeLimit: '1,5',
          maxAttempts: '3',
          tests: [
            t({ input: '5 5', expected: '10' }),
            big(),
            t({ id: 'T2', key: 'T2', input: '1', expected: '1' }),
            t({ id: 'T3', key: 'T3', input: '2', expected: '2', dirty: true, sample: true }),
          ],
        }),
        problem({ tests: [], archive, archiveCheck: check(3) }),
      ],
    }),
  );
  const [first, second] = body.problems;
  assert.equal(first.id, 'P1');
  assert.equal(first.timeLimitMs, 1500);
  assert.equal(first.memoryLimitMb, 256);
  assert.equal(first.maxAttempts, 3);
  assert.equal(first.archive, null);
  assert.deepEqual(first.tests, [
    { id: null, name: null, input: '5 5', expected: '10', sample: false },
    { id: 'T1', sample: false },
    { id: 'T2', sample: false },
    { id: 'T3', name: null, input: '2', expected: '2', sample: true },
  ]);
  assert.equal(second.id, null);
  assert.equal(second.archive, 'zip-1');
  assert.deepEqual(files, [{ name: 'zip-1', file: archive }]);

  assert.deepEqual(codeBody({ a: 1 }, []), { a: 1 });
  const form = codeBody({ a: 1 }, files) as FormData;
  assert.ok(form.get('data') instanceof Blob);
  assert.equal((form.get('zip-1') as File).name, 'tests.zip');
});

test('draftFromTeacher đổi dữ liệu server sang ô nhập', () => {
  const back = draftFromTeacher({
    languages: ['c', 'python'],
    pending: 0,
    editable: true,
    problems: [
      {
        id: 'P1',
        title: 'Tổng',
        statement: 'x',
        timeLimitMs: 1500,
        memoryLimitMb: 256,
        maxAttempts: 3,
        tests: [
          {
            id: 'T1',
            name: 'test05',
            input: '1',
            expected: '2',
            inputTruncated: true,
            expectedTruncated: false,
            inputSize: 2_000_000,
            expectedSize: 1,
            sample: false,
          },
        ],
      },
    ],
  });
  assert.deepEqual(back.languages, ['c', 'python']);
  const [p] = back.problems;
  assert.equal(p.id, 'P1');
  assert.equal(p.timeLimit, '1,5');
  assert.equal(p.maxAttempts, '3');
  assert.equal(p.tests[0].truncated, true);
  assert.equal(p.tests[0].dirty, false);
});

test('nhãn kết quả: AC 5/5, sai 3/5, lỗi biên dịch, chưa công bố', () => {
  assert.equal(verdictText('AC', 5, 5), 'AC 5/5');
  assert.equal(verdictText('WA', 3, 5), 'Sai kết quả 3/5');
  assert.equal(verdictText('CE', 0, 5), 'Lỗi biên dịch');
  assert.equal(
    attemptLabel({ status: 'queued', verdict: null, passed: null, total: null }),
    'Đang chờ chấm',
  );
  assert.equal(
    attemptLabel({ status: 'done', verdict: 'TLE', passed: 4, total: 5 }),
    'Quá thời gian 4/5',
  );
  // Lần nộp chưa công bố kết quả: server không gửi kết quả
  assert.equal(
    attemptLabel({ status: 'done', verdict: null, passed: null, total: null }),
    'Đã nộp',
  );
  assert.equal(problemLabel({ status: 'none', best: null }), 'Chưa làm');
  assert.equal(problemLabel({ status: 'submitted', best: null }), 'Đã nộp');
  assert.equal(
    problemLabel({ status: 'accepted', best: { verdict: 'AC', passed: 20, total: 20 } }),
    'AC 20/20',
  );
  // Đang chấm lần mới thì hiện "Đang chấm" dù đã có kết quả cũ
  assert.equal(
    problemLabel({ status: 'pending', best: { verdict: 'WA', passed: 1, total: 5 } }),
    'Đang chấm',
  );
  assert.equal(hasPending([{ status: 'done' }, { status: 'running' }]), true);
  assert.equal(hasPending([{ status: 'done' }]), false);
});
