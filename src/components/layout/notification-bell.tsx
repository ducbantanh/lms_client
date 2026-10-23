'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useNotifications } from '@/providers/notifications-provider';
import { CATEGORY_INFO, notificationHref, timeAgo } from '@/lib/notifications';
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
    <details className="dropdown notif-dropdown">
      <summary
        className="icon-button notif-trigger"
        aria-label={summary.unread ? `Thông báo, ${summary.unread} chưa đọc` : 'Thông báo'}
      >
        <Icon name="bell" size={17} />
        {summary.unread > 0 && (
          <span className="notif-count">{summary.unread > 99 ? '99+' : summary.unread}</span>
        )}
      </summary>
      <div className="dropdown-panel notif-panel">
        <div className="notif-panel-head">
          <b>Thông báo</b>
          {summary.unread > 0 && (
            <button className="link-button" onClick={() => void markAllRead()}>
              Đánh dấu đã đọc hết
            </button>
          )}
        </div>
        {latest.length ? (
          <ul className="notif-list compact">
            {latest.map((item) => {
              const info = CATEGORY_INFO[item.category];
              return (
                <li key={item.id} className={item.read ? '' : 'unread'}>
                  <Link
                    href={notificationHref(item)}
                    onClick={(event) => {
                      closeDropdown(event);
                      void markRead(item);
                    }}
                  >
                    <i className={`title-icon ${info.tone}`}>
                      <Icon name={info.icon} size={12} />
                    </i>
                    <span className="notif-text">
                      <b>{item.title}</b>
                      <small>
                        {item.course?.code} · {timeAgo(item.createdAt)}
                      </small>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="notif-empty">Chưa có thông báo nào.</p>
        )}
        <Link href="/notifications/" className="notif-all" onClick={closeDropdown}>
          Xem tất cả thông báo
        </Link>
      </div>
    </details>
  );
}
