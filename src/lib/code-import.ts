import {
  INLINE_LIMIT,
  MAX_ARCHIVE_BYTES,
  MAX_MEMORY_MB,
  MAX_STATEMENT,
  MAX_TESTS,
  MAX_TIME_LIMIT_MS,
  MIN_MEMORY_MB,
  MIN_TIME_LIMIT_MS,
  emptyProblem,
  emptyTest,
  type ProblemDraft,
} from './code.ts';
import { writeZip } from './zip.ts';

/**
 * Nhập nhanh bài lập trình từ một thư mục hoặc file ZIP (đọc ngay trên trình duyệt, chưa gửi gì lên server).
 *
 * Cấu trúc nhận ra tự động:
 * - một câu = một thư mục có các cặp file test, ghép theo đúng quy tắc của server (TestArchive.java):
 *   `1.in`/`1.out`, `test05.inp`/`test05.ans`, `input01.txt`/`output01.txt`, kiểu Themis `Test01/BAI.INP`;
 *   thêm: thư mục `input/` + `output/` cùng tên file, test để trong thư mục con `tests/`;
 * - đề bài: file .docx, .pdf, .md hoặc .txt trong thư mục câu (ưu tiên tên de, đề, statement, problem, readme);
 *   dòng `# Tiêu đề` đầu file .md là tên câu, không có thì lấy tên thư mục; đề ghi "Giới hạn thời gian: 2 giây",
 *   "Bộ nhớ: 512 MB" thì lấy làm giới hạn của câu;
 * - nhiều câu cùng một thư mục cha = một bài; nhiều thư mục cha = nhiều bài (trang Tạo bài thi tạo cùng lúc).
 *
 * Test có tên sample/example/vd/mẫu (không có thì test đầu tiên) là test mẫu, nhỏ hơn 8 KB thì để soạn tay được;
 * các test còn lại đóng thành một file ZIP bộ test cho mỗi câu (test ẩn), như khi giảng viên tự chọn file ZIP.
 */

/** Một file đọc được: từ ZIP, từ thư mục chọn trên máy, hoặc thư mục kéo thả. */
export interface ImportSource {
  path: string;
  size: number;
  read: () => Promise<Uint8Array>;
}

interface PlannedTest {
  /** Tên hiển thị, vd. "test05", "Test01". */
  name: string;
  input: ImportSource;
  expected: ImportSource;
}

export interface PlannedProblem {
  /** Đường dẫn thư mục câu ('' = gốc). */
  dir: string;
  statement: ImportSource | null;
  tests: PlannedTest[];
  /** Lỗi ghép cặp: "test03: thiếu file output". */
  issues: string[];
}

export interface PlannedAssessment {
  /** Tên thư mục bài; null khi không có thư mục bọc ngoài. */
  title: string | null;
  problems: PlannedProblem[];
}

export interface ImportPlan {
  assessments: PlannedAssessment[];
}

/** Cùng hằng số với CodeService.ARCHIVE_LIMITS của server. */
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 64 * 1024 * 1024;

const INPUT_EXT = /\.(in|inp|input)$/i;
const OUTPUT_EXT = /\.(out|ans|ok|output|sol)$/i;
const INPUT_TXT = /^(input|in)[-_ .]?(.*)\.txt$/i;
const OUTPUT_TXT = /^(output|out|answer|ans|expected)[-_ .]?(.*)\.txt$/i;
const INPUT_DIRS = new Set(['input', 'inputs', 'in']);
const OUTPUT_DIRS = new Set(['output', 'outputs', 'out', 'answer', 'answers', 'expected']);
/** Thư mục chứa bộ test bên trong thư mục câu. */
const TEST_DIRS = new Set(['tests', 'test', 'testcases', 'testcase', 'testset', 'data']);
/** Thư mục mỗi test một cặp kiểu Themis: Test01, test1, 01, tc05. */
const PER_TEST_DIR = /^(test|tc|case)?[-_ ]?\d+[a-z]?$/i;
const STATEMENT_EXT = /\.(md|markdown|txt|docx|pdf)$/i;
const STATEMENT_NAMES = [
  'de',
  'debai',
  'de-bai',
  'de_bai',
  'statement',
  'problem',
  'readme',
  'bai',
];
const SAMPLE_NAME = /(sample|example|vidu|vi-du|vd|mau)/;

