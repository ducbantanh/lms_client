'use client';

import { useEffect, useState, type CSSProperties } from 'react';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Số đếm tăng dần từ 0 tới value (ease-out); người dùng tắt chuyển động thì hiện ngay. */
export function useCountUp(value: number, duration = 900) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let frame = 0;
    if (prefersReducedMotion()) {
      frame = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(frame);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(value * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);
  return shown;
}

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const shown = useCountUp(value);
  return (
    <span className="tabular-nums">
      {shown.toLocaleString('vi-VN')}
      {suffix}
    </span>
  );
}

/** Lần render đầu trả false, ngay sau đó true: để thuộc tính đổi từ 0 sang giá trị thật có transition. */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return mounted;
}

export interface Segment {
  label: string;
  value: number;
  /** Màu CSS, vd. var(--color-chart-green). */
  color: string;
}

/**
 * Biểu đồ vòng: các đoạn bo tròn, có khe hở giữa đoạn, vẽ dần khi vào trang. center: nội dung giữa vòng.
 * Tổng 0 thì chỉ có vòng nền.
 */
export function Donut({
  segments,
  size = 184,
  thickness = 16,
  center,
}: {
  segments: Segment[];
  size?: number;
  thickness?: number;
  center?: React.ReactNode;
}) {
  const mounted = useMounted();
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, item) => sum + item.value, 0);
  const visible = segments.filter((item) => item.value > 0);
  // Khe giữa các đoạn (độ dài cung), không có khe khi chỉ một đoạn
  const gap = visible.length > 1 ? thickness * 0.9 : 0;
  let offset = 0;
  return (
    <div
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-muted)"
          strokeWidth={thickness}
        />
        {total > 0 &&
          visible.map((item) => {
            const length = Math.max(0, (item.value / total) * circumference - gap);
            const start = offset;
            offset += (item.value / total) * circumference;
            return (
              <circle
                key={item.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={`${mounted ? length : 0} ${circumference}`}
                strokeDashoffset={-(start + gap / 2)}
                style={{ transition: 'stroke-dasharray 1.1s cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <title>{`${item.label}: ${item.value}`}</title>
              </circle>
            );
          })}
      </svg>
      {center && (
        <div className="absolute inset-0 grid place-items-center text-center">{center}</div>
      )}
    </div>
  );
}

/** Chú thích của biểu đồ: chấm màu, tên, số. */
export function Legend({ segments }: { segments: Segment[] }) {
  return (
    <ul className="m-0 grid list-none gap-2.5 p-0 text-[13px]">
      {segments.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full" style={{ background: item.color }} />
          <span className="min-w-0 flex-1 truncate text-ink-muted">{item.label}</span>
          <b className="font-semibold text-ink tabular-nums">{item.value}</b>
        </li>
      ))}
    </ul>
  );
}

/** Thanh tiến độ bo tròn, chạy từ trái khi vào trang. */
export function ProgressBar({
  value,
  color = 'var(--color-chart-amber)',
  height = 'h-2',
  delay = 0,
  className = '',
}: {
  /** 0–100. */
  value: number;
  color?: string;
  height?: string;
  delay?: number;
  className?: string;
}) {
  const width = Math.max(0, Math.min(100, value));
  const style: CSSProperties = {
    width: `${width}%`,
    background: color,
    animationDelay: `${delay}ms`,
  };
  return (
    <span className={`block overflow-hidden rounded-full bg-surface-muted ${height} ${className}`}>
      <span className="block h-full origin-left animate-grow-x rounded-full" style={style} />
    </span>
  );
}

/** Thanh chia vạch như "||||||||░░" của ảnh mẫu: số vạch tô màu theo phần trăm, hiện lần lượt. */
export function SegmentBar({
  value,
  count = 12,
  color = 'var(--color-chart-green)',
}: {
  value: number;
  count?: number;
  color?: string;
}) {
  const filled = Math.round((Math.max(0, Math.min(100, value)) / 100) * count);
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="h-3.5 w-[5px] animate-fade-in rounded-[2px]"
          style={{
            background: index < filled ? color : 'var(--color-line)',
            animationDelay: `${index * 35}ms`,
          }}
        />
      ))}
    </span>
  );
}

export interface Column {
  label: string;
  value: number;
  /** Chú thích khi rê chuột. */
  hint?: string;
}

/** Biểu đồ cột nhỏ: cột bo đầu, mọc từ dưới lên lần lượt; cột cao nhất tô đậm. */
export function ColumnChart({
  columns,
  height = 120,
  color = 'var(--color-chart-amber)',
}: {
  columns: Column[];
  height?: number;
  color?: string;
}) {
  const max = Math.max(1, ...columns.map((column) => column.value));
  const peak = columns.findIndex((column) => column.value === max && column.value > 0);
  return (
    <div className="flex items-end gap-2" style={{ height: height + 22 }}>
      {columns.map((column, index) => (
        <div key={index} className="group flex min-w-0 flex-1 flex-col items-center gap-1.5">
          <div className="relative flex w-full flex-1 items-end justify-center" style={{ height }}>
            <span className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-sm bg-sidebar px-1.5 py-0.5 text-[11px] font-semibold whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100">
              {column.hint ?? column.value}
            </span>
            <span
              className="block w-full max-w-7 origin-bottom animate-grow-y rounded-t-sm transition-[filter] group-hover:brightness-95"
              style={{
                height: `${Math.max(column.value ? 6 : 2, (column.value / max) * height)}px`,
                background: index === peak ? color : `color-mix(in srgb, ${color} 55%, white)`,
                animationDelay: `${index * 60}ms`,
              }}
            />
          </div>
          <span className="w-full truncate text-center text-[11px] text-ink-subtle">
            {column.label}
          </span>
        </div>
      ))}
    </div>
  );
}
