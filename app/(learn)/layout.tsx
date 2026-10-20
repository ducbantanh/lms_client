import { AppShell } from '@/components/app-shell';

/** Khu học tập (tổng quan, khóa học, chi tiết khóa học) dùng khung sidebar giống khu quản trị. */
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <AppShell area="learn">{children}</AppShell>;
}
