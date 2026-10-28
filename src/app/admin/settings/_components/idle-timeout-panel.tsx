'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { hasPermission } from '@/lib/auth';
import type { IdleTimeoutSettings } from '@/lib/admin';
import { useSession } from '@/providers/session-provider';
import { FlashMessage, type Flash } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';

const PATH = '/admin/settings/idle-timeout';

/**
 * Admin chỉnh số phút không hoạt động trước khi sinh viên / giảng viên bị tự đăng xuất.
 * "Hoạt động" = thao tác chuột, phím, cuộn, chạm trên trang hoặc gọi API; server áp dụng ngay cho phiên đang mở.
 */
export function IdleTimeoutPanel() {
  const { user } = useSession();
  const allowed = hasPermission(user, 'sessions.manage');
  const [settings, setSettings] = useState<IdleTimeoutSettings | null>(null);
  const [loadError, setLoadError] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);

  useEffect(() => {
    if (!allowed) return;
    apiRequest<IdleTimeoutSettings>(PATH)
      .then(setSettings)
      .catch((reason) =>
        setLoadError(reason instanceof Error ? reason.message : 'Không tải được cài đặt.'),
      );
  }, [allowed]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    try {
      const saved = await apiRequest<IdleTimeoutSettings>(PATH, {
        method: 'PUT',
        body: {
          studentMinutes: Number(form.get('student')),
          teacherMinutes: Number(form.get('teacher')),
        },
      });
      setSettings(saved);
      setFlash({ type: 'success', text: 'Đã lưu. Áp dụng ngay cho các phiên đang đăng nhập.' });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được cài đặt.');
    } finally {
      setBusy(false);
    }
  }

  if (!allowed) return null;
  return (
    <section className="panel rounded-2xl shadow-card border border-line/80 bg-white/95 backdrop-blur-xs">
      <div className="panel-title">
        <h2>
          <i className="title-icon orange">
            <Icon name="clock" size={11} />
          </i>
          Tự đăng xuất khi không hoạt động
        </h2>
      </div>
      <p className="admin-hint">
        Tài khoản không thao tác (chuột, bàn phím, cuộn trang) quá số phút dưới đây sẽ tự đăng xuất.
        Sinh viên đang làm bài kiểm tra (bài đang mở, chưa nộp) không bị tự đăng xuất. Quản trị viên
        dùng thời gian mặc định của server.
      </p>
      <FlashMessage flash={flash} onDone={clearFlash} />
      {loadError ? (
        <p className="form-error" role="alert">
          {loadError}
        </p>
      ) : !settings ? (
        <p className="empty-cell">Đang tải…</p>
      ) : (
        // key: sau khi lưu, ô nhập hiện lại đúng giá trị server đã nhận
        <form key={`${settings.studentMinutes}-${settings.teacherMinutes}`} onSubmit={save}>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="form-row">
            <label className="form-field">
              Sinh viên (phút)
              <input
                className="input"
                name="student"
                type="number"
                min={settings.minMinutes}
                max={settings.maxMinutes}
                step={1}
                defaultValue={settings.studentMinutes}
                required
              />
            </label>
            <label className="form-field">
              Giảng viên (phút)
              <input
                className="input"
                name="teacher"
                type="number"
                min={settings.minMinutes}
                max={settings.maxMinutes}
                step={1}
                defaultValue={settings.teacherMinutes}
                required
              />
            </label>
          </div>
          <button className="button primary" disabled={busy}>
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </form>
      )}
    </section>
  );
}
