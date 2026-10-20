import { Suspense } from 'react';
import { SubmissionsView } from '@/app/teacher/course/submissions/submissions-view';
export const metadata = { title: 'Bài nộp và chấm điểm' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function SubmissionsPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở bài nộp…</p>
        </main>
      }
    >
      <SubmissionsView />
    </Suspense>
  );
}
