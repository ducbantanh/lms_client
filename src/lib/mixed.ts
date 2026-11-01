/**
 * Bài tổng hợp (Assessment.MODE_MIXED = 3): từ hai phần trở lên trong trắc nghiệm, lập trình, nộp file; mỗi phần
 * có điểm tối đa, tổng 10. Sinh viên bấm "Bắt đầu" một lần, làm các phần qua API của từng phần, nộp một lần cho
 * cả bài (lms_server lms.mixed).
 */
import { MAX_SCORE, type MixedPartKey } from './teaching.ts';

export const MIXED_PART_KEYS: MixedPartKey[] = ['quiz', 'code', 'file'];

/** Mô tả từng phần trên form tạo bài. */
export const MIXED_PART_HINTS: Record<MixedPartKey, string> = {
  quiz: 'Câu hỏi từ ngân hàng; điểm phần = số câu đúng / tổng số câu × điểm tối đa.',
  code: 'Câu lập trình chấm bằng bộ test; điểm phần = số câu đúng hết test (AC) / tổng số câu × điểm tối đa.',
  file: 'Sinh viên tải file bài làm lên (đề PDF không bắt buộc); bạn chấm tay, tối đa bằng điểm của phần.',
};

/** Khớp MixedViews.QuizPartView; correct, points chỉ có khi đã nộp và điểm đã công bố. */
export interface MixedQuizPart {
  weight: number;
  questionCount: number;
  correct: number | null;
  points: number | null;
}

/** Khớp MixedViews.CodePartView; accepted = số câu AC. pending: còn lần nộp đang chấm (điểm có thể tăng). */
export interface MixedCodePart {
  weight: number;
  problemCount: number;
  accepted: number | null;
  points: number | null;
  pending: boolean;
}

/** Khớp MixedViews.FilePartView; points là điểm giảng viên chấm (null = chưa chấm hoặc chưa công bố). */
export interface MixedFilePart {
  weight: number;
  fileCount: number;
  points: number | null;
}

/** GET /student/assessments/{id}/mixed (khớp MixedViews.MixedState). */
export interface MixedState {
  phase: 'not_started' | 'in_progress' | 'finished';
  timeLimitMinutes: number | null;
  startedAt: string | null;
  /** Hạn làm bài chung cho mọi phần; null = không hạn. */
  deadline: string | null;
  submittedAt: string | null;
  quiz: MixedQuizPart | null;
  code: MixedCodePart | null;
  file: MixedFilePart | null;
  /** Điểm cả bài; null khi chưa công bố hoặc phần nộp file chưa chấm. */
  score: number | null;
  feedback: string | null;
  scoreHidden: boolean;
  serverTime: string;
}

/** Điểm tối đa mặc định khi bật/tắt phần trên form: chia đều, phần lẻ dồn vào phần đầu. */
export function defaultWeights(keys: MixedPartKey[]): Partial<Record<MixedPartKey, string>> {
  if (!keys.length) return {};
  const base = Math.floor((MAX_SCORE / keys.length) * 2) / 2;
  const first = MAX_SCORE - base * (keys.length - 1);
  return Object.fromEntries(
    keys.map((key, index) => [key, String(index === 0 ? first : base).replace('.', ',')]),
  );
}

/** Ô điểm tối đa → số (dấu phẩy hoặc chấm); sai định dạng thì NaN. */
export function parseWeight(text: string) {
  const trimmed = text.trim().replace(',', '.');
  return /^\d{1,2}(\.\d{1,2})?$/.test(trimmed) ? Number(trimmed) : Number.NaN;
}

/**
 * Kiểm tra điểm tối đa các phần đang bật (giống MixedGrader.requireWeights); null = hợp lệ. Cộng theo đơn vị
 * 0,01 điểm để tránh sai số số thực.
 */
export function mixedWeightsProblem(
  keys: MixedPartKey[],
  weights: Partial<Record<MixedPartKey, string>>,
): string | null {
  if (keys.length < 2) return 'Bài tổng hợp cần ít nhất hai phần.';
  let cents = 0;
  for (const key of keys) {
    const value = parseWeight(weights[key] ?? '');
    if (!(value > 0)) return 'Điểm tối đa mỗi phần là số lớn hơn 0, tối đa 2 chữ số thập phân.';
    cents += Math.round(value * 100);
  }
  if (cents !== MAX_SCORE * 100)
    return `Tổng điểm các phần phải bằng ${MAX_SCORE} (đang là ${(cents / 100).toLocaleString('vi-VN')}).`;
  return null;
}

/** Tổng điểm các phần đang bật (ô sai định dạng tính 0), để hiện trên form. */
export function weightTotal(keys: MixedPartKey[], weights: Partial<Record<MixedPartKey, string>>) {
  return (
    keys.reduce((sum, key) => {
      const value = parseWeight(weights[key] ?? '');
      return sum + (Number.isNaN(value) ? 0 : Math.round(value * 100));
    }, 0) / 100
  );
}
