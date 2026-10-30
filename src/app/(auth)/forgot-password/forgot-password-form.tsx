'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { Icon } from '@/components/ui/icon';

interface Requested {
  expiresInSeconds: number;
  resendAfterSeconds: number;
}

type Step = 'account' | 'code' | 'success';

export function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>('account');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);
  const [expiresLeft, setExpiresLeft] = useState(0);

  useEffect(() => {
    if (step !== 'code' || (resendLeft <= 0 && expiresLeft <= 0)) return;
    const timer = setInterval(() => {
      setResendLeft((value) => Math.max(0, value - 1));
      setExpiresLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, resendLeft, expiresLeft]);

  async function requestCode(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (busy || (step === 'code' && resendLeft > 0)) return;
    const account = username.trim();
    if (!account) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await apiRequest<Requested>('/auth/forgot-password/request', {
        method: 'POST',
        body: { username: account },
      });
      setUsername(account);
      setResendLeft(result.resendAfterSeconds);
      setExpiresLeft(result.expiresInSeconds);
      setStep('code');
      setNotice(
        'Nếu tài khoản tồn tại và đã đăng ký email, mã OTP đã được gửi. Hãy kiểm tra cả thư mục thư rác.',
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : 'Không thể gửi mã OTP. Vui lòng thử lại.',
      );
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') ?? '');
    if (password !== form.get('confirm')) {
      setError('Mật khẩu xác nhận chưa khớp.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await apiRequest('/auth/forgot-password/reset', {
        method: 'POST',
        body: { username, code, newPassword: password },
      });
      setStep('success');
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : 'Không thể đặt lại mật khẩu. Vui lòng thử lại.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      id="main-content"
      className="relative flex min-h-[calc(100vh-130px)] items-center justify-center px-4 py-8 md:py-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200/35 blur-3xl" />
        <div className="absolute right-1/4 -bottom-10 size-[420px] rounded-full bg-indigo-200/30 blur-3xl" />
      </div>

      <section className="w-[min(460px,100%)] rounded-3xl border border-line/80 bg-surface p-8 shadow-float animate-fade-up sm:p-10">
        {step === 'success' ? (
          <Success />
        ) : (
          <>
            <div className="mb-6 flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <Icon name={step === 'account' ? 'mail' : 'key'} size={19} />
              </span>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-ink">
                  {step === 'account' ? 'Quên mật khẩu' : 'Nhập mã OTP'}
                </h1>
                <p className="mt-1 text-xs leading-5 text-ink-muted">
                  {step === 'account'
                    ? 'Nhập tên đăng nhập hoặc MSSV. Mã xác minh sẽ được gửi tới email trong hồ sơ của bạn.'
                    : `Mã gồm 6 chữ số đã được gửi cho tài khoản ${username}.`}
                </p>
              </div>
            </div>

            {notice && (
              <div
                className="mb-4 flex items-start gap-2 rounded-lg border border-primary-200 bg-primary-50 p-3 text-xs leading-5 text-primary-800"
                role="status"
              >
                <Icon name="info" size={13} className="mt-0.5 shrink-0" />
                <span>{notice}</span>
              </div>
            )}

            {step === 'account' ? (
              <form onSubmit={requestCode} className="space-y-4">
                <label className="form-field">
                  Tên đăng nhập / Mã sinh viên
                  <input
                    className="input"
                    name="username"
                    autoComplete="username"
                    required
                    maxLength={32}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Nhập tên đăng nhập hoặc mã SV"
                    autoFocus
                  />
                </label>
                <ErrorMessage text={error} />
                <button className="button primary h-11 w-full font-semibold" disabled={busy}>
                  {busy ? 'Đang gửi…' : 'Gửi mã OTP qua email'}
                </button>
              </form>
            ) : (
              <form onSubmit={resetPassword} className="space-y-4">
                <label className="form-field">
                  Mã OTP
                  <input
                    className="input h-12 text-center font-mono text-xl font-bold tracking-[0.35em] tabular-nums"
                    name="code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    autoFocus
                  />
                  <small className="text-xs font-normal text-ink-subtle">
                    {expiresLeft > 0
                      ? `Mã hết hạn sau ${clock(expiresLeft)}`
                      : 'Mã có thể đã hết hạn. Hãy gửi lại mã mới.'}
                  </small>
                </label>
                <label className="form-field">
                  Mật khẩu mới
                  <span className="relative">
                    <input
                      className="input pr-10"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      minLength={8}
                      maxLength={128}
                      required
                      placeholder="Ít nhất 8 ký tự"
                    />
                    <button
                      type="button"
                      className="icon-button absolute top-1 right-1"
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon name={showPassword ? 'hidden' : 'eye'} size={14} />
                    </button>
                  </span>
                </label>
                <label className="form-field">
                  Xác nhận mật khẩu mới
                  <input
                    className="input"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </label>
                <ErrorMessage text={error} />
                <button
                  className="button primary h-11 w-full font-semibold"
                  disabled={busy || code.length !== 6}
                >
                  {busy ? 'Đang xác minh…' : 'Đặt lại mật khẩu'}
                </button>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    className="link-button"
                    disabled={busy || resendLeft > 0}
                    onClick={() => void requestCode()}
                  >
                    {resendLeft > 0 ? `Gửi lại sau ${resendLeft}s` : 'Gửi lại mã OTP'}
                  </button>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setStep('account');
                      setCode('');
                      setError('');
                      setNotice('');
                    }}
                  >
                    Đổi tài khoản
                  </button>
                </div>
              </form>
            )}
            <p className="mt-6 text-center text-xs text-ink-muted">
              <Link href="/login/" className="font-semibold text-primary-600 hover:underline">
                <Icon name="back" size={10} /> Quay lại đăng nhập
              </Link>
            </p>
          </>
        )}
      </section>
    </main>
  );
}

function Success() {
  return (
    <div className="py-2 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        <Icon name="check" size={22} />
      </span>
      <h1 className="mt-4 text-xl font-bold text-ink">Đã đặt lại mật khẩu</h1>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Mật khẩu mới đã có hiệu lực. Tất cả phiên đăng nhập cũ của tài khoản đã được đăng xuất.
      </p>
      <Link href="/login/" className="button primary mt-6 h-10 w-full">
        Đăng nhập bằng mật khẩu mới
      </Link>
    </div>
  );
}

function ErrorMessage({ text }: { text: string }) {
  return text ? (
    <div
      className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700"
      role="alert"
    >
      <Icon name="close" size={12} className="shrink-0 text-rose-600" />
      <span>{text}</span>
    </div>
  ) : null;
}

function clock(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
