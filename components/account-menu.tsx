'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from '@/lib/session-provider';
import { roleName } from '@/lib/auth';
import { initials } from '@/lib/course-utils';
import { Icon } from './icon';
import { Modal } from './modal';

/** Trạng thái WebSocket. Mặc định chỉ hiện khi có sự cố; `always` dùng ở trang cần dữ liệu realtime. */
export function ConnectionChip({ always = false }: { always?: boolean }) {
  const { connection } = useSession();
  if (connection === 'online' && !always) return null;
  return (
    <span className={`connection-chip ${connection}`} role="status">
      <span className="status-dot" />
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

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Chưa thể đăng xuất.');
    }
  }

  return (
    <>
      <details className="dropdown profile-dropdown">
        <summary className="profile-trigger" aria-label="Tài khoản">
          <span className="avatar">{initials(user.fullName)}</span>
          <span className="profile-name">{user.fullName}</span>
          <Icon name="down" size={11} />
        </summary>
        <div className="dropdown-panel">
          <div className="dropdown-heading">
            <b>{user.fullName}</b>
            <small>
              {user.username} · {roleName(user.role)}
            </small>
          </div>
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
