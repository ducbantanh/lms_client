'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { hasPermission, ROLE_NAMES, roleName } from '@/lib/auth';
import { useSession } from '@/providers/session-provider';
import { formatDateTime, type AdminUser, type PageResult } from '@/lib/admin';
import type { Role } from '@/lib/types';
import { Icon, type IconName } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';

/** Vai trò hiển thị trong bộ lọc: Quản trị viên, Giảng viên, Sinh viên. */
const FILTER_ROLES: Role[] = [0, 1, 5];

const PAGE_SIZE = 20;

interface Filters {
  q: string;
  role: string;
  status: string;
  page: number;
}

/** Đọc bộ lọc từ query string để có thể F5 hoặc chia sẻ link mà không mất trạng thái. */
function readFilters(params: { get(name: string): string | null }): Filters {
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
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(() => readFilters(searchParams));
  const [search, setSearch] = useState(filters.q);
  const [data, setData] = useState<PageResult<AdminUser> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);

  /** Ghi bộ lọc lên URL rồi tải trang tương ứng; trạng thái "đang tải" do nơi gọi bật. */
  const fetchPage = useCallback((current: Filters) => {
    const params = toQuery(current);
    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
    params.set('page', String(current.page));
    params.set('size', String(PAGE_SIZE));
    return apiRequest<PageResult<AdminUser>>(`/admin/users?${params}`)
      .then(setData)
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : 'Không tải được danh sách.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Đổi bộ lọc: bật "đang tải" ngay trong lần render này, effect bên dưới gửi request.
  const [shownFilters, setShownFilters] = useState<Filters | null>(null);
  if (shownFilters !== filters) {
    setShownFilters(filters);
    setLoading(true);
    setError('');
  }

  useEffect(() => {
    void fetchPage(filters);
  }, [filters, fetchPage]);

  /** Sau khi sửa/khóa/xóa: tải lại trang hiện tại. */
  function reload() {
    setLoading(true);
    setError('');
    return fetchPage(filters);
  }

  // Gõ tìm kiếm: chờ 300 ms rồi mới gọi API, và luôn quay về trang đầu.
  useEffect(() => {
    if (search === filters.q) return;
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
        await reload();
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
      <section className="panel rounded-2xl shadow-card border border-line/80 bg-white/95 backdrop-blur-xs">
        <div className="toolbar rounded-2xl bg-white/70 p-2.5 border border-line/80 shadow-xs backdrop-blur-xs">
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
              value={filters.role}
              onChange={(event) => setFilters({ ...filters, role: event.target.value, page: 0 })}
            >
              <option value="">Mọi vai trò</option>
              {FILTER_ROLES.map((code) => (
                <option key={code} value={code}>
                  {ROLE_NAMES[code]}
                </option>
              ))}
            </select>
            <select
              className="select"
              aria-label="Lọc theo trạng thái"
              value={filters.status}
              onChange={(event) => setFilters({ ...filters, status: event.target.value, page: 0 })}
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
                        <button
                          className="icon-button row-action"
                          aria-label={`Sửa ${item.username}`}
                          title="Sửa thông tin"
                          onClick={() => setEditing(item)}
                        >
                          <Icon name="edit" size={14} />
                        </button>
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
              disabled={page === 0 || loading}
              onClick={() => setFilters({ ...filters, page: page - 1 })}
            >
              Trước
            </button>
            <span>
              Trang {totalPages ? page + 1 : 0} / {totalPages}
            </span>
            <button
              className="button small"
              disabled={page + 1 >= totalPages || loading}
              onClick={() => setFilters({ ...filters, page: page + 1 })}
            >
              Sau
            </button>
          </div>
        </div>
      </section>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
      {editing && (
        <EditUserDialog
          user={editing}
          self={editing.id === user?.id}
          onClose={() => setEditing(null)}
          onSaved={async (text) => {
            setEditing(null);
            setFlash({ type: 'success', text });
            await reload();
          }}
        />
      )}
    </main>
  );
}

/**
 * Sửa mã đăng nhập, họ tên, ngày sinh (vai trò, trạng thái, mật khẩu không đổi ở đây);
 * nút riêng đặt lại mật khẩu về ngày sinh đã lưu.
 */
function EditUserDialog({
  user,
  self,
  onClose,
  onSaved,
}: {
  user: AdminUser;
  self: boolean;
  onClose: () => void;
  onSaved: (message: string) => Promise<void>;
}) {
  const [form, setForm] = useState({
    username: user.username,
    fullName: user.fullName,
    birthDate: user.birthDate ?? '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  /** Bước xác nhận đặt lại mật khẩu, hiện ngay trong hộp thoại thay vì mở hộp thoại thứ hai. */
  const [confirmReset, setConfirmReset] = useState(false);
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });
  const id = encodeURIComponent(user.id);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const saved = await apiRequest<AdminUser>(`/admin/users/${id}`, {
        method: 'PUT',
        body: {
          username: form.username.trim(),
          fullName: form.fullName.trim(),
          birthDate: form.birthDate || null,
        },
      });
      await onSaved(`Đã lưu thông tin ${saved.username}.`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được.');
      setBusy(false);
    }
  }

  async function resetPassword() {
    setBusy(true);
    setError('');
    try {
      await apiRequest(`/admin/users/${id}/reset-password`, { method: 'POST', body: {} });
      await onSaved(
        `Đã đặt lại mật khẩu của ${user.username} về ngày sinh. Người dùng phải đổi mật khẩu khi đăng nhập.`,
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không đặt lại được mật khẩu.');
      setBusy(false);
      setConfirmReset(false);
    }
  }

  // Đặt lại theo ngày sinh đã lưu trên server: đổi ngày sinh thì phải lưu trước
  const birthChanged = form.birthDate !== (user.birthDate ?? '');

  return (
    <Modal
      title={`Sửa tài khoản ${roleName(user.role).toLowerCase()}`}
      onClose={() => !busy && onClose()}
    >
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="form-row">
          <label className="form-field">
            Mã đăng nhập
            <input
              className="input mono"
              value={form.username}
              onChange={(event) => set({ username: event.target.value })}
              maxLength={32}
              pattern="[A-Za-z0-9][A-Za-z0-9_.\-]{2,31}"
              title="3–32 ký tự: chữ, số, _ . -"
              required
            />
          </label>
          <label className="form-field">
            Ngày sinh
            <input
              className="input"
              type="date"
              value={form.birthDate}
              onChange={(event) => set({ birthDate: event.target.value })}
            />
          </label>
        </div>
        <label className="form-field">
          Họ tên
          <input
            className="input"
            value={form.fullName}
            onChange={(event) => set({ fullName: event.target.value })}
            maxLength={100}
            required
            autoFocus
          />
        </label>
        {form.username.trim() !== user.username && (
          <p className="admin-hint">
            Người dùng sẽ đăng nhập bằng mã mới; phiên đang mở vẫn giữ nguyên.
          </p>
        )}
        {!self && (
          <div className="mt-4 mb-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 rounded-xl border border-line bg-surface-muted px-3.5 py-3 text-[13px] text-ink-muted">
            {confirmReset ? (
              <>
                <span>
                  Đặt mật khẩu của <b>{user.username}</b> về ngày sinh và đăng xuất khỏi mọi thiết
                  bị?
                </span>
                <div className="button-row">
                  <button
                    type="button"
                    className="button small"
                    disabled={busy}
                    onClick={() => setConfirmReset(false)}
                  >
                    Không
                  </button>
                  <button
                    type="button"
                    className="button small danger"
                    disabled={busy}
                    onClick={() => void resetPassword()}
                  >
                    Đặt lại
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>
                  {user.birthDate
                    ? 'Quên mật khẩu? Đặt lại về ngày sinh (ddmmyyyy), bắt đổi khi đăng nhập.'
                    : 'Tài khoản chưa có ngày sinh nên chưa đặt lại mật khẩu được.'}
                </span>
                <button
                  type="button"
                  className="button small"
                  disabled={busy || !user.birthDate || birthChanged}
                  title={birthChanged ? 'Lưu ngày sinh mới trước' : undefined}
                  onClick={() => setConfirmReset(true)}
                >
                  <Icon name="key" size={11} />
                  Đặt lại mật khẩu
                </button>
              </>
            )}
          </div>
        )}
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy}>
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
