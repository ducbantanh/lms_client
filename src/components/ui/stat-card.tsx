'use client';

import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/icon';
import { CountUp } from '@/components/ui/charts';

const TONES = {
  blue: 'bg-primary-50 text-primary-600 ring-1 ring-primary-200/80 dark:bg-primary-950/60 dark:text-primary-300 dark:ring-primary-800/80',
  green: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-800/80',
  violet: 'bg-violet-50 text-violet-600 ring-1 ring-violet-200/80 dark:bg-violet-950/60 dark:text-violet-300 dark:ring-violet-800/80',
  red: 'bg-rose-50 text-rose-600 ring-1 ring-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:ring-rose-800/80',
  amber: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-800/80',
} as const;

/** Thẻ số liệu: nhãn, giá trị đếm tăng dần, icon màu ở góc; `href` thêm link "Xem tất cả". */
export function StatCard({
  label,
  value,
  icon,
  tone,
  href,
}: {
  label: string;
  /** Số đếm, hoặc chuỗi đã định dạng (ví dụ điểm "8,5"); undefined = đang tải. */
  value: number | string | undefined;
  icon: IconName;
  tone: keyof typeof TONES;
  href?: string;
}) {
  return (
    <div className="group flex min-w-0 flex-col rounded-2xl border border-line/80 bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary-300/60 hover:shadow-lift dark:hover:border-primary-500/50">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] font-semibold text-ink-muted">{label}</span>
        <i
          className={`grid size-10.5 shrink-0 place-items-center rounded-2xl not-italic shadow-xs transition-transform group-hover:scale-110 ${TONES[tone]}`}
        >
          <Icon name={icon} size={16} />
        </i>
      </div>
      <b className="mt-3 text-3xl font-black text-ink tracking-tight tabular-nums">
        {value === undefined ? (
          <span className="skeleton inline-block h-8 w-16 rounded-lg align-middle" />
        ) : typeof value === 'number' ? (
          <CountUp value={value} />
        ) : (
          value
        )}
      </b>
      {href && (
        <Link
          href={href}
          className="group/link mt-3.5 inline-flex items-center gap-1.5 self-start text-xs font-bold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
        >
          Xem tất cả
          <Icon
            name="chevron"
            size={9}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
