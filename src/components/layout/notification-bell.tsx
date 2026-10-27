'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useNotifications } from '@/providers/notifications-provider';
import { notificationHref, timeAgo } from '@/lib/notifications';
import { NOTIFICATION_LIST, NotificationRow } from '@/components/notification-row';
import { Icon } from '@/components/ui/icon';

/** Đóng dropdown <details> chứa phần tử được bấm (link chuyển trang không tự đóng nó). */
function closeDropdown(event: MouseEvent<HTMLElement>) {
  event.currentTarget.closest('details')?.removeAttribute('open');
}

/** Chuông trên thanh trên cùng: số chưa đọc và vài thông báo mới nhất. */
export function NotificationBell() {
  const notifications = useNotifications();
  if (!notifications) return null;
  const { summary, latest, markRead, markAllRead } = notifications;

  return (
    <details className="dropdown group">
      <summary
        className="icon-button relative list-none group-open:bg-surface-muted group-open:text-ink [&::-webkit-details-marker]:hidden"
        aria-label={summary.unread ? `Thông báo, ${summary.unread} chưa đọc` : 'Thông báo'}
      >
        <Icon name="bell" size={17} />
        {summary.unread > 0 && (
          <span className="absolute -top-1 -right-1.5 h-4.5 min-w-4.5 rounded-full border-2 border-white bg-red-600 px-[5px] text-center text-[11px] leading-[14px] font-bold text-white">
            {summary.unread > 99 ? '99+' : summary.unread}
          </span>
        )}
      </summary>
      <div className="dropdown-panel w-[min(380px,calc(100vw-32px))] p-0">
        <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-3">
          <b className="text-[15px]">Thông báo</b>
          {summary.unread > 0 && (
            <button className="link-button" onClick={() => void markAllRead()}>
              Đánh dấu đã đọc hết
            </button>
          )}
        </div>
        {latest.length ? (
          <ul className={NOTIFICATION_LIST}>
            {latest.map((item) => (
              <li key={item.id}>
                <NotificationRow
                  compact
                  category={item.category}
                  title={item.title}
                  unread={!item.read}
                  meta={`${item.course?.code ?? ''} · ${timeAgo(item.createdAt)}`}
                  href={notificationHref(item)}
                  onClick={(event) => {
                    closeDropdown(event);
                    void markRead(item);
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-3.5 py-7 text-center text-sm text-ink-muted">Chưa có thông báo nào.</p>
        )}
        <Link
          href="/notifications/"
          className="rounded-none border-t border-line px-3.5 py-2.5 text-center text-[13px] font-semibold text-primary-600"
          onClick={closeDropdown}
        >
          Xem tất cả thông báo
        </Link>
      </div>
    </details>
  );
}
