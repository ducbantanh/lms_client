/** Hàm thuần cho các trang Tổng quan (sinh viên, giảng viên, admin). */

/** Lời chào theo giờ trong ngày (giờ máy người dùng). */
export function greeting(hour: number): string {
  if (hour < 11) return 'Chào buổi sáng';
  if (hour < 13) return 'Chào buổi trưa';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

/** Tên gọi: chữ cuối của họ tên (người Việt gọi theo tên). */
export function firstName(fullName: string | undefined): string {
  return fullName?.trim().split(/\s+/).at(-1) ?? '';
}

export interface ProgressBuckets {
  done: number;
  learning: number;
  notStarted: number;
}

/** Chia khóa học theo tiến độ: học xong (100%), đang học (1–99%), chưa bắt đầu (0% hoặc chưa có bài để tính). */
export function progressBuckets(progresses: (number | null)[]): ProgressBuckets {
  const buckets: ProgressBuckets = { done: 0, learning: 0, notStarted: 0 };
  for (const value of progresses) {
    if (value !== null && value >= 100) buckets.done++;
    else if (value !== null && value > 0) buckets.learning++;
    else buckets.notStarted++;
  }
  return buckets;
}

/** Trung bình làm tròn của các giá trị khác null; null nếu không có giá trị nào. */
export function average(values: (number | null)[]): number | null {
  const known = values.filter((value): value is number => value !== null);
  if (!known.length) return null;
  return Math.round(known.reduce((sum, value) => sum + value, 0) / known.length);
}

/**
 * Giữ `limit` mục lớn nhất cho biểu đồ vòng, gộp phần còn lại thành "Khác" (bỏ mục bằng 0): biểu đồ quá nhiều
 * đoạn thì không đọc được.
 */
export function topWithOther<T>(
  items: T[],
  value: (item: T) => number,
  label: (item: T) => string,
  limit = 4,
): { label: string; value: number }[] {
  const sorted = items
    .map((item) => ({ label: label(item), value: value(item) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);
  if (sorted.length <= limit + 1) return sorted;
  const rest = sorted.slice(limit).reduce((sum, item) => sum + item.value, 0);
  return [...sorted.slice(0, limit), { label: 'Khác', value: rest }];
}

/** Phần trăm làm tròn của part / total; total 0 thì 0. */
export function percent(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

/** Bảng màu cho các đoạn của biểu đồ, theo thứ tự (khớp --color-chart-* trong globals.css). */
export const CHART_COLORS = [
  'var(--color-chart-blue)',
  'var(--color-chart-green)',
  'var(--color-chart-amber)',
  'var(--color-chart-violet)',
  'var(--color-chart-rose)',
  'var(--color-chart-sky)',
];
