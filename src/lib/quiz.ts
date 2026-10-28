import type { Difficulty } from './question-bank.ts';
import type { AssessmentType } from './teaching.ts';

/** Kiểu dữ liệu khớp QuizViews của Spring (lms.quiz); mọi id là public_id. */

export type QuizPhase = 'not_started' | 'in_progress' | 'finished';

export interface QuizOptionView {
  /** Vị trí gốc của đáp án (0 = A trong đề gốc); thứ tự hiển thị có thể đã xáo. */
  position: number;
  body: string;
  /** null = chưa được xem đáp án. */
  correct: boolean | null;
}

export interface QuizQuestionView {
  id: string;
  body: string;
  multiple: boolean;
  options: QuizOptionView[];
  /** Vị trí các đáp án đã chọn. */
  chosen: number[];
  /** null = chưa được xem đáp án. */
  correct: boolean | null;
  explanation: string | null;
}

export interface QuizResult {
  correct: number;
  total: number;
  /** Điểm chính thức thang 10 (giảng viên có thể đã sửa). */
  score: number;
}

/** GET /student/assessments/{id}/quiz. */
export interface QuizState {
  phase: QuizPhase;
  questionCount: number;
  timeLimitMinutes: number | null;
  startedAt: string | null;
  /** Hạn làm bài của mình; null = không hạn. */
  deadline: string | null;
  submittedAt: string | null;
  revealed: boolean;
  /** Có khi đang làm, hoặc đã xong và được xem đáp án. */
  questions: QuizQuestionView[];
  result: QuizResult | null;
  /** Đã nộp nhưng điểm công bố sau giờ đóng bài: result null, chưa xem được đáp án. */
  scoreHidden: boolean;
  serverTime: string;
}

export interface AnswerSaved {
  questionId: string;
  chosen: number[];
  savedAt: string;
}

export interface QuestionStat {
  questionId: string;
  answered: number;
  correct: number;
}

/** GET /teacher/courses/{id}/assessments/{aid}/quiz: đề (kèm đáp án) và tỷ lệ đúng từng câu. */
export interface TeacherQuiz {
  questions: QuizQuestionView[];
  stats: QuestionStat[];
  /** Số bài đã chốt. */
  finished: number;
}

/** GET .../submissions/{studentId}/quiz: bài làm của một sinh viên. */
export interface StudentReview {
  studentId: string;
  username: string;
  fullName: string;
  startedAt: string | null;
  submittedAt: string | null;
  result: QuizResult | null;
  questions: QuizQuestionView[];
}

/** Khớp Assessment.REVEAL_*. */
export type RevealMode = 0 | 1 | 2;
export const REVEAL_MODES: Record<RevealMode, string> = {
  0: 'Không cho xem đáp án',
  1: 'Ngay sau khi nộp bài',
  2: 'Sau giờ đóng bài',
};

/** Loại bài tạo được ở trang Tạo bài thi (Assessment.TYPE_LAB, TYPE_EXAM). */
/** Loại bài chọn ở trang Tạo bài; bài tập không có hình thức trắc nghiệm (xem modeAllowed). */
export const EXAM_TYPES: { value: AssessmentType; label: string }[] = [
  { value: 0, label: 'Bài tập' },
  { value: 1, label: 'Bài thực hành' },
  { value: 2, label: 'Bài kiểm tra' },
];

/** Giống QuizService.MAX_QUESTIONS và giới hạn timeLimitMinutes của server. */
export const MAX_QUIZ_QUESTIONS = 200;
export const MAX_TIME_LIMIT = 600;

/** Chọn đáp án: câu chọn một thay đáp án cũ, câu chọn nhiều bật/tắt; kết quả sắp tăng dần. */
export function toggleChoice(chosen: number[], position: number, multiple: boolean): number[] {
  if (!multiple) return [position];
  return chosen.includes(position)
    ? chosen.filter((value) => value !== position)
    : [...chosen, position].sort((a, b) => a - b);
}

export function answeredCount(questions: Pick<QuizQuestionView, 'chosen'>[]) {
  return questions.filter((question) => question.chosen.length > 0).length;
}

export type DifficultyCounts = Record<Difficulty, number>;

/**
 * Bốc ngẫu nhiên mỗi mức độ `counts[d]` câu trong `pool` (đã bỏ câu đã chọn).
 * `missing` là số câu còn thiếu khi mức độ đó không đủ câu. random truyền vào để test.
 */
