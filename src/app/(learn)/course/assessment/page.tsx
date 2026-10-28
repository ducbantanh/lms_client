import { Suspense } from 'react';
import { AssessmentView } from '@/app/(learn)/course/assessment/_components/assessment-view';
export const metadata = { title: 'Làm bài' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <div className="p-8 text-center text-ink-muted animate-pulse"><div className="skeleton mx-auto h-8 w-48 rounded-xl" /><div className="skeleton mx-auto mt-3 h-4 w-72 rounded-lg" /></div>
        </main>
      }
    >
      <AssessmentView />
    </Suspense>
  );
}
