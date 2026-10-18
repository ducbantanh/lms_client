'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from './api';
import { applyPresenceChange, hasPermission } from './admin-utils';
import { DEMO_ADMIN_TOTALS, DEMO_AUDIT_ENTRIES, DEMO_ONLINE_USERS } from './demo-admin-data';
import { useSession } from './session-provider';
import type {
  AdminUser,
  AuditEntry,
  OnlineUser,
  PageResult,
  PresenceChangedEvent,
  PresenceSnapshot,
  RealtimeEvent,
} from './types';

export interface LiveActivity {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  online: boolean;
  occurredAt: string;
}

interface AdminTotals {
  users: number;
  students: number;
  locked: number;
}

const EMPTY_TOTALS: AdminTotals = { users: 0, students: 0, locked: 0 };

/** Chỉ cần lấy một dòng vì dashboard dùng thuộc tính total của PageResult. */
async function loadTotal(query = '', signal?: AbortSignal) {
  const page = await apiRequest<PageResult<AdminUser>>(`/admin/users?size=1${query}`, {
    signal,
  });
  return page.total;
}

/** Tập trung việc lấy snapshot và lắng nghe WebSocket để component chỉ lo hiển thị. */
export function useAdminDashboard() {
  const router = useRouter();
  const {
    user,
    isDemo,
    loading: sessionLoading,
    error: sessionError,
    subscribeRealtime,
  } = useSession();
  const [totals, setTotals] = useState<AdminTotals>(EMPTY_TOTALS);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [auditError, setAuditError] = useState('');
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const canManageUsers = hasPermission(user, 'users.manage');
  const canManageSessions = hasPermission(user, 'sessions.manage');
  const canViewPresence = hasPermission(user, 'presence.view');
  const canViewAudit = hasPermission(user, 'audit.view');

  useEffect(() => {
    if (sessionLoading) return;
    if (isDemo) {
      setTotals(DEMO_ADMIN_TOTALS);
      setOnlineUsers(DEMO_ONLINE_USERS);
      setAuditEntries(DEMO_AUDIT_ENTRIES);
      setAuditError('');
      setLiveActivities(
        DEMO_ONLINE_USERS.slice(1, 4).map((item, index) => ({
          id: `demo-${item.id}`,
          userId: item.id,
          username: item.username,
          fullName: item.fullName,
          online: true,
          occurredAt: new Date(Date.now() - index * 4 * 60_000).toISOString(),
        })),
      );
      setLoading(false);
      setError('');
      return;
    }

    if (sessionError || user.id === 'anonymous') return;
    if (!canManageUsers) {
      router.replace('/');
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError('');

    async function loadDashboard() {
      try {
        const [allUsers, students, locked, presence, audit] = await Promise.all([
          loadTotal('', controller.signal),
          loadTotal('&role=5', controller.signal),
          loadTotal('&status=0', controller.signal),
          canViewPresence
            ? apiRequest<PresenceSnapshot>('/admin/presence', { signal: controller.signal })
            : Promise.resolve({ onlineUsers: 0, users: [] }),
          canViewAudit
            ? apiRequest<PageResult<AuditEntry>>('/admin/audit?page=0&size=6', {
                signal: controller.signal,
              })
                .then((page) => ({ entries: page.items, error: '' }))
                .catch((reason) => ({
                  entries: [],
                  error: reason instanceof Error ? reason.message : 'Không tải được audit log.',
                }))
            : Promise.resolve({ entries: [], error: '' }),
        ]);
        if (controller.signal.aborted) return;
        setTotals({ users: allUsers, students, locked });
        setOnlineUsers(presence.users);
        setAuditEntries(audit.entries);
        setAuditError(audit.error);
      } catch (reason) {
        if (!controller.signal.aborted) {
          setError(reason instanceof Error ? reason.message : 'Không tải được dashboard quản trị.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadDashboard();
    return () => controller.abort();
  }, [
    isDemo,
    user.id,
    canManageUsers,
    canViewPresence,
    canViewAudit,
    sessionLoading,
    sessionError,
    reloadKey,
    router,
  ]);

  useEffect(() => {
    if (!canViewPresence) return;
    return subscribeRealtime((event: RealtimeEvent) => {
      if (event.type !== 'presence.changed') return;
      const presence = event.data as PresenceChangedEvent;
      const occurredAt = event.ts ?? new Date().toISOString();
      setOnlineUsers((users) => applyPresenceChange(users, presence, occurredAt));
      setLiveActivities((items) =>
        [
          {
            id: `${presence.userId}-${occurredAt}`,
            userId: presence.userId,
            username: presence.username,
            fullName: presence.fullName,
            online: presence.online,
            occurredAt,
          },
          ...items,
        ].slice(0, 8),
      );
    });
  }, [canViewPresence, subscribeRealtime]);

  const forceLogout = useCallback(
    async (target: OnlineUser) => {
      if (!canManageSessions) throw new Error('Tài khoản chưa có quyền ép đăng xuất.');
      if (isDemo) {
        setOnlineUsers((users) => users.filter((item) => item.id !== target.id));
        setLiveActivities((items) =>
          [
            {
              id: `demo-kick-${Date.now()}`,
              userId: target.id,
              username: target.username,
              fullName: target.fullName,
              online: false,
              occurredAt: new Date().toISOString(),
            },
            ...items,
          ].slice(0, 8),
        );
        return;
      }
      await apiRequest(`/admin/users/${encodeURIComponent(target.id)}/force-logout`, {
        method: 'POST',
        body: {},
      });
    },
    [canManageSessions, isDemo],
  );

  return {
    totals,
    onlineUsers,
    auditEntries,
    auditError,
    liveActivities,
    loading: sessionLoading || loading,
    error: sessionError || error,
    canManageSessions,
    forceLogout,
    reload: () => setReloadKey((value) => value + 1),
  };
}
