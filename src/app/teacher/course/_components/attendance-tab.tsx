'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { useSession } from '@/providers/session-provider';
import {
  STATUS_CHOICES,
  absentCount,
  applyCheckIn,
  attendanceBase,
  attendanceCsvUrl,
  filterRows,
  projectorHref,
  sharedIps,
  statusInfo,
  type AttendanceCheckedIn,
  type AttendanceOverview,
  type AttendanceRow,
  type AttendanceSessionDetail,
  type AttendanceStatus,
  type RowFilter,
} from '@/lib/attendance';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { errorFlash, type TabProps } from './course-manager';
import { LeavePanel } from './leave-panel';

/**
 * Tab Điểm danh: danh sách buổi, mỗi buổi chiếu mã QR (đổi mỗi 10 giây) cho sinh viên quét
 * và điểm danh thủ công cho người không quét được. Admin chỉ xem (server trả TEACHER_ONLY khi sửa).
 */
export function AttendanceTab(props: TabProps) {
  const { content, notify, canTeach } = props;
  const courseId = content.course.id;
  const base = attendanceBase(courseId);
  const { subscribe } = useSession();
  const [overview, setOverview] = useState<AttendanceOverview | null>(null);
  // ?session=...: mở thẳng một buổi (bấm "Điểm danh" ở trang Lịch dạy)
  const params = useSearchParams();
  const [selected, setSelected] = useState<string | null>(() => params.get('session'));
  const [creating, setCreating] = useState(false);

  const loadOverview = useCallback(
    () =>
      apiRequest<AttendanceOverview>(base)
        .then(setOverview)
        .catch((reason) => notify(errorFlash(reason))),
    [base, notify],
  );

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  // Đang xem danh sách buổi: sinh viên quét QR (ở màn chiếu tab khác) thì cập nhật số đếm
  useEffect(() => {
    if (selected) return;
    return subscribe('attendance.checked_in', (data) => {
      if ((data as AttendanceCheckedIn).courseId === courseId) void loadOverview();
    });
  }, [selected, subscribe, courseId, loadOverview]);

  if (selected)
    return (
      <SessionView
        {...props}
        sessionId={selected}
        onBack={() => {
          setSelected(null);
          void loadOverview();
        }}
      />
    );

  const sessions = overview?.sessions ?? [];
  return (
    <>
      <LeavePanel {...props} />
      <section className="panel">
        <div className="toolbar">
          <p className="table-summary">
            {overview
              ? `${sessions.length} buổi · sĩ số ${overview.students} sinh viên`
              : 'Đang tải…'}
          </p>
          <div className="toolbar-right">
            {sessions.length > 0 && (
              <a className="button" href={attendanceCsvUrl(courseId)} download>
                <Icon name="download" size={13} />
                Xuất bảng điểm danh
              </a>
            )}
            {canTeach && (
              <button className="button primary" onClick={() => setCreating(true)}>
                <Icon name="plus" size={12} />
                Điểm danh buổi mới
              </button>
            )}
          </div>
        </div>
        <div className="table-responsive">
          <table className="table admin-table attendance-sessions">
            <thead>
              <tr>
                <th>Buổi</th>
                <th className="numeric">Có mặt</th>
                <th className="numeric">Đi muộn</th>
                <th className="numeric hide-sm">Có phép</th>
                <th className="numeric">Vắng</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!overview ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Đang tải…
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    {canTeach
                      ? 'Chưa có buổi điểm danh. Bấm "Điểm danh buổi mới" khi bắt đầu buổi học.'
                      : 'Chưa có buổi điểm danh nào.'}
                  </td>
                </tr>
              ) : (
                sessions.map((session) => (
                  <tr key={session.id}>
                    <td>
                      <button className="link-button" onClick={() => setSelected(session.id)}>
                        {session.title}
                      </button>
                      {session.qrOpen && <span className="badge ok qr-badge">Đang mở QR</span>}
                      <small className="cell-sub">{formatDateTime(session.createdAt)}</small>
                    </td>
                    <td className="numeric">{session.present}</td>
                    <td className="numeric">{session.late}</td>
                    <td className="numeric hide-sm">{session.excused}</td>
                    <td className="numeric">
                      <b className={absentCount(session, overview.students) ? 'text-danger' : ''}>
                        {absentCount(session, overview.students)}
                      </b>
                    </td>
                    <td className="actions">
                      <button
                        className="icon-button row-action"
                        title="Mở buổi điểm danh"
                        aria-label={`Mở ${session.title}`}
                        onClick={() => setSelected(session.id)}
                      >
                        <Icon name="chevron" size={10} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {creating && (
          <CreateSessionDialog
            {...props}
            nextNumber={sessions.length + 1}
            onClose={() => setCreating(false)}
            onCreated={(detail) => {
              setCreating(false);
              setSelected(detail.session.id);
            }}
          />
        )}
      </section>
    </>
  );
}

function CreateSessionDialog({
  content,
  notify,
  nextNumber,
  onClose,
  onCreated,
}: TabProps & {
  nextNumber: number;
  onClose: () => void;
  onCreated: (detail: AttendanceSessionDetail) => void;
}) {
  const [title, setTitle] = useState('');
  const [qr, setQr] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const detail = await apiRequest<AttendanceSessionDetail>(attendanceBase(content.course.id), {
        method: 'POST',
        body: { title: title.trim(), qr },
      });
      notify({ type: 'success', text: `Đã tạo ${detail.session.title}.` });
      onCreated(detail);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tạo được buổi điểm danh.');
      setBusy(false);
    }
  }

  return (
    <Modal title="Điểm danh buổi mới" onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          <span>
            Tên buổi <span className="optional">(không bắt buộc)</span>
          </span>
          <input
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={`Buổi ${nextNumber}`}
            maxLength={200}
            autoFocus
          />
        </label>
        <label className="check-field">
          <input type="checkbox" checked={qr} onChange={(event) => setQr(event.target.checked)} />
          Mở điểm danh bằng mã QR ngay
        </label>
        <p className="admin-hint">
          Mã QR đổi mỗi 10 giây nên ảnh chụp gửi cho người vắng mặt nhanh chóng hết dùng được. Sinh
          viên quên điện thoại hoặc không quét được thì điểm danh thủ công trong danh sách.
        </p>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy}>
            {busy ? 'Đang tạo…' : 'Tạo buổi'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/** Chi tiết một buổi: điều khiển QR, bảng sinh viên cập nhật realtime, điểm danh thủ công. */
function SessionView({
  content,
  notify,
  confirm,
  canTeach,
  sessionId,
  onBack,
}: TabProps & { sessionId: string; onBack: () => void }) {
  const courseId = content.course.id;
  const url = `${attendanceBase(courseId)}/${encodeURIComponent(sessionId)}`;
  const { subscribe } = useSession();
  const [detail, setDetail] = useState<AttendanceSessionDetail | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RowFilter>('all');
  /** Sinh viên đang được lưu trạng thái (khóa nút của dòng đó). */
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [renaming, setRenaming] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<AttendanceSessionDetail>(url, { signal: controller.signal })
      .then(setDetail)
      .catch((reason) => !controller.signal.aborted && notify(errorFlash(reason)));
    return () => controller.abort();
  }, [url, notify]);

  useEffect(
    () =>
      subscribe('attendance.checked_in', (data) => {
        const event = data as AttendanceCheckedIn;
        if (event.sessionId === sessionId)
          setDetail((current) => current && applyCheckIn(current, event.row));
      }),
    [subscribe, sessionId],
  );

  async function mark(studentIds: string[], status: AttendanceStatus | null) {
    setSaving((current) => new Set([...current, ...studentIds]));
    try {
      setDetail(
        await apiRequest<AttendanceSessionDetail>(`${url}/records`, {
          method: 'PUT',
          body: { studentIds, status },
        }),
      );
    } catch (reason) {
      notify(errorFlash(reason));
    } finally {
      setSaving((current) => new Set([...current].filter((id) => !studentIds.includes(id))));
    }
  }

  async function setQrOpen(open: boolean) {
    try {
      setDetail(
        await apiRequest<AttendanceSessionDetail>(`${url}/qr/${open ? 'open' : 'close'}`, {
          method: 'POST',
        }),
      );
      notify({
        type: 'success',
        text: open ? 'Đã mở điểm danh bằng QR.' : 'Đã dừng điểm danh bằng QR.',
      });
    } catch (reason) {
      notify(errorFlash(reason));
    }
  }

  if (!detail)
    return (
      <section className="panel">
        <p className="empty-cell">Đang tải buổi điểm danh…</p>
      </section>
    );

  const { session, rows, students } = detail;
  const absent = rows.filter((row) => row.status === null);
  const visible = filterRows(rows, query, filter);
  const duplicateIps = sharedIps(rows);

  function remove() {
    confirm({
      title: 'Xóa buổi điểm danh',
      message: `Xóa "${session.title}" cùng toàn bộ kết quả điểm danh của buổi này?`,
      confirmLabel: 'Xóa buổi',
      danger: true,
      run: async () => {
        try {
          await apiRequest(url, { method: 'DELETE' });
          notify({ type: 'success', text: `Đã xóa ${session.title}.` });
          onBack();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  function markAllAbsentPresent() {
    confirm({
      title: 'Điểm danh có mặt',
      message: `Đánh dấu có mặt cho ${absent.length} sinh viên đang vắng trong "${session.title}"?`,
      confirmLabel: 'Đánh dấu có mặt',
      run: () =>
        mark(
          absent.map((row) => row.studentId),
          0,
        ),
    });
  }

  return (
    <div className="stack">
      <button className="back-link link-button" onClick={onBack}>
        <Icon name="back" size={12} />
        Tất cả buổi điểm danh
      </button>
      <section className="panel">
        <div className="attendance-head">
          <div>
            <h2>
              {session.title}
              {session.qrOpen ? (
                <span className="badge ok qr-badge">Đang mở QR</span>
              ) : (
                <span className="badge muted">Đã dừng QR</span>
              )}
            </h2>
            <p className="cell-sub">Tạo lúc {formatDateTime(session.createdAt)}</p>
          </div>
          {canTeach && (
            <div className="button-row">
              {session.qrOpen ? (
                <>
                  <a
                    className="button primary"
                    href={projectorHref(courseId, session.id)}
                    target="_blank"
                    rel="noopener"
                  >
                    <Icon name="qrcode" size={13} />
                    Chiếu mã QR
                  </a>
                  <button className="button" onClick={() => setQrOpen(false)}>
                    <Icon name="lock" size={12} />
                    Dừng QR
                  </button>
                </>
              ) : (
                <button className="button" onClick={() => setQrOpen(true)}>
                  <Icon name="qrcode" size={13} />
                  Mở lại điểm danh QR
                </button>
              )}
              <button className="button" onClick={() => setRenaming(true)}>
                <Icon name="edit" size={13} />
                Đổi tên
              </button>
              <button className="button" onClick={remove}>
                <Icon name="trash" size={13} />
                Xóa
              </button>
            </div>
          )}
        </div>
        <div className="attendance-counts">
          {([0, 1, 2] as const).map((status) => (
            <span key={status} className={`badge ${statusInfo(status).tone}`}>
              {statusInfo(status).label}{' '}
              {status === 0 ? session.present : status === 1 ? session.late : session.excused}
            </span>
          ))}
          <span className="badge locked">Vắng {absent.length}</span>
          <span className="table-summary">/ {students} sinh viên</span>
        </div>
      </section>
      <section className="panel">
        <div className="toolbar">
          <label className="search-field">
            <Icon name="search" size={14} />
            <span className="sr-only">Tìm theo MSSV hoặc họ tên</span>
            <input
              className="input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm MSSV hoặc họ tên…"
            />
          </label>
          <div className="segmented compact" role="group" aria-label="Lọc theo trạng thái">
            {(
              [
                ['all', `Tất cả (${rows.length})`],
                ['absent', `Vắng (${absent.length})`],
                ['present', `Đã điểm danh (${rows.length - absent.length})`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                className={filter === value ? 'selected' : ''}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          {canTeach && absent.length > 0 && (
            <div className="toolbar-right">
              <button className="button" onClick={markAllAbsentPresent}>
                <Icon name="check" size={12} />
                Có mặt cho {absent.length} người còn vắng
              </button>
            </div>
          )}
        </div>
        <div className="table-responsive">
          <table className="table admin-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Trạng thái</th>
                <th className="hide-sm">Điểm danh</th>
                <th className="hide-sm">IP</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-cell">
                    {rows.length ? 'Không có sinh viên phù hợp.' : 'Khóa học chưa có sinh viên.'}
                  </td>
                </tr>
              ) : (
                visible.map((row) => (
                  <tr key={row.studentId}>
                    <td className="mono">{row.username}</td>
                    <td>{row.fullName}</td>
                    <td>
                      {canTeach ? (
                        <StatusPicker
                          row={row}
                          busy={saving.has(row.studentId)}
                          onChange={(status) => mark([row.studentId], status)}
                        />
                      ) : (
                        <span className={`badge ${statusInfo(row.status).tone}`}>
                          {statusInfo(row.status).label}
                        </span>
                      )}
                    </td>
                    <td className="hide-sm">
                      {row.method === null ? (
                        '—'
                      ) : (
                        <span title={formatDateTime(row.checkedAt)}>
                          {row.method === 0 ? 'Quét QR' : 'Thủ công'}
                          <small className="cell-sub">{formatDateTime(row.checkedAt)}</small>
                        </span>
                      )}
                    </td>
                    <td className="hide-sm mono">
                      {row.ip ?? '—'}
                      {row.ip && duplicateIps.has(row.ip) && (
                        <span
                          className="badge warn ip-badge"
                          title={`${duplicateIps.get(row.ip)} sinh viên quét từ cùng địa chỉ IP này`}
                        >
                          Trùng IP
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      {renaming && (
        <RenameDialog
          url={url}
          title={session.title}
          onClose={() => setRenaming(false)}
          onSaved={(next) => {
            setDetail(next);
            setRenaming(false);
          }}
        />
      )}
    </div>
  );
}

/** Bốn nút Có mặt / Đi muộn / Có phép / Vắng; bấm lại trạng thái đang chọn thì không gửi gì. */
function StatusPicker({
  row,
  busy,
  onChange,
}: {
  row: AttendanceRow;
  busy: boolean;
  onChange: (status: AttendanceStatus | null) => void;
}) {
  return (
    <div className="status-picker" role="group" aria-label={`Trạng thái của ${row.username}`}>
      {STATUS_CHOICES.map((status) => {
        const info = statusInfo(status);
        const current = row.status === status;
        return (
          <button
            key={info.label}
            className={current ? `selected ${info.tone}` : ''}
            aria-pressed={current}
            disabled={busy}
            onClick={() => !current && onChange(status)}
          >
            {info.label}
          </button>
        );
      })}
    </div>
  );
}

function RenameDialog({
  url,
  title,
  onClose,
  onSaved,
}: {
  url: string;
  title: string;
  onClose: () => void;
  onSaved: (detail: AttendanceSessionDetail) => void;
}) {
  const [value, setValue] = useState(title);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      onSaved(
        await apiRequest<AttendanceSessionDetail>(url, {
          method: 'PUT',
          body: { title: value.trim() },
        }),
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không đổi được tên.');
      setBusy(false);
    }
  }

  return (
    <Modal title="Đổi tên buổi" onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          Tên buổi
          <input
            className="input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            maxLength={200}
            required
            autoFocus
          />
        </label>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy || !value.trim() || value === title}>
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
