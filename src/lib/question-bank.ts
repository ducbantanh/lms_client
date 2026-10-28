import { normalizeSearch } from './course-utils.ts';

/** Kiểu dữ liệu khớp QuestionBankViews của Spring (lms.question); mọi id là public_id. */

/** Khớp BankQuestion.DIFFICULTY_*. */
export type Difficulty = 0 | 1 | 2;

export interface QuestionBankSummary {
  id: string;
  name: string;
  description: string | null;
  /** Môn học (mã học phần, như mã khóa học); null = chưa gắn môn. */
  subjectCode: string | null;
  subjectName: string | null;
  questionCount: number;
  createdAt: string;
  /** Lần sửa ngân hàng hoặc câu hỏi bên trong gần nhất. */
  updatedAt: string;
}

/** Môn học chọn được cho ngân hàng (GET /teacher/question-banks/subjects): học phần mình phụ trách. */
export interface Subject {
  code: string;
  name: string;
}

/** "INT1340 · Lập trình Java". */
export function subjectLabel(code: string, name: string | null) {
  return name ? `${code} · ${name}` : code;
}

export interface BankGroup {
  /** null = các ngân hàng chưa gắn môn học. */
  subject: Subject | null;
  banks: QuestionBankSummary[];
}

/**
 * Gom ngân hàng theo môn học (mã không phân biệt hoa thường), sắp theo mã; nhóm chưa gắn môn để cuối.
 * Trong mỗi nhóm giữ thứ tự của danh sách (server trả ngân hàng sửa gần nhất trước).
 */
export function groupBySubject(banks: QuestionBankSummary[]): BankGroup[] {
  const groups = new Map<string, BankGroup>();
  const loose: QuestionBankSummary[] = [];
  for (const bank of banks) {
    if (!bank.subjectCode) {
      loose.push(bank);
      continue;
    }
    const key = bank.subjectCode.toUpperCase();
    const group = groups.get(key);
    if (group) group.banks.push(bank);
    else
      groups.set(key, {
        subject: { code: bank.subjectCode, name: bank.subjectName ?? '' },
        banks: [bank],
      });
  }
  const sorted = [...groups.values()].sort((a, b) =>
    a.subject!.code.localeCompare(b.subject!.code, 'vi', { numeric: true }),
  );
  return loose.length ? [...sorted, { subject: null, banks: loose }] : sorted;
}

export interface QuestionOption {
  body: string;
  correct: boolean;
}

export interface BankQuestion {
  id: string;
  /** Văn bản thuần, giữ xuống dòng. */
  body: string;
  /** Sinh viên được chọn nhiều đáp án (có thể chỉ một đáp án đúng). */
  multiple: boolean;
  difficulty: Difficulty;
  explanation: string | null;
  /** Theo thứ tự A, B, C... */
  options: QuestionOption[];
  createdAt: string;
  updatedAt: string;
}

/** GET /teacher/question-banks/{id}: câu hỏi theo thứ tự thêm vào. */
export interface QuestionBankDetail {
  bank: QuestionBankSummary;
  questions: BankQuestion[];
}

export interface ImportIssue {
  /** Dòng đầu của câu bị lỗi trong văn bản dán vào. */
  line: number;
  reason: string;
}

/** Có lỗi thì server không thêm câu nào (added = 0). */
export interface ImportReport {
  added: number;
  errors: ImportIssue[];
}

export const DIFFICULTIES: Record<Difficulty, { label: string; tone: string }> = {
  0: { label: 'Dễ', tone: 'ok' },
  1: { label: 'Trung bình', tone: 'muted' },
  2: { label: 'Khó', tone: 'warn' },
};

/** Giống QuestionImportParser và QuestionBankService của server. */
export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 10;
export const MAX_BODY = 4000;
export const MAX_OPTION = 1000;
export const MAX_EXPLANATION = 2000;
export const MAX_IMPORT = 500;
export const MAX_QUESTIONS = 2000;

/** 0 → "A", 1 → "B"... */
export function optionLetter(index: number) {
  return String.fromCharCode(65 + index);
}

/** Nội dung form soạn câu hỏi (cũng là body của POST/PUT câu hỏi sau khi trim). */
export interface QuestionDraft {
  body: string;
  multiple: boolean;
  difficulty: Difficulty;
  explanation: string;
  options: QuestionOption[];
}

/** Câu mới: 4 đáp án trống; giữ kiểu câu và mức độ của câu vừa soạn khi bấm "Lưu và thêm câu khác". */
export function emptyDraft(keep?: Pick<QuestionDraft, 'multiple' | 'difficulty'>): QuestionDraft {
  return {
    body: '',
    multiple: keep?.multiple ?? false,
    difficulty: keep?.difficulty ?? 1,
    explanation: '',
    options: Array.from({ length: 4 }, () => ({ body: '', correct: false })),
  };
}

export function draftFrom(question: BankQuestion): QuestionDraft {
  return {
    body: question.body,
    multiple: question.multiple,
    difficulty: question.difficulty,
    explanation: question.explanation ?? '',
    options: question.options.map((option) => ({ ...option })),
  };
}

