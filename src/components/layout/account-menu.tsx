'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from '@/providers/session-provider';
import { roleName } from '@/lib/auth';
import { initials } from '@/lib/course-utils';
import { profileHref } from '@/lib/profile';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';

const CONNECTION_TONES = {
  online: 'bg-emerald-50 text-emerald-700',
  connecting: 'bg-amber-50 text-amber-700',
  offline: 'bg-red-50 text-red-600',
} as const;

/** Trạng thái WebSocket. Mặc định chỉ hiện khi có sự cố; `always` dùng ở trang cần dữ liệu realtime. */
export function ConnectionChip({ always = false }: { always?: boolean }) {
  const { connection } = useSession();
  if (connection === 'online' && !always) return null;
  return (
    <span
      className={`flex items-center gap-1.5 rounded-sm px-2.5 py-[3px] text-xs font-semibold ${CONNECTION_TONES[connection]}`}
      role="status"
    >
      <span className="status-dot bg-current" />
      {connection === 'online'
        ? 'Realtime'
        : connection === 'connecting'
          ? 'Đang kết nối'
          : 'Mất kết nối'}
    </span>
  );
}

/** Avatar + dropdown tài khoản, dùng chung cho header ngang và khung quản trị. */
export function AccountMenu({ onHelp }: { onHelp?: () => void }) {
  const { user, logout } = useSession();
  const [message, setMessage] = useState('');
  if (!user) return null;
  const profile = profileHref(user);

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Chưa thể đăng xuất.');
    }
  }

  return (
    <>
      <details className="dropdown group">
        <summary
          className="flex items-center gap-2 rounded-sm py-1 pr-2 pl-1 text-ink-subtle transition-colors group-open:bg-surface-muted hover:bg-surface-muted max-md:p-0.5"
          aria-label="Tài khoản"
        >
          <span className="grid size-7.5 place-items-center rounded-full bg-primary-50 text-xs font-bold text-primary-600">
            {initials(user.fullName)}
          </span>
          <span className="max-w-45 truncate text-sm font-semibold text-ink max-md:hidden">
            {user.fullName}
          </span>
          <Icon name="down" size={11} className="max-md:hidden" />
        </summary>
        <div className="dropdown-panel">
          <div className="dropdown-heading">
            <b>{user.fullName}</b>
            <small>
              {user.username} · {roleName(user.role)}
            </small>
          </div>
          {profile && <Link href={profile}>Hồ sơ cá nhân</Link>}
          <Link href="/change-password/">Đổi mật khẩu</Link>
          {onHelp && <button onClick={onHelp}>Hướng dẫn sử dụng</button>}
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      </details>
      {message && (
        <Modal title="Chưa thể hoàn tất" onClose={() => setMessage('')}>
          <p role="alert">{message}</p>
          <div className="dialog-actions">
            <button className="button" onClick={() => setMessage('')}>
              Đóng
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
