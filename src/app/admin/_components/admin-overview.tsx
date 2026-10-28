'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { hasPermission, roleName } from '@/lib/auth';
import { initials } from '@/lib/course-utils';
import { CHART_COLORS, percent } from '@/lib/dashboard';
import { useSession } from '@/providers/session-provider';
import {
  formatDateTime,
  formatTime,
  type PageResult,
  type PresenceChanged,
  type PresenceSnapshot,
} from '@/lib/admin';
import { Icon } from '@/components/ui/icon';
import { StatCard } from '@/components/ui/stat-card';
import { Card, EmptyHint, Skeleton } from '@/components/ui/card';
import { ColumnChart, CountUp, Donut, Legend, ProgressBar } from '@/components/ui/charts';
import { RatioCard } from '@/components/ui/ratio-card';
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

/** Trang /admin/: thống kê, người đang online, phân bổ tài khoản, hoạt động cập nhật realtime (presence.changed). */
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

  const loadPresence = useCallback(
    () => apiRequest<PresenceSnapshot>('/admin/presence').then(setPresence),
    [],
  );

  /** Lấy tổng số bằng trang size=1 vì server chưa có API thống kê riêng. */
  const loadStats = useCallback(async () => {
    if (!canManage) return;
    const total = (query: string) =>
      apiRequest<PageResult<unknown>>(`/admin/users?size=1${query}`).then((page) => page.total);
    await Promise.all([total(''), total('&role=5'), total('&status=0')]).then(
      ([all, students, locked]) => setStats({ total: all, students, locked }),
    );
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

  /** Phân bổ tài khoản; "vai trò khác" là mọi vai trò không phải sinh viên (admin, giảng viên...). */
  const accounts = stats
    ? [
        { label: 'Sinh viên', value: stats.students, color: 'var(--color-chart-violet)' },
        {
          label: 'Vai trò khác',
          value: stats.total - stats.students,
          color: 'var(--color-chart-blue)',
        },
      ]
    : [];
  // Người online theo vai trò (biểu đồ cột)
  const byRole = new Map<string, number>();
  presence?.users.forEach((item) =>
    byRole.set(roleName(item.role), (byRole.get(roleName(item.role)) ?? 0) + 1),
  );

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
      <div className="grid gap-5 xl:grid-cols-12">
        <Card
          title="Đang online"
          info="Người dùng đang mở ít nhất một kết nối realtime; cập nhật ngay khi có người vào / ra."
          className={canManage ? 'xl:col-span-8' : 'xl:col-span-12'}
        >
          {!presence ? (
            <div className="space-y-3">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          ) : presence.users.length === 0 ? (
            <EmptyHint>Không có ai online.</EmptyHint>
          ) : (
            <div className="-mx-5 -mb-5 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="text-xs text-ink-subtle">
                    <th className="px-5 pb-2 font-medium">Người dùng</th>
                    <th className="px-3 pb-2 font-medium">Vai trò</th>
                    <th className="px-3 pb-2 text-right font-medium">Kết nối</th>
                    <th className="px-3 pb-2 font-medium">Từ lúc</th>
                    <th className="px-5 pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {presence.users.map((item, index) => (
                    <tr
                      key={item.id}
                      className="animate-fade-in border-t border-line transition-colors hover:bg-surface-muted"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-5 py-2.5">
                        <span className="flex items-center gap-3">
                          <span className="relative">
                            <span className="grid size-8 place-items-center rounded-full bg-primary-50 text-[11px] font-bold text-primary-600">
                              {initials(item.fullName)}
                            </span>
                            <span className="absolute -right-0.5 -bottom-0.5 size-2.5 animate-live rounded-full bg-emerald-500 shadow-[0_0_0_0_rgb(34_197_94/0.5)] ring-2 ring-white" />
                          </span>
                          <span className="min-w-0">
                            <b className="block truncate font-semibold text-ink">{item.fullName}</b>
                            <small className="font-mono text-xs text-ink-subtle">
                              {item.username}
                            </small>
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-ink-muted">{roleName(item.role)}</td>
                      <td className="px-3 py-2.5 text-right text-ink-muted tabular-nums">
                        {item.connections}
                      </td>
                      <td className="px-3 py-2.5 text-ink-muted">{formatDateTime(item.since)}</td>
                      <td className="px-5 py-2.5 text-right">
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {canManage && (
          <Card
            title="Tài khoản"
            info="Phân bổ tài khoản theo vai trò; bị khóa không đăng nhập được."
            href="/admin/users/"
            hrefLabel="Quản lý người dùng"
            delay={60}
            className="xl:col-span-4"
          >
            {stats ? (
              <div className="flex flex-col items-center gap-6">
                <Donut
                  segments={accounts}
                  center={
                    <div>
                      <b className="block text-4xl font-semibold tracking-tight text-ink">
                        <CountUp value={stats.total} />
                      </b>
                      <span className="text-xs text-ink-subtle">tài khoản</span>
                    </div>
                  }
                />
                <div className="flex w-full flex-col gap-4">
                  <Legend segments={accounts} />
                  <div>
                    <div className="mb-2 flex items-center justify-between text-[13px]">
                      <span className="text-ink-muted">Bị khóa</span>
                      <b className="font-semibold text-ink tabular-nums">
                        {stats.locked} · {percent(stats.locked, stats.total)}%
                      </b>
                    </div>
                    <ProgressBar
                      value={percent(stats.locked, stats.total)}
                      color="var(--color-chart-rose)"
                      delay={300}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Skeleton className="mx-auto size-44 rounded-full" />
            )}
          </Card>
        )}

        <Card
          title="Hoạt động"
          info="Người dùng vừa online / offline từ lúc bạn mở trang này."
          delay={120}
          className="xl:col-span-5"
        >
          {feed.length === 0 ? (
            <EmptyHint>Chưa có hoạt động mới.</EmptyHint>
          ) : (
            <ul className="m-0 list-none p-0 max-h-80 space-y-1 overflow-y-auto">
              {feed.map((item) => (
                <li key={item.key} className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm">
                  <span
                    className={`size-2 shrink-0 rounded-full ${item.online ? 'bg-emerald-500' : 'bg-line-strong'}`}
                  />
                  <span className="min-w-0 flex-1 truncate text-ink-muted">
                    <b className="font-semibold text-ink">{item.username}</b>{' '}
                    {item.online ? 'vừa online' : 'đã offline'}
                  </span>
                  <small className="text-xs text-ink-subtle tabular-nums">
                    {formatTime(item.at)}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="Online theo vai trò"
          info="Số người đang online của từng vai trò."
          delay={180}
          className="xl:col-span-4"
        >
          {byRole.size ? (
            <ColumnChart
              color={CHART_COLORS[2]}
              columns={[...byRole].map(([label, value]) => ({
                label,
                value,
                hint: `${value} người`,
              }))}
            />
          ) : (
            <EmptyHint>{presence ? 'Không có ai online.' : 'Đang tải…'}</EmptyHint>
          )}
        </Card>

        {canManage && stats && presence && (
          <RatioCard
            title="Tỉ lệ đang online"
            info="Người đang online trên tổng số tài khoản."
            value={percent(presence.onlineUsers, stats.total)}
            leftLabel="Online"
            rightLabel="Offline"
            delay={240}
            className="xl:col-span-3"
            note={`${presence.onlineUsers} / ${stats.total} tài khoản đang mở hệ thống.`}
          />
        )}
      </div>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}