/** So tên kiểu tự nhiên (test2 trước test10), như TestArchive.natural của server. */
export const natural = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

/** Bỏ dấu tiếng Việt, chữ thường: so tên file "Đề bài" với "de-bai". */
function plain(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();
}

const parentOf = (dir: string) => (dir.includes('/') ? dir.slice(0, dir.lastIndexOf('/')) : '');
const lastOf = (dir: string) => dir.slice(dir.lastIndexOf('/') + 1);
const join = (...parts: string[]) => parts.filter(Boolean).join('/');

/** Bỏ file ẩn, __MACOSX, file rác của Windows. */
function skipped(path: string) {
  return path
    .split('/')
    .some(
      (part) =>
        part.startsWith('.') || part === '__MACOSX' || /^(thumbs\.db|desktop\.ini)$/i.test(part),
    );
}

interface Slot {
  /** Thư mục chứa test sau khi bỏ input/ output/. */
  dir: string;
  /** Khóa ghép cặp (chữ thường) và tên gốc. */
  key: string;
  label: string;
  input: boolean;
}

/** Vai trò của file trong bộ test; null = không phải file test. Cùng quy tắc với TestArchive.slot(). */
export function testSlot(path: string): Slot | null {
  const parts = path.split('/');
  const file = parts.pop()!;
  let dirRole: boolean | null = null;
  const last = parts.length ? parts[parts.length - 1].toLowerCase() : '';
  if (INPUT_DIRS.has(last) || OUTPUT_DIRS.has(last)) {
    dirRole = INPUT_DIRS.has(last);
    parts.pop();
  }
  let input: boolean | null = null;
  let stem = '';
  let m: RegExpMatchArray | null;
  if ((m = file.match(INPUT_TXT))) [input, stem] = [true, m[2]];
  else if ((m = file.match(OUTPUT_TXT))) [input, stem] = [false, m[2]];
  else if ((m = file.match(INPUT_EXT))) [input, stem] = [true, file.slice(0, m.index)];
  else if ((m = file.match(OUTPUT_EXT))) [input, stem] = [false, file.slice(0, m.index)];
  else if (dirRole !== null) [input, stem] = [dirRole, file.replace(/\.[^.]*$/, '')];
  if (input === null) return null;
  const dir = parts.join('/');
  const label = join(dir, stem);
  return { dir, key: label.toLowerCase(), label, input };
}

/** Bỏ các thư mục bọc ngoài chung của mọi file (ZIP thường bọc cả nội dung trong một thư mục). */
function stripRoot(files: ImportSource[]) {
  let root: string | null = null;
  let list = files;
  while (list.length && list.every((file) => file.path.includes('/'))) {
    const first = list[0].path.slice(0, list[0].path.indexOf('/'));
    if (!list.every((file) => file.path.startsWith(`${first}/`))) break;
    root = first;
    list = list.map((file) => ({ ...file, path: file.path.slice(first.length + 1) }));
  }
  return { root, files: list };
}

/** Điểm ưu tiên của file đề; càng nhỏ càng ưu tiên. */
function statementRank(path: string, folder: string) {
  const name = plain(lastOf(path).replace(/\.[^.]*$/, ''));
  const ext = path.slice(path.lastIndexOf('.') + 1).toLowerCase();
  const named = STATEMENT_NAMES.includes(name) || name === plain(folder) ? 0 : 1;
  const format = ext === 'docx' || ext === 'pdf' || ext === 'md' || ext === 'markdown' ? 0 : 1;
  return named * 2 + format;
}