/** Đánh dấu đáp án đúng: câu chọn một thì chỉ còn đáp án vừa chọn, câu chọn nhiều thì bật/tắt. */
export function setCorrect(draft: QuestionDraft, index: number, checked: boolean): QuestionDraft {
  return {
    ...draft,
    options: draft.options.map((option, i) =>
      i === index
        ? { ...option, correct: checked }
        : draft.multiple
          ? option
          : { ...option, correct: false },
    ),
  };
}

/** Chuyển sang câu chọn một: chỉ giữ đáp án đúng đầu tiên. */
export function setMultiple(draft: QuestionDraft, multiple: boolean): QuestionDraft {
  if (multiple) return { ...draft, multiple };
  const first = draft.options.findIndex((option) => option.correct);
  return {
    ...draft,
    multiple,
    options: draft.options.map((option, i) => ({ ...option, correct: i === first })),
  };
}

/** Kiểm tra trước khi gửi (server kiểm tra lại); null = hợp lệ. */
export function questionProblem(draft: QuestionDraft): string | null {
  if (!draft.body.trim()) return 'Nhập nội dung câu hỏi.';
  if (draft.body.trim().length > MAX_BODY) return `Nội dung câu hỏi tối đa ${MAX_BODY} ký tự.`;
  const blank = draft.options.findIndex((option) => !option.body.trim());
  if (blank >= 0)
    return `Đáp án ${optionLetter(blank)} đang trống: điền nội dung hoặc xóa đáp án này.`;
  if (draft.options.length < MIN_OPTIONS) return `Cần ít nhất ${MIN_OPTIONS} đáp án.`;
  if (draft.options.length > MAX_OPTIONS) return `Tối đa ${MAX_OPTIONS} đáp án.`;
  const correct = draft.options.filter((option) => option.correct).length;
  if (!correct) return 'Đánh dấu đáp án đúng.';
  if (!draft.multiple && correct > 1) return 'Câu chọn một đáp án chỉ được có một đáp án đúng.';
  return null;
}

export function toQuestionRequest(draft: QuestionDraft) {
  return {
    body: draft.body.trim(),
    multiple: draft.multiple,
    difficulty: draft.difficulty,
    explanation: draft.explanation.trim(),
    options: draft.options.map((option) => ({
      body: option.body.trim(),
      correct: option.correct,
    })),
  };
}

export type DifficultyFilter = 'all' | Difficulty;

/** Tìm trong nội dung câu hỏi và đáp án (không phân biệt dấu), lọc theo mức độ; giữ thứ tự. */
export function filterQuestions(
  questions: BankQuestion[],
  query: { search: string; difficulty: DifficultyFilter },
): BankQuestion[] {
  const needle = normalizeSearch(query.search);
  return questions.filter(
    (question) =>
      (query.difficulty === 'all' || question.difficulty === query.difficulty) &&
      (!needle ||
        normalizeSearch(
          `${question.body} ${question.options.map((option) => option.body).join(' ')}`,
        ).includes(needle)),
  );
}

/** Lý do lỗi khi nhập từ văn bản, khớp hằng số của QuestionImportParser. */
const IMPORT_REASONS: Record<string, string> = {
  EMPTY_QUESTION: 'Câu hỏi không có nội dung.',
  NO_OPTIONS: 'Không có đáp án nào (đáp án bắt đầu bằng "A.", "B." ...).',
  TOO_FEW_OPTIONS: `Cần ít nhất ${MIN_OPTIONS} đáp án.`,
  TOO_MANY_OPTIONS: `Tối đa ${MAX_OPTIONS} đáp án.`,
  MISSING_ANSWER: 'Chưa có đáp án đúng (thêm dòng "ĐÁP ÁN: A" hoặc dấu * trước đáp án đúng).',
  INVALID_ANSWER: 'Dòng ĐÁP ÁN ghi chữ cái không có trong các đáp án.',
  INVALID_DIFFICULTY: 'Mức độ chỉ nhận: dễ, trung bình, khó.',
  TOO_LONG: `Quá dài (câu hỏi tối đa ${MAX_BODY} ký tự, đáp án ${MAX_OPTION}, giải thích ${MAX_EXPLANATION}).`,
};

export function importIssueText(issue: ImportIssue) {
  return `Dòng ${issue.line}: ${IMPORT_REASONS[issue.reason] ?? issue.reason}`;
}

/** Mẫu hiện trong hộp thoại nhập; khớp ví dụ trong Javadoc của QuestionImportParser. */
export const IMPORT_SAMPLE = `Câu 1: Java chạy trên gì?
A. JVM
B. CLR
C. Trình duyệt
ĐÁP ÁN: A
MỨC ĐỘ: dễ
GIẢI THÍCH: Mã Java được biên dịch ra bytecode chạy trên JVM.

Câu 2: Chọn các kiểu dữ liệu nguyên thủy
*A. int
B. String
*C. boolean`;
