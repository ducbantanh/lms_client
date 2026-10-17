import type { Metadata } from 'next';
import { SessionProvider } from '@/lib/session-provider';
import { DropdownDismiss } from '@/components/dropdown-dismiss';
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
      <body>
        <SessionProvider>
          {/* Khung trang do layout của từng nhóm route quyết định: (auth), (learn), admin. */}
          <DropdownDismiss />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
