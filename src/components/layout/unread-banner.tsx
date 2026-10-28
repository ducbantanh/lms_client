'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { normalizePath } from '@/lib/auth';
import { notificationHref, timeAgo, unreadBannerKey } from '@/lib/notifications';
import { useNotifications } from '@/providers/notifications-provider';
import { useSession } from '@/providers/session-provider';
import { NOTIFICATION_LIST, NotificationRow } from '@/components/notification-row';
import { Icon } from '@/components/ui/icon';

/** Số thông báo chưa đọc liệt kê trong khung; còn lại gom vào "và N thông báo khác". */
const SHOWN = 3;
/** Không chen vào trang làm bài (đang thi), trang Thông báo (đã có danh sách) và trang quét QR điểm danh. */
const HIDDEN_PATHS = ['/course/assessment', '/notifications', '/attend'];

/**
 * Khung đầu trang của khu học tập khi sinh viên có thông báo chưa đọc (hiện ngay sau khi đăng nhập).
 * Tự ẩn khi đã đọc hết; bấm × thì ẩn tới lần đăng nhập sau (SessionProvider xóa key khi đăng nhập).
 */
export function UnreadBanner() {
  const notifications = useNotifications();
  const { user } = useSession();
  const path = normalizePath(usePathname());
  const [dismissed, setDismissed] = useLocalStorage(unreadBannerKey(user?.id ?? 'guest'));
  if (!notifications || !user || dismissed || HIDDEN_PATHS.includes(path)) return null;
  const { summary, latest, markRead, markAllRead } = notifications;
  if (!summary.unread) return null;
  // latest là vài thông báo mới nhất (cả đã đọc), đủ để liệt kê các thông báo chưa đọc gần đây
  const unread = latest.filter((item) => !item.read).slice(0, SHOWN);
  const more = summary.unread - unread.length;

  return (
    <section
      className="mb-5 overflow-hidden rounded-lg border border-l-3 border-line border-l-primary-600 bg-white shadow-card"
      aria-labelledby="unread-banner-title"
    >
      <div className="flex items-center gap-2.5 py-2.5 pr-2.5 pl-3.5">
        <i className="title-icon orange">
          <Icon name="bell" size={13} />
        </i>
        <h2 id="unread-banner-title" className="min-w-0 flex-1 text-[15px]">
          Bạn có {summary.unread} thông báo chưa đọc
        </h2>
        <button
          className="icon-button"
          aria-label="Ẩn khung thông báo"
          title="Ẩn tới lần đăng nhập sau"
          onClick={() => setDismissed('1')}
        >
          <Icon name="close" size={14} />
        </button>
      </div>
      {unread.length > 0 && (
        <ul className={`${NOTIFICATION_LIST} border-t border-line`}>
          {unread.map((item) => (
            <li key={item.id}>
              <NotificationRow
                compact
                unread
                category={item.category}
                title={item.title}
                meta={`${item.course?.code ?? ''} · ${timeAgo(item.createdAt)}`}
                href={notificationHref(item)}
                onClick={() => void markRead(item)}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line px-3.5 py-2.5 text-[13px] text-ink-muted">
        {more > 0 && <span className="mr-auto">và {more} thông báo khác</span>}
        <Link href="/notifications/" className="link-button">
          Xem tất cả
        </Link>
        <button className="link-button" onClick={() => void markAllRead().catch(() => undefined)}>
          Đánh dấu đã đọc hết
        </button>
      </div>
    </section>
  );
}
