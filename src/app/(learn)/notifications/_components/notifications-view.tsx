'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { useNotifications } from '@/providers/notifications-provider';
import {
  CATEGORY_INFO,
  NOTIFICATION_CATEGORIES,
  notificationHref,
  timeAgo,
  type AppNotification,
  type NotificationCategory,
  type NotificationPage,
} from '@/lib/notifications';
import { Icon } from '@/components/ui/icon';

const PAGE_SIZE = 20;

/** Trang /notifications/: mọi thông báo của mình, lọc theo loại và chưa đọc. */
export function NotificationsView() {
  const notifications = useNotifications();
  const version = notifications?.version ?? 0;
  const [category, setCategory] = useState<NotificationCategory | 'all'>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /** Tải một trang và ghép vào danh sách; trạng thái "đang tải" do nơi gọi bật. */
  const fetchPage = useCallback(
    (nextPage: number) => {
      const query = new URLSearchParams({ page: String(nextPage), size: String(PAGE_SIZE) });
      if (category !== 'all') query.set('category', category);
      if (unreadOnly) query.set('unread', 'true');
      return apiRequest<NotificationPage>(`/notifications?${query}`)
        .then((result) => {
          setItems((current) => (nextPage === 0 ? result.items : [...current, ...result.items]));
          setPage(result.page);
          setTotalPages(result.totalPages);
        })
        .catch((reason) => {
          setError(reason instanceof Error ? reason.message : 'Không tải được thông báo.');
        })
        .finally(() => setLoading(false));
    },
    [category, unreadOnly],
  );

  // Đổi bộ lọc, có thông báo mới hoặc vừa đánh dấu đã đọc thì tải lại từ đầu:
  // bật "đang tải" ngay trong lần render này, effect bên dưới gửi request.
  const listKey = `${category}|${unreadOnly}|${version}`;
  const [shownKey, setShownKey] = useState(listKey);
  if (shownKey !== listKey) {
    setShownKey(listKey);
    setLoading(true);
    setError('');
  }

  useEffect(() => {
    void fetchPage(0);
  }, [fetchPage, version]);

  function loadMore() {
    setLoading(true);
    setError('');
    void fetchPage(page + 1);
  }

  if (!notifications) return null;
  const { summary, markRead, markAllRead } = notifications;
  const tabs: { value: NotificationCategory | 'all'; label: string; unread: number }[] = [
    { value: 'all', label: 'Tất cả', unread: summary.unread },
    ...NOTIFICATION_CATEGORIES.map((value) => ({
      value,
      label: CATEGORY_INFO[value].label,
      unread: summary.byCategory[value] ?? 0,
    })),
  ];

  return (
    <main id="main-content" className="shell-main">
      <div className="page-heading">
        <div>
          <h1>Thông báo</h1>
          <p>
            {summary.unread
              ? `Bạn có ${summary.unread} thông báo chưa đọc.`
              : 'Bạn đã đọc hết thông báo.'}
          </p>
        </div>
        {summary.unread > 0 && (
          <button className="button" onClick={() => void markAllRead()}>
            <Icon name="check" size={12} />
            Đánh dấu tất cả đã đọc
          </button>
        )}
      </div>
      <div className="tabs" role="tablist" aria-label="Loại thông báo">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={category === tab.value}
            className={category === tab.value ? 'selected' : ''}
            onClick={() => setCategory(tab.value)}
          >
            {tab.label}
            {tab.unread > 0 && <span className="count unread">{tab.unread}</span>}
          </button>
        ))}
      </div>
      <section className="panel flush">
        <div className="panel-title">
          <h2>{tabs.find((tab) => tab.value === category)?.label}</h2>
          <label className="check-field notif-filter">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(event) => setUnreadOnly(event.target.checked)}
            />
            Chỉ hiện chưa đọc
          </label>
        </div>
        {error && <p className="empty-cell">{error}</p>}
        {!error && !items.length && !loading && (
          <p className="empty-cell">
            {unreadOnly ? 'Không có thông báo chưa đọc.' : 'Chưa có thông báo nào.'}
          </p>
        )}
        {items.length > 0 && (
          <ul className="notif-list">
            {items.map((item) => {
              const info = CATEGORY_INFO[item.category];
              return (
                <li key={item.id} className={item.read ? '' : 'unread'}>
                  <Link href={notificationHref(item)} onClick={() => void markRead(item)}>
                    <i className={`title-icon ${info.tone}`}>
                      <Icon name={info.icon} size={13} />
                    </i>
                    <span className="notif-text">
                      <b>{item.title}</b>
                      {item.body && <span className="notif-body">{item.body}</span>}
                      <small>
                        <span className={`badge ${info.tone}-badge`}>{info.label}</span>
                        {item.course && `${item.course.code} · ${item.course.title}`}
                        {item.senderName && ` · ${item.senderName}`}
                        {' · '}
                        <time dateTime={item.createdAt} title={formatDateTime(item.createdAt)}>
                          {timeAgo(item.createdAt)}
                        </time>
                      </small>
                    </span>
                    {!item.read && <span className="notif-dot" aria-label="Chưa đọc" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {loading && <p className="empty-cell">Đang tải…</p>}
        {!loading && page < totalPages - 1 && (
          <div className="notif-more">
            <button className="button" onClick={loadMore}>
              Xem thêm
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
