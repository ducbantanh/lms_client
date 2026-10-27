import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '@/components/ui/icon';

/** Chấm "i" cạnh tiêu đề thẻ: rê chuột (hoặc focus) hiện giải thích. */
export function InfoDot({ text }: { text: string }) {
  return (
    <span className="group/info relative inline-grid" tabIndex={0} aria-label={text}>
      <span className="grid size-4 place-items-center rounded-full bg-surface-muted text-[9px] font-bold text-ink-subtle ring-1 ring-line transition group-hover/info:text-ink-muted">
        i
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[240px] -translate-x-1/2 translate-y-1 rounded-sm bg-sidebar px-2.5 py-1.5 text-xs leading-snug font-normal text-white opacity-0 shadow-float transition group-hover/info:translate-y-0 group-hover/info:opacity-100 group-focus/info:translate-y-0 group-focus/info:opacity-100"
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
      className="grid size-8 place-items-center rounded-sm text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary-600"
    >
      <Icon name="arrowRight" size={11} />
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
      className={`flex min-w-0 animate-fade-in flex-col rounded-card border border-line bg-white p-5 shadow-card ${className}`}
    >
      {(title || href || action) && (
        <header className="mb-4 flex min-h-8 items-center gap-2">
          {title && <h2 className="text-[15px] font-semibold text-ink">{title}</h2>}
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

/** Dòng chữ nhạt khi thẻ không có dữ liệu. */
export function EmptyHint({ children }: { children: ReactNode }) {
  return <p className="py-8 text-center text-sm text-ink-subtle">{children}</p>;
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
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl leading-tight font-semibold text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}
