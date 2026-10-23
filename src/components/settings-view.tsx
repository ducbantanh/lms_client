'use client';

import { useCallback, useState, type FormEvent, type ReactNode } from 'react';
import { apiRequest } from '@/lib/api';
import { roleName } from '@/lib/auth';
import { useSession } from '@/providers/session-provider';
import { AdminHeading, FlashMessage, type Flash } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';

/** Giống app.security.password-min-length của server. */
const MIN_PASSWORD = 8;

/**
 * Trang Cài đặt (/settings/, /teacher/settings/, /admin/settings/): thông tin tài khoản và đổi mật khẩu.
 * Đổi mật khẩu giữ phiên hiện tại; server đăng xuất mọi thiết bị khác.
 * `children`: phần cài đặt riêng của từng khu, hiện bên dưới (vd. admin chỉnh thời gian tự đăng xuất).
 */
export function SettingsView({
  description = 'Thông tin tài khoản và mật khẩu đăng nhập.',
  children,
}: {
  description?: string;
  children?: ReactNode;
}) {
  const { user } = useSession();
  const [flash, setFlash] = useState<Flash | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const clearFlash = useCallback(() => setFlash(null), []);
  if (!user) return null;

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const current = String(form.get('current') ?? '');
    const next = String(form.get('password') ?? '');
    setError('');
    if (next !== form.get('confirm')) {
      setError('Mật khẩu xác nhận chưa khớp.');
      return;
    }
    if (next === current) {
      setError('Mật khẩu mới phải khác mật khẩu hiện tại.');
      return;
    }
    setBusy(true);
    try {
      await apiRequest('/auth/change-password', {
        method: 'POST',
        body: { currentPassword: current, newPassword: next },
      });
      formElement.reset();
      setFlash({
        type: 'success',
        text: 'Đã đổi mật khẩu. Các thiết bị khác đang đăng nhập tài khoản này đã bị đăng xuất.',
      });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không đổi được mật khẩu.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading title="Cài đặt" description={description} />
      <FlashMessage flash={flash} onDone={clearFlash} />
      <div className="columns even">
        <section className="panel">
          <div className="panel-title">
            <h2>
              <i className="title-icon blue">
                <Icon name="users" size={11} />
              </i>
              Tài khoản
            </h2>
          </div>
          <dl className="info-list">
            <div>
              <dt>Họ tên</dt>
              <dd>{user.fullName}</dd>
            </div>
            <div>
              <dt>Tài khoản</dt>
              <dd className="mono">{user.username}</dd>
            </div>
            <div>
              <dt>Vai trò</dt>
              <dd>{roleName(user.role)}</dd>
            </div>
          </dl>
          <p className="admin-hint">Cần sửa họ tên hoặc tài khoản, liên hệ quản trị viên.</p>
        </section>
        <section className="panel">
          <div className="panel-title">
            <h2>
              <i className="title-icon violet">
                <Icon name="key" size={11} />
              </i>
              Đổi mật khẩu
            </h2>
          </div>
          <form onSubmit={changePassword}>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <label className="form-field">
              Mật khẩu hiện tại
              <input
                className="input"
                name="current"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
            <label className="form-field">
              Mật khẩu mới
              <input
                className="input"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={MIN_PASSWORD}
                placeholder={`Ít nhất ${MIN_PASSWORD} ký tự`}
                required
              />
            </label>
            <label className="form-field">
              Nhập lại mật khẩu mới
              <input
                className="input"
                name="confirm"
                type="password"
                autoComplete="new-password"
                minLength={MIN_PASSWORD}
                required
              />
            </label>
            <button className="button primary" disabled={busy}>
              {busy ? 'Đang lưu…' : 'Đổi mật khẩu'}
            </button>
          </form>
        </section>
      </div>
      {children}
    </main>
  );
}
