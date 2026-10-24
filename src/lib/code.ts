/**
 * Kiểu dữ liệu khớp CodeViews của Spring (lms.code); mọi id là public_id. Bài lập trình gồm nhiều câu và không có
 * điểm: kết quả mỗi câu là số test đúng / tổng số test (AC 5/5).
 */

/** Khớp CodeLanguage.code của server. */
export type CodeLanguage = 'c' | 'cpp' | 'java' | 'python';

export const CODE_LANGUAGES: { code: CodeLanguage; label: string; file: string }[] = [
  { code: 'c', label: 'C', file: 'main.c' },
  { code: 'cpp', label: 'C++', file: 'main.cpp' },
  { code: 'java', label: 'Java', file: 'Main.java' },
  { code: 'python', label: 'Python 3', file: 'main.py' },
];

export function languageLabel(code: string) {
  return CODE_LANGUAGES.find((item) => item.code === code)?.label ?? code;
}

/** Mã khởi đầu khi sinh viên chưa gõ gì cho ngôn ngữ đó. */
export const STARTER_CODE: Record<CodeLanguage, string> = {
  c: '#include <stdio.h>\n\nint main(void) {\n    \n    return 0;\n}\n',
  cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    \n    return 0;\n}\n',
  java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner in = new Scanner(System.in);\n        \n    }\n}\n',
  python: '# Đọc dữ liệu bằng input(), in kết quả bằng print()\n',
};

/** Khớp hằng số của CodeJudge. */
export type Verdict = 'AC' | 'WA' | 'TLE' | 'RE' | 'OLE' | 'CE' | 'SE';

export const VERDICTS: Record<Verdict, { label: string; tone: string }> = {
  AC: { label: 'AC', tone: 'ok' },
  WA: { label: 'Sai kết quả', tone: 'locked' },
  TLE: { label: 'Quá thời gian', tone: 'warn' },
  RE: { label: 'Lỗi khi chạy', tone: 'locked' },
  OLE: { label: 'Output quá lớn', tone: 'locked' },
  CE: { label: 'Lỗi biên dịch', tone: 'locked' },
  SE: { label: 'Lỗi máy chấm', tone: 'muted' },
};

export function verdictInfo(verdict: string | null) {
  return verdict && verdict in VERDICTS ? VERDICTS[verdict as Verdict] : null;
}

/** "AC 5/5", "Sai kết quả 3/5", "Lỗi biên dịch" (không có số test khi không chạy được test nào). */
export function verdictText(verdict: string | null, passed: number | null, total: number | null) {
  const info = verdictInfo(verdict);
  if (!info) return 'Đã chấm';
  if (verdict === 'CE' || verdict === 'SE' || total === null || passed === null) return info.label;
  return `${info.label} ${passed}/${total}`;
}

export type AttemptKind = 'run' | 'submit';
export type AttemptStatus = 'queued' | 'running' | 'done';

export const ATTEMPT_STATUS: Record<AttemptStatus, string> = {
  queued: 'Đang chờ chấm',
  running: 'Đang chấm',
  done: 'Đã chấm',
};

/**
 * Tình trạng một câu (khớp CodeViews.NONE...): màu ở danh sách câu và bảng kết quả. submitted = đã nộp nhưng
 * kết quả chưa công bố (không tô xanh/đỏ để khỏi lộ kết quả).
 */
export type ProblemStatus = 'none' | 'pending' | 'accepted' | 'rejected' | 'submitted';

export const PROBLEM_STATUS: Record<ProblemStatus, { label: string; tone: string }> = {
  none: { label: 'Chưa làm', tone: '' },
  pending: { label: 'Đang chấm', tone: 'pending' },
  accepted: { label: 'Đúng', tone: 'accepted' },
  rejected: { label: 'Chưa đúng', tone: 'rejected' },
  submitted: { label: 'Đã nộp', tone: 'submitted' },
};

export interface LanguageView {
  code: CodeLanguage;
  label: string;
  /** Java, Python được nhân thời gian mỗi test lên chừng này lần. */
  timeFactor: number;
}

export interface SampleView {
  input: string;
  expected: string;
}

