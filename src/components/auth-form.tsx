'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/providers/session-provider';
import { apiRequest } from '@/lib/api';
import { Icon } from '@/components/ui/icon';

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
    <main
      id="main-content"
      className="grid min-h-[calc(100vh-124px)] place-items-center px-4 py-12 max-md:items-start max-md:pt-8"
    >
      <section className="w-[min(420px,100%)] rounded-2xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md max-md:p-6 animate-scale-in">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/25">
            F
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {changePassword ? 'Đổi mật khẩu' : 'Đăng nhập F LMS'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {changePassword
              ? 'Tạo mật khẩu mới để bảo vệ tài khoản của bạn.'
              : 'Hệ thống quản lý học tập trực tuyến'}
          </p>
        </div>
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
            <span className="relative">
              <input
                className="input pr-10"
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
                className="icon-button absolute top-0.5 right-0.5"
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
          <button className="button primary mt-2 h-11 w-full rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20" type="submit" disabled={busy}>
            {busy ? 'Đang xử lý…' : changePassword ? 'Lưu mật khẩu mới' : 'Đăng nhập'}
          </button>
        </form>
      </section>
    </main>
  );
}
