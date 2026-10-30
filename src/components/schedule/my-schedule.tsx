'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import { formatDateTime } from '@/lib/admin';
import { LEAVE_STATUS, canRequestLeave, noticeLabel } from '@/lib/leave';
import { addDays, canTakeAttendance, monthGridDays, weekStart, type Meeting } from '@/lib/schedule';
import { useScheduleRange, useToday } from '@/hooks/use-schedule';
import { AdminHeading } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { LeaveDialog } from './leave-dialog';
import { MeetingDetail } from './meeting-detail';
import {
  MonthAgendaSchedule,
  ScheduleViewSwitch,
  type ScheduleViewMode,
} from './month-agenda-schedule';
import { WeekSchedule } from './week-schedule';

const attendanceHref = (courseId: string, sessionId?: string) =>
  `${TEACHER_PATH}/course/?id=${encodeURIComponent(courseId)}&tab=attendance${sessionId ? `&session=${encodeURIComponent(sessionId)}` : ''}`;

/**
 * Trang lịch của người đang đăng nhập: sinh viên (/schedule/) xem buổi học, hạn nộp bài và xin nghỉ buổi học
 * (trước hạn giảng viên quy định); giảng viên (/teacher/schedule/) xem lịch dạy, mở điểm danh ngay từ buổi học
 * và thấy số đơn xin nghỉ chờ duyệt. Lịch do admin xếp (trang /admin/schedule/); giảng viên, sinh viên chỉ xem.
 */
export function MySchedule({ mode }: { mode: 'learn' | 'teach' }) {
  const router = useRouter();
  const today = useToday();
  const [view, setView] = useState<ScheduleViewMode>('week');
  const [anchor, setAnchor] = useState(today);
  const monday = weekStart(anchor);
  const monthDays = monthGridDays(anchor);
  const from = view === 'week' ? monday : monthDays[0];
  const to = view === 'week' ? addDays(monday, 6) : monthDays.at(-1)!;
  const { feed, error, reload } = useScheduleRange(from, to);
  const [selected, setSelected] = useState<Meeting | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');
  // Thời điểm mở chi tiết buổi: so với hạn xin nghỉ (không gọi Date.now() khi render)
  const [now, setNow] = useState(() => Date.now());

  async function openAttendance(meeting: Meeting) {
    setBusy(true);
    setActionError('');
    try {
      const link = await apiRequest<{ sessionId: string }>(
        `/teacher/courses/${encodeURIComponent(meeting.course.id)}/meetings/${encodeURIComponent(meeting.id)}/attendance`,
        { method: 'POST' },
      );
      router.push(attendanceHref(meeting.course.id, link.sessionId));
    } catch (reason) {
      setActionError(reason instanceof Error ? reason.message : 'Không mở được điểm danh.');
      setBusy(false);
    }
  }

  async function withdraw(meeting: Meeting) {
    if (!meeting.leave) return;
    setBusy(true);
    setActionError('');
    try {
      await apiRequest(`/student/leave-requests/${encodeURIComponent(meeting.leave.id)}`, {
        method: 'DELETE',
      });
      setSelected({ ...meeting, leave: null });
      setNotice('Đã rút đơn xin nghỉ.');
      reload();
    } catch (reason) {
      setActionError(reason instanceof Error ? reason.message : 'Không rút được đơn.');
    } finally {
      setBusy(false);
    }
  }

  const courseHref = (meeting: Meeting) =>
    mode === 'teach'
      ? `${TEACHER_PATH}/course/?id=${encodeURIComponent(meeting.course.id)}`
      : `/course/?id=${encodeURIComponent(meeting.course.id)}`;

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title={mode === 'teach' ? 'Lịch dạy' : 'Lịch học'}
        description={
          mode === 'teach'
            ? 'Các buổi dạy theo thời khóa biểu. Bấm vào buổi học để mở điểm danh.'
            : 'Buổi học và hạn nộp bài của các khóa học bạn đang theo. Bấm vào buổi học để xin nghỉ.'
        }
      />
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      {notice && (
        <div className="flash success" role="status">
          {notice}
        </div>
      )}
      {view === 'week' ? (
        <WeekSchedule
          feed={feed}
          monday={monday}
          today={today}
          onWeekChange={setAnchor}
          onSelect={selectMeeting}
          toolbar={<ScheduleViewSwitch value={view} onChange={setView} />}
        />
      ) : (
        <MonthAgendaSchedule
          mode={mode}
          view={view}
          anchor={anchor}
          today={today}
          feed={feed}
          onAnchorChange={setAnchor}
          onSelect={selectMeeting}
          toolbar={<ScheduleViewSwitch value={view} onChange={setView} />}
        />
      )}
      {selected && feed && !leaving && (
        <MeetingDetail
          meeting={selected}
          config={feed.periods}
          onClose={() => !busy && setSelected(null)}
          extra={
            mode === 'learn' ? (
              <LeaveInfo meeting={selected} now={now} />
            ) : (
              <PendingLeaves meeting={selected} />
            )
          }
        >
          {actionError && (
            <p className="form-error dialog-error" role="alert">
              {actionError}
            </p>
          )}
          <Link className="button" href={courseHref(selected)}>
            <Icon name="book" size={12} />
            Mở khóa học
          </Link>
          {mode === 'learn' &&
            (selected.leave?.status === 0 ? (
              <button className="button" disabled={busy} onClick={() => void withdraw(selected)}>
                {busy ? 'Đang rút…' : 'Rút đơn xin nghỉ'}
              </button>
            ) : (
              canRequestLeave(selected, now) && (
                <button className="button primary" onClick={() => setLeaving(true)}>
                  <Icon name="send" size={12} />
                  Xin nghỉ
                </button>
              )
            ))}
          {mode === 'teach' &&
            (selected.attendanceSessionId ? (
              <Link
                className="button primary"
                href={attendanceHref(selected.course.id, selected.attendanceSessionId)}
              >
                <Icon name="check" size={12} />
                Xem điểm danh
              </Link>
            ) : (
              canTakeAttendance(selected, today) && (
                <button
                  className="button primary"
                  disabled={busy}
                  onClick={() => void openAttendance(selected)}
                >
                  <Icon name="qrcode" size={12} />
                  {busy ? 'Đang mở…' : selected.date === today ? 'Điểm danh (QR)' : 'Điểm danh bù'}
                </button>
              )
            ))}
        </MeetingDetail>
      )}
      {selected && leaving && (
        <LeaveDialog
          meeting={selected}
          onClose={() => setLeaving(false)}
          onSent={(request) => {
            setLeaving(false);
            setSelected({
              ...selected,
              leave: { id: request.id, status: request.status, teacherNote: request.teacherNote },
            });
            setNotice('Đã gửi đơn xin nghỉ. Giảng viên duyệt xong bạn sẽ nhận thông báo.');
            reload();
          }}
        />
      )}
    </main>
  );

  function selectMeeting(meeting: Meeting) {
    setActionError('');
    setNotice('');
    setNow(Date.now());
    setSelected(meeting);
  }
}

