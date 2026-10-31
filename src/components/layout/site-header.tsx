'use client';

import Link from 'next/link';
import { useSession } from '@/providers/session-provider';
import { homeFor } from '@/lib/auth';
import { AccountMenu } from '@/components/layout/account-menu';
import { ThemeToggle } from '@/components/layout/theme-toggle';

/** Header đơn giản cho đăng nhập / đổi mật khẩu; các khu khác dùng khung sidebar (app-shell.tsx). */
export function SiteHeader() {
  const { user } = useSession();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-surface/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-15 w-[min(1200px,calc(100%-48px))] items-center gap-10 max-md:h-14 max-md:w-[calc(100%-32px)] max-md:gap-3">
          <Link
            href={user ? homeFor(user) : '/'}
            className="flex shrink-0 items-center gap-3 transition hover:opacity-90"
            aria-label="F LMS — Trang chủ"
          >
            <span className="grid size-9.5 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 text-lg font-black text-white shadow-md shadow-indigo-500/20">
              F
            </span>
            <span className="flex flex-col leading-tight">
              <strong className="text-base font-black tracking-tight text-ink">F LMS</strong>
              <small className="text-xs text-ink-muted max-md:hidden">
                Khoa Công nghệ Thông tin
              </small>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2.5">
            <ThemeToggle />
            {user && <AccountMenu />}
          </div>
        </div>
      </header>
    </>
  );
}
