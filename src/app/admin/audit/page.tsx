import { Suspense } from 'react';
import { AuditView } from '@/app/admin/audit/_components/audit-view';
export const metadata = { title: 'Nhật ký hoạt động' };

/** Suspense cho phép useSearchParams (bộ lọc trên URL) chạy phía client trong bản export tĩnh. */
export default function AdminAuditPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở nhật ký hoạt động…</p>
        </main>
      }
    >
      <AuditView />
    </Suspense>
  );
}