export interface ResultView {
  /** Thứ tự test lúc chấm (chạy thử: thứ tự trong các test mẫu). */
  index: number;
  sample: boolean;
  verdict: Verdict;
  timeMs: number;
  /** stdout đã cắt ngắn; chỉ giữ khi sai hoặc là test mẫu. */
  output: string | null;
  error: string | null;
}

export interface AttemptView {
  id: string;
  problemId: string;
  kind: AttemptKind;
  language: CodeLanguage;
  status: AttemptStatus;
  /** null khi chưa chấm xong, hoặc lần nộp mà kết quả chưa công bố. */
  verdict: Verdict | null;
  passed: number | null;
  total: number | null;
  createdAt: string;
  judgedAt: string | null;
  /** Chỉ có ở API xem chi tiết một lần chạy. */
  source: string | null;
  /** Sinh viên: lần nộp chỉ có khi lỗi biên dịch; lần chạy thử có mọi thông báo. */
  compileOutput: string | null;
  /** Kết quả từng test: lần chạy thử, hoặc giảng viên xem; lần nộp của sinh viên không có. */
  results: ResultView[] | null;
}

/** Lần nộp tốt nhất của một câu: AC nếu có, không thì lần đúng nhiều test nhất. */
export interface Best {
  verdict: Verdict;
  passed: number;
  total: number;
}

export interface ProblemSummary {
  id: string;
  /** Số thứ tự câu (1, 2...). */
  number: number;
  title: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  maxAttempts: number | null;
  /** Số lần nộp đã tính (lỗi máy chấm không tính). */
  attemptsUsed: number;
  testCount: number;
  status: ProblemStatus;
  /** null khi chưa nộp hoặc kết quả chưa công bố. */
  best: Best | null;
}

/** GET /student/assessments/{id}/code: danh sách câu. */
export interface CodeState {
  languages: LanguageView[];
  problems: ProblemSummary[];
  /** Kết quả các lần nộp chưa công bố (bài công bố sau giờ đóng / không công bố). */
  resultsHidden: boolean;
  /** Đang trong giờ làm bài. */
  open: boolean;
  serverTime: string;
}

/** GET /student/assessments/{id}/code/problems/{pid}: một câu. */
export interface ProblemDetail {
  problem: ProblemSummary;
  statement: string;
  samples: SampleView[];
  /** Mới nhất trước. */
  attempts: AttemptView[];
  languages: LanguageView[];
  resultsHidden: boolean;
  open: boolean;
  serverTime: string;
}

export interface TestView {
  id: string;
  /** Tên file trong ZIP (vd. "test05"); null = test soạn tay. */
  name: string | null;
  /** Bản xem trước (300 ký tự đầu) khi inputTruncated / expectedTruncated. */
  input: string;
  expected: string;
  inputTruncated: boolean;
  expectedTruncated: boolean;
  /** Byte. */
  inputSize: number;
  expectedSize: number;
  sample: boolean;
}

export interface TeacherProblem {
  id: string;
  title: string;
  statement: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  maxAttempts: number | null;
  tests: TestView[];
}

/** GET /teacher/courses/{id}/assessments/{aid}/code. */
export interface TeacherCode {
  languages: CodeLanguage[];
  problems: TeacherProblem[];
  /** Số lần chạy đang chờ/đang chấm (vd. sau khi sửa bộ test). */
  pending: number;
  editable: boolean;
}

export interface ResultCell {
  problemId: string;
  status: ProblemStatus;
  best: Best | null;
  /** Số lần nộp đã tính. */
  attempts: number;
}

export interface ResultRow {
  studentId: string;
  username: string;
  fullName: string;
  cells: ResultCell[];
}

/** GET .../code/results: bảng sinh viên × câu. */
export interface CodeResults {
  problems: { id: string; title: string }[];
  rows: ResultRow[];
}

/** GET .../submissions/{studentId}/code: mọi lần chạy/nộp của một sinh viên, mới nhất trước. */
export interface StudentCode {
  studentId: string;
  username: string;
  fullName: string;
  attempts: AttemptView[];
}