export function pickRandom<T extends { difficulty: Difficulty }>(
  pool: T[],
  counts: DifficultyCounts,
  random: () => number = Math.random,
): { picked: T[]; missing: DifficultyCounts } {
  const picked: T[] = [];
  const missing: DifficultyCounts = { 0: 0, 1: 0, 2: 0 };
  for (const level of [0, 1, 2] as Difficulty[]) {
    const candidates = pool.filter((item) => item.difficulty === level);
    // Fisher–Yates trên bản sao, lấy phần đầu
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    const want = Math.max(0, Math.floor(counts[level]));
    picked.push(...candidates.slice(0, want));
    missing[level] = Math.max(0, want - candidates.length);
  }
  return { picked, missing };
}

/**
 * Hình thức bài tạo ở trang Tạo bài thi: trắc nghiệm từ ngân hàng, tải đề PDF lên để sinh viên nộp file,
 * hoặc bài lập trình chấm tự động bằng bộ test (lib/code.ts).
 */
export type ExamMode = 'quiz' | 'file' | 'code';

export const EXAM_MODES: { value: ExamMode; label: string }[] = [
  { value: 'quiz', label: 'Trắc nghiệm từ ngân hàng' },
  { value: 'file', label: 'Tải đề lên, sinh viên nộp file' },
  { value: 'code', label: 'Lập trình, chấm tự động' },
];

/** Giống QuizViews.CreateQuizRequest (type 1..2): bài trắc nghiệm chỉ là bài thực hành hoặc bài kiểm tra. */
export function modeAllowed(mode: ExamMode, type: AssessmentType) {
  return mode !== 'quiz' || type !== 0;
}

export interface ExamForm {
  mode: ExamMode;
  type: AssessmentType;
  courseId: string;
  title: string;
  /** Giá trị ô datetime-local đã đổi sang ISO (null = trống). */
  opensAt: string | null;
  closesAt: string | null;
  /** Ô số phút ('' = không giới hạn). */
  timeLimit: string;
  questionCount: number;
  /** Đã chọn file đề PDF (hình thức tải đề lên). */
  hasPaper: boolean;
  /** Khớp Assessment.SCORE_*: 1 = công bố điểm sau giờ đóng bài (cần giờ đóng), 2 = không công bố. */
  scoreRelease: 0 | 1 | 2;
}

/** Kiểm tra form tạo bài thi trước khi gửi (server kiểm tra lại); null = hợp lệ. */
export function examProblem(form: ExamForm): string | null {
  if (!form.courseId) return 'Chọn khóa học.';
  if (!form.title.trim()) return 'Nhập tiêu đề bài.';
  if (form.opensAt && form.closesAt && form.closesAt <= form.opensAt)
    return 'Giờ đóng phải sau giờ mở.';
  // Giống CourseContentService.requireScoreRelease: không có giờ đóng thì không có lúc công bố
  if (form.scoreRelease === 1 && !form.closesAt)
    return 'Công bố điểm sau giờ đóng bài thì cần chọn giờ đóng.';
  if (!modeAllowed(form.mode, form.type))
    return 'Bài tập chỉ tạo được dạng tải đề lên hoặc lập trình.';
  // Đề và bộ test của bài lập trình kiểm tra riêng bằng problemDraftProblem (lib/code.ts)
  if (form.mode === 'code') return null;
  // Giống CourseContentService: bài kiểm tra nộp file bắt buộc có đề PDF
  if (form.mode === 'file')
    return form.type === 2 && !form.hasPaper ? 'Bài kiểm tra cần có file đề (PDF).' : null;
  if (form.timeLimit.trim()) {
    const minutes = Number(form.timeLimit);
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > MAX_TIME_LIMIT)
      return `Thời gian làm bài là số phút nguyên từ 1 đến ${MAX_TIME_LIMIT}.`;
  }
  if (!form.questionCount) return 'Chọn ít nhất một câu hỏi cho đề.';
  if (form.questionCount > MAX_QUIZ_QUESTIONS) return `Mỗi đề tối đa ${MAX_QUIZ_QUESTIONS} câu.`;
  return null;
}

/** Số phút trong ô → giá trị gửi server (null = không giới hạn). */
export function parseTimeLimit(text: string) {
  return text.trim() ? Number(text) : null;
}
