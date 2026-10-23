import { Suspense } from 'react';
import { CourseManager } from '@/app/teacher/course/_components/course-manager';
export const metadata = { title: 'Quản lý khóa học' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function TeacherCoursePage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở khóa học…</p>
        </main>
      }
    >
      <CourseManager />
    </Suspense>
  );
}