/** Giống CodeViews / CodeService của server. */
export const MAX_PROBLEMS = 20;
export const MAX_TESTS = 200;
export const MAX_STATEMENT = 20_000;
export const MAX_TEST_CHARS = 1_000_000;
/** Test mẫu và test sửa tại chỗ được: input/output không quá chừng này byte. */
export const INLINE_LIMIT = 8192;
/** File ZIP bộ test: giới hạn tải lên của server (20 MB). */
export const MAX_ARCHIVE_BYTES = 20 * 1024 * 1024;
export const MAX_SOURCE = 65_536;
export const MIN_TIME_LIMIT_MS = 100;
export const MAX_TIME_LIMIT_MS = 10_000;
export const MIN_MEMORY_MB = 16;
export const MAX_MEMORY_MB = 1024;
export const MAX_ATTEMPTS = 100;

/** Mã lý do của TestArchive (server) khi đọc file ZIP bộ test. */
export const ARCHIVE_PROBLEMS: Record<string, string> = {
  MISSING_INPUT: 'thiếu file input',
  MISSING_OUTPUT: 'thiếu file output',
  DUPLICATE: 'có hai file cùng loại',
  FILE_TOO_LARGE: 'file quá 8 MB',
  TOO_LARGE: 'Tổng dung lượng giải nén quá 64 MB.',
  TOO_MANY: `Quá nhiều test (tối đa ${MAX_TESTS}).`,
  NOT_ZIP: 'File không phải ZIP hoặc bị hỏng.',
  EMPTY: 'Không tìm thấy cặp file input/output nào.',
};

export interface ArchiveTest {
  name: string;
  inputSize: number;
  expectedSize: number;
}

/** POST /teacher/courses/{id}/code-test-archive: đọc thử file ZIP, chưa lưu gì. */
export interface ArchiveCheck {
  tests: ArchiveTest[];
  problems: { name: string | null; reason: string }[];
  /** Số file không phải input/output (lời giải, ghi chú...). */
  ignored: number;
}

/** "test05: thiếu file output", "File không phải ZIP hoặc bị hỏng." */
export function archiveProblemText(problem: ArchiveCheck['problems'][number]) {
  const text = ARCHIVE_PROBLEMS[problem.reason] ?? problem.reason;
  return problem.name ? `${problem.name}: ${text}` : text;
}

let nextKey = 0;
const newKey = () => `new-${nextKey++}`;

/** Một test đang soạn. */
export interface TestDraft {
  /** Khóa React, chỉ có ở client. */
  key: string;
  /** Test đã lưu trên server; null = test mới. */
  id: string | null;
  name: string | null;
  input: string;
  expected: string;
  /** Nội dung chỉ là bản xem trước (test lớn): không sửa được, server giữ nguyên nội dung. */
  truncated: boolean;
  /** Byte; test mới thì tính lúc kiểm tra. */
  inputSize: number;
  expectedSize: number;
  /** Đã sửa nội dung test đã lưu: gửi lại nội dung. */
  dirty: boolean;
  sample: boolean;
}

/** Một câu đang soạn; các số là chữ trong ô nhập. */
export interface ProblemDraft {
  key: string;
  /** Câu đã lưu trên server; null = câu mới. */
  id: string | null;
  title: string;
  statement: string;
  /** Giây, cho phép phần thập phân bằng dấu phẩy hoặc chấm. */
  timeLimit: string;
  memoryLimit: string;
  /** '' = không giới hạn. */
  maxAttempts: string;
  tests: TestDraft[];
  /** File ZIP bộ test sẽ gửi kèm (test trong ZIP thêm vào sau, là test ẩn) và kết quả đọc thử. */
  archive: File | null;
  archiveCheck: ArchiveCheck | null;
}

/** Cả bài đang soạn: ngôn ngữ chung và các câu theo thứ tự. */
export interface CodeDraft {
  languages: CodeLanguage[];
  problems: ProblemDraft[];
}

export function emptyTest(sample = false): TestDraft {
  return {
    key: newKey(),
    id: null,
    name: null,
    input: '',
    expected: '',
    truncated: false,
    inputSize: 0,
    expectedSize: 0,
    dirty: false,
    sample,
  };
}

export function emptyProblem(): ProblemDraft {
  return {
    key: newKey(),
    id: null,
    title: '',
    statement: '',
    timeLimit: '1',
    memoryLimit: '256',
    maxAttempts: '',
    tests: [emptyTest(true), emptyTest()],
    archive: null,
    archiveCheck: null,
  };
}

