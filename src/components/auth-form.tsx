'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const pwd = String(form.get('password') ?? '');
    setError('');
    if (changePassword && pwd !== form.get('confirm')) {
      setError('Mật khẩu xác nhận chưa khớp.');
      return;
    }
    if (changePassword && pwd === form.get('current')) {
      setError('Mật khẩu mới phải khác mật khẩu hiện tại.');
      return;
    }
    setBusy(true);
    try {
      if (changePassword) {
        await apiRequest('/auth/change-password', {
          method: 'POST',
          body: { currentPassword: form.get('current'), newPassword: pwd },
        });
        if (await refresh()) router.push('/');
      } else {
        await login(String(form.get('username') ?? '').trim(), pwd);
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không thể hoàn tất. Vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  }

  if (changePassword) {
    return (
      <main
        id="main-content"
        className="grid min-h-[calc(100vh-140px)] place-items-center px-4 py-12"
      >
        <section className="w-[min(420px,100%)] rounded-2xl border border-line bg-surface p-8 shadow-lift animate-fade-up">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
              <Icon name="key" size={20} />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-ink">Đổi mật khẩu</h1>
              <p className="text-xs text-ink-muted">
                Tạo mật khẩu mới an toàn cho tài khoản của bạn
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-field">
              Mật khẩu hiện tại
              <input
                className="input"
                type="password"
                name="current"
                autoComplete="current-password"
                required
                maxLength={128}
                placeholder="Nhập mật khẩu hiện tại"
              />
            </label>
            <label className="form-field">
              Mật khẩu mới
              <span className="relative">
                <input
                  className="input pr-10"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={128}
                  placeholder="Ít nhất 8 ký tự"
                />
                <button
                  type="button"
                  className="icon-button absolute top-1 right-1"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? 'hidden' : 'eye'} size={15} />
                </button>
              </span>
            </label>
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
                placeholder="Nhập lại mật khẩu mới"
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="button primary mt-2 h-10 w-full font-semibold"
              type="submit"
              disabled={busy}
            >
              {busy ? 'Đang lưu…' : 'Lưu mật khẩu mới'}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      className="relative flex min-h-[calc(100vh-130px)] items-center justify-center px-4 py-8 md:py-12"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary-200/35 blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 size-[450px] rounded-full bg-indigo-200/30 blur-3xl" />
      </div>

      <div className="w-[min(460px,100%)] overflow-hidden rounded-3xl border border-line/80 bg-surface shadow-float animate-fade-up">
        {/* Form Card */}
        <section className="flex flex-col justify-center p-8 sm:p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Đăng nhập</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Sử dụng tài khoản hoặc mã số do nhà trường cung cấp
            </p>
          </div>

          {notice && (
            <div
              className="mb-5 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"
              role="alert"
            >
              <Icon name="info" size={14} className="shrink-0 text-amber-600" />
              <span>{notice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-field">
              <span className="text-xs font-medium text-ink">Tên đăng nhập / Mã sinh viên</span>
              <div className="relative mt-1">
                <input
                  className="input pl-9"
                  name="username"
                  autoComplete="username"
                  required
                  maxLength={32}
                  placeholder="Nhập tên đăng nhập hoặc mã SV"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-subtle">
                  <Icon name="users" size={13} />
                </span>
              </div>
            </label>

            <label className="form-field">
              <span className="flex items-center justify-between text-xs font-medium text-ink">
                <span>Mật khẩu</span>
                <Link
                  href="/forgot-password/"
                  className="font-semibold text-primary-600 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </span>
              <div className="relative mt-1">
                <input
                  className="input pl-9 pr-10"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  maxLength={128}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-subtle">
                  <Icon name="lock" size={13} />
                </span>
                <button
                  type="button"
                  className="icon-button absolute top-1/2 right-1.5 -translate-y-1/2 size-7"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? 'hidden' : 'eye'} size={14} />
                </button>
              </div>
            </label>

            {error && (
              <div
                className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700"
                role="alert"
              >
                <Icon name="close" size={12} className="shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <button
              className="button primary mt-2 h-11 w-full text-[15px] font-semibold shadow-lift transition hover:scale-[1.01]"
              type="submit"
              disabled={busy}
            >
              {busy ? (
                <span className="inline-flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Đang xác thực…
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  Đăng nhập
                  <Icon name="arrowRight" size={13} />
                </span>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
