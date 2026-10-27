'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { TEACHER_PATH } from '@/lib/auth';
import {
  BOARD_STATUS,
  describeEvent,
  describeSettings,
  formatAway,
  isOffline,
  needsAttention,
  proctorBoardPath,
  proctorForm,
  proctorFormProblem,
  proctorRequest,
  summarize,
  type AccessCode,
  type BoardRow,
  type ProctorBoard,
  type ProctorForm,
  type ProctorRowChanged,
  type ProctorSettings,
  type StudentLog,
} from '@/lib/proctor';
import { ASSESSMENT_STATUS, ASSESSMENT_TAB_PARAM } from '@/lib/teaching';
import { useSession } from '@/providers/session-provider';
import {
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { ProctorSettingsFields } from '@/components/proctor-settings';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { StatCard } from '@/components/ui/stat-card';

type Filter = 'all' | 'attention' | 'active' | 'locked' | 'flagged' | 'finished' | 'not_started';

/** Giờ:phút:giây theo giờ máy. */
function formatClock(iso: string) {
  return new Date(iso).toLocaleTimeString('vi-VN', { hour12: false });
}

/** Tải lại cả bảng mỗi 15 giây để cập nhật mất kết nối (sự kiện realtime chỉ báo khi có thay đổi). */
const REFRESH_MS = 15_000;

/**
 * Trang /teacher/course/proctor/?course=...&id=...: giám sát một bài kiểm tra. Mã phòng thi để chiếu, số sinh viên
 * đang làm / bị khóa / có vi phạm, bảng từng sinh viên cập nhật qua WebSocket (proctor.updated), nhật ký, khóa /
 * mở khóa / cho đổi máy; giảng viên phụ trách sửa cài đặt giám sát.
 */
export function ProctorBoardView() {
  const params = useSearchParams();
  const courseId = params.get('course') ?? '';
  const id = params.get('id') ?? '';
  const path = proctorBoardPath(courseId, id);
  const { subscribe } = useSession();
  const [data, setData] = useState<ProctorBoard | null>(null);
  /** Giờ server − giờ máy. */
  const [offset, setOffset] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [flash, setFlash] = useState<Flash | null>(
    params.get('unsaved')
      ? {
          type: 'error',
          text: 'Bài đã được tạo nhưng chưa lưu được cài đặt giám sát. Kiểm tra lại và lưu ở dưới.',
        }
      : null,
  );
  const clearFlash = useCallback(() => setFlash(null), []);
  const [editing, setEditing] = useState(!!params.get('unsaved'));
  const [logFor, setLogFor] = useState<BoardRow | null>(null);
  const [lockFor, setLockFor] = useState<BoardRow | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);

  const load = useCallback(
    () =>
      apiRequest<ProctorBoard>(path)
        .then((next) => {
          setOffset(Date.parse(next.serverTime) - Date.now());
          setData(next);
        })
        .catch((reason) => {
          setError(
            reason instanceof ApiError && reason.code === 'NOT_FOUND'
              ? 'Bài kiểm tra không tồn tại hoặc bạn không phụ trách khóa học này.'
              : reason instanceof Error
                ? reason.message
                : 'Không tải được trang giám sát.',
          );
        }),
    [path],
  );

  useEffect(() => {
    if (!courseId || !id) return;
    void load();
    const timer = setInterval(() => void load(), REFRESH_MS);
    return () => clearInterval(timer);
  }, [courseId, id, load]);

  // Một sinh viên vào phòng thi, vi phạm, bị khóa, nộp bài: thay đúng dòng đó
  useEffect(
    () =>
      subscribe('proctor.updated', (payload) => {
        const event = payload as ProctorRowChanged;
        if (event.assessmentId !== id) return;
        setData((current) => {
          if (!current) return current;
          const rows = current.rows.map((row) =>
            row.studentId === event.row.studentId ? event.row : row,
          );
          return { ...current, rows, summary: summarize(rows) };
        });
      }),
    [subscribe, id],
  );

  // Đồng hồ cho thời gian rời trang và mã phòng thi; hết chu kỳ thì lấy mã mới
  const codeExpires = data?.accessCode ? Date.parse(data.accessCode.expiresAt) : null;
  const fetching = useRef(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
      if (codeExpires === null || fetching.current || Date.now() + offset < codeExpires) return;
      fetching.current = true;
      apiRequest<AccessCode>(`${path}/access-code`)
        .then((code) => setData((current) => current && { ...current, accessCode: code }))
        .catch(() => {
          /* Thử lại ở nhịp sau */
        })
        .finally(() => {
          fetching.current = false;
        });
    }, 1000);
    return () => clearInterval(timer);
  }, [codeExpires, offset, path]);

  if (!courseId || !id || error)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state">
          <h1>Chưa mở được trang giám sát</h1>
          <p>{error || 'Đường dẫn thiếu mã khóa học hoặc mã bài.'}</p>
          <Link href={`${TEACHER_PATH}/courses/`} className="button">
            Về danh sách khóa học
          </Link>
        </div>
      </main>
    );
  if (!data)
    return (
      <main id="main-content" className="shell-main">
        <p className="empty-state" role="status">
          Đang tải trang giám sát…
        </p>
      </main>
    );

  const { course, assessment, settings, summary, rows } = data;
  const back = `${TEACHER_PATH}/course/?id=${encodeURIComponent(course.id)}&tab=${ASSESSMENT_TAB_PARAM[2]}`;
  const status = ASSESSMENT_STATUS[assessment.status];
  const serverNow = now + offset;
  const filters: { value: Filter; label: string; match: (row: BoardRow) => boolean }[] = [
    { value: 'all', label: 'Tất cả', match: () => true },
    {
      value: 'attention',
      label: 'Cần chú ý',
      match: (row) => needsAttention(row, settings.fullscreen),
    },
    { value: 'active', label: 'Đang làm', match: (row) => row.status === 'active' },
    { value: 'locked', label: 'Bị khóa', match: (row) => row.status === 'locked' },
    { value: 'flagged', label: 'Có vi phạm', match: (row) => row.violations > 0 },
    { value: 'finished', label: 'Đã kết thúc', match: (row) => row.status === 'finished' },
    { value: 'not_started', label: 'Chưa vào', match: (row) => row.status === 'not_started' },
  ];
  const visible = rows.filter(filters.find((item) => item.value === filter)!.match);

  function replaceRow(row: BoardRow) {
    setData((current) => {
      if (!current) return current;
      const next = current.rows.map((item) => (item.studentId === row.studentId ? row : item));
      return { ...current, rows: next, summary: summarize(next) };
    });
  }

  async function act(row: BoardRow, action: 'lock' | 'unlock' | 'reset-device', reason?: string) {
    try {
      replaceRow(
        await apiRequest<BoardRow>(
          `${path}/students/${encodeURIComponent(row.studentId)}/${action}`,
          {
            method: 'POST',
            body: action === 'reset-device' ? undefined : { reason: reason ?? null },
          },
        ),
      );
      setFlash({
        type: 'success',
        text:
          action === 'lock'
            ? `Đã khóa bài của ${row.fullName}.`
            : action === 'unlock'
              ? `Đã mở khóa cho ${row.fullName}.`
              : `${row.fullName} có thể vào phòng thi lại trên máy mới.`,
      });
    } catch (reason) {
      setFlash({
        type: 'error',
        text: reason instanceof Error ? reason.message : 'Chưa làm được.',
      });
    }
  }

  function unlock(row: BoardRow) {
    setConfirm({
      title: 'Mở khóa bài thi',
      message: `Cho ${row.fullName} làm tiếp? Số vi phạm giữ nguyên (${row.violations}), nên vi phạm tiếp theo sẽ khóa bài lại nếu đã đủ ngưỡng.`,
      confirmLabel: 'Mở khóa',
      run: () => act(row, 'unlock'),
    });
  }

  function resetDevice(row: BoardRow) {
    setConfirm({
      title: 'Cho đổi máy',
      message: `Cho ${row.fullName} làm tiếp trên máy khác? Máy đang làm bài sẽ phải vào phòng thi lại; sinh viên vào phòng thi trên máy mới (vẫn kiểm tra mạng và mã phòng thi).`,
      confirmLabel: 'Cho đổi máy',
      run: () => act(row, 'reset-device'),
    });
  }

  return (
    <main id="main-content" className="shell-main">
      <Link href={back} className="back-link">
        <Icon name="back" size={12} />
        {course.code} · {course.title}
      </Link>
      <div className="page-heading">
        <div>
          <p className="detail-code">
            <span className="badge muted-solid">Bài kiểm tra</span>
            <span className={`badge ${status.tone}`}>{status.label}</span>
            <span className={`badge ${settings.enabled ? 'warn' : 'muted'}`}>
              {settings.enabled ? 'Có giám sát' : 'Chưa bật giám sát'}
            </span>
          </p>
          <h1>Giám sát: {assessment.title}</h1>
          <p className="assessment-meta">
            <Icon name="calendar" size={12} />
            Mở: {assessment.opensAt ? formatDateTime(assessment.opensAt) : 'ngay'} · Đóng:{' '}
            {assessment.closesAt ? formatDateTime(assessment.closesAt) : 'không hạn'}
          </p>
          <p className="assessment-meta">
            <Icon name="shield" size={12} />
            {describeSettings(settings)}
          </p>
        </div>
        <div className="heading-actions">
          <Link
            href={`${TEACHER_PATH}/course/submissions/?course=${encodeURIComponent(course.id)}&id=${encodeURIComponent(assessment.id)}`}
            className="button"
          >
            <Icon name="check" size={13} />
            Bài nộp
          </Link>
          {data.canEdit && assessment.status !== 'closed' && (
            <button className="button" onClick={() => setEditing(!editing)}>
              <Icon name="settings" size={13} />
              Cài đặt giám sát
            </button>
          )}
        </div>
      </div>
      <FlashMessage flash={flash} onDone={clearFlash} />
      {(editing || (!settings.enabled && data.canEdit && assessment.status !== 'closed')) && (
        <SettingsPanel
          settings={settings}
          closesAt={assessment.closesAt}
          path={path}
          onSaved={(next) => {
            setData({ ...data, settings: next });
            setEditing(false);
            setFlash({ type: 'success', text: 'Đã lưu cài đặt giám sát.' });
            void load();
          }}
          onCancel={settings.enabled ? () => setEditing(false) : undefined}
        />
      )}
      {settings.enabled && data.accessCode && assessment.status !== 'closed' && (
        <AccessCodePanel code={data.accessCode} serverNow={serverNow} />
      )}
      <div className="stats cols-4">
        <StatCard label="Đang làm" value={summary.active} icon="exam" tone="green" />
        <StatCard label="Bị khóa" value={summary.locked} icon="lock" tone="red" />
        <StatCard label="Có vi phạm" value={summary.flagged} icon="shield" tone="violet" />
        <StatCard label="Chưa vào phòng thi" value={summary.notStarted} icon="users" tone="blue" />
      </div>
      {summary.offline > 0 && (
        <p className="notice" role="status">
          {summary.offline} sinh viên đang thi nhưng mất kết nối quá 45 giây (tắt máy, đóng trình
          duyệt hoặc mất mạng).
        </p>
      )}
      <section className="panel">
        <div className="segmented" role="tablist" aria-label="Lọc sinh viên">
          {filters.map((item) => (
            <button
              key={item.value}
              role="tab"
              aria-selected={filter === item.value}
              className={filter === item.value ? 'selected' : ''}
              onClick={() => setFilter(item.value)}
            >
              {item.label} ({rows.filter(item.match).length})
            </button>
          ))}
        </div>
        {visible.length ? (
          <div className="table-responsive">
            <table className="table admin-table proctor-table">
              <thead>
                <tr>
                  <th>MSSV</th>
                  <th>Họ tên</th>
                  <th>Trạng thái</th>
                  <th className="numeric">Vi phạm</th>
                  <th>Gần nhất</th>
                  <th>IP</th>
                  <th className="actions" aria-label="Thao tác" />
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <BoardLine
                    key={row.studentId}
                    row={row}
                    settings={settings}
                    serverNow={serverNow}
                    onLog={() => setLogFor(row)}
                    onLock={() => setLockFor(row)}
                    onUnlock={() => unlock(row)}
                    onReset={() => resetDevice(row)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-cell">
            {rows.length ? 'Không có sinh viên nào ở mục này.' : 'Khóa học chưa có sinh viên.'}
          </p>
        )}
      </section>
      {logFor && <LogDialog path={path} row={logFor} onClose={() => setLogFor(null)} />}
      {lockFor && (
        <LockDialog
          row={lockFor}
          onClose={() => setLockFor(null)}
          onLock={(reason) => act(lockFor, 'lock', reason)}
        />
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}

/** Một dòng sinh viên: trạng thái kèm cảnh báo (mất kết nối, đang rời trang, ngoài toàn màn hình). */
function BoardLine({
  row,
  settings,
  serverNow,
  onLog,
  onLock,
  onUnlock,
  onReset,
}: {
  row: BoardRow;
  settings: ProctorSettings;
  serverNow: number;
  onLog: () => void;
  onLock: () => void;
  onUnlock: () => void;
  onReset: () => void;
}) {
  const status = BOARD_STATUS[row.status];
  const inExam = row.status === 'active' || row.status === 'locked';
  const warnings: string[] = [];
  if (isOffline(row)) warnings.push('Mất kết nối');
  if (row.status === 'active' && row.awaySince)
    warnings.push(`Đang rời trang ${formatAway(serverNow - Date.parse(row.awaySince))}`);
  if (row.status === 'active' && row.online && settings.fullscreen && !row.fullscreen)
    warnings.push('Không ở toàn màn hình');
  if (row.lockReason) warnings.push(row.lockReason);
  return (
    <tr className={needsAttention(row, settings.fullscreen) ? 'attention' : undefined}>
      <td className="mono">{row.username}</td>
      <td>{row.fullName}</td>
      <td>
        <span className={`badge ${status.tone}`}>{status.label}</span>
        {warnings.map((warning) => (
          <small key={warning} className="proctor-warning">
            {warning}
          </small>
        ))}
      </td>
      <td className={`numeric${row.violations ? ' proctor-violations' : ''}`}>
        {row.violations}
        {settings.maxViolations !== null && inExam && (
          <span className="proctor-limit">/{settings.maxViolations}</span>
        )}
      </td>
      <td>
        {row.lastEvent ? (
          <>
            <span className={row.lastEvent.counted ? 'proctor-violations' : undefined}>
              {describeEvent(row.lastEvent)}
            </span>
            <small className="table-sub">{formatClock(row.lastEvent.at)}</small>
          </>
        ) : (
          '—'
        )}
      </td>
      <td className="mono">
        {row.ip ?? '—'}
        {row.ip && !row.ipAllowed && <span className="badge warn">ngoài mạng</span>}
      </td>
      <td className="actions">
        <button className="button small" disabled={row.status === 'not_started'} onClick={onLog}>
          Nhật ký
        </button>
        {row.status === 'active' && (
          <button className="button small" onClick={onLock}>
            <Icon name="lock" size={11} />
            Khóa
          </button>
        )}
        {row.status === 'locked' && (
          <button className="button small primary" onClick={onUnlock}>
            <Icon name="unlock" size={11} />
            Mở khóa
          </button>
        )}
        {inExam && (
          <button className="button small" onClick={onReset} title="Cho làm tiếp trên máy khác">
            Đổi máy
          </button>
        )}
      </td>
    </tr>
  );
}

/** Mã phòng thi cỡ lớn để chiếu; thanh thời gian tới lần đổi mã. */
function AccessCodePanel({ code, serverNow }: { code: AccessCode; serverNow: number }) {
  const ref = useRef<HTMLElement>(null);
  const left = Math.max(0, Math.ceil((Date.parse(code.expiresAt) - serverNow) / 1000));
  return (
    <section className="panel proctor-code" ref={ref}>
      <div>
        <p className="proctor-code-label">Mã phòng thi</p>
        <p className="proctor-code-digits" aria-live="polite">
          {code.code.slice(0, 3)} {code.code.slice(3)}
        </p>
        <div
          className="proctor-code-bar"
          role="progressbar"
          aria-label="Thời gian tới lần đổi mã"
          aria-valuemin={0}
          aria-valuemax={code.periodSeconds}
          aria-valuenow={left}
        >
          <span style={{ width: `${(left / code.periodSeconds) * 100}%` }} />
        </div>
        <p className="admin-hint">Đổi mã sau {left} giây · mã cũ còn nhận thêm 1 phút</p>
      </div>
      <button
        className="button"
        onClick={() =>
          document.fullscreenElement
            ? void document.exitFullscreen()
            : void ref.current?.requestFullscreen()
        }
      >
        <Icon name="expand" size={13} />
        Chiếu toàn màn hình
      </button>
    </section>
  );
}

function SettingsPanel({
  settings,
  closesAt,
  path,
  onSaved,
  onCancel,
}: {
  settings: ProctorSettings;
  closesAt: string | null;
  path: string;
  onSaved: (settings: ProctorSettings) => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<ProctorForm>(() => proctorForm(settings));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save(event: FormEvent) {
    event.preventDefault();
    const problem = proctorFormProblem(form, closesAt);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    setError('');
    try {
      onSaved(
        await apiRequest<ProctorSettings>(`${path}/settings`, {
          method: 'PUT',
          body: proctorRequest(form),
        }),
      );
    } catch (reason) {
      const invalid =
        reason instanceof ApiError &&
        (reason.details as { invalid?: string[] } | undefined)?.invalid;
      setError(
        invalid
          ? `Địa chỉ mạng không hợp lệ: ${invalid.join(', ')}.`
          : reason instanceof Error
            ? reason.message
            : 'Chưa lưu được.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="panel" onSubmit={save}>
      <div className="panel-title">
        <h2>
          <i className="title-icon red">
            <Icon name="shield" size={12} />
          </i>
          Cài đặt giám sát
        </h2>
      </div>
      <ProctorSettingsFields value={form} onChange={setForm} disabled={busy} />
      {error && (
        <p className="flash error" role="alert">
          {error}
        </p>
      )}
      <div className="dialog-actions">
        {onCancel && (
          <button type="button" className="button" disabled={busy} onClick={onCancel}>
            Hủy
          </button>
        )}
        <button className="button primary" disabled={busy}>
          {busy ? 'Đang lưu…' : 'Lưu cài đặt'}
        </button>
      </div>
    </form>
  );
}

/** Nhật ký phòng thi của một sinh viên, cũ trước. */
function LogDialog({ path, row, onClose }: { path: string; row: BoardRow; onClose: () => void }) {
  const [log, setLog] = useState<StudentLog | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    apiRequest<StudentLog>(`${path}/students/${encodeURIComponent(row.studentId)}`, {
      signal: controller.signal,
    })
      .then(setLog)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được nhật ký.');
      });
    return () => controller.abort();
  }, [path, row.studentId]);

  return (
    <Modal title={`Nhật ký phòng thi · ${row.fullName}`} onClose={onClose} wide>
      {error ? (
        <p className="flash error">{error}</p>
      ) : !log ? (
        <p role="status">Đang tải nhật ký…</p>
      ) : (
        <>
          <dl className="proctor-facts">
            <dt>MSSV</dt>
            <dd className="mono">{log.row.username}</dd>
            <dt>Trạng thái</dt>
            <dd>
              {BOARD_STATUS[log.row.status].label} · {log.row.violations} vi phạm
            </dd>
            {log.row.startedAt && (
              <>
                <dt>Vào phòng thi</dt>
                <dd>
                  {formatDateTime(log.row.startedAt)}
                  {log.startIp && ` · ${log.startIp}`}
                </dd>
              </>
            )}
            {log.row.ip && (
              <>
                <dt>IP gần nhất</dt>
                <dd className="mono">{log.row.ip}</dd>
              </>
            )}
            {log.userAgent && (
              <>
                <dt>Trình duyệt</dt>
                <dd className="proctor-agent">{log.userAgent}</dd>
              </>
            )}
          </dl>
          {log.events.length ? (
            <ol className="proctor-log">
              {log.events.map((event, index) => (
                <li key={index} className={event.counted ? 'counted' : undefined}>
                  <time dateTime={event.at}>{formatClock(event.at)}</time>
                  <span>
                    {describeEvent(event)}
                    {event.actorName && <small> · {event.actorName}</small>}
                  </span>
                  {event.counted && <span className="badge locked">Vi phạm</span>}
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty-cell">Chưa có sự kiện nào.</p>
          )}
        </>
      )}
      <div className="dialog-actions">
        <button className="button" onClick={onClose}>
          Đóng
        </button>
      </div>
    </Modal>
  );
}

function LockDialog({
  row,
  onClose,
  onLock,
}: {
  row: BoardRow;
  onClose: () => void;
  onLock: (reason: string) => Promise<void>;
}) {
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <Modal title={`Khóa bài của ${row.fullName}`} onClose={() => !busy && onClose()}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          await onLock(reason.trim());
          onClose();
        }}
      >
        <p>Sinh viên không làm tiếp được cho tới khi bạn mở khóa.</p>
        <label className="form-field">
          <span>
            Lý do <span className="optional">(sinh viên thấy)</span>
          </span>
          <input
            className="input"
            maxLength={200}
            value={reason}
            placeholder="vd. Dùng điện thoại trong giờ thi"
            onChange={(event) => setReason(event.target.value)}
          />
        </label>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button danger" disabled={busy}>
            {busy ? 'Đang khóa…' : 'Khóa bài'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
