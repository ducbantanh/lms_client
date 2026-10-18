import type { Metadata } from 'next';
import { AdminDashboard } from './admin-dashboard';

export const metadata: Metadata = { title: 'Tổng quan quản trị' };

/** Route giữ gọn; toàn bộ state và thao tác của dashboard nằm trong admin-dashboard.tsx. */
export default function AdminPage() {
  return <AdminDashboard />;
}
