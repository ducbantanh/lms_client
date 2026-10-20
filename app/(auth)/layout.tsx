import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

/** Đăng nhập và đổi mật khẩu: header + footer đơn giản, không có sidebar. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <SiteHeader />
      <div className="app-main">{children}</div>
      <SiteFooter />
    </div>
  );
}
