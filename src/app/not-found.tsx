import Link from 'next/link';
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(1200px,calc(100%-48px))] max-md:w-[calc(100%-32px)] pt-8 pb-12 max-md:pt-6 max-md:pb-10"
    >
      <div className="empty-state rounded-3xl border border-line/80 bg-white/95 p-12 text-center shadow-xl backdrop-blur-md max-w-xl mx-auto">
        <p className="error-code text-6xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">404</p>
        <h1>Trang này không tồn tại</h1>
        <p>Đường dẫn có thể đã thay đổi hoặc không còn tồn tại.</p>
        <Link className="button primary" href="/">
          Về trang khóa học
        </Link>
      </div>
    </main>
  );
}
