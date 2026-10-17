'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { hasPermission, ROLE_NAMES, roleName } from '@/lib/auth';
import { useSession } from '@/lib/session-provider';
import { formatDateTime, type AdminUser, type PageResult } from '@/lib/admin';
import { Icon, type IconName } from '@/components/icon';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';

const PAGE_SIZE = 20;

interface Filters {
  q: string;
  role: string;
  status: string;
  page: number;
}

/** Đọc bộ lọc từ query string để có thể F5 hoặc chia sẻ link mà không mất trạng thái. */
function readFilters(): Filters {
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get('q') ?? '',
    role: params.get('role') ?? '',
    status: params.get('status') ?? '',
    page: Math.max(0, Number(params.get('page')) || 0),
  };
}

function toQuery(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set('q', filters.q.trim());
  if (filters.role) params.set('role', filters.role);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  return params;
}

type Action = 'kick' | 'lock' | 'unlock' | 'delete';
const ACTIONS: Record<
  Action,
  {
    label: string;
    icon: IconName;
    confirm: ((name: string) => string) | null;
    request: (id: string) => [string, string];
    done: (name: string) => string;
  }
> = {
  kick: {
    label: 'Đăng xuất',
    icon: 'logout',
    confirm: (name) => `Đăng xuất "${name}" khỏi mọi thiết bị?`,
    request: (id) => [`/admin/users/${id}/force-logout`, 'POST'],
    done: (name) => `Đã đăng xuất ${name}.`,
  },
  lock: {
    label: 'Khóa',
    icon: 'lock',
    confirm: (name) => `Khóa tài khoản "${name}"? Người dùng sẽ bị đăng xuất ngay.`,
    request: (id) => [`/admin/users/${id}/lock`, 'POST'],
    done: (name) => `Đã khóa ${name}.`,
  },
  unlock: {
    label: 'Mở khóa',
    icon: 'unlock',
    confirm: null,
    request: (id) => [`/admin/users/${id}/unlock`, 'POST'],
    done: (name) => `Đã mở khóa ${name}.`,
  },
  delete: {
    label: 'Xóa',
    icon: 'trash',
    confirm: (name) => `XÓA vĩnh viễn tài khoản "${name}"? Không thể hoàn tác.`,
    request: (id) => [`/admin/users/${id}`, 'DELETE'],
    done: (name) => `Đã xóa ${name}.`,
  },
};

