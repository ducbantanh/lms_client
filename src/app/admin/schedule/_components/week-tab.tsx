'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import { courseLabel } from '@/lib/course-utils';
import { dayLabel, periodLabel, type Meeting } from '@/lib/schedule';
import { useWeekSchedule } from '@/hooks/use-schedule';
import { errorFlash } from '@/app/teacher/course/_components/course-manager';
import { Icon } from '@/components/ui/icon';
import { MeetingDetail } from '@/components/schedule/meeting-detail';
import { WeekSchedule } from '@/components/schedule/week-schedule';
import { CancelDialog, MeetingDialog, type ScheduleAdminContext } from './schedule-forms';

type Dialog = { kind: 'detail' | 'move' | 'cancel'; meeting: Meeting } | { kind: 'create' } | null;

/** Lịch tuần toàn trường, lọc theo khóa học hoặc phòng; thêm buổi bù, dời, cho nghỉ, xóa từng buổi. */
export function WeekTab({ context }: { context: ScheduleAdminContext }) {
  const { courses, rooms, notify, confirm } = context;
  const [course, setCourse] = useState('');
  const [room, setRoom] = useState('');
  const { today, monday, setMonday, feed, error, reload } = useWeekSchedule({ course, room });
  const [dialog, setDialog] = useState<Dialog>(null);

  function saved(meeting: Meeting, text: string) {
    setDialog(null);
    notify({
      type: 'success',
      text: `${text}: ${meeting.course.code}, ${dayLabel(meeting.date)}.`,
    });
    reload();
  }

  function remove(meeting: Meeting) {
    setDialog(null);
    confirm({
      title: 'Xóa buổi học',
      message: `Xóa hẳn buổi ${meeting.course.code} ${dayLabel(meeting.date)}, ${periodLabel(meeting.startPeriod, meeting.periods)}? Chỉ dùng khi nhập nhầm; muốn cho lớp nghỉ thì chọn "Cho nghỉ" để sinh viên còn thấy buổi bị hủy. Không gửi thông báo.`,
      confirmLabel: 'Xóa buổi',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`/admin/meetings/${encodeURIComponent(meeting.id)}`, {
            method: 'DELETE',
          });
          notify({ type: 'success', text: 'Đã xóa buổi học.' });
          reload();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  return (
    <>
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      <WeekSchedule
        feed={feed}
        monday={monday}
        today={today}
        onWeekChange={setMonday}
        onSelect={(meeting) => setDialog({ kind: 'detail', meeting })}
        emptyText={
          course || room
            ? 'Không có buổi học nào trong tuần với bộ lọc này.'
            : 'Tuần này chưa xếp buổi học nào.'
        }
        toolbar={
          <>
            <select
              className="select"
              value={course}
              aria-label="Lọc theo khóa học"
              onChange={(event) => setCourse(event.target.value)}
            >
              <option value="">Mọi khóa học</option>
              {courses.map((item) => (
                <option key={item.id} value={item.id}>
                  {courseLabel(item.code, item.group)} · {item.title}
                </option>
              ))}
            </select>
            <select
              className="select"
              value={room}
              aria-label="Lọc theo phòng"
              onChange={(event) => setRoom(event.target.value)}
            >
              <option value="">Mọi phòng</option>
              {rooms.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button className="button primary" onClick={() => setDialog({ kind: 'create' })}>
              <Icon name="plus" size={12} />
              Buổi bù
            </button>
          </>
        }
      />
      {dialog?.kind === 'detail' && feed && (
        <MeetingDetail
          meeting={dialog.meeting}
          config={feed.periods}
          onClose={() => setDialog(null)}
        >
          {dialog.meeting.attendanceSessionId ? (
            <p className="admin-hint dialog-error">
              Buổi đã được điểm danh nên không dời, cho nghỉ hay xóa được.
            </p>
          ) : (
            <>
              <button className="button" onClick={() => remove(dialog.meeting)}>
                <Icon name="trash" size={12} />
                Xóa
              </button>
              <button
                className="button"
                onClick={() => setDialog({ kind: 'cancel', meeting: dialog.meeting })}
              >
                {dialog.meeting.cancelled ? 'Học lại' : 'Cho nghỉ'}
              </button>
              <button
                className="button primary"
                onClick={() => setDialog({ kind: 'move', meeting: dialog.meeting })}
              >
                <Icon name="calendar" size={12} />
                Dời buổi
              </button>
            </>
          )}
        </MeetingDetail>
      )}
      {dialog?.kind === 'move' && (
        <MeetingDialog
          context={context}
          meeting={dialog.meeting}
          onClose={() => setDialog(null)}
          onSaved={(meeting) => saved(meeting, 'Đã dời buổi')}
        />
      )}
      {dialog?.kind === 'cancel' && (
        <CancelDialog
          meeting={dialog.meeting}
          onClose={() => setDialog(null)}
          onSaved={(meeting) =>
            saved(meeting, meeting.cancelled ? 'Đã cho nghỉ' : 'Đã khôi phục buổi')
          }
        />
      )}
      {dialog?.kind === 'create' && (
        <MeetingDialog
          context={context}
          courseId={course || undefined}
          date={today >= monday ? today : monday}
          onClose={() => setDialog(null)}
          onSaved={(meeting) => saved(meeting, 'Đã thêm buổi bù')}
        />
      )}
    </>
  );
}
