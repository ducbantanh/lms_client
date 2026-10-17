import { Suspense } from 'react';
import { CourseDetail } from '@/app/course/course-detail';
export const metadata = { title: 'Chi tiết khóa học' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function CoursePage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="page-width main-content">
          <p>Đang mở khóa học…</p>
        </main>
      }
    >
      <CourseDetail />
    </Suspense>
  );
}
