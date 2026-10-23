import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main-content" className="page-width main-content">
      <div className="empty-state">
        <p className="error-code">404</p>
        <h1>Trang này không tồn tại</h1>
        <p>Đường dẫn có thể đã thay đổi hoặc không còn tồn tại.</p>
        <Link className="button primary" href="/">
          Về trang khóa học
        </Link>
      </div>
    </main>
  );
}
