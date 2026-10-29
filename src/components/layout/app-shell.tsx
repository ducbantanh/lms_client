'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSession } from '@/providers/session-provider';
import { NotificationsProvider } from '@/providers/notifications-provider';
import {
  ADMIN_PATH,
  TEACHER_PATH,
  hasPermission,
  homeFor,
  normalizePath,
  roleName,
} from '@/lib/auth';
import { initials } from '@/lib/course-utils';
import { profileHref } from '@/lib/profile';
import type { User } from '@/lib/types';
import { AccountMenu, ConnectionChip } from '@/components/layout/account-menu';
import { CommandPalette } from '@/components/layout/command-palette';
import { Icon, type IconName } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { InExamNotice } from '@/components/layout/in-exam-notice';
import { NotificationBell } from '@/components/layout/notification-bell';
import { SystemBroadcastBanner } from '@/components/layout/system-broadcast';
import { ThemeToggle } from '@/components/layout/theme-toggle';
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
 * Menu theo khu vực, cố ý chỉ vài mục: Tổng quan, Khóa học, Lịch, Hồ sơ, Cài đặt (sinh viên và giảng viên);
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
            href: '/schedule/',
            label: 'Lịch học',
            icon: 'calendar',
            active: (path) => path === '/schedule',
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
  // /teacher/schedule: lịch dạy do admin xếp, mở điểm danh từ buổi học
  const schedule: NavLink = {
    href: `${TEACHER_PATH}/schedule/`,
    label: 'Lịch dạy',
    icon: 'calendar',
    active: (path) => path === `${TEACHER_PATH}/schedule`,
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
            ? [courses, schedule, banks, codeLibrary, createExam]
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
    ...(hasPermission(user, 'schedules.manage')
      ? [
          {
            href: `${ADMIN_PATH}/schedule/`,
            label: 'Lịch học',
            icon: 'calendar' as const,
            active: (path: string) => path === `${ADMIN_PATH}/schedule`,
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
  const profile = user ? profileHref(user) : null;
  // Thu gọn chỉ áp dụng màn hình rộng; ngăn kéo trên điện thoại luôn có chữ
  const width = collapsed ? 'lg:w-16' : 'lg:w-[240px]';
  const hideWhenNarrow = collapsed ? 'lg:hidden' : '';

  return (
    <div className="min-h-dvh overflow-x-clip lg:flex">
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <aside
        aria-label="Menu chính"
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col bg-sidebar text-slate-300 shadow-float transition-[width,translate] duration-200 ease-out lg:sticky lg:top-0 lg:z-30 lg:h-dvh lg:translate-x-0 lg:shadow-none ${width} ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Đầu sidebar cao bằng thanh trên (h-16) để hai đường kẻ ngang thẳng hàng */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-white/10 ${collapsed ? 'lg:justify-center' : ''}`}
        >
          <Link
            href={area === 'manage' && user ? homeFor(user) : '/dashboard/'}
            onClick={() => setOpen(false)}
            className={`flex min-w-0 flex-1 items-center gap-3 self-stretch px-4 ${collapsed ? 'lg:hidden' : ''}`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 text-lg font-black text-white shadow-xs">
              F
            </span>
            <span className="min-w-0 leading-tight">
              <strong className="block text-[15px] font-semibold text-white">F LMS</strong>
              <small className="block truncate text-xs text-slate-400">
                {area === 'learn'
                  ? 'Khoa Công nghệ Thông tin'
                  : user?.role === 0
                    ? 'Quản trị hệ thống'
                    : 'Giảng viên'}
              </small>
            </span>
          </Link>
          {/* Nút ba gạch kiểu Windows: thu gọn chỉ còn icon / mở rộng có chữ */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            className={`hidden size-10 shrink-0 place-items-center rounded-sm text-slate-300 transition-colors hover:bg-sidebar-hover hover:text-white lg:grid ${collapsed ? '' : 'mr-3'}`}
          >
            <Icon name="menu" size={15} />
          </button>
        </div>
        <nav
          className={`flex-1 overflow-y-auto py-2 [scrollbar-color:rgb(255_255_255/0.2)_transparent] [scrollbar-width:thin] ${collapsed ? 'lg:overflow-visible' : ''}`}
        >
          {groups.map((group, index) => (
            <div key={group.title ?? index}>
              {group.title && (
                <p
                  className={`px-5 pt-4 pb-1 text-[11px] font-semibold tracking-wider text-slate-500 uppercase ${hideWhenNarrow}`}
                >
                  {group.title}
                </p>
              )}
              {group.links.map((link) => {
                const active = link.active(path);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`group relative mx-2.5 my-0.5 flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-all duration-150 ${
                      collapsed ? 'lg:mx-1.5 lg:justify-center lg:px-0' : ''
                    } ${active ? 'bg-primary-600 font-semibold text-white shadow-xs' : 'text-slate-300 hover:bg-sidebar-hover hover:text-white'}`}
                  >
                    <Icon
                      name={link.icon}
                      size={15}
                      className={`w-5 text-center ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                    />
                    <span className={`truncate ${hideWhenNarrow}`}>{link.label}</span>
                    {/* Thu gọn: tên mục hiện khi rê chuột */}
                    {collapsed && (
                      <span className="pointer-events-none absolute left-full z-50 ml-2 hidden rounded-md bg-sidebar px-2.5 py-1.5 text-xs whitespace-nowrap text-white opacity-0 shadow-lift transition-opacity group-hover:opacity-100 lg:block">
                        {link.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        {user && (
          <div className="border-t border-white/10">
            <Link
              href={profile ?? (area === 'manage' ? homeFor(user) : '/dashboard/')}
              onClick={() => setOpen(false)}
              title={collapsed ? user.fullName : undefined}
              className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sidebar-hover ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                {initials(user.fullName)}
              </span>
              <span className={`min-w-0 leading-tight ${hideWhenNarrow}`}>
                <b className="block truncate text-[13px] font-semibold text-white">
                  {user.fullName}
                </b>
                <small className="block truncate text-xs text-slate-400">
                  {roleName(user.role)}
                </small>
              </span>
            </Link>
          </div>
        )}
      </aside>
      {/* Màn hình hẹp: menu là ngăn kéo, bấm nền tối để đóng */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-sidebar/40 transition-opacity duration-200 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <SystemBroadcastBanner />
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-line/80 bg-surface/85 px-4 backdrop-blur-md md:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-sm text-ink-muted transition-colors hover:bg-surface-muted lg:hidden"
          >
            <Icon name="menu" size={16} />
          </button>
          <CommandPalette area={area} user={user} links={groups.flatMap((group) => group.links)} />
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {/* Khu quản lý phụ thuộc dữ liệu realtime nên luôn hiện trạng thái kết nối. */}
            <ConnectionChip always={area === 'manage'} />
            <ThemeToggle />
            <NotificationBell />
            <AccountMenu onHelp={area === 'learn' ? () => setHelpOpen(true) : undefined} />
          </div>
        </header>
        <div className="mx-auto w-full max-w-[1680px] flex-1 px-4 pt-6 pb-12 md:px-6 lg:px-8">
          {/* Chỉ khu học tập có NotificationsProvider; khu quản lý banner tự trả null */}
          <UnreadBanner />
          {children}
        </div>
      </div>
      {/* Sinh viên đang thi có giám sát mở trang khác: đưa về trang làm bài */}
      {area === 'learn' && <InExamNotice />}
      {helpOpen && (
        <Modal title="Hướng dẫn sử dụng" onClose={() => setHelpOpen(false)}>
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>Tìm khóa học theo tên, mã học phần hoặc tên giảng viên.</li>
            <li>Lọc theo trạng thái, học kỳ hoặc đánh dấu khóa học yêu thích.</li>
            <li>Nhấn vào tên khóa học để xem tài liệu và bài kiểm tra.</li>
            <li>Giảng viên cho mã tham gia thì dùng nút “Tham gia bằng mã”.</li>
            <li>Bấm Ctrl+K (⌘K trên Mac) để tìm nhanh trang và khóa học.</li>
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
