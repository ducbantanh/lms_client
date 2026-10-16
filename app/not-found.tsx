import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main-content" className="page-width main-content">
      <div className="empty-state">
        <span className="eyebrow">404</span>
        <h1>Trang này không tồn tại</h1>
        <p>Bạn có thể quay lại không gian học tập của mình.</p>
        <Link className="btn btn-primary button primary" href="/">
          Về trang khóa học
        </Link>
      </div>
    </main>
  );
}