/** Nhận ra câu, test và đề từ danh sách file (chưa đọc nội dung). */
export function planImport(sources: ImportSource[]): ImportPlan {
  const cleaned = sources
    .map((file) => ({ ...file, path: file.path.replace(/\\/g, '/').replace(/^\.?\/+/, '') }))
    .filter((file) => file.path && !skipped(file.path));
  const { root, files } = stripRoot(cleaned);

  // Gom test theo thư mục chứa
  const byDir = new Map<
    string,
    Map<string, { label: string; in: ImportSource[]; out: ImportSource[] }>
  >();
  const others: ImportSource[] = [];
  for (const file of files) {
    const slot = testSlot(file.path);
    if (!slot) {
      others.push(file);
      continue;
    }
    const pairs = byDir.get(slot.dir) ?? new Map();
    byDir.set(slot.dir, pairs);
    const pair = pairs.get(slot.key) ?? { label: slot.label, in: [], out: [] };
    pairs.set(slot.key, pair);
    (slot.input ? pair.in : pair.out).push(file);
  }

  // Thư mục câu của mỗi thư mục test: Test01/ (chỉ một cặp test, không có đề hay file khác) và tests/
  // thuộc về thư mục cha
  // Thư mục tên khác Test01 vẫn là thư mục test nếu các thư mục anh em cùng chứa một file tên chữ
  // (BAI.INP); tên số (1.in) thì là các câu chỉ có một test.
  const otherDirs = new Set(others.map((file) => parentOf(file.path)));
  const single = (dir: string) => !!dir && byDir.get(dir)!.size === 1 && !otherDirs.has(dir);
  const stemOf = (dir: string) => lastOf([...byDir.get(dir)!.keys()][0]);
  const siblings = new Map<string, number>();
  for (const dir of byDir.keys())
    if (single(dir) && /\D/.test(stemOf(dir))) {
      const group = `${parentOf(dir)}|${stemOf(dir)}`;
      siblings.set(group, (siblings.get(group) ?? 0) + 1);
    }
  const perTest = (dir: string) =>
    single(dir) &&
    (PER_TEST_DIR.test(lastOf(dir)) || (siblings.get(`${parentOf(dir)}|${stemOf(dir)}`) ?? 0) >= 2);
  const problemDirOf = (dir: string) => {
    let problem = perTest(dir) ? parentOf(dir) : dir;
    if (problem && TEST_DIRS.has(lastOf(problem).toLowerCase())) problem = parentOf(problem);
    return problem;
  };

  const problems = new Map<string, PlannedProblem>();
  for (const [dir, pairs] of byDir) {
    const problemDir = problemDirOf(dir);
    const problem = problems.get(problemDir) ?? {
      dir: problemDir,
      statement: null,
      tests: [],
      issues: [],
    };
    problems.set(problemDir, problem);
    const themis = perTest(dir);
    for (const pair of pairs.values()) {
      // Tên test tính từ thư mục câu; kiểu Themis lấy tên thư mục test (Test01)
      const relative = pair.label.slice(problemDir ? problemDir.length + 1 : 0);
      const name = themis
        ? lastOf(dir)
        : relative.replace(/^(tests?|testcases?|testset|data)\//i, '');
      if (pair.in.length > 1 || pair.out.length > 1)
        problem.issues.push(`${name}: có hai file cùng loại`);
      else if (!pair.in.length) problem.issues.push(`${name}: thiếu file input`);
      else if (!pair.out.length) problem.issues.push(`${name}: thiếu file output`);
      else problem.tests.push({ name, input: pair.in[0], expected: pair.out[0] });
    }
  }
  for (const problem of problems.values()) {
    problem.tests.sort((a, b) => natural(a.name, b.name));
    const folder = lastOf(problem.dir) || root || '';
    const candidates = others
      .filter((file) => parentOf(file.path) === problem.dir && STATEMENT_EXT.test(file.path))
      .sort(
        (a, b) =>
          statementRank(a.path, folder) - statementRank(b.path, folder) || natural(a.path, b.path),
      );
    problem.statement = candidates[0] ?? null;
  }

  // Câu cùng thư mục cha là một bài
  const groups = new Map<string, PlannedProblem[]>();
  for (const problem of [...problems.values()].sort((a, b) => natural(a.dir, b.dir))) {
    const parent = problem.dir ? parentOf(problem.dir) : '';
    groups.set(parent, [...(groups.get(parent) ?? []), problem]);
  }
  return {
    assessments: [...groups.entries()]
      .sort(([a], [b]) => natural(a, b))
      .map(([parent, list]) => ({ title: parent ? lastOf(parent) : root, problems: list })),
  };
}

/** "01-Tong_hai_so" → "Tong hai so"; "BAI1" giữ nguyên. */
export function folderTitle(folder: string) {
  const name = folder.replace(/^\d+\s*[-_.)]\s*/, '').trim() || folder;
  return name.includes(' ') ? name : name.replace(/[-_]+/g, ' ').trim();
}

