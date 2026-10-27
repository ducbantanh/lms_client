'use client';

import Link from 'next/link';
import { useSession } from '@/providers/session-provider';
import { homeFor } from '@/lib/auth';
import { AccountMenu } from '@/components/layout/account-menu';

/** Header đơn giản cho đăng nhập / đổi mật khẩu; các khu khác dùng khung sidebar (app-shell.tsx). */
export function SiteHeader() {
  const { user } = useSession();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto w-[min(1200px,calc(100%-48px))] max-md:w-[calc(100%-32px)] flex h-15 items-center gap-10 max-md:h-14 max-md:gap-3">
          <Link
            href={user ? homeFor(user) : '/'}
            className="flex shrink-0 items-center gap-2.5"
            aria-label="F LMS — Trang chủ"
          >
            <span className="grid size-8 place-items-center rounded-sm bg-primary-600 text-[17px] font-bold text-white">
              F
            </span>
            <span className="flex flex-col leading-[1.2]">
              <strong className="text-[15px] font-bold">F LMS</strong>
              <small className="text-xs text-ink-muted max-md:hidden">
                Khoa Công nghệ Thông tin
              </small>
            </span>
          </Link>
          {user && (
            <div className="ml-auto flex items-center gap-3">
              <AccountMenu />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