export function emptyCode(): CodeDraft {
  return { languages: ['c', 'cpp', 'java', 'python'], problems: [emptyProblem()] };
}

export function draftFromTeacher(code: TeacherCode): CodeDraft {
  return {
    languages: code.languages,
    problems: code.problems.map((problem) => ({
      key: problem.id,
      id: problem.id,
      title: problem.title,
      statement: problem.statement,
      timeLimit: String(problem.timeLimitMs / 1000).replace('.', ','),
      memoryLimit: String(problem.memoryLimitMb),
      maxAttempts: problem.maxAttempts === null ? '' : String(problem.maxAttempts),
      tests: problem.tests.map((test) => ({
        key: test.id,
        id: test.id,
        name: test.name,
        input: test.input,
        expected: test.expected,
        truncated: test.inputTruncated || test.expectedTruncated,
        inputSize: test.inputSize,
        expectedSize: test.expectedSize,
        dirty: false,
        sample: test.sample,
      })),
      archive: null,
      archiveCheck: null,
    })),
  };
}

/** "1,5" hoặc "1.5" giây → mili giây; null nếu không phải số. */
export function parseSeconds(text: string) {
  const value = Number(text.trim().replace(',', '.'));
  return text.trim() && Number.isFinite(value) ? Math.round(value * 1000) : null;
}

function isInt(text: string, min: number, max: number) {
  const value = Number(text.trim());
  return /^\d+$/.test(text.trim()) && value >= min && value <= max;
}

export function utf8Size(text: string) {
  return new TextEncoder().encode(text).length;
}

/** Kích thước input/output của test: test mới hoặc đã sửa thì đếm lại từ nội dung. */
export function testSizes(test: TestDraft) {
  return test.truncated || (test.id && !test.dirty)
    ? { input: test.inputSize, expected: test.expectedSize }
    : { input: utf8Size(test.input), expected: utf8Size(test.expected) };
}

/** Số test của câu kể cả test trong file ZIP đã đọc thử. */
export function testCount(problem: ProblemDraft) {
  return problem.tests.length + (problem.archive ? (problem.archiveCheck?.tests.length ?? 0) : 0);
}

/** Kiểm tra một câu; null = hợp lệ. */
export function problemDraftProblem(problem: ProblemDraft): string | null {
  if (!problem.title.trim()) return 'nhập tiêu đề câu.';
  if (!problem.statement.trim()) return 'nhập đề bài.';
  if (problem.statement.length > MAX_STATEMENT) return `đề bài tối đa ${MAX_STATEMENT} ký tự.`;
  const ms = parseSeconds(problem.timeLimit);
  if (ms === null || ms < MIN_TIME_LIMIT_MS || ms > MAX_TIME_LIMIT_MS)
    return 'giới hạn thời gian từ 0,1 đến 10 giây mỗi test.';
  if (!isInt(problem.memoryLimit, MIN_MEMORY_MB, MAX_MEMORY_MB))
    return `giới hạn bộ nhớ là số MB nguyên từ ${MIN_MEMORY_MB} đến ${MAX_MEMORY_MB}.`;
  if (problem.maxAttempts.trim() && !isInt(problem.maxAttempts, 1, MAX_ATTEMPTS))
    return `số lần nộp tối đa là số nguyên từ 1 đến ${MAX_ATTEMPTS} (để trống = không giới hạn).`;
  if (problem.archive) {
    if (!problem.archiveCheck) return 'đang đọc file ZIP bộ test, đợi một chút.';
    if (problem.archiveCheck.problems.length || !problem.archiveCheck.tests.length)
      return 'file ZIP bộ test có lỗi: sửa file hoặc bỏ file ra.';
  }
  const count = testCount(problem);
  if (!count) return 'thêm ít nhất một test.';
  if (count > MAX_TESTS) return `tối đa ${MAX_TESTS} test (đang có ${count}).`;
  for (const [index, test] of problem.tests.entries()) {
    const label = `test ${index + 1}${test.name ? ` (${test.name})` : ''}`;
    if (!test.truncated) {
      if (!test.expected.trim()) return `${label}: nhập output mong đợi.`;
      if (test.input.length > MAX_TEST_CHARS || test.expected.length > MAX_TEST_CHARS)
        return `${label} quá lớn để soạn tay (tối đa ${MAX_TEST_CHARS.toLocaleString('vi-VN')} ký tự mỗi ô); hãy đưa vào file ZIP.`;
    }
    if (test.sample) {
      const size = testSizes(test);
      if (size.input > INLINE_LIMIT || size.expected > INLINE_LIMIT)
        return `${label}: test mẫu tối đa 8 KB mỗi ô (sinh viên xem nguyên văn); test lớn hãy để là test ẩn.`;
    }
  }
  return null;
}

