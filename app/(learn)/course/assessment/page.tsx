import { Suspense } from 'react';
import { AssessmentView } from '@/app/(learn)/course/assessment/assessment-view';
export const metadata = { title: 'Làm bài' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở bài…</p>
        </main>
      }
    >
      <AssessmentView />
    </Suspense>
  );
}
