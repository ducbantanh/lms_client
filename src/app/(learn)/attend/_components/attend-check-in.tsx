'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { statusInfo, type CheckInResult } from '@/lib/attendance';
import { useSession } from '@/providers/session-provider';
import { Icon } from '@/components/ui/icon';

/**
 * Trang /attend/?t=...: sinh viên quét QR trên màn chiếu bằng camera điện thoại là tới đây.
 * Chưa đăng nhập thì lib/auth chuyển qua trang đăng nhập rồi quay lại đúng link này.
 * Gửi mã đúng một lần rồi bỏ ?t khỏi URL để tải lại trang không gửi lại mã đã hết hạn.
 */
export function AttendCheckIn() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const token = params.get('t') ?? '';
  const { user } = useSession();
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const sent = useRef('');

  useEffect(() => {
    if (!user || !token || sent.current === token) return;
    sent.current = token;
    apiRequest<CheckInResult>('/student/attendance/check-in', { method: 'POST', body: { token } })
      .then((value) => {
        setResult(value);
        setError(null);
      })
      .catch((reason) => setError(reason instanceof ApiError ? reason : new ApiError('')))
      .finally(() => router.replace(pathname, { scroll: false }));
  }, [user, token, router, pathname]);

  const waiting = !!token && !result && !error;

  return (
    <main id="main-content" className="shell-main">
      <section className="panel attend-card">
        {waiting ? (
          <p className="attend-status" role="status">
            Đang điểm danh…
          </p>
        ) : result ? (
          <div className="attend-result" role="status">
            <i className="attend-icon ok">
              <Icon name="check" size={28} />
            </i>
            <h1>{result.alreadyRecorded ? 'Bạn đã được điểm danh' : 'Đã điểm danh'}</h1>
            <p className="attend-course">
              <b>{result.course}</b> · {result.courseTitle}
            </p>
            <p>
              {result.session} ·{' '}
              <span className={`badge ${statusInfo(result.status).tone}`}>
                {statusInfo(result.status).label}
              </span>
            </p>
            <p className="cell-sub">Ghi nhận lúc {formatDateTime(result.checkedAt)}</p>
            <Link href={`/course/?id=${encodeURIComponent(result.courseId)}`} className="button">
              Vào khóa học
            </Link>
          </div>
        ) : error ? (
          <div className="attend-result" role="alert">
            <i className="attend-icon fail">
              <Icon name="close" size={28} />
            </i>
            <h1>Chưa điểm danh được</h1>
            <p>{error.message}</p>
            <p className="cell-sub">
              {error.code === 'NOT_ENROLLED' || error.code === 'ATTENDANCE_CLOSED'
                ? 'Nếu bạn đang có mặt trong lớp, hãy báo giảng viên để được điểm danh thủ công.'
                : 'Mã QR đổi mỗi 10 giây. Hãy quét lại mã đang hiển thị trên màn chiếu.'}
            </p>
          </div>
        ) : (
          <div className="attend-result">
            <i className="attend-icon">
              <Icon name="qrcode" size={28} />
            </i>
            <h1>Điểm danh bằng mã QR</h1>
            <p>
              Mở camera điện thoại và quét mã QR giảng viên chiếu trên màn hình. Mã đổi mỗi 10 giây
              nên hãy quét trực tiếp, không dùng ảnh chụp.
            </p>
            <p className="cell-sub">
              Không quét được (quên điện thoại, camera lỗi…)? Báo giảng viên để được điểm danh thủ
              công.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
