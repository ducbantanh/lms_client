'use client';

import { useState, type FormEvent } from 'react';
import { useSession } from '@/providers/session-provider';
import { hasPermission } from '@/lib/auth';
import { Icon } from '@/components/ui/icon';
import {
  BROADCAST_STORAGE_KEY,
  MAINTENANCE_STORAGE_KEY,
  type MaintenanceNotice,
  type SystemBroadcastMessage,
} from '@/components/layout/system-broadcast';

export function BroadcastPanel() {
  const { user } = useSession();
  const allowed = hasPermission(user, 'settings.manage') || user?.role === 0;

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState<'info' | 'warning' | 'urgent'>('info');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState('');

  // Chế độ bảo trì
  const [maintenanceActive, setMaintenanceActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as MaintenanceNotice).active : false;
    } catch {
      return false;
    }
  });
  const [maintenanceMsg, setMaintenanceMsg] = useState('Hệ thống đang bảo trì nâng cấp.');
  const [maintenanceEnd, setMaintenanceEnd] = useState('23:30 hôm nay');

  if (!allowed) return null;

  function handleSendBroadcast(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    setBusy(true);
    setSuccess('');

    const broadcastMsg: SystemBroadcastMessage = {
      id: `bc_${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      level,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    try {
      localStorage.setItem(BROADCAST_STORAGE_KEY, JSON.stringify(broadcastMsg));
      // Dispatch storage event to notify other tabs immediately
      window.dispatchEvent(new StorageEvent('storage', { key: BROADCAST_STORAGE_KEY }));
      setSuccess('Đã phát thông báo khẩn cấp toàn hệ thống thành công.');
      setTitle('');
      setMessage('');
    } catch {
      // Safe fallback
    } finally {
      setBusy(false);
    }
  }

  function handleToggleMaintenance() {
    const nextState = !maintenanceActive;
    setMaintenanceActive(nextState);

    const notice: MaintenanceNotice = {
      active: nextState,
      message: maintenanceMsg,
      estimatedEnd: maintenanceEnd,
    };

    try {
      localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify(notice));
      window.dispatchEvent(new StorageEvent('storage', { key: MAINTENANCE_STORAGE_KEY }));
      setSuccess(
        nextState
          ? 'Đã KÍCH HOẠT chế độ bảo trì hệ thống. Người dùng sẽ thấy cảnh báo.'
          : 'Đã TẮT chế độ bảo trì hệ thống.',
      );
    } catch {
      // Safe fallback
    }
  }

  function handleClearBroadcast() {
    try {
      localStorage.removeItem(BROADCAST_STORAGE_KEY);
      window.dispatchEvent(new StorageEvent('storage', { key: BROADCAST_STORAGE_KEY }));
      setSuccess('Đã gỡ bỏ thông báo khẩn cấp đang phát.');
    } catch {
      // Safe fallback
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Khối Phát thông báo khẩn */}
      <section className="panel">
        <div className="panel-title">
          <h2>
            <i className="title-icon blue">
              <Icon name="bell" size={12} />
            </i>
            Thông báo khẩn cấp toàn trường (Broadcast)
          </h2>
        </div>
        <p className="admin-hint mb-4">
          Thông báo sẽ hiển thị nổi bật ở đỉnh trang của mọi sinh viên, giảng viên và quản trị viên ngay lập tức qua WebSocket.
        </p>

        {success && (
          <div className="mb-4 rounded-lg bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            {success}
          </div>
        )}

        <form onSubmit={handleSendBroadcast} className="space-y-3.5">
          <label className="form-field">
            <span className="text-xs font-medium text-ink">Mức độ khẩn cấp</span>
            <select
              className="select mt-1"
              value={level}
              onChange={(e) => setLevel(e.target.value as 'info' | 'warning' | 'urgent')}
            >
              <option value="info">🔵 Thông tin chung (Màu xanh)</option>
              <option value="warning">🟡 Cảnh báo / Nhắc nhở (Màu cam)</option>
              <option value="urgent">🔴 Khẩn cấp / Báo động (Màu đỏ, nhấp nháy)</option>
            </select>
          </label>

          <label className="form-field">
            <span className="text-xs font-medium text-ink">Tiêu đề thông báo</span>
            <input
              className="input mt-1"
              placeholder="VD: Dời phòng thi, Sự cố mạng LAN..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={80}
            />
          </label>

          <label className="form-field">
            <span className="text-xs font-medium text-ink">Nội dung chi tiết</span>
            <textarea
              className="input mt-1 min-h-20"
              placeholder="VD: Phòng thi A203 được chuyển sang phòng B101 do sự cố điện..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={300}
            />
          </label>

          <div className="flex items-center gap-2 pt-2">
            <button className="button primary" type="submit" disabled={busy}>
              <Icon name="send" size={12} />
              {busy ? 'Đang gửi…' : 'Phát thông báo ngay'}
            </button>
            <button className="button" type="button" onClick={handleClearBroadcast}>
              Gỡ thông báo cũ
            </button>
          </div>
        </form>
      </section>

      {/* Khối Chế độ Bảo trì */}
      <section className="panel">
        <div className="panel-title">
          <h2>
            <i className="title-icon orange">
              <Icon name="settings" size={12} />
            </i>
            Chế độ Bảo trì Hệ thống (Maintenance Mode)
          </h2>
        </div>
        <p className="admin-hint mb-4">
          Khi kích hoạt, hệ thống sẽ hiện thanh cảnh báo bảo trì màu vàng cho toàn trường. Dùng khi nâng cấp database hoặc chuẩn bị kỳ thi.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-line bg-surface-muted p-4">
            <div>
              <b className="block text-sm text-ink">Trạng thái bảo trì</b>
              <span className="text-xs text-ink-muted">
                {maintenanceActive ? 'Đang KÍCH HOẠT (Bảo trì)' : 'Đang TẮT (Hệ thống hoạt động bình thường)'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleMaintenance}
              className={`button ${maintenanceActive ? 'danger' : 'primary'}`}
            >
              {maintenanceActive ? 'Tắt bảo trì' : 'Bật bảo trì'}
            </button>
          </div>

          <label className="form-field">
            <span className="text-xs font-medium text-ink">Nội dung giải thích bảo trì</span>
            <input
              className="input mt-1"
              value={maintenanceMsg}
              onChange={(e) => setMaintenanceMsg(e.target.value)}
              placeholder="VD: Nâng cấp máy chủ cơ sở dữ liệu..."
            />
          </label>

          <label className="form-field">
            <span className="text-xs font-medium text-ink">Thời gian dự kiến hoàn thành</span>
            <input
              className="input mt-1"
              value={maintenanceEnd}
              onChange={(e) => setMaintenanceEnd(e.target.value)}
              placeholder="VD: 01:00 ngày mai"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
