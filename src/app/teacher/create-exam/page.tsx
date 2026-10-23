import { Suspense } from 'react';
import { ExamBuilder } from '@/app/teacher/create-exam/_components/exam-builder';
export const metadata = { title: 'Tạo bài thi' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function CreateExamPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở trang tạo bài thi…</p>
        </main>
      }
    >
      <ExamBuilder />
    </Suspense>
  );
}
