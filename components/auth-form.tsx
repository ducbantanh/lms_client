'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session-provider';
import { apiRequest } from '@/lib/api';
import { Icon } from '@/components/icon';

/** Form xác thực thật dùng API Spring; chế độ xem trước có nút riêng, không giả đăng nhập. */
export function AuthForm({ changePassword = false }: { changePassword?: boolean }) {
  const { login, enterDemo, refresh, isDemo } = useSession();
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
    <main id="main-content" className="page-width auth-page">
      <section className="auth-intro">
        <span className="eyebrow">FIT LEARNING MANAGEMENT SYSTEM</span>
        <h1>
          Học tập hôm nay.
          <br />
          <span>Kiến tạo ngày mai.</span>
        </h1>
        <p>
          Một không gian để kết nối với giảng viên, khám phá tri thức và theo dõi hành trình học tập
          của bạn.
        </p>
        <div className="auth-art" aria-hidden="true">
          <div className="auth-orbit" />
          <span>
            <Icon name="book" size={72} />
          </span>
          <i />
          <b />
          <em />
        </div>
        <span className="auth-caption">LEARN. GROW. CONNECT.</span>
      </section>
      <section className="card auth-card">
        <span className="section-icon">
          <Icon name={changePassword ? 'lock' : 'user'} size={23} />
        </span>
        <h2>{changePassword ? 'Đổi mật khẩu' : 'Chào mừng bạn trở lại'}</h2>
        <p>
          {changePassword
            ? 'Tạo mật khẩu mới để bảo vệ tài khoản của bạn.'
            : 'Đăng nhập bằng tài khoản do nhà trường cung cấp.'}
        </p>
        {changePassword && isDemo ? (
          <>
            <p className="notice">Bạn cần đăng nhập tài khoản thật trước khi đổi mật khẩu.</p>
            <button
              className="btn btn-primary button primary full-width"
              onClick={() => router.push('/login/')}
            >
              Đến trang đăng nhập
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {changePassword ? (
              <label className="form-group form-field">
                Mật khẩu hiện tại
                <input
                  className="form-control"
                  type="password"
                  name="current"
                  autoComplete="current-password"
                  required
                  maxLength={128}
                />
              </label>
            ) : (
              <label className="form-group form-field">
                Tên đăng nhập / Mã sinh viên
                <input
                  className="form-control"
                  name="username"
                  autoComplete="username"
                  required
                  maxLength={32}
                  placeholder="Nhập tài khoản của bạn"
                />
              </label>
            )}
            <label className="form-group form-field">
              {changePassword ? 'Mật khẩu mới' : 'Mật khẩu'}
              <span className="password-field">
                <input
                  className="form-control"
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
                  <Icon name={showPassword ? 'hidden' : 'eye'} size={19} />
                </button>
              </span>
            </label>
            {changePassword && (
              <label className="form-group form-field">
                Xác nhận mật khẩu mới
                <input
                  className="form-control"
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
            <button
              className="btn btn-primary button primary full-width"
              type="submit"
              disabled={busy}
            >
              {busy ? 'Đang xử lý…' : changePassword ? 'Lưu mật khẩu mới' : 'Đăng nhập'}
              <Icon name="arrow" size={18} />
            </button>
          </form>
        )}
        {!changePassword && (
          <>
            <p className="auth-help">
              Đăng nhập lần đầu? Mật khẩu ban đầu là ngày sinh theo dạng <b>ddmmyyyy</b>.
            </p>
            <div className="auth-separator">
              <span>hoặc</span>
            </div>
            <button className="btn btn-outline-secondary button full-width" onClick={enterDemo}>
              Khám phá giao diện mẫu
              <Icon name="arrow" size={17} />
            </button>
          </>
        )}
      </section>
    </main>
  );
}
