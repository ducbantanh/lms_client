import { Suspense } from 'react';
import { UsersView } from '@/app/admin/users/_components/users-view';
export const metadata = { title: 'Người dùng' };

/** Suspense cho phép useSearchParams (bộ lọc trên URL) chạy phía client trong bản export tĩnh. */
export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở danh sách người dùng…</p>
        </main>
      }
    >
      <UsersView />
    </Suspense>
  );
}
