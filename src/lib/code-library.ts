import {
  codeBody,
  emptyProblem,
  problemFromTeacher,
  problemRequest,
  type ProblemDraft,
  type TestView,
} from './code.ts';
import { normalizeSearch } from './course-utils.ts';

/**
 * Kho bài lập trình của giảng viên (kiểu danh sách bài trên OJ), khớp CodeViews.Library* của Spring
 * (/teacher/code-problems). Câu trong kho không thuộc bài nào; tạo bài thì chọn câu từ kho, server chép câu
 * và bộ test sang bài (ProblemDraft.source), sửa kho sau đó không đổi bài đã tạo.
 */

export const LIBRARY_PATH = '/teacher/code-problems';

export interface LibraryProblem {
  id: string;
  title: string;
  /** Mã học phần như ngân hàng câu hỏi; null = chưa gắn môn. */
  subjectCode: string | null;
  subjectName: string | null;
  timeLimitMs: number;
  memoryLimitMb: number;
  maxAttempts: number | null;
  testCount: number;
  sampleCount: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface LibraryDetail {
  summary: LibraryProblem;
  statement: string;
  tests: TestView[];
}

/** Giống CodeViews.MAX_LIBRARY_BATCH: số câu tối đa mỗi lần thêm vào kho. */
export const LIBRARY_BATCH = 50;
/** Mỗi lần gửi giữ dưới giới hạn request 101 MB của server (mỗi file ZIP bộ test ≤ 20 MB). */
const BATCH_BYTES = 80 * 1024 * 1024;

/** Câu trong kho → câu đang soạn để sửa trong kho. */
export function libraryDraft(detail: LibraryDetail): ProblemDraft {
  const { summary } = detail;
  return problemFromTeacher({
    id: summary.id,
    title: summary.title,
    statement: detail.statement,
    timeLimitMs: summary.timeLimitMs,
    memoryLimitMb: summary.memoryLimitMb,
    maxAttempts: summary.maxAttempts,
    tests: detail.tests,
  });
}

/** Câu trong kho → câu mới của bài: bộ test chép từ kho khi tạo bài, tiêu đề/đề/giới hạn sửa được. */
export function sourcedDraft(detail: LibraryDetail): ProblemDraft {
  const { summary } = detail;
  return {
    ...emptyProblem(),
    title: summary.title,
    statement: detail.statement,
    timeLimit: String(summary.timeLimitMs / 1000).replace('.', ','),
    memoryLimit: String(summary.memoryLimitMb),
    maxAttempts: summary.maxAttempts === null ? '' : String(summary.maxAttempts),
    tests: [],
    source: { id: summary.id, tests: summary.testCount, samples: summary.sampleCount },
  };
}

/** Chia các câu cần thêm vào kho thành nhiều lần gửi: ≤ LIBRARY_BATCH câu và ≤ 80 MB file ZIP mỗi lần. */
export function libraryBatches(problems: ProblemDraft[]): ProblemDraft[][] {
  const batches: ProblemDraft[][] = [];
  let current: ProblemDraft[] = [];
  let bytes = 0;
  for (const problem of problems) {
    const size = problem.archive?.size ?? 0;
    if (current.length && (current.length >= LIBRARY_BATCH || bytes + size > BATCH_BYTES)) {
      batches.push(current);
      current = [];
      bytes = 0;
    }
    current.push(problem);
    bytes += size;
  }
  if (current.length) batches.push(current);
  return batches;
}

/** Body thêm nhiều câu vào kho (JSON, hoặc multipart khi có file ZIP bộ test). */
export function libraryCreateBody(subjectCode: string, problems: ProblemDraft[]) {
  const files: { name: string; file: File }[] = [];
  const list = problems.map((problem, index) => {
    const part = `zip-${index}`;
    if (problem.archive) files.push({ name: part, file: problem.archive });
    return { ...problemRequest(problem, part), id: null, source: null };
  });
  return codeBody({ subjectCode, problems: list }, files);
}

/** Body sửa một câu trong kho. */
export function libraryUpdateBody(subjectCode: string, problem: ProblemDraft) {
  const request = { ...problemRequest(problem, 'zip-0'), source: null };
  return codeBody(
    { subjectCode, problem: request },
    problem.archive ? [{ name: 'zip-0', file: problem.archive }] : [],
  );
}

/** Lọc môn học: 'all' mọi môn, '' câu chưa gắn môn, còn lại là mã học phần. */
export const ALL_SUBJECTS = 'all';

export function filterLibrary(list: LibraryProblem[], search: string, subject: string) {
  const needle = normalizeSearch(search);
  return list.filter(
    (problem) =>
      (subject === ALL_SUBJECTS ||
        (problem.subjectCode ?? '').toUpperCase() === subject.toUpperCase()) &&
      normalizeSearch(`${problem.title} ${problem.subjectCode ?? ''}`).includes(needle),
  );
}

/** Các môn có trong kho, theo mã: [code, name, số câu]; '' = chưa gắn môn. */
export function librarySubjects(list: LibraryProblem[]) {
  const byCode = new Map<string, { code: string; name: string | null; count: number }>();
  for (const problem of list) {
    const code = (problem.subjectCode ?? '').toUpperCase();
    const item = byCode.get(code) ?? {
      code: problem.subjectCode ?? '',
      name: problem.subjectName,
      count: 0,
    };
    item.count++;
    byCode.set(code, item);
  }
  return [...byCode.values()].sort((a, b) =>
    !a.code ? 1 : !b.code ? -1 : a.code.localeCompare(b.code),
  );
}
