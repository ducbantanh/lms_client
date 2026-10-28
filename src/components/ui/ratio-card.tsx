'use client';

import type { CSSProperties, ReactNode } from 'react';
import { InfoDot } from '@/components/ui/card';
import { CountUp } from '@/components/ui/charts';

/**
 * Thẻ nền xanh nổi bật: hai tỉ lệ bù nhau (vd. hoàn thành / còn lại) với thanh trượt ở giữa, chú thích bên dưới.
 * value: phần trăm bên trái (0–100).
 */
export function RatioCard({
  title,
  info,
  value,
  leftLabel,
  rightLabel,
  note,
  delay = 0,
  className = '',
}: {
  title: string;
  info?: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  note?: ReactNode;
  delay?: number;
  className?: string;
}) {
  const left = Math.max(0, Math.min(100, Math.round(value)));
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}ms` } : undefined;
  return (
    <section
      style={style}
      className={`relative isolate flex animate-fade-in flex-col overflow-hidden rounded-card bg-primary-600 p-5 text-white shadow-card ${className}`}
    >
      <header className="mb-5 flex items-center gap-2">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {info && <InfoDot text={info} />}
      </header>
      <div className="flex items-end justify-between gap-4">
        <div>
          <b className="block text-3xl font-semibold tracking-tight">
            <CountUp value={left} suffix="%" />
          </b>
          <span className="text-xs text-white/75">{leftLabel}</span>
        </div>
        <div className="text-right">
          <b className="block text-3xl font-semibold tracking-tight">
            <CountUp value={100 - left} suffix="%" />
          </b>
          <span className="text-xs text-white/75">{rightLabel}</span>
        </div>
      </div>
      <div className="relative mt-4 h-2 rounded-full bg-white/25">
        <span
          className="absolute inset-y-0 left-0 origin-left animate-grow-x rounded-full bg-white"
          style={{ width: `${left}%` }}
        />
        <span
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-fade-in rounded-full border-[3px] border-white bg-primary-500 shadow-lift [animation-delay:700ms]"
          style={{ left: `${left}%` }}
        />
      </div>
      {note && <p className="mt-auto pt-5 text-xs leading-relaxed text-white/85">{note}</p>}
    </section>
  );
}
