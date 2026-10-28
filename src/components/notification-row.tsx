import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import { CATEGORY_INFO, type NotificationCategory } from '@/lib/notifications';
import { Icon } from '@/components/ui/icon';

/** Danh sách dòng thông báo: kẻ ngang giữa các dòng. */
export const NOTIFICATION_LIST = 'm-0 list-none divide-y divide-line p-0';

/** Nhãn loại thông báo (Bài mới, Nhắc hạn…) cùng màu với icon. */
export function CategoryBadge({ category }: { category: NotificationCategory }) {
  const info = CATEGORY_INFO[category];
  return (
    <span className={`badge m-0 bg-(--tone-soft) text-[11px] text-(--tone) ${info.tone}`}>
      {info.label}
    </span>
  );
}

/**
 * Một dòng thông báo: icon theo loại, tiêu đề, nội dung (tối đa 2 dòng), dòng phụ; chưa đọc thì nền xanh nhạt.
 * Có href thì cả dòng là link; compact dùng trong chuông và khung đầu trang.
 */
export function NotificationRow({
  category,
  title,
  body,
  meta,
  trailing,
  unread = false,
  compact = false,
  href,
  onClick,
}: {
  category: NotificationCategory;
  title: string;
  body?: string | null;
  meta: ReactNode;
  trailing?: ReactNode;
  unread?: boolean;
  compact?: boolean;
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const info = CATEGORY_INFO[category];
  const className = `flex items-start gap-3 transition-colors ${compact ? 'px-3.5 py-2.5' : 'px-5 py-3'} ${
    href ? (unread ? 'bg-primary-50 hover:bg-primary-100/70' : 'hover:bg-surface-muted') : ''
  }`;
  const content = (
    <>
      <i className={`title-icon ${info.tone}`}>
        <Icon name={info.icon} size={compact ? 12 : 13} />
      </i>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <b className={`text-sm wrap-anywhere ${unread ? 'font-bold' : 'font-semibold'}`}>{title}</b>
        {body && (
          <span className="line-clamp-2 text-[13px] whitespace-pre-line text-ink-muted">
            {body}
          </span>
        )}
        <small className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-ink-subtle">
          {meta}
        </small>
      </span>
      {trailing}
    </>
  );
  return href ? (
    <Link href={href} onClick={onClick} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
