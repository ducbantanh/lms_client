import { Suspense } from 'react';
import { CourseDetail } from '@/app/(learn)/course/course-detail';
export const metadata = { title: 'Chi tiết khóa học' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function CoursePage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở khóa học…</p>
        </main>
      }
    >
      <CourseDetail />
    </Suspense>
  );
}
