'use client';

import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/icon';
import { CountUp } from '@/components/ui/charts';

const TONES = {
  blue: 'bg-primary-50 text-primary-600 ring-1 ring-primary-200/60',
  green: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60',
  violet: 'bg-violet-50 text-violet-600 ring-1 ring-violet-200/60',
  red: 'bg-rose-50 text-rose-600 ring-1 ring-rose-200/60',
  amber: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200/60',
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
    <div className="group flex min-w-0 flex-col rounded-2xl border border-line/80 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] font-medium text-ink-muted">{label}</span>
        <i
          className={`grid size-10 shrink-0 place-items-center rounded-xl not-italic shadow-xs transition-transform group-hover:scale-105 ${TONES[tone]}`}
        >
          <Icon name={icon} size={15} />
        </i>
      </div>
      <b className="mt-2 text-[28px] leading-tight font-semibold text-ink tabular-nums">
        {value === undefined ? (
          <span className="skeleton inline-block h-7 w-14 align-middle" />
        ) : typeof value === 'number' ? (
          <CountUp value={value} />
        ) : (
          value
        )}
      </b>
      {href && (
        <Link
          href={href}
          className="group mt-3 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-primary-600 hover:underline"
        >
          Xem tất cả
          <Icon
            name="chevron"
            size={8}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
