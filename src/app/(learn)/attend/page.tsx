import { Suspense } from 'react';
import { AttendCheckIn } from './_components/attend-check-in';
export const metadata = { title: 'Điểm danh' };

/** Link trong mã QR điểm danh trỏ tới đây (?t=...); Suspense cho useSearchParams trong bản export tĩnh. */
export default function AttendPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="shell-main">
          <p>Đang điểm danh…</p>
        </main>
      }
    >
      <AttendCheckIn />
    </Suspense>
  );
}
