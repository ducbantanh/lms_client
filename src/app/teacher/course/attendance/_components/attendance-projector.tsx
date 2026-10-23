'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import {
  attendanceBase,
  checkInUrl,
  qrPath,
  type AttendanceCheckedIn,
  type AttendanceQrCode,
  type AttendanceRow,
} from '@/lib/attendance';
import { useSession } from '@/providers/session-provider';
import { Icon } from '@/components/ui/icon';

/** Viền trắng quanh mã (số ô): chuẩn QR cần tối thiểu 4 ô để camera nhận ra mã. */
const QUIET_ZONE = 4;
/** Số tên vừa điểm danh hiện ở cột phải, để sinh viên thấy mình đã được ghi nhận. */
const RECENT_LIMIT = 6;

type Phase = 'loading' | 'open' | 'closed' | 'error';

/** Mở LMS bằng localhost thì link trong QR trỏ về chính điện thoại của sinh viên. */
function isLoopback(hostname: string) {
  return hostname === 'localhost' || hostname === '::1' || hostname.startsWith('127.');
}

/**
 * Trang /teacher/course/attendance/?course=...&id=...: chiếu mã QR điểm danh lên máy chiếu.
 * Lấy mã mới đúng lúc mã cũ hết lượt (theo giờ server, ~10 giây), đếm số sinh viên đã quét realtime.
 */
