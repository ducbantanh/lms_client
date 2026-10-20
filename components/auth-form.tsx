'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session-provider';
import { apiRequest } from '@/lib/api';
import { Icon } from '@/components/icon';

/** Form xác thực thật dùng API Spring. Chuyển trang sau khi thành công do SessionProvider lo. */
export function AuthForm({ changePassword = false }: { changePassword?: boolean }) {
  const { login, refresh, notice } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') ?? '');
    setError('');
    if (changePassword && password !== form.get('confirm')) {
      setError('Mật khẩu xác nhận chưa khớp.');
      return;
    }
    if (changePassword && password === form.get('current')) {
      setError('Mật khẩu mới phải khác mật khẩu hiện tại.');
      return;
    }
    setBusy(true);
    try {
      if (changePassword) {
        await apiRequest('/auth/change-password', {
          method: 'POST',
          body: { currentPassword: form.get('current'), newPassword: password },
        });
        if (await refresh()) router.push('/');
      } else await login(String(form.get('username') ?? '').trim(), password);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không thể hoàn tất. Vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main-content" className="auth-page">
      <section className="auth-card">
        <h1>{changePassword ? 'Đổi mật khẩu' : 'Đăng nhập'}</h1>
        <p>
          {changePassword
            ? 'Tạo mật khẩu mới để bảo vệ tài khoản của bạn.'
            : 'Sử dụng tài khoản do nhà trường cung cấp.'}
        </p>
        {!changePassword && notice && (
          <p className="notice" role="alert">
            {notice}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {changePassword ? (
            <label className="form-field">
              Mật khẩu hiện tại
              <input
                className="input"
                type="password"
                name="current"
                autoComplete="current-password"
                required
                maxLength={128}
              />
            </label>
          ) : (
            <label className="form-field">
              Tên đăng nhập / Mã sinh viên
              <input
                className="input"
                name="username"
                autoComplete="username"
                required
                maxLength={32}
                placeholder="Nhập tài khoản của bạn"
              />
            </label>
          )}
          <label className="form-field">
            {changePassword ? 'Mật khẩu mới' : 'Mật khẩu'}
            <span className="password-field">
              <input
                className="input"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={changePassword ? 'new-password' : 'current-password'}
                required
                minLength={changePassword ? 8 : undefined}
                maxLength={128}
                placeholder={changePassword ? 'Ít nhất 8 ký tự' : 'Nhập mật khẩu'}
              />
              <button
                type="button"
                className="icon-button"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'hidden' : 'eye'} size={15} />
              </button>
            </span>
          </label>
          {changePassword && (
            <label className="form-field">
              Xác nhận mật khẩu mới
              <input
                className="input"
                type="password"
                name="confirm"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
              />
            </label>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button primary full-width" type="submit" disabled={busy}>
            {busy ? 'Đang xử lý…' : changePassword ? 'Lưu mật khẩu mới' : 'Đăng nhập'}
          </button>
        </form>
      </section>
    </main>
  );
}
