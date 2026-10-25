'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { normalizePath } from '@/lib/auth';
import { CATEGORY_INFO, notificationHref, timeAgo, unreadBannerKey } from '@/lib/notifications';
import { useNotifications } from '@/providers/notifications-provider';
import { useSession } from '@/providers/session-provider';
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
    <section className="unread-banner" aria-labelledby="unread-banner-title">
      <div className="unread-banner-head">
        <i className="title-icon orange">
          <Icon name="bell" size={13} />
        </i>
        <h2 id="unread-banner-title">Bạn có {summary.unread} thông báo chưa đọc</h2>
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
        <ul className="notif-list compact">
          {unread.map((item) => {
            const info = CATEGORY_INFO[item.category];
            return (
              <li key={item.id} className="unread">
                <Link href={notificationHref(item)} onClick={() => void markRead(item)}>
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
      )}
      <div className="unread-banner-foot">
        {more > 0 && <span>và {more} thông báo khác</span>}
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