export function AttendanceProjector() {
  const params = useSearchParams();
  const courseId = params.get('course') ?? '';
  const sessionId = params.get('id') ?? '';
  const url = `${attendanceBase(courseId)}/${encodeURIComponent(sessionId)}`;
  const back = `${TEACHER_PATH}/course/?id=${encodeURIComponent(courseId)}&tab=attendance`;
  const { subscribe } = useSession();
  const [qr, setQr] = useState<AttendanceQrCode | null>(null);
  /** Lúc mã hiện tại hết lượt, quy về đồng hồ của máy này (đã bù lệch giờ với server). */
  const [expiresAt, setExpiresAt] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState('');
  const [offline, setOffline] = useState(false);
  const [recent, setRecent] = useState<AttendanceRow[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
  /** Tăng để chạy lại vòng lấy mã sau khi mở/dừng QR. */
  const [round, setRound] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!courseId || !sessionId) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    async function load() {
      try {
        const next = await apiRequest<AttendanceQrCode>(`${url}/qr`, { signal: controller.signal });
        const offset = Date.parse(next.serverTime) - Date.now();
        const localExpiry = Date.parse(next.expiresAt) - offset;
        setQr(next);
        setExpiresAt(localExpiry);
        setPhase('open');
        setOffline(false);
        // Lấy mã mới ngay sau khi mã cũ hết lượt; mã cũ vẫn được nhận thêm một chu kỳ nên không ai bị lỡ
        timer = setTimeout(load, Math.max(500, localExpiry - Date.now() + 150));
      } catch (reason) {
        if (controller.signal.aborted) return;
        if (reason instanceof ApiError && reason.code === 'ATTENDANCE_CLOSED') {
          setPhase('closed');
        } else if (reason instanceof ApiError && reason.code !== 'NETWORK_ERROR') {
          setError(reason.message);
          setPhase('error');
        } else {
          setOffline(true);
          timer = setTimeout(load, 2_000);
        }
      }
    }
    void load();
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [url, courseId, sessionId, round]);

  // Đồng hồ đếm ngược tới lần đổi mã
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(
    () =>
      subscribe('attendance.checked_in', (data) => {
        const event = data as AttendanceCheckedIn;
        if (event.sessionId !== sessionId) return;
        setRecent((current) =>
          [event.row, ...current.filter((row) => row.studentId !== event.row.studentId)].slice(
            0,
            RECENT_LIMIT,
          ),
        );
        // Số chính xác sẽ về cùng mã kế tiếp; cộng trước để màn chiếu phản hồi ngay
        setQr(
          (current) =>
            current && { ...current, checkedIn: Math.min(current.students, current.checkedIn + 1) },
        );
      }),
    [subscribe, sessionId],
  );

  const link =
    qr && typeof window !== 'undefined' ? checkInUrl(window.location.origin, qr.token) : '';
  const code = useMemo(() => (link ? qrPath(link) : null), [link]);
  const localOnly = !!qr && isLoopback(window.location.hostname);
  const period = qr?.periodSeconds ?? 10;
  const left = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  // Mất kết nối quá một chu kỳ: mã đang hiện đã hết hạn, không cho quét nữa
  const stale = offline && now > expiresAt + period * 1000;

  async function setOpen(open: boolean) {
    setBusy(true);
    try {
      await apiRequest(`${url}/qr/${open ? 'open' : 'close'}`, { method: 'POST' });
      setPhase(open ? 'loading' : 'closed');
      setRound((value) => value + 1);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không thực hiện được.');
      setPhase('error');
    } finally {
      setBusy(false);
    }
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stageRef.current?.requestFullscreen?.();
  }

  if (!courseId || !sessionId)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state">
          <h1>Thiếu mã buổi điểm danh</h1>
          <p>Mở màn chiếu từ tab Điểm danh của khóa học.</p>
          <Link href={`${TEACHER_PATH}/courses/`} className="button">
            Về danh sách khóa học
          </Link>
        </div>
      </main>
    );

  return (
    <main id="main-content" className="projector">
      <div className="projector-stage" ref={stageRef}>
        <header className="projector-head">
          <div>
            <p className="detail-code">{qr?.course ?? 'Điểm danh'}</p>
            <h1>{qr?.session ?? 'Mã QR điểm danh'}</h1>
          </div>
          <div className="button-row">
            <button className="button" onClick={toggleFullscreen}>
              <Icon name="expand" size={12} />
              Toàn màn hình
            </button>
            {phase === 'open' && (
              <button className="button danger" disabled={busy} onClick={() => setOpen(false)}>
                <Icon name="lock" size={12} />
                Dừng điểm danh QR
              </button>
            )}
            <Link href={back} className="button">
              <Icon name="close" size={12} />
              Đóng
            </Link>
          </div>
        </header>
        {localOnly && (
          <div className="notice" role="alert">
            Bạn đang mở LMS bằng địa chỉ localhost nên điện thoại sinh viên không mở được link trong
            mã QR. Hãy mở LMS bằng địa chỉ IP hoặc tên máy chủ trong mạng LAN.
          </div>
        )}
        {phase === 'loading' ? (
          <p className="projector-message">Đang lấy mã QR…</p>
        ) : phase === 'error' ? (
          <div className="projector-message">
            <h2>Không chiếu được mã QR</h2>
            <p>{error}</p>
            <Link href={back} className="button">
              Về buổi điểm danh
            </Link>
          </div>
        ) : phase === 'closed' ? (
          <div className="projector-message">
            <h2>Đã dừng điểm danh bằng QR</h2>
            <p>Sinh viên chưa điểm danh liên hệ giảng viên để được điểm danh thủ công.</p>
            <button className="button primary" disabled={busy} onClick={() => setOpen(true)}>
              <Icon name="qrcode" size={13} />
              Mở lại điểm danh QR
            </button>
          </div>
        ) : (
          <div className="projector-body">
            <figure className="projector-qr">
              {code && !stale ? (
                <svg
                  viewBox={`${-QUIET_ZONE} ${-QUIET_ZONE} ${code.size + QUIET_ZONE * 2} ${code.size + QUIET_ZONE * 2}`}
                  shapeRendering="crispEdges"
                  role="img"
                  aria-label="Mã QR điểm danh"
                >
                  <rect
                    x={-QUIET_ZONE}
                    y={-QUIET_ZONE}
                    width={code.size + QUIET_ZONE * 2}
                    height={code.size + QUIET_ZONE * 2}
                    fill="#fff"
                  />
                  <path d={code.path} fill="#000" />
                </svg>
              ) : (
                <div className="projector-offline">Mất kết nối máy chủ, đang thử lại…</div>
              )}
              <div className="projector-timer" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (left / period) * 100)}%` }} />
              </div>
              <figcaption>{offline ? 'Đang kết nối lại…' : `Mã mới sau ${left} giây`}</figcaption>
            </figure>
            <aside className="projector-side">
              <p className="projector-count" aria-live="polite">
                <b>{qr?.checkedIn ?? 0}</b>
                <span>/{qr?.students ?? 0}</span>
              </p>
              <p className="projector-count-label">sinh viên đã điểm danh</p>
              <ol className="projector-steps">
                <li>Đăng nhập LMS trên điện thoại</li>
                <li>Mở camera, quét mã QR</li>
                <li>Chờ màn hình báo &quot;Đã điểm danh&quot;</li>
              </ol>
              {recent.length > 0 && (
                <ul className="projector-recent" aria-label="Vừa điểm danh">
                  {recent.map((row) => (
                    <li key={row.studentId}>
                      <Icon name="check" size={11} />
                      {row.fullName}
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
