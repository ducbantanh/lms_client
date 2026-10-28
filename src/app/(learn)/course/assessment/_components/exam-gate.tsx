'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { exitFullscreen, useExamGuard } from '@/hooks/use-exam-guard';
import { useRemaining } from '@/hooks/use-remaining';
import { ApiError, PROCTOR_ERROR_EVENT, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { MIN_AWAY_MS, type StudentProctor } from '@/lib/proctor';
import { formatDuration, type StudentAssessment } from '@/lib/teaching';
import { useSession } from '@/providers/session-provider';
import { ConfirmDialog, type ConfirmRequest } from '@/components/admin-ui';
import { ConnectionChip } from '@/components/layout/account-menu';
import { Icon } from '@/components/ui/icon';

/** Lỗi làm trạng thái phòng thi đổi (giám thị khóa, máy khác, đã kết thúc): tải lại để hiện đúng màn hình. */
const RELOAD_CODES = new Set([
  'PROCTOR_LOCKED',
  'PROCTOR_OTHER_DEVICE',
  'PROCTOR_REQUIRED',
  'PROCTOR_FINISHED',
]);

/**
 * Tải lại bài khi giám thị khóa / mở khóa / cho đổi máy (WebSocket proctor.state), hoặc khi một API làm bài trả lỗi
 * phòng thi (vd. bài vừa bị khóa lúc đang lưu câu trả lời).
 */
export function useProctorRefresh(assessmentId: string, enabled: boolean, reload: () => void) {
  const { subscribe } = useSession();
  const last = useRef(0);
  const reloadRef = useRef(reload);
  useEffect(() => {
    reloadRef.current = reload;
  });
  useEffect(() => {
    if (!enabled) return;
    // Nhiều request cùng lỗi một lúc chỉ tải lại một lần
    const refresh = () => {
      if (Date.now() - last.current < 1500) return;
      last.current = Date.now();
      reloadRef.current();
    };
    const unsubscribe = subscribe('proctor.state', (data) => {
      if ((data as { assessmentId?: string }).assessmentId === assessmentId) refresh();
    });
    const onError = (event: Event) => {
      if (RELOAD_CODES.has((event as CustomEvent<ApiError>).detail.code)) refresh();
    };
    window.addEventListener(PROCTOR_ERROR_EVENT, onError);
    return () => {
      unsubscribe();
      window.removeEventListener(PROCTOR_ERROR_EVENT, onError);
    };
  }, [subscribe, assessmentId, enabled]);
}

/** Màn vào phòng thi: quy định, kiểm tra mạng / màn hình phụ, mã phòng thi; hoặc báo bài đang mở ở máy khác. */
export function ExamEntry({ data, reload }: { data: StudentAssessment; reload: () => void }) {
  const proctor = data.proctor!;
  const [code, setCode] = useState('');
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [multiScreen] = useState(
    () => (window.screen as Screen & { isExtended?: boolean }).isExtended === true,
  );

  if (proctor.status === 'other_device')
    return (
      <section className="panel exam-entry">
        <div className="exam-entry-icon locked">
          <Icon name="lock" size={22} />
        </div>
        <h2>Bài thi đang mở trên máy khác</h2>
        <p>
          Bạn đã vào phòng thi bằng máy (hoặc trình duyệt) khác. Mỗi bài thi chỉ làm trên một máy.
          Nếu máy cũ bị hỏng hoặc bạn lỡ đóng trình duyệt, báo giám thị để được đổi máy rồi bấm thử
          lại.
        </p>
        <button className="button" onClick={reload}>
          Thử lại
        </button>
      </section>
    );

  async function enter(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    // Bật toàn màn hình ngay trong thao tác bấm nút (trình duyệt chỉ cho phép lúc này)
    if (proctor.fullscreen)
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
    try {
      await apiRequest(
        `/student/assessments/${encodeURIComponent(data.assessment.id)}/proctor/start`,
        {
          method: 'POST',
          body: { accessCode: code.trim() || null },
        },
      );
      reload();
    } catch (reason) {
      exitFullscreen();
      setError(reason instanceof Error ? reason.message : 'Chưa vào được phòng thi.');
      setBusy(false);
    }
  }

  const max = proctor.maxViolations;
  return (
    <form className="panel exam-entry" onSubmit={enter}>
      <div className="exam-entry-icon">
        <Icon name="shield" size={22} />
      </div>
      <h2>Vào phòng thi</h2>
      <p>Bài kiểm tra này có giám sát. Trong giờ thi:</p>
      <ul className="exam-rules">
        {proctor.fullscreen && (
          <li>Làm bài ở chế độ toàn màn hình; thoát toàn màn hình được ghi là vi phạm.</li>
        )}
        <li>
          Không chuyển sang tab, cửa sổ hay ứng dụng khác: rời trang bài thi quá{' '}
          {MIN_AWAY_MS / 1000} giây được ghi là vi phạm.
        </li>
        <li>Không chép đề ra ngoài, không dán nội dung từ ngoài vào bài.</li>
        <li>Chỉ làm bài trên một máy; đăng nhập ở máy khác sẽ bị chặn.</li>
        <li>Trong giờ thi chỉ mở được trang làm bài này, các trang khác tạm khóa.</li>
        {proctor.networkRestricted && <li>Chỉ làm bài được trên máy trong mạng phòng thi.</li>}
        <li>
          {max === null
            ? 'Mọi vi phạm được ghi lại để giám thị xem.'
            : `Vi phạm ${max} lần thì bài bị khóa, chờ giám thị mở khóa mới làm tiếp.`}
        </li>
      </ul>
      {!proctor.networkAllowed && (
        <p className="flash error" role="alert">
          Máy của bạn không thuộc mạng phòng thi nên chưa vào thi được. Hãy dùng máy trong phòng
          thi.
        </p>
      )}
      {multiScreen && (
        <p className="flash error" role="alert">
          Máy đang nối thêm màn hình. Tháo màn hình phụ trước khi vào thi, nếu không sẽ bị ghi là vi
          phạm.
        </p>
      )}
      {proctor.accessCode && (
        <label className="form-field exam-code-field">
          Mã phòng thi
          <input
            className="input"
            inputMode="numeric"
            autoComplete="off"
            maxLength={7}
            placeholder="6 chữ số"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/[^\d ]/g, ''))}
            required
          />
        </label>
      )}
      <label className="check-field">
        <input
          type="checkbox"
          checked={agree}
          onChange={(event) => setAgree(event.target.checked)}
        />
        Tôi đã đọc và đồng ý làm bài theo các quy định trên.
      </label>
      {error && (
        <p className="flash error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button primary"
        disabled={!agree || busy || !proctor.networkAllowed}
        type="submit"
      >
        {busy ? 'Đang vào phòng thi…' : 'Vào phòng thi'}
      </button>
    </form>
  );
}

