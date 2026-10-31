import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from '@/components/ui/icon';

/** Chấm "i" cạnh tiêu đề thẻ: rê chuột (hoặc focus) hiện giải thích. */
export function InfoDot({ text }: { text: string }) {
  return (
    <span className="group/info relative inline-grid" tabIndex={0} aria-label={text}>
      <span className="grid size-4.5 place-items-center rounded-full bg-surface-muted text-[10px] font-bold text-ink-subtle ring-1 ring-line/80 transition group-hover/info:text-ink-muted">
        i
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[260px] -translate-x-1/2 translate-y-1 rounded-xl bg-slate-900 border border-slate-700/80 px-3 py-1.5 text-xs leading-relaxed font-normal text-white opacity-0 shadow-float transition group-hover/info:translate-y-0 group-hover/info:opacity-100 group-focus/info:translate-y-0 group-focus/info:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

/** Nút mũi tên ở góc thẻ: mở trang chi tiết. */
export function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="grid size-8.5 place-items-center rounded-xl text-ink-muted transition-all hover:bg-primary-50 hover:text-primary-600 hover:scale-105 dark:hover:bg-primary-950/60 dark:hover:text-primary-300"
    >
      <Icon name="arrowRight" size={13} />
    </Link>
  );
}

/**
 * Thẻ của trang tổng quan: tiêu đề nhỏ, chấm giải thích, nút mũi tên sang trang chi tiết; hiện mờ dần khi vào
 * trang (delay để các thẻ lần lượt hiện).
 */
export function Card({
  title,
  info,
  href,
  hrefLabel = 'Xem chi tiết',
  action,
  delay = 0,
  className = '',
  bodyClassName = '',
  children,
}: {
  title?: ReactNode;
  info?: string;
  href?: string;
  hrefLabel?: string;
  action?: ReactNode;
  /** Thứ tự xuất hiện (ms). */
  delay?: number;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}ms` } : undefined;
  return (
    <section
      style={style}
      className={`flex min-w-0 animate-fade-in flex-col rounded-2xl border border-line/80 bg-surface p-6 shadow-card transition-all duration-200 hover:border-line-strong/60 hover:shadow-lift ${className}`}
    >
      {(title || href || action) && (
        <header className="mb-4 flex min-h-8 items-center gap-2">
          {title && <h2 className="text-base font-bold tracking-tight text-ink">{title}</h2>}
          {info && <InfoDot text={info} />}
          <div className="ml-auto flex items-center gap-2">
            {action}
            {href && <ArrowLink href={href} label={hrefLabel} />}
          </div>
        </header>
      )}
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

/** Khối thông báo trống kèm icon trang nhã. */
export function EmptyHint({ children, icon = 'info' }: { children: ReactNode; icon?: IconName }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <span className="grid size-11 place-items-center rounded-2xl bg-surface-muted text-ink-subtle border border-line/80 mb-3 shadow-xs">
        <Icon name={icon} size={18} />
      </span>
      <p className="text-sm font-medium text-ink-muted max-w-sm leading-relaxed">{children}</p>
    </div>
  );
}

/** Khối xám nhấp nháy giữ chỗ khi đang tải. */
export function Skeleton({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`skeleton block ${className}`} />;
}

/** Tiêu đề trang: chữ lớn, mô tả nhạt, nút thao tác bên phải. */
export function PageHeading({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ink">{title}</h1>
        {description && <p className="mt-1.5 text-sm font-medium text-ink-muted">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2.5">{children}</div>}
    </div>
  );
}