/** Sinh viên: trạng thái đơn xin nghỉ của buổi, hoặc hạn gửi đơn. */
function LeaveInfo({ meeting, now }: { meeting: Meeting; now: number }) {
  if (meeting.cancelled) return null;
  if (meeting.leave) {
    const status = LEAVE_STATUS[meeting.leave.status];
    return (
      <div className="leave-info">
        Đơn xin nghỉ: <span className={`badge ${status.badge}`}>{status.label}</span>
        {meeting.leave.teacherNote && <p>Giảng viên ghi: {meeting.leave.teacherNote}</p>}
      </div>
    );
  }
  // Số giờ phải báo trước = giờ bắt đầu − hạn gửi
  const hours = Math.round(
    (Date.parse(meeting.startsAt) - Date.parse(meeting.leaveDeadline)) / 3_600_000,
  );
  const open = canRequestLeave(meeting, now);
  if (!open && Date.parse(meeting.endsAt) < now) return null;
  return (
    <p className="leave-info muted">
      {open
        ? `Xin nghỉ: gửi đơn trước ${formatDateTime(meeting.leaveDeadline)} (giảng viên yêu cầu báo trước ${noticeLabel(hours)}).`
        : `Đã quá hạn xin nghỉ buổi này (phải gửi trước ${formatDateTime(meeting.leaveDeadline)}).`}
    </p>
  );
}

/** Giảng viên: số đơn xin nghỉ chờ duyệt của buổi, mở tab Điểm danh để duyệt. */
function PendingLeaves({ meeting }: { meeting: Meeting }) {
  if (!meeting.pendingLeaves) return null;
  return (
    <p className="leave-info">
      <span className="badge warn">{meeting.pendingLeaves} đơn xin nghỉ chờ duyệt</span>{' '}
      <Link href={attendanceHref(meeting.course.id)}>Xem và duyệt</Link>
    </p>
  );
}