/**
 * Chế độ thi: phủ kín màn hình (ẩn menu, thông báo của trang), thanh trên có giờ còn lại, số vi phạm, trạng thái
 * kết nối; theo dõi trình duyệt bằng useExamGuard. Thoát toàn màn hình thì che bài cho tới khi bật lại; bị khóa thì
 * thay bài bằng thông báo chờ giám thị.
 */
export function ExamShell({
  data,
  offset,
  reload,
  onState,
  children,
}: {
  data: StudentAssessment;
  offset: number;
  reload: () => void;
  onState: (state: StudentProctor) => void;
  children: ReactNode;
}) {
  const proctor = data.proctor!;
  const { course, assessment } = data;
  const locked = proctor.status === 'locked';
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const onError = useCallback(() => reload(), [reload]);
  const { fullscreen, enterFullscreen } = useExamGuard({
    assessmentId: assessment.id,
    enabled: true,
    fullscreenRequired: proctor.fullscreen,
    offset,
    onState,
    onError,
  });
  const left = useRemaining(assessment.closesAt, offset, reload);

  useEffect(() => {
    document.body.classList.add('exam-open');
    return () => {
      document.body.classList.remove('exam-open');
      exitFullscreen();
    };
  }, []);

  function finish() {
    setConfirm({
      title: 'Kết thúc bài thi',
      message:
        'Sau khi kết thúc bạn không chạy thử hay nộp bài được nữa; các lần nộp đã có được giữ nguyên.',
      confirmLabel: 'Kết thúc bài thi',
      danger: true,
      run: async () => {
        try {
          await apiRequest(
            `/student/assessments/${encodeURIComponent(assessment.id)}/proctor/finish`,
            { method: 'POST' },
          );
        } finally {
          reload();
        }
      },
    });
  }

  const max = proctor.maxViolations;
  return (
    <div className="exam-mode">
      <header className="exam-bar">
        <div className="exam-bar-title">
          <span className="exam-live" aria-hidden="true" />
          <span>
            <b>{course.code}</b> · {assessment.title}
          </span>
        </div>
        <div className="exam-bar-meta">
          {/* Bài làm có đồng hồ riêng; bị khóa thì bài bị che nên hiện ở đây */}
          {locked && left !== null && (
            <span className={`time-left${left < 5 * 60_000 ? ' urgent' : ''}`} role="timer">
              <Icon name="clock" size={13} />
              Đóng bài sau <b>{formatDuration(left)}</b>
            </span>
          )}
          <span
            className={`badge ${proctor.violations ? 'locked' : 'muted'}`}
            title="Rời trang, thoát toàn màn hình, dán nội dung từ ngoài vào…"
          >
            Vi phạm {proctor.violations}
            {max !== null && `/${max}`}
          </span>
          <ConnectionChip always />
          {proctor.canFinish && !locked && (
            <button className="button small" onClick={finish}>
              Kết thúc bài thi
            </button>
          )}
        </div>
      </header>
      <main id="main-content" className="exam-body">
        {locked ? (
          <section className="panel exam-entry">
            <div className="exam-entry-icon locked">
              <Icon name="lock" size={22} />
            </div>
            <h2>Bài thi đang bị khóa</h2>
            {proctor.lockReason && <p className="exam-lock-reason">{proctor.lockReason}</p>}
            <p>
              Bạn chưa làm tiếp được. Hãy giữ nguyên trang này và báo giám thị; trang tự mở lại khi
              giám thị mở khóa.
            </p>
            {proctor.startedAt && (
              <p className="admin-hint">Vào phòng thi lúc {formatDateTime(proctor.startedAt)}</p>
            )}
          </section>
        ) : (
          children
        )}
      </main>
      {proctor.fullscreen && !fullscreen && !locked && (
        <div className="exam-overlay" role="dialog" aria-modal="true" aria-labelledby="exam-fs">
          <div className="exam-overlay-card">
            <Icon name="shield" size={26} />
            <h2 id="exam-fs">Bật chế độ toàn màn hình để làm bài</h2>
            <p>
              Bài thi chỉ làm ở chế độ toàn màn hình. Mỗi lần thoát toàn màn hình hoặc rời trang
              được ghi lại cho giám thị.
            </p>
            <button className="button primary" onClick={() => void enterFullscreen()}>
              Tiếp tục làm bài
            </button>
          </div>
        </div>
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </div>
  );
}
