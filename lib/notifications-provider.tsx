'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiRequest } from './api';
import { hasPermission } from './auth';
import { useSession } from './session-provider';
import type { AppNotification, NotificationPage, NotificationSummary } from './notifications';

/** Số thông báo mới nhất hiện trong dropdown chuông. */
const LATEST_SIZE = 6;
const EMPTY: NotificationSummary = { unread: 0, byCategory: {} };

interface NotificationsContextValue {
  summary: NotificationSummary;
  latest: AppNotification[];
  /** Tăng mỗi khi có thay đổi (thông báo mới, đánh dấu đã đọc) để trang Thông báo tải lại. */
  version: number;
  refresh: () => Promise<void>;
  markRead: (notification: AppNotification) => Promise<void>;
  markAllRead: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

/**
 * Trạng thái thông báo dùng chung cho chuông, menu bên và trang Thông báo của khu học tập.
 * Tải khi vào trang, khi quay lại tab, và ngay khi server đẩy notification.created qua WebSocket.
 */
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user, subscribe } = useSession();
  const enabled = hasPermission(user, 'courses.view');
  const [summary, setSummary] = useState<NotificationSummary>(EMPTY);
  const [latest, setLatest] = useState<AppNotification[]>([]);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(async () => {
    if (!enabled) return;
    try {
      const [nextSummary, page] = await Promise.all([
        apiRequest<NotificationSummary>('/notifications/summary'),
        apiRequest<NotificationPage>(`/notifications?size=${LATEST_SIZE}`),
      ]);
      setSummary(nextSummary);
      setLatest(page.items);
      setVersion((value) => value + 1);
    } catch {
      /* Mất kết nối tạm thời: giữ số cũ, lần sau tải lại. */
    }
  }, [enabled]);

  useEffect(() => {
    if (!user) return;
    void refresh();
    const onFocus = () => void refresh();
    window.addEventListener('focus', onFocus);
    const unsubscribe = subscribe('notification.created', () => void refresh());
    return () => {
      window.removeEventListener('focus', onFocus);
      unsubscribe();
    };
  }, [user?.id, refresh, subscribe]);

  const markRead = useCallback(
    async (notification: AppNotification) => {
      if (notification.read) return;
      await apiRequest(`/notifications/${encodeURIComponent(notification.id)}/read`, {
        method: 'POST',
      }).catch(() => undefined);
      await refresh();
    },
    [refresh],
  );

  const markAllRead = useCallback(async () => {
    await apiRequest('/notifications/read-all', { method: 'POST' });
    await refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ summary, latest, version, refresh, markRead, markAllRead }),
    [summary, latest, version, refresh, markRead, markAllRead],
  );
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

/** null khi không nằm trong NotificationsProvider (khu quản lý). */
export function useNotifications() {
  return useContext(NotificationsContext);
}
