'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import {
  LEAVE_STATUS,
  leaveBase,
  leaveFileUrl,
  noticeLabel,
  sortLeaves,
  type CourseLeaves,
  type LeaveRequest,
} from '@/lib/leave';
import { dayLabel, periodLabel } from '@/lib/schedule';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { errorFlash, type TabProps } from './course-manager';

/** Đơn đã duyệt chỉ hiện vài đơn gần nhất, bấm "Xem tất cả" để mở hết. */
const REVIEWED_SHOWN = 5;

/**
 * Khung "Đơn xin nghỉ" ở đầu tab Điểm danh: số giờ sinh viên phải báo trước và các đơn (chờ duyệt trước).
 * Giảng viên phụ trách đồng ý / từ chối kèm ghi chú; đồng ý thì sinh viên được điểm danh "có phép" ở buổi đó.
 * Admin chỉ xem (server trả TEACHER_ONLY khi duyệt).
 */
export function LeavePanel({ content, notify, canTeach }: TabProps) {
  const courseId = content.course.id;
  const [data, setData] = useState<CourseLeaves | null>(null);
  const [reviewing, setReviewing] = useState<{ request: LeaveRequest; approve: boolean } | null>(
    null,
  );
  const [showAll, setShowAll] = useState(false);

  const load = useCallback(
    () =>
      apiRequest<CourseLeaves>(`${leaveBase(courseId)}/leave-requests`)
        .then(setData)
        .catch((reason) => notify(errorFlash(reason))),
    [courseId, notify],
  );

  useEffect(() => {
    void load();
  }, [load]);

  if (!data) return null;
  const sorted = sortLeaves(data.requests);
  const pending = sorted.filter((request) => request.status === 0);
  const reviewed = sorted.filter((request) => request.status !== 0);
  const shown = [...pending, ...(showAll ? reviewed : reviewed.slice(0, REVIEWED_SHOWN))];

  return (
    <section className="panel leave-panel rounded-2xl shadow-card border border-line/80 bg-white/95 backdrop-blur-xs">
      <div className="panel-title">
        <h2>
          Đơn xin nghỉ
          {pending.length > 0 && <span className="badge warn">{pending.length} chờ duyệt</span>}
        </h2>
        <NoticeHours
          courseId={courseId}
          hours={data.noticeHours}
          max={data.maxNoticeHours}
          canTeach={canTeach}
          onSaved={(hours) => {
            setData({ ...data, noticeHours: hours });
            notify({
              type: 'success',
              text: `Sinh viên phải gửi đơn xin nghỉ ${hours ? `trước buổi học ít nhất ${noticeLabel(hours)}` : 'trước giờ học'}.`,
            });
          }}
          onError={(reason) => notify(errorFlash(reason))}
        />
      </div>
      {shown.length === 0 ? (
        <p className="empty-cell">Chưa có đơn xin nghỉ nào.</p>
      ) : (
        <div className="table-responsive">
          <table className="table admin-table leave-table">
            <thead>
              <tr>
                <th>Sinh viên</th>
                <th>Buổi học</th>
                <th>Lý do</th>
                <th>Trạng thái</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shown.map((request) => (
                <tr key={request.id}>
                  <td>
                    <b>{request.student?.fullName ?? '—'}</b>
                    <small className="cell-sub">
                      {request.student?.username} · gửi {formatDateTime(request.createdAt)}
                    </small>
                  </td>
                  <td>
                    {dayLabel(request.meeting.date)}
                    <small className="cell-sub">
                      {periodLabel(request.meeting.startPeriod, request.meeting.periods)}
                      {request.meeting.room && `, phòng ${request.meeting.room}`}
                      {request.meeting.cancelled && ' · buổi đã hủy'}
                    </small>
                  </td>
                  <td className="leave-reason">
                    {request.reason}
                    {request.files.length > 0 && (
                      <span className="leave-evidence">
                        {request.files.map((file) => (
                          <a key={file.id} href={leaveFileUrl(file.id)} download>
                            <Icon name="file" size={11} />
                            {file.name}
                          </a>
                        ))}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${LEAVE_STATUS[request.status].badge}`}>
                      {LEAVE_STATUS[request.status].label}
                    </span>
                    {request.teacherNote && (
                      <small className="cell-sub">{request.teacherNote}</small>
                    )}
                  </td>
                  <td className="actions">
                    {canTeach && (
                      <>
                        {request.status !== 1 && (
                          <button
                            className="button small"
                            onClick={() => setReviewing({ request, approve: true })}
                          >
                            Đồng ý
                          </button>
                        )}
                        {request.status !== 2 && (
                          <button
                            className="button small"
                            onClick={() => setReviewing({ request, approve: false })}
                          >
                            Từ chối
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {reviewed.length > REVIEWED_SHOWN && (
        <button className="link-button panel-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Thu gọn' : `Xem tất cả ${reviewed.length} đơn đã duyệt`}
        </button>
      )}
      {reviewing && (
        <ReviewDialog
          courseId={courseId}
          request={reviewing.request}
          approve={reviewing.approve}
          onClose={() => setReviewing(null)}
          onDone={(saved) => {
            setReviewing(null);
            setData({
              ...data,
              requests: data.requests.map((request) => (request.id === saved.id ? saved : request)),
            });
            notify({
              type: 'success',
              text: `${saved.status === 1 ? 'Đã đồng ý' : 'Đã từ chối'} đơn của ${saved.student?.fullName ?? 'sinh viên'}.`,
            });
          }}
        />
      )}
    </section>
  );
}

/** Ô "báo trước ít nhất … giờ"; chỉ giảng viên phụ trách sửa được. */
function NoticeHours({
  courseId,
  hours,
  max,
  canTeach,
  onSaved,
  onError,
}: {
  courseId: string;
  hours: number;
  max: number;
  canTeach: boolean;
  onSaved: (hours: number) => void;
  onError: (reason: unknown) => void;
}) {
  const [value, setValue] = useState(String(hours));
  const [busy, setBusy] = useState(false);
  const parsed = Number(value);
  const valid = value !== '' && Number.isInteger(parsed) && parsed >= 0 && parsed <= max;

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const saved = await apiRequest<{ noticeHours: number }>(
        `${leaveBase(courseId)}/leave-settings`,
        {
          method: 'PUT',
          body: { noticeHours: parsed },
        },
      );
      onSaved(saved.noticeHours);
    } catch (reason) {
      onError(reason);
    } finally {
      setBusy(false);
    }
  }

  if (!canTeach)
    return <span className="leave-notice">Báo trước ít nhất {noticeLabel(hours)}</span>;
  return (
    <form className="leave-notice" onSubmit={save}>
      <label htmlFor="leave-notice-hours">Báo trước ít nhất</label>
      <input
        id="leave-notice-hours"
        className="input"
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span>giờ</span>
      <button className="button small" disabled={busy || !valid || parsed === hours}>
        {busy ? 'Đang lưu…' : 'Lưu'}
      </button>
    </form>
  );
}

function ReviewDialog({
  courseId,
  request,
  approve,
  onClose,
  onDone,
}: {
  courseId: string;
  request: LeaveRequest;
  approve: boolean;
  onClose: () => void;
  onDone: (saved: LeaveRequest) => void;
}) {
  const [note, setNote] = useState(request.teacherNote ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      onDone(
        await apiRequest<LeaveRequest>(
          `${leaveBase(courseId)}/leave-requests/${encodeURIComponent(request.id)}/review`,
          { method: 'POST', body: { approve, note: note.trim() } },
        ),
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được.');
      setBusy(false);
    }
  }

  return (
    <Modal
      title={approve ? 'Đồng ý cho nghỉ' : 'Từ chối đơn xin nghỉ'}
      onClose={() => !busy && onClose()}
    >
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <p>
          <b>{request.student?.fullName}</b> ({request.student?.username}) xin nghỉ buổi{' '}
          {dayLabel(request.meeting.date)},{' '}
          {periodLabel(request.meeting.startPeriod, request.meeting.periods)}.
        </p>
        <blockquote className="leave-quote">{request.reason}</blockquote>
        <label className="form-field">
          <span>
            Ghi chú cho sinh viên <span className="optional">(không bắt buộc)</span>
          </span>
          <input
            className="input"
            value={note}
            maxLength={500}
            autoFocus
            onChange={(event) => setNote(event.target.value)}
            placeholder={
              approve ? 'Vd. Nhớ xem lại bài giảng buổi này' : 'Vd. Minh chứng chưa hợp lệ'
            }
          />
        </label>
        <p className="admin-hint">
          {approve
            ? 'Sinh viên được ghi "có phép" ở buổi này (ngay nếu đã mở điểm danh, hoặc khi mở điểm danh từ Lịch dạy).'
            : request.status === 1
              ? 'Đơn đã đồng ý trước đó: trạng thái "có phép" đã ghi sẽ được bỏ.'
              : 'Sinh viên nhận thông báo kết quả kèm ghi chú.'}
        </p>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className={`button ${approve ? 'primary' : 'danger'}`} disabled={busy}>
            {busy ? 'Đang lưu…' : approve ? 'Đồng ý' : 'Từ chối'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
