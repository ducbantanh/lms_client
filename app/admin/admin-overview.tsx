'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { hasPermission, roleName } from '@/lib/auth';
import { useSession } from '@/lib/session-provider';
import {
  formatDateTime,
  formatTime,
  type PageResult,
  type PresenceChanged,
  type PresenceSnapshot,
} from '@/lib/admin';
import { Icon } from '@/components/icon';
import { StatCard } from '@/components/stat-card';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';

const MAX_FEED = 30;

interface Stats {
  total: number;
  students: number;
  locked: number;
}
interface FeedItem {
  key: number;
  username: string;
  online: boolean;
  at: Date;
}

/** Trang /admin/: thống kê + danh sách online cập nhật realtime qua presence.changed. */
export function AdminOverview() {
  const { user, subscribe } = useSession();
  const canManage = hasPermission(user, 'users.manage');
  const canKick = canManage && hasPermission(user, 'sessions.manage');
  const [presence, setPresence] = useState<PresenceSnapshot | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const feedKey = useRef(0);
  const clearFlash = useCallback(() => setFlash(null), []);

  const loadPresence = useCallback(async () => {
    setPresence(await apiRequest<PresenceSnapshot>('/admin/presence'));
  }, []);

  /** Lấy tổng số bằng trang size=1 vì server chưa có API thống kê riêng. */
  const loadStats = useCallback(async () => {
    if (!canManage) return;
    const total = (query: string) =>
      apiRequest<PageResult<unknown>>(`/admin/users?size=1${query}`).then((page) => page.total);
    const [all, students, locked] = await Promise.all([
      total(''),
      total('&role=5'),
      total('&status=0'),
    ]);
    setStats({ total: all, students, locked });
  }, [canManage]);

  useEffect(() => {
    Promise.all([loadPresence(), loadStats()]).catch((reason) =>
      setError(reason instanceof Error ? reason.message : 'Không tải được dữ liệu.'),
    );
  }, [loadPresence, loadStats]);

  // Mỗi sự kiện presence thêm 1 dòng vào feed; bảng online tải lại có debounce 200 ms.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = subscribe('presence.changed', (data) => {
      const event = data as PresenceChanged;
      setFeed((items) =>
        [
          {
            key: ++feedKey.current,
            username: event.username,
            online: event.online,
            at: new Date(),
          },
          ...items,
        ].slice(0, MAX_FEED),
      );
      clearTimeout(timer);
      timer = setTimeout(() => {
        loadPresence().catch(() => {});
        loadStats().catch(() => {});
      }, 200);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [subscribe, loadPresence, loadStats]);

  function askKick(id: string, username: string) {
    setConfirm({
      title: 'Đăng xuất người dùng',
      message: `Đăng xuất "${username}" khỏi mọi thiết bị?`,
      confirmLabel: 'Đăng xuất',
      danger: true,
      run: async () => {
        try {
          const result = await apiRequest<{ revokedSessions: number }>(
            `/admin/users/${encodeURIComponent(id)}/force-logout`,
            { method: 'POST', body: {} },
          );
          setFlash({
            type: 'success',
            text: `Đã đăng xuất ${username} (${result.revokedSessions} phiên).`,
          });
        } catch (reason) {
          setFlash({ type: 'error', text: reason instanceof Error ? reason.message : 'Lỗi.' });
        }
      },
    });
  }

  /** Phân bổ tài khoản; "khác" là mọi vai trò không phải sinh viên (admin, giảng viên...). */
  const breakdown = stats
    ? [
        { label: 'Sinh viên', value: stats.students, tone: 'violet' },
        { label: 'Vai trò khác', value: stats.total - stats.students, tone: 'blue' },
        { label: 'Bị khóa', value: stats.locked, tone: 'red' },
      ]
    : [];

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Tổng quan"
        description="Người dùng đang online và hoạt động đăng nhập theo thời gian thực."
      />
      <FlashMessage flash={flash} onDone={clearFlash} />
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      {/* Link "Xem tất cả" mở trang Người dùng với bộ lọc tương ứng (users-view đọc query). */}
      <div className={`stats ${canManage ? 'cols-4' : ''}`}>
        <StatCard label="Đang online" value={presence?.onlineUsers} icon="signal" tone="green" />
        {canManage && (
          <>
            <StatCard
              label="Tổng tài khoản"
              value={stats?.total}
              icon="users"
              tone="blue"
              href="/admin/users/"
            />
            <StatCard
              label="Sinh viên"
              value={stats?.students}
              icon="cap"
              tone="violet"
              href="/admin/users/?role=5"
            />
            <StatCard
              label="Bị khóa"
              value={stats?.locked}
              icon="lock"
              tone="red"
              href="/admin/users/?status=0"
            />
          </>
        )}
      </div>
      <div className="columns">
        <section className="panel">
          <div className="panel-title">
            <h2>Đang online</h2>
          </div>
          <div className="table-responsive">
            <table className="table admin-table">
              <thead>
                <tr>
                  <th>Tài khoản</th>
                  <th>Họ tên</th>
                  <th className="hide-sm">Vai trò</th>
                  <th className="hide-sm">Kết nối</th>
                  <th className="hide-sm">Từ lúc</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {!presence ? (
                  <tr>
                    <td colSpan={6} className="empty-cell">
                      Đang tải…
                    </td>
                  </tr>
                ) : presence.users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty-cell">
                      Không có ai online.
                    </td>
                  </tr>
                ) : (
                  presence.users.map((item) => (
                    <tr key={item.id}>
                      <td className="mono">{item.username}</td>
                      <td>{item.fullName}</td>
                      <td className="hide-sm">{roleName(item.role)}</td>
                      <td className="hide-sm numeric">{item.connections}</td>
                      <td className="hide-sm">{formatDateTime(item.since)}</td>
                      <td className="actions">
                        {canKick && item.id !== user?.id && (
                          <button
                            className="icon-button row-action danger"
                            aria-label={`Đăng xuất ${item.username}`}
                            title="Đăng xuất"
                            onClick={() => askKick(item.id, item.username)}
                          >
                            <Icon name="logout" size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <div className="admin-side">
          {canManage && stats && (
            <section className="panel">
              <div className="panel-title">
                <h2>Tài khoản</h2>
                <Link href="/admin/users/">Quản lý</Link>
              </div>
              <ul className="breakdown">
                {breakdown.map((row) => (
                  <li key={row.label}>
                    <span>{row.label}</span>
                    <b>{row.value}</b>
                    <span className="breakdown-bar">
                      <span
                        className={row.tone}
                        style={{ width: `${stats.total ? (row.value / stats.total) * 100 : 0}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="panel">
            <div className="panel-title">
              <h2>Hoạt động</h2>
            </div>
            {feed.length === 0 ? (
              <p className="empty-cell">Chưa có hoạt động mới.</p>
            ) : (
              <ul className="admin-feed">
                {feed.map((item) => (
                  <li key={item.key}>
                    <span className={`status-dot ${item.online ? 'online' : ''}`} />
                    <span>
                      <b>{item.username}</b> {item.online ? 'vừa online' : 'đã offline'}
                    </span>
                    <small>{formatTime(item.at)}</small>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}