/** Giới hạn ghi trong đề: "Giới hạn thời gian: 2 giây", "Time limit: 500 ms", "Bộ nhớ: 512 MB". */
export function limitsFromStatement(text: string) {
  const source = plain(text);
  let timeLimit: string | null = null;
  let memoryLimit: string | null = null;
  const time = source.match(
    /(?:thoi gian|time limit)[^\n\d]{0,20}?(\d+(?:[.,]\d+)?)\s*(ms|giay|s\b|sec|second)/,
  );
  if (time) {
    const value = Number(time[1].replace(',', '.'));
    const ms = time[2] === 'ms' ? value : value * 1000;
    if (ms >= MIN_TIME_LIMIT_MS && ms <= MAX_TIME_LIMIT_MS)
      timeLimit = String(ms / 1000).replace('.', ',');
  }
  const memory = source.match(/(?:bo nho|memory limit)[^\n\d]{0,20}?(\d+)\s*(mb|megabyte|mib)/);
  if (memory) {
    const mb = Number(memory[1]);
    if (mb >= MIN_MEMORY_MB && mb <= MAX_MEMORY_MB) memoryLimit = String(mb);
  }
  return { timeLimit, memoryLimit };
}

/** UTF-8 (bỏ BOM) như server; file .txt lưu bằng Windows-1258 / UTF-16 thì đọc theo mã đó. */
export function decodeText(bytes: Uint8Array, strict = false) {
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder('utf-16le').decode(bytes);
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder('utf-16be').decode(bytes);
  const body =
    bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf ? bytes.subarray(3) : bytes;
  if (!strict) return new TextDecoder().decode(body);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(body);
  } catch {
    return new TextDecoder('windows-1258').decode(body);
  }
}

/** Chuyển file đề thành chữ; .docx/.pdf do trang truyền vào (lib/document-text, cần trình duyệt). */
export type StatementReader = (file: ImportSource, bytes: Uint8Array) => Promise<string>;

export interface ImportedAssessment {
  title: string | null;
  problems: ProblemDraft[];
}

export interface ImportResult {
  assessments: ImportedAssessment[];
  /** Tổng số test (mẫu + ẩn) đã nhập. */
  tests: number;
  /** Cảnh báo theo câu: thiếu đề, test lỗi, vượt giới hạn. */
  warnings: string[];
}

