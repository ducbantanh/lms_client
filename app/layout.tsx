import type { Metadata } from 'next';
import { SessionProvider } from '@/lib/session-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
// AdminLTE 3.2 đã bao gồm Bootstrap 4.6.1; nạp trước CSS tùy chỉnh, không nạp trùng Bootstrap.
import '../public/vendor/adminlte/adminlte.min.css';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Các khóa học của tôi | FIT LMS', template: '%s | FIT LMS' },
  description: 'Không gian học tập trực tuyến của Khoa Công nghệ thông tin.',
  icons: { icon: '/favicon.svg' },
};

/** Layout chung tồn tại xuyên suốt các route, tránh tạo lại session/socket khi chuyển trang. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        {/* File trong public được browser tải qua URL, không import như module CSS. */}
        <link rel="stylesheet" href="/fonts/source-sans-pro.css" />
        <link rel="stylesheet" href="/vendor/fontawesome/css/all.min.css" />
      </head>
      <body className="hold-transition layout-top-nav">
        <SessionProvider>
          {/* Khung top-nav của AdminLTE phù hợp bố cục ngang trong ảnh tham chiếu. */}
          <div className="wrapper">
            <SiteHeader />
            <div className="content-wrapper">{children}</div>
            <SiteFooter />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
