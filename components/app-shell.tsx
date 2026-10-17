'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { useSession } from '@/lib/session-provider';
import { ADMIN_PATH, TEACHER_PATH, hasPermission, homeFor, normalizePath } from '@/lib/auth';
import type { User } from '@/lib/types';
import { AccountMenu, ConnectionChip } from './account-menu';
import { Icon, type IconName } from './icon';
import { Modal } from './modal';

/** learn: sinh viên; manage: quản trị + giảng dạy, cùng một sidebar lọc theo quyền. */
type Area = 'learn' | 'manage';
interface NavLink {
  href: string;
  label: string;
  icon: IconName;
  active: (path: string) => boolean;
}
interface NavGroup {
  title?: string;
  links: NavLink[];
}

/** Menu theo khu vực; khu quản lý lọc theo permission giống MANAGE_ROUTES trong lib/auth.ts. */
function navFor(area: Area, user: User | null): NavGroup[] {
  if (area === 'manage') {
    const teach: NavGroup = {
      title: 'Giảng dạy',
      links: hasPermission(user, 'courses.manage')
        ? [
            {
              href: `${TEACHER_PATH}/`,
              label: 'Khóa học',
              icon: 'teach',
              active: (path) => path === TEACHER_PATH || path.startsWith(`${TEACHER_PATH}/`),
            },
          ]
        : [],
    };
    const admin: NavGroup = {
      title: 'Quản trị',
      links: [
        ...(hasPermission(user, 'presence.view')
          ? [
              {
                href: `${ADMIN_PATH}/`,
                label: 'Tổng quan',
                icon: 'dashboard' as const,
                active: (path: string) => path === ADMIN_PATH,
              },
            ]
          : []),
        ...(hasPermission(user, 'users.manage')
          ? [
              {
                href: `${ADMIN_PATH}/users/`,
                label: 'Người dùng',
                icon: 'users' as const,
                active: (path: string) => path === `${ADMIN_PATH}/users`,
              },
              {
                href: `${ADMIN_PATH}/import/`,
                label: 'Tạo tài khoản',
                icon: 'upload' as const,
                active: (path: string) => path === `${ADMIN_PATH}/import`,
              },
            ]
          : []),
      ],
    };
    // Mỗi vai trò thấy nhóm việc chính của mình trước.
    return user?.role === 0 ? [admin, teach] : [teach, admin];
  }
  return [
    {
      links: [
        {
          href: '/dashboard/',
          label: 'Tổng quan',
          icon: 'dashboard',
          active: (path) => path === '/dashboard',
        },
        {
          href: '/',
          label: 'Khóa học',
          icon: 'book',
          active: (path) => path === '/' || path.startsWith('/course'),
        },
      ],
    },
  ];
}

/** Khung dashboard: sidebar trái + thanh trên; trên mobile sidebar thành ngăn kéo. */
export function AppShell({ area, children }: { area: Area; children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useSession();
  const path = normalizePath(pathname);
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const groups = navFor(area, user).filter((group) => group.links.length);

  return (
    <div className="shell">
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <aside className={`shell-sidebar ${open ? 'is-open' : ''}`} aria-label="Menu chính">
        <Link
          href={area === 'manage' && user ? homeFor(user) : '/dashboard/'}
          className="shell-brand"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">F</span>
          <span className="brand-text">
            <strong>FIT LMS</strong>
            <small>
              {area === 'learn'
                ? 'Khoa Công nghệ Thông tin'
                : user?.role === 0
                  ? 'Quản trị hệ thống'
                  : 'Giảng viên'}
            </small>
          </span>
        </Link>
        <nav className="shell-nav">
          {groups.map((group, index) => (
            <div key={group.title ?? index}>
              {group.title && <p className="shell-nav-title">{group.title}</p>}
              {group.links.map((link) => {
                const active = link.active(path);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={active ? 'active' : ''}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <Icon name={link.icon} size={15} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
      {open && <div className="shell-backdrop" onClick={() => setOpen(false)} />}
      <div className="shell-body">
        <header className="shell-topbar">
          <button
            className="icon-button shell-menu-toggle"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name="menu" size={18} />
          </button>
          <div className="shell-topbar-actions">
            {/* Khu quản lý phụ thuộc dữ liệu realtime nên luôn hiện trạng thái kết nối. */}
            <ConnectionChip always={area === 'manage'} />
            <AccountMenu onHelp={area === 'learn' ? () => setHelpOpen(true) : undefined} />
          </div>
        </header>
        <div className="shell-content">{children}</div>
      </div>
      {helpOpen && (
        <Modal title="Hướng dẫn sử dụng" onClose={() => setHelpOpen(false)}>
          <ol className="help-steps">
            <li>Tìm khóa học theo tên, mã học phần hoặc tên giảng viên.</li>
            <li>Lọc theo trạng thái, học kỳ hoặc đánh dấu khóa học yêu thích.</li>
            <li>Nhấn vào tên khóa học để xem tài liệu và bài kiểm tra.</li>
            <li>Giảng viên cho mã tham gia thì dùng nút “Tham gia bằng mã”.</li>
          </ol>
          <div className="dialog-actions">
            <button className="button primary" onClick={() => setHelpOpen(false)}>
              Đã hiểu
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