/** Trang /admin/users/: tìm kiếm, lọc, phân trang, khóa/mở khóa, xóa, ép đăng xuất. */
export function UsersView() {
  const { user } = useSession();
  const canKick = hasPermission(user, 'sessions.manage');
  const [filters, setFilters] = useState<Filters | null>(null);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<PageResult<AdminUser> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);

  // Chỉ đọc URL sau khi mount vì trang được export tĩnh (không có window lúc build).
  useEffect(() => {
    const initial = readFilters();
    setFilters(initial);
    setSearch(initial.q);
  }, []);

  const load = useCallback(async (current: Filters) => {
    const params = toQuery(current);
    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
    params.set('page', String(current.page));
    params.set('size', String(PAGE_SIZE));
    setLoading(true);
    setError('');
    try {
      setData(await apiRequest<PageResult<AdminUser>>(`/admin/users?${params}`));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tải được danh sách.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (filters) void load(filters);
  }, [filters, load]);

  // Gõ tìm kiếm: chờ 300 ms rồi mới gọi API, và luôn quay về trang đầu.
  useEffect(() => {
    if (!filters || search === filters.q) return;
    const timer = setTimeout(() => setFilters({ ...filters, q: search, page: 0 }), 300);
    return () => clearTimeout(timer);
  }, [search, filters]);

  function runAction(action: Action, target: AdminUser) {
    const spec = ACTIONS[action];
    const run = async () => {
      try {
        const [path, method] = spec.request(encodeURIComponent(target.id));
        await apiRequest(path, { method, body: method === 'DELETE' ? undefined : {} });
        setFlash({ type: 'success', text: spec.done(target.username) });
        if (filters) await load(filters);
      } catch (reason) {
        setFlash({ type: 'error', text: reason instanceof Error ? reason.message : 'Lỗi.' });
      }
    };
    if (!spec.confirm) {
      void run();
      return;
    }
    setConfirm({
      title: `${spec.label} tài khoản`,
      message: spec.confirm(target.username),
      confirmLabel: spec.label,
      danger: action !== 'unlock',
      run,
    });
  }

  const page = data?.page ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const from = data && data.total ? page * PAGE_SIZE + 1 : 0;
  const to = data ? page * PAGE_SIZE + data.items.length : 0;

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Người dùng"
        description="Tìm kiếm, khóa, mở khóa, xóa tài khoản và đăng xuất người dùng."
      />
      <FlashMessage flash={flash} onDone={clearFlash} />
      <section className="panel">
        <div className="toolbar">
          <label className="search-field">
            <Icon name="search" size={14} />
            <span className="sr-only">Tìm theo tài khoản hoặc họ tên</span>
            <input
              className="input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tài khoản hoặc họ tên…"
              maxLength={64}
            />
          </label>
          <div className="toolbar-right">
            <select
              className="select"
              aria-label="Lọc theo vai trò"
              value={filters?.role ?? ''}
              onChange={(event) =>
                filters && setFilters({ ...filters, role: event.target.value, page: 0 })
              }
            >
              <option value="">Mọi vai trò</option>
              {Object.entries(ROLE_NAMES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <select
              className="select"
              aria-label="Lọc theo trạng thái"
              value={filters?.status ?? ''}
              onChange={(event) =>
                filters && setFilters({ ...filters, status: event.target.value, page: 0 })
              }
            >
              <option value="">Mọi trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="0">Đã khóa</option>
            </select>
          </div>
        </div>
        {error && (
          <div className="notice" role="alert">
            {error}
          </div>
        )}
        <div className="table-responsive">
          <table className={`table admin-table ${loading ? 'is-loading' : ''}`}>
            <thead>
              <tr>
                <th>Tài khoản</th>
                <th>Họ tên</th>
                <th className="hide-sm">Vai trò</th>
                <th>Trạng thái</th>
                <th className="hide-sm">Đăng nhập gần nhất</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!data ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Đang tải…
                  </td>
                </tr>
              ) : data.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Không có tài khoản phù hợp.
                  </td>
                </tr>
              ) : (
                data.items.map((item) => {
                  const self = item.id === user?.id;
                  const actions: Action[] = self
                    ? []
                    : [
                        ...(canKick ? (['kick'] as Action[]) : []),
                        item.status === 1 ? 'lock' : 'unlock',
                        'delete',
                      ];
                  return (
                    <tr key={item.id}>
                      <td className="mono">{item.username}</td>
                      <td>
                        {item.fullName}
                        {self && <span className="badge muted">Bạn</span>}
                      </td>
                      <td className="hide-sm">{roleName(item.role)}</td>
                      <td>
                        <span className={`badge ${item.status === 1 ? 'ok' : 'locked'}`}>
                          {item.status === 1 ? 'Hoạt động' : 'Đã khóa'}
                        </span>
                        {item.mustChangePassword && (
                          <span className="badge warn" title="Chưa đổi mật khẩu ban đầu">
                            MK mặc định
                          </span>
                        )}
                      </td>
                      <td className="hide-sm">{formatDateTime(item.lastLoginAt)}</td>
                      <td className="actions">
                        {actions.map((action) => (
                          <button
                            key={action}
                            className={`icon-button row-action ${action === 'unlock' ? '' : 'danger'}`}
                            aria-label={`${ACTIONS[action].label} ${item.username}`}
                            title={ACTIONS[action].label}
                            onClick={() => runAction(action, item)}
                          >
                            <Icon name={ACTIONS[action].icon} size={14} />
                          </button>
                        ))}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <span>{data ? `${from}–${to} / ${data.total} tài khoản` : ''}</span>
          <div>
            <button
              className="button small"
              disabled={!filters || page === 0 || loading}
              onClick={() => filters && setFilters({ ...filters, page: page - 1 })}
            >
              Trước
            </button>
            <span>
              Trang {totalPages ? page + 1 : 0} / {totalPages}
            </span>
            <button
              className="button small"
              disabled={!filters || page + 1 >= totalPages || loading}
              onClick={() => filters && setFilters({ ...filters, page: page + 1 })}
            >
              Sau
            </button>
          </div>
        </div>
      </section>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}