/** Tên file trong ZIP bộ test sinh ra: bỏ ký tự đường dẫn, trùng thì thêm số. */
function archiveNames(tests: PlannedTest[]) {
  const used = new Set<string>();
  return tests.map((test) => {
    const base = test.name.replace(/[\\/:*?"<>|]+/g, '-') || 'test';
    let name = base;
    for (let n = 2; used.has(name.toLowerCase()); n++) name = `${base}-${n}`;
    used.add(name.toLowerCase());
    return name;
  });
}

/** Đọc nội dung theo kế hoạch: mỗi câu thành một ProblemDraft như khi giảng viên tự soạn. */
export async function buildImport(
  plan: ImportPlan,
  readStatement: StatementReader,
): Promise<ImportResult> {
  const warnings: string[] = [];
  let total = 0;
  const assessments: ImportedAssessment[] = [];
  for (const planned of plan.assessments) {
    const problems: ProblemDraft[] = [];
    for (const item of planned.problems) {
      const folder = lastOf(item.dir) || planned.title || '';
      const where = folder || `Câu ${problems.length + 1}`;
      const draft = emptyProblem();
      item.issues.forEach((issue) => warnings.push(`${where} – ${issue}`));

      // Đề bài, tên câu, giới hạn
      let statement = '';
      if (item.statement) {
        try {
          statement = (await readStatement(item.statement, await item.statement.read()))
            .replace(/\r\n?/g, '\n')
            .trim();
        } catch {
          warnings.push(`${where} – không đọc được file đề ${lastOf(item.statement.path)}`);
        }
      } else warnings.push(`${where} – không có file đề, hãy nhập đề bài`);
      const heading = statement.match(/^#\s+(.+)\n*/);
      if (heading) statement = statement.slice(heading[0].length).trim();
      if (statement.length > MAX_STATEMENT) {
        warnings.push(
          `${where} – đề dài hơn ${MAX_STATEMENT.toLocaleString('vi-VN')} ký tự, đã cắt bớt`,
        );
        statement = statement.slice(0, MAX_STATEMENT);
      }
      const limits = limitsFromStatement(statement);
      draft.title = (heading?.[1].trim() || (folder ? folderTitle(folder) : '')).slice(0, 200);
      // Đề Word/txt thường mở đầu bằng chính tên câu: bỏ dòng đó cho khỏi lặp; tên thư mục không dấu
      // ("So nguyen to") thì lấy dòng đó (có dấu) làm tên câu
      const firstLine = statement.match(/^(.+)\n*/);
      if (firstLine && draft.title && plain(firstLine[1].trim()) === plain(draft.title)) {
        if (!heading) draft.title = firstLine[1].trim().slice(0, 200);
        statement = statement.slice(firstLine[0].length).trim();
      }
      draft.statement = statement;
      if (limits.timeLimit) draft.timeLimit = limits.timeLimit;
      if (limits.memoryLimit) draft.memoryLimit = limits.memoryLimit;

      // Bộ test: kiểm tra giới hạn của server trước khi đóng gói
      let tests = item.tests.filter((test) => {
        const big = Math.max(test.input.size, test.expected.size) > MAX_FILE_BYTES;
        if (big) warnings.push(`${where} – ${test.name}: file quá 8 MB, đã bỏ qua`);
        return !big;
      });
      if (tests.length > MAX_TESTS) {
        warnings.push(`${where} – có ${tests.length} test, chỉ lấy ${MAX_TESTS} test đầu`);
        tests = tests.slice(0, MAX_TESTS);
      }
      const size = tests.reduce((sum, test) => sum + test.input.size + test.expected.size, 0);
      if (size > MAX_TOTAL_BYTES) {
        warnings.push(`${where} – bộ test quá 64 MB, không nhập được; hãy giảm số test`);
        tests = [];
      }
      const small = (test: PlannedTest) =>
        test.input.size <= INLINE_LIMIT && test.expected.size <= INLINE_LIMIT;
      let samples = tests.filter((test) => SAMPLE_NAME.test(plain(test.name)) && small(test));
      if (!samples.length && tests.length && small(tests[0])) samples = [tests[0]];
      const hidden = tests.filter((test) => !samples.includes(test));

      draft.tests = [];
      for (const test of samples) {
        const input = decodeText(await test.input.read());
        const expected = decodeText(await test.expected.read());
        draft.tests.push({
          ...emptyTest(true),
          name: test.name,
          input,
          expected,
          inputSize: test.input.size,
          expectedSize: test.expected.size,
        });
      }
      if (hidden.length) {
        const names = archiveNames(hidden);
        const files: { path: string; data: Uint8Array }[] = [];
        for (const [index, test] of hidden.entries()) {
          files.push({ path: `${names[index]}.in`, data: await test.input.read() });
          files.push({ path: `${names[index]}.out`, data: await test.expected.read() });
        }
        const blob = await writeZip(files);
        if (blob.size > MAX_ARCHIVE_BYTES)
          warnings.push(
            `${where} – bộ test nén vẫn lớn hơn 20 MB, server sẽ không nhận; hãy giảm số test`,
          );
        draft.archive = new File(
          [blob],
          `${plain(folder || 'bo-test').replace(/[^a-z0-9-]+/g, '-')}.zip`,
          {
            type: 'application/zip',
          },
        );
        draft.archiveCheck = {
          tests: hidden.map((test, index) => ({
            name: names[index],
            inputSize: test.input.size,
            expectedSize: test.expected.size,
          })),
          problems: [],
          ignored: 0,
        };
      }
      total += tests.length;
      problems.push(draft);
    }
    assessments.push({ title: planned.title ? folderTitle(planned.title) : null, problems });
  }
  return { assessments, tests: total, warnings };
}

/** Một câu soạn sẵn chưa nhập gì (câu trống của form mới): nhập thì thay thế thay vì thêm sau. */
export function isBlankProblem(problem: ProblemDraft) {
  return (
    !problem.id &&
    !problem.title.trim() &&
    !problem.statement.trim() &&
    !problem.archive &&
    problem.tests.every((test) => !test.input.trim() && !test.expected.trim())
  );
}

const SAMPLE_STATEMENT = `# Tổng hai số

Cho hai số nguyên a và b. Hãy in ra a + b.

Giới hạn thời gian: 1 giây
Giới hạn bộ nhớ: 256 MB

## Input
Một dòng gồm hai số nguyên a, b (|a|, |b| ≤ 10^9).

## Output
Một số nguyên là a + b.
`;

/**
 * File ZIP mẫu cho giảng viên: một bài hai câu, mỗi câu một kiểu bộ test hay gặp.
 * Thư mục chứa nhiều thư mục bài như thế này thì nhập được nhiều bài cùng lúc.
 */
export async function sampleImportZip() {
  const text = (value: string) => new TextEncoder().encode(value);
  const files: { path: string; data: Uint8Array }[] = [
    {
      path: 'Bai tap tuan 1/HUONG DAN.txt',
      data: text(
        'Mỗi thư mục con là một câu: file đề (.docx, .pdf, .md, .txt) và các cặp file test.\n' +
          'Test tên sample/vd/mau (không có thì test đầu tiên) là test mẫu, sinh viên xem được.\n' +
          'Nhập nhiều bài: đặt nhiều thư mục bài như "Bai tap tuan 1" vào chung một thư mục rồi chọn thư mục đó.\n',
      ),
    },
    { path: 'Bai tap tuan 1/01-Tong hai so/de.md', data: text(SAMPLE_STATEMENT) },
    { path: 'Bai tap tuan 1/01-Tong hai so/tests/sample.in', data: text('1 2\n') },
    { path: 'Bai tap tuan 1/01-Tong hai so/tests/sample.out', data: text('3\n') },
    { path: 'Bai tap tuan 1/01-Tong hai so/tests/1.in', data: text('-5 7\n') },
    { path: 'Bai tap tuan 1/01-Tong hai so/tests/1.out', data: text('2\n') },
    { path: 'Bai tap tuan 1/01-Tong hai so/tests/2.in', data: text('1000000000 1000000000\n') },
    { path: 'Bai tap tuan 1/01-Tong hai so/tests/2.out', data: text('2000000000\n') },
    {
      path: 'Bai tap tuan 1/02-So chan/de.md',
      data: text(
        '# Số chẵn\n\nCho số nguyên n, in YES nếu n chẵn, ngược lại in NO.\n\nThời gian: 1 giây\n',
      ),
    },
    { path: 'Bai tap tuan 1/02-So chan/Test01/SOCHAN.INP', data: text('4\n') },
    { path: 'Bai tap tuan 1/02-So chan/Test01/SOCHAN.OUT', data: text('YES\n') },
    { path: 'Bai tap tuan 1/02-So chan/Test02/SOCHAN.INP', data: text('7\n') },
    { path: 'Bai tap tuan 1/02-So chan/Test02/SOCHAN.OUT', data: text('NO\n') },
  ];
  return writeZip(files);
}
