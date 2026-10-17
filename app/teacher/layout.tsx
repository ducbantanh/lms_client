import { AppShell } from '@/components/app-shell';

/** Mọi trang /teacher/** dùng chung khung sidebar quản lý với khu quản trị. */
export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <AppShell area="manage">{children}</AppShell>;
}
