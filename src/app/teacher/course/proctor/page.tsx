import { Suspense } from 'react';
import { ProctorBoardView } from '@/app/teacher/course/proctor/_components/proctor-board';
export const metadata = { title: 'Giám sát thi' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function ProctorPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở trang giám sát…</p>
        </main>
      }
    >
      <ProctorBoardView />
    </Suspense>
  );
}
