'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from '@/lib/session-provider';
import { initials } from '@/lib/course-utils';
import { Icon } from './icon';
import { Modal } from './modal';

export function SiteHeader() {
  const pathname = usePathname();
  const { user, isDemo, connection, logout } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [readNotices, setReadNotices] = useState(false);
  const [message, setMessage] = useState('');
  const isAdminArea = pathname.startsWith('/admin');
  const isAdminUser = user.permissions.includes('users.manage');

  // Đóng dropdown khi click ngoài hoặc Escape, không cần jQuery điều khiển DOM của React.
  useEffect(() => {
    function dismiss(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      document.querySelectorAll<HTMLDetailsElement>('details.dropdown[open]').forEach((element) => {
        if (event instanceof KeyboardEvent || !element.contains(event.target as Node))
          element.open = false;
      });
    }
    document.addEventListener('click', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('click', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Chưa thể đăng xuất.');
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <header className="main-header site-header">
        <div className="header-inner page-width">
          <Link href="/" className="brand" aria-label="FIT LMS — Trang chủ">
            <div className="brand-symbol">
              <span className="brand-monogram">F</span>
              <b>FIT</b>
            </div>
            <div className="brand-copy">
              <span>HỆ THỐNG QUẢN LÝ HỌC TẬP</span>
              <strong>KHOA CÔNG NGHỆ THÔNG TIN</strong>
              <small>Faculty of Information Technology</small>
            </div>
          </Link>
          <div className="header-actions">
            <span className={`connection-chip ${isDemo ? '' : connection}`}>
              <span />
              {isDemo
                ? 'Bản xem trước'
                : connection === 'online'
                  ? 'Đã kết nối'
                  : connection === 'connecting'
                    ? 'Đang kết nối'
                    : 'Mất kết nối'}
            </span>
            <details className="dropdown notifications-dropdown">
              <summary className="icon-button notification-trigger" aria-label="Thông báo">
                <Icon name="bell" size={21} />
                {isDemo && !readNotices && <span className="notification-dot" />}
              </summary>
              <div className="dropdown-menu dropdown-panel notification-panel">
                <div className="dropdown-heading">
                  <b>Thông báo</b>
                  {isDemo && <button onClick={() => setReadNotices(true)}>Đánh dấu đã đọc</button>}
                </div>
                {isDemo ? (
                  <>
                    <Link
                      href="/course/?id=network-programming"
                      className="notification-item"
                      onClick={(event) => {
                        event.currentTarget.closest('details')?.removeAttribute('open');
                      }}
                    >
                      <span className="notification-icon">
                        <Icon name="book" />
                      </span>
                      <span>
                        <b>Lập trình mạng</b>
                        <small>Khám phá nội dung khóa học mẫu.</small>
                      </span>
                    </Link>
                    <p className="dropdown-note">Thông báo minh họa cho bản xem trước.</p>
                  </>
                ) : (
                  <p className="dropdown-note">Chưa có thông báo mới.</p>
                )}
              </div>
            </details>
            <span className="header-divider" />
            <details className="dropdown profile-dropdown">
              <summary className="profile-trigger">
                <span className="profile-label">
                  <b>{user.fullName}</b>
                  <small>
                    {isDemo
                      ? isAdminArea
                        ? 'Quản trị viên · Demo'
                        : 'Sinh viên · Demo'
                      : user.role === 0
                        ? 'Quản trị viên'
                        : 'Tài khoản LMS'}
                  </small>
                </span>
                <span className="avatar">{initials(user.fullName)}</span>
                <Icon name="down" size={14} />
              </summary>
              <div className="dropdown-menu dropdown-panel profile-panel">
                <p className="dropdown-note">{user.username}</p>
                {isDemo ? (
                  <>
                    <Link href="/login/">
                      <Icon name="user" size={17} />
                      Đăng nhập hệ thống
                    </Link>
                    <Link href={isAdminArea ? '/' : '/admin/'}>
                      <Icon name={isAdminArea ? 'book' : 'shield'} size={17} />
                      {isAdminArea ? 'Xem giao diện sinh viên' : 'Xem dashboard Admin'}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/change-password/">
                      <Icon name="lock" size={17} />
                      Đổi mật khẩu
                    </Link>
                    <button onClick={handleLogout}>
                      <Icon name="logout" size={17} />
                      Đăng xuất
                    </button>
                  </>
                )}
                <button onClick={() => setHelpOpen(true)}>
                  <Icon name="help" size={17} />
                  Hướng dẫn sử dụng
                </button>
              </div>
            </details>
          </div>
        </div>
        <nav className="navbar navbar-expand main-nav" aria-label="Điều hướng chính">
          <div className="nav-inner page-width">
            <Link
              href={isAdminArea ? '/admin/' : '/'}
              className="nav-home"
              aria-label="Trang chủ FIT"
            >
              <Icon name="home" size={21} />
            </Link>
            <button
              className="mobile-nav-toggle"
              aria-label="Mở menu điều hướng"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name="menu" />
              Menu
            </button>
            <div className={`nav-links ${mobileOpen ? 'is-open' : ''}`}>
              {isAdminArea ? (
                <>
                  <Link
                    href="/admin/"
                    className={pathname === '/admin/' || pathname === '/admin' ? 'active' : ''}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon name="dashboard" size={17} />
                    Tổng quan hệ thống
                  </Link>
                  <a href="#online-users" onClick={() => setMobileOpen(false)}>
                    <Icon name="users" size={17} />
                    Người dùng online
                  </a>
                  <a href="#audit-log" onClick={() => setMobileOpen(false)}>
                    <Icon name="audit" size={17} />
                    Nhật ký gần đây
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard/"
                    className={
                      pathname === '/dashboard/' || pathname === '/dashboard' ? 'active' : ''
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon name="dashboard" size={17} />
                    Bảng điều khiển
                  </Link>
                  <Link
                    href="/"
                    className={pathname === '/' || pathname.startsWith('/course') ? 'active' : ''}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon name="book" size={17} />
                    Các khóa học của tôi
                  </Link>
                  <button
                    onClick={() => {
                      setHelpOpen(true);
                      setMobileOpen(false);
                    }}
                  >
                    Hướng dẫn học tập
                    <Icon name="down" size={14} />
                  </button>
                </>
              )}
            </div>
            <div className="nav-right">
              <span>Tiếng Việt</span>
              <button
                aria-label="Tìm khóa học"
                className="nav-search"
                onClick={() => {
                  if (isAdminArea) document.getElementById('admin-search')?.focus();
                  else if (pathname === '/') document.getElementById('course-search')?.focus();
                  else window.location.assign('/#course-search');
                }}
              >
                <Icon name="search" />
              </button>
            </div>
          </div>
        </nav>
      </header>
      {helpOpen && (
        <Modal
          title={isAdminArea ? 'Hướng dẫn dashboard Admin' : 'Chào mừng bạn đến với FIT LMS'}
          onClose={() => setHelpOpen(false)}
        >
          <p>
            {isAdminArea
              ? 'Dashboard tổng hợp tài khoản, trạng thái online và nhật ký hệ thống.'
              : 'Tất cả khóa học của bạn được tập hợp trong một không gian học tập.'}
          </p>
          <ol className="help-steps">
            {isAdminArea ? (
              <>
                <li>Theo dõi số người dùng và kết nối WebSocket đang hoạt động.</li>
                <li>Tìm người dùng online và ép đăng xuất khi cần.</li>
                <li>Kiểm tra hoạt động realtime và audit log gần nhất.</li>
              </>
            ) : (
              <>
                <li>Tìm khóa học theo tên, mã học phần hoặc tên giảng viên.</li>
                <li>Lọc học kỳ, đánh dấu yêu thích và chọn bố cục phù hợp.</li>
                <li>Nhấn vào tên khóa học để xem thông tin và nội dung theo tuần.</li>
              </>
            )}
          </ol>
          <p className="notice">
            {isDemo
              ? 'Bản xem trước sử dụng dữ liệu mẫu. Đăng nhập để kết nối dữ liệu từ máy chủ nhà trường.'
              : 'Các thao tác được kiểm tra lại ở Spring Boot theo permission của tài khoản.'}
          </p>
          <button className="btn btn-primary button primary" onClick={() => setHelpOpen(false)}>
            Bắt đầu khám phá
            <Icon name="arrow" size={17} />
          </button>
        </Modal>
      )}
      {!isAdminArea && isAdminUser && (
        <Link className="admin-shortcut" href="/admin/">
          <Icon name="shield" size={16} />
          Mở trang quản trị
        </Link>
      )}
      {message && (
        <Modal title="Chưa thể hoàn tất" onClose={() => setMessage('')}>
          <p role="alert">{message}</p>
          <button className="btn btn-outline-secondary button" onClick={() => setMessage('')}>
            Đóng
          </button>
        </Modal>
      )}
    </>
  );
}
