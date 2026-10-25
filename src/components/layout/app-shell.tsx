'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSession } from '@/providers/session-provider';
import { NotificationsProvider } from '@/providers/notifications-provider';
import { ADMIN_PATH, TEACHER_PATH, hasPermission, homeFor, normalizePath } from '@/lib/auth';
import type { User } from '@/lib/types';
import { AccountMenu, ConnectionChip } from '@/components/layout/account-menu';
import { Icon, type IconName } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { NotificationBell } from '@/components/layout/notification-bell';
import { UnreadBanner } from '@/components/layout/unread-banner';

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
 * Menu theo khu vực, cố ý chỉ vài mục: Tổng quan, Khóa học, Hồ sơ, Cài đặt (sinh viên và giảng viên);
 * giảng viên có thêm Ngân hàng câu hỏi, Kho bài lập trình và Tạo bài thi.
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
            href: '/profile/',
            label: 'Hồ sơ',
            icon: 'profile',
            active: (path) => path === '/profile',
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
  // /teacher/question-banks (danh sách), /teacher/question-bank (câu hỏi của một ngân hàng)
  const banks: NavLink = {
    href: `${TEACHER_PATH}/question-banks/`,
    label: 'Ngân hàng câu hỏi',
    icon: 'bank',
    active: (path) => path.startsWith(`${TEACHER_PATH}/question-bank`),
  };
  // /teacher/code-problems: kho bài lập trình (câu dùng lại khi tạo bài)
  const codeLibrary: NavLink = {
    href: `${TEACHER_PATH}/code-problems/`,
    label: 'Kho bài lập trình',
    icon: 'code',
    active: (path) => path === `${TEACHER_PATH}/code-problems`,
  };
  const createExam: NavLink = {
    href: `${TEACHER_PATH}/create-exam/`,
    label: 'Tạo bài thi',
    icon: 'exam',
    active: (path) => path === `${TEACHER_PATH}/create-exam`,
  };
  // Ngân hàng câu hỏi, tạo bài thi là công cụ soạn đề của giảng viên; admin không soạn đề nên không có
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
          ...(hasPermission(user, 'courses.manage')
            ? [courses, banks, codeLibrary, createExam]
            : []),
          {
            href: `${TEACHER_PATH}/profile/`,
            label: 'Hồ sơ',
            icon: 'profile',
            active: (path) => path === `${TEACHER_PATH}/profile`,
          },
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

/** Menu trái thu gọn (chỉ icon) hay mở rộng, nhớ trong localStorage; trên mobile CSS bỏ qua. */
function useSidebarCollapsed() {
  const [saved, save] = useLocalStorage(SIDEBAR_KEY);
  return [saved === '1', (next: boolean) => save(next ? '1' : '0')] as const;
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
            <strong>F LMS</strong>
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
      </aside>
      {open && <div className="shell-backdrop" onClick={() => setOpen(false)} />}
      <div className="shell-body">
        <header className="shell-topbar">
          {/* Màn hình rộng: thu gọn/mở rộng menu trái (chỉ icon, tên hiện khi rê chuột) */}
          <button
            className="icon-button shell-collapse"
            aria-label={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon name={collapsed ? 'expand' : 'collapse'} size={15} />
          </button>
          {/* Màn hình hẹp: menu là ngăn kéo */}
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
        <div className="shell-content">
          {/* Chỉ khu học tập có NotificationsProvider; khu quản lý banner tự trả null */}
          <UnreadBanner />
          {children}
        </div>
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