/** Kiểm tra cả bài trước khi gửi (server kiểm tra lại); null = hợp lệ. */
export function codeDraftProblem(draft: CodeDraft): string | null {
  if (!draft.languages.length) return 'Chọn ít nhất một ngôn ngữ.';
  if (!draft.problems.length) return 'Thêm ít nhất một câu.';
  if (draft.problems.length > MAX_PROBLEMS) return `Mỗi bài tối đa ${MAX_PROBLEMS} câu.`;
  for (const [index, problem] of draft.problems.entries()) {
    const problemText = problemDraftProblem(problem);
    if (problemText) return `Câu ${index + 1}: ${problemText}`;
  }
  return null;
}

/** Tên part multipart chứa file ZIP của câu thứ index. */
export const archivePart = (index: number) => `zip-${index}`;

/**
 * Body CodeRequest (test đã lưu chưa sửa thì chỉ gửi id) và các file ZIP kèm theo; gọi sau khi codeDraftProblem
 * trả null.
 */
export function codeRequest(draft: CodeDraft) {
  const files: { name: string; file: File }[] = [];
  const problems = draft.problems.map((problem, index) => {
    if (problem.archive) files.push({ name: archivePart(index), file: problem.archive });
    return {
      id: problem.id,
      title: problem.title.trim(),
      statement: problem.statement.trim(),
      timeLimitMs: parseSeconds(problem.timeLimit)!,
      memoryLimitMb: Number(problem.memoryLimit),
      maxAttempts: problem.maxAttempts.trim() ? Number(problem.maxAttempts) : null,
      archive: problem.archive ? archivePart(index) : null,
      tests: problem.tests.map((test) =>
        test.id && (test.truncated || !test.dirty)
          ? { id: test.id, sample: test.sample }
          : {
              id: test.id,
              name: test.name,
              input: test.input,
              expected: test.expected,
              sample: test.sample,
            },
      ),
    };
  });
  return { code: { languages: draft.languages, problems }, files };
}

/** JSON, hoặc multipart (part `data` + mỗi file ZIP một part) khi có file ZIP bộ test. */
export function codeBody(data: unknown, files: { name: string; file: File }[]): unknown {
  if (!files.length) return data;
  const form = new FormData();
  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  for (const item of files) form.append(item.name, item.file);
  return form;
}

/** "1 giây", "0,5 giây". */
export function formatSeconds(ms: number) {
  return `${(ms / 1000).toLocaleString('vi-VN', { maximumFractionDigits: 2 })} giây`;
}

/** Còn lần chạy chờ chấm thì trang làm bài hỏi lại server định kỳ. */
export function hasPending(attempts: Pick<AttemptView, 'status'>[]) {
  return attempts.some((attempt) => attempt.status !== 'done');
}

/** Nhãn ngắn của một lần chạy: "AC 3/3", "Sai kết quả 2/3", "Đang chấm", "Đã nộp" (chưa công bố). */
export function attemptLabel(
  attempt: Pick<AttemptView, 'status' | 'verdict' | 'passed' | 'total'>,
) {
  if (attempt.status !== 'done') return ATTEMPT_STATUS[attempt.status];
  if (!attempt.verdict) return 'Đã nộp';
  return verdictText(attempt.verdict, attempt.passed, attempt.total);
}

/** Nhãn của câu: "AC 5/5", "Sai kết quả 3/5", hoặc nhãn tình trạng khi chưa có kết quả. */
export function problemLabel(item: { status: ProblemStatus; best: Best | null }) {
  if (item.best && item.status !== 'pending')
    return verdictText(item.best.verdict, item.best.passed, item.best.total);
  return PROBLEM_STATUS[item.status].label;
}
