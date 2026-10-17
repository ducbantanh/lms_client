import { AppShell } from '@/components/app-shell';

/** Mọi trang /admin/** dùng chung khung sidebar quản lý (giống /teacher/**). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell area="manage">{children}</AppShell>;
}
