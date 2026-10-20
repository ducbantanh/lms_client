'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { useSession } from '@/lib/session-provider';
import { NotificationsProvider } from '@/lib/notifications-provider';
import { ADMIN_PATH, TEACHER_PATH, hasPermission, homeFor, normalizePath } from '@/lib/auth';
import type { User } from '@/lib/types';
import { AccountMenu, ConnectionChip } from './account-menu';
import { Icon, type IconName } from './icon';
import { Modal } from './modal';
import { NotificationBell } from './notification-bell';

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

/**
 * Menu theo khu vực, cố ý chỉ vài mục: Tổng quan, Khóa học, Cài đặt (sinh viên và giảng viên).
 * Thông báo đã có chuông trên thanh trên; người online của lớp xem ở tab Sinh viên của khóa học.
 * Admin có thêm các trang quản trị; khu quản lý lọc theo permission giống MANAGE_ROUTES trong lib/auth.ts.
 */
function navFor(area: Area, user: User | null): NavGroup[] {
  if (area === 'learn')
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
          {
            href: '/settings/',
            label: 'Cài đặt',
            icon: 'settings',
            active: (path) => path === '/settings',
          },
        ],
      },
    ];
  // /teacher/courses (danh sách), /teacher/course (một khóa), /teacher/course/submissions (chấm điểm)
  const courses: NavLink = {
    href: `${TEACHER_PATH}/courses/`,
    label: 'Khóa học',
    icon: 'book',
    active: (path) => path.startsWith(`${TEACHER_PATH}/course`),
  };
  if (user?.role !== 0)
    return [
      {
        links: [
          {
            href: `${TEACHER_PATH}/`,
            label: 'Tổng quan',
            icon: 'dashboard',
            active: (path) => path === TEACHER_PATH,
          },
          ...(hasPermission(user, 'courses.manage') ? [courses] : []),
          {
            href: `${TEACHER_PATH}/settings/`,
            label: 'Cài đặt',
            icon: 'settings',
            active: (path) => path === `${TEACHER_PATH}/settings`,
          },
        ],
      },
    ];
  const admin: NavLink[] = [
    {
      href: `${ADMIN_PATH}/`,
      label: 'Tổng quan',
      icon: 'dashboard',
      active: (path) => path === ADMIN_PATH,
    },
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
    ...(hasPermission(user, 'audit.view')
      ? [
          {
            href: `${ADMIN_PATH}/audit/`,
            label: 'Nhật ký',
            icon: 'history' as const,
            active: (path: string) => path === `${ADMIN_PATH}/audit`,
          },
        ]
      : []),
  ];
  return [
    {
      links: [
        ...admin,
        ...(hasPermission(user, 'courses.manage') ? [courses] : []),
        {
          href: `${ADMIN_PATH}/settings/`,
          label: 'Cài đặt',
          icon: 'settings',
          active: (path) => path === `${ADMIN_PATH}/settings`,
        },
      ],
    },
  ];
}

/** Khung dashboard: sidebar trái + thanh trên; trên mobile sidebar thành ngăn kéo. */
export function AppShell({ area, children }: { area: Area; children: ReactNode }) {
  // Thông báo chỉ có ở khu học tập (người nhận là sinh viên đã ghi danh)
  return area === 'learn' ? (
    <NotificationsProvider>
      <Shell area={area}>{children}</Shell>
    </NotificationsProvider>
  ) : (
    <Shell area={area}>{children}</Shell>
  );
}

const SIDEBAR_KEY = 'lms.ui.sidebar-collapsed';

/**
 * Menu trái thu gọn (chỉ icon) hay mở rộng, nhớ trong localStorage của trình duyệt.
 * Chỉ đọc storage sau mount để HTML export và lần render đầu giống nhau; trên mobile CSS bỏ qua.
 */
function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(SIDEBAR_KEY) === '1');
    } catch {
      /* Storage có thể bị chặn. */
    }
  }, []);
  function update(next: boolean) {
    setCollapsed(next);
    try {
      localStorage.setItem(SIDEBAR_KEY, next ? '1' : '0');
    } catch {
      /* Không bắt buộc storage. */
    }
  }
  return [collapsed, update] as const;
}

function Shell({ area, children }: { area: Area; children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useSession();
  const path = normalizePath(pathname);
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [collapsed, setCollapsed] = useSidebarCollapsed();
  const groups = navFor(area, user).filter((group) => group.links.length);

  return (
    <div className={`shell${collapsed ? ' is-collapsed' : ''}`}>
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
                    // Thu gọn chỉ còn icon: rê chuột để xem tên mục
                    title={collapsed ? link.label : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <Icon name={link.icon} size={15} />
                    <span className="nav-label">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <button
          className="shell-collapse"
          aria-label={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          aria-expanded={!collapsed}
          title={collapsed ? 'Mở rộng menu' : undefined}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon name={collapsed ? 'expand' : 'collapse'} size={14} />
          <span className="nav-label">Thu gọn menu</span>
        </button>
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
            <NotificationBell />
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
