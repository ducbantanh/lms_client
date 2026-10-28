'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/providers/session-provider';
import { apiRequest } from '@/lib/api';
import { Icon } from '@/components/ui/icon';

interface DemoAccount {
  role: string;
  name: string;
  username: string;
  badge: string;
  icon: 'shield' | 'teach' | 'cap';
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: 'Quản trị viên', name: 'Admin', username: 'admin', badge: 'Admin', icon: 'shield' },
  { role: 'Giảng viên', name: 'Thầy Tuấn', username: 'gv_nguyenvana', badge: 'Teacher', icon: 'teach' },
  { role: 'Sinh viên', name: 'Sinh viên An', username: 'sv_tranvanb', badge: 'Student', icon: 'cap' },
];

/** Form xác thực thật dùng API Spring. Chuyển trang sau khi thành công do SessionProvider lo. */
export function AuthForm({ changePassword = false }: { changePassword?: boolean }) {
  const { login, refresh, notice } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleFillDemo(acc: DemoAccount) {
    setUsername(acc.username);
    setPassword('password123');
    setError('');
  }

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
      <main id="main-content" className="grid min-h-[calc(100vh-140px)] place-items-center px-4 py-12">
        <section className="w-[min(420px,100%)] rounded-2xl border border-line bg-white p-8 shadow-lift animate-fade-up">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
              <Icon name="key" size={20} />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-ink">Đổi mật khẩu</h1>
              <p className="text-xs text-ink-muted">Tạo mật khẩu mới an toàn cho tài khoản của bạn</p>
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
            <button className="button primary mt-2 h-10 w-full font-semibold" type="submit" disabled={busy}>
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

      <div className="grid w-[min(1080px,100%)] overflow-hidden rounded-3xl border border-line/80 bg-white shadow-float md:grid-cols-[1.12fr,0.88fr] animate-fade-up">
        {/* Left Hero Showcase */}
        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-white md:p-12">
          {/* Subtle glowing radial background */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-indigo-500/20 blur-3xl" />

          {/* Top Brand & Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-primary-200 backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Cổng học tập & khảo thí thế hệ mới
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 text-2xl font-black text-white shadow-glow">
                F
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  F LMS Portal
                </h2>
                <p className="text-xs text-slate-300">Khoa Công nghệ Thông tin</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-[15px]">
              Nền tảng tích hợp toàn diện: Quản lý học phần, tổ chức thi trắc nghiệm & lập trình trực tuyến, kiểm soát gian lận thông minh.
            </p>

            {/* Feature highlights */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Icon name="shield" size={15} />
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-white">Chế độ thi giám sát (Proctoring)</h3>
                  <p className="text-[11px] text-slate-300">Khóa toàn màn hình, phát hiện rời tab và theo dõi phiên thi thời gian thực.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Icon name="code" size={15} />
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-white">Chấm code trực tuyến (Judge)</h3>
                  <p className="text-[11px] text-slate-300">Hỗ trợ C++, Java, Python với trình soạn thảo CodeMirror chuyên sâu.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-500/20 text-amber-400">
                  <Icon name="qrcode" size={15} />
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-white">Điểm danh mã QR thông minh</h3>
                  <p className="text-[11px] text-slate-300">Quét mã QR động hiển thị trên máy chiếu, xác thực IP thiết bị chính xác.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Accounts Helper */}
          <div className="relative z-10 mt-8 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
            <div className="mb-2.5 flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Icon name="info" size={12} className="text-primary-400" />
                Thử nghiệm nhanh (Chọn tài khoản mẫu):
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => handleFillDemo(acc)}
                  className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 py-2 px-1 text-center transition hover:border-primary-400 hover:bg-primary-500/20 active:scale-95"
                >
                  <Icon name={acc.icon} size={14} className="text-primary-300" />
                  <span className="text-[11px] font-semibold text-white">{acc.name}</span>
                  <span className="text-[10px] text-slate-400">{acc.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Right Form Card */}
        <section className="flex flex-col justify-center p-8 md:p-12">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Đăng nhập</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Sử dụng tài khoản hoặc mã số do nhà trường cung cấp
            </p>
          </div>

          {notice && (
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900" role="alert">
              <Icon name="info" size={14} className="shrink-0 text-amber-600" />
              <span>{notice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-field">
              <span className="flex items-center justify-between text-xs font-medium text-ink">
                <span>Tên đăng nhập / Mã sinh viên</span>
                <span className="text-[11px] text-ink-subtle">VD: admin, sv_tranvanb</span>
              </span>
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
              <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700" role="alert">
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

          <div className="mt-8 border-t border-line pt-4 text-center text-xs text-ink-subtle">
            Cần hỗ trợ đăng nhập hoặc quên mật khẩu?{' '}
            <span className="font-medium text-primary-600">Liên hệ phòng Đào tạo</span>
          </div>
        </section>
      </div>
    </main>
  );
}
