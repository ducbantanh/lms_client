'use client';

import Link from 'next/link';
import { useSession } from '@/lib/session-provider';
import { homeFor } from '@/lib/auth';
import { AccountMenu } from './account-menu';

/** Header đơn giản cho đăng nhập / đổi mật khẩu; các khu khác dùng khung sidebar (app-shell.tsx). */
export function SiteHeader() {
  const { user } = useSession();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <header className="site-header">
        <div className="header-inner page-width">
          <Link
            href={user ? homeFor(user) : '/'}
            className="brand"
            aria-label="FIT LMS — Trang chủ"
          >
            <span className="brand-mark">F</span>
            <span className="brand-text">
              <strong>FIT LMS</strong>
              <small>Khoa Công nghệ Thông tin</small>
            </span>
          </Link>
          {user && (
            <div className="header-actions">
              <AccountMenu />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
