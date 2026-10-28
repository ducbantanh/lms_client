import type { Metadata } from 'next';
import { SessionProvider } from '@/providers/session-provider';
import { DropdownDismiss } from '@/components/ui/dropdown-dismiss';
import { FileDropGuard } from '@/components/ui/drop-zone';
// Font và icon đóng gói cùng ứng dụng (không CDN); nạp trước globals.css để style riêng được ưu tiên.
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fontsource-variable/inter';
import './fonts/source-sans-pro.css';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Các khóa học của tôi | F LMS', template: '%s | F LMS' },
  description: 'Không gian học tập trực tuyến của Khoa Công nghệ thông tin.',
  icons: { icon: '/favicon.svg' },
};

/** Layout chung tồn tại xuyên suốt các route, tránh tạo lại session/socket khi chuyển trang. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('lms.theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <SessionProvider>
          {/* Khung trang do layout của từng nhóm route quyết định: (auth), (learn), admin. */}
          <DropdownDismiss />
          <FileDropGuard />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
