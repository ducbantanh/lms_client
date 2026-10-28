import { Suspense } from 'react';
import { AttendanceProjector } from '@/app/teacher/course/attendance/_components/attendance-projector';
export const metadata = { title: 'Chiếu mã QR điểm danh' };

/** Suspense cho phép useSearchParams chạy phía client trong bản export tĩnh. */
export default function AttendanceProjectorPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang mở màn chiếu…</p>
        </main>
      }
    >
      <AttendanceProjector />
    </Suspense>
  );
}
