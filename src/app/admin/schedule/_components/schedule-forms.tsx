'use client';

import { useState, type FormEvent } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { courseLabel } from '@/lib/course-utils';
import type { TeacherCourse } from '@/lib/teaching';
import type { ConfirmRequest, Flash } from '@/components/admin-ui';
import {
  MEETING_KINDS,
  WEEKDAYS,
  conflictLabel,
  countWeekly,
  periodTime,
  type Meeting,
  type MeetingKind,
  type PeriodConfig,
  type Room,
  type ScheduleConflict,
  type ScheduleResult,
  type ScheduleRule,
} from '@/lib/schedule';
import { Modal } from '@/components/ui/modal';

/** Dữ liệu dùng chung của các tab trang Lịch học (admin). */
export interface ScheduleAdminContext {
  courses: TeacherCourse[];
  rooms: Room[];
  periods: PeriodConfig;
  reloadRooms: () => void;
  notify: (flash: Flash) => void;
  confirm: (request: ConfirmRequest) => void;
}

/** Lỗi của form; SCHEDULE_CONFLICT thì liệt kê các buổi bị trùng. */
export function FormError({ error }: { error: unknown }) {
  if (!error) return null;
  const conflicts =
    error instanceof ApiError && error.code === 'SCHEDULE_CONFLICT'
      ? (error.details as ScheduleConflict[] | undefined)
      : undefined;
  return (
    <div className="form-error" role="alert">
      {error instanceof Error ? error.message : 'Không lưu được.'}
      {conflicts && conflicts.length > 0 && (
        <ul className="conflict-list">
          {conflicts.map((conflict, index) => (
            <li key={index}>{conflictLabel(conflict)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const courseName = (course: TeacherCourse) =>
  `${courseLabel(course.code, course.group)} · ${course.title}`;

function PeriodFields({
  periods,
  startPeriod,
  count,
  onChange,
}: {
  periods: PeriodConfig;
  startPeriod: number;
  count: number;
  onChange: (startPeriod: number, count: number) => void;
}) {
  const maxCount = periods.periodsPerDay - startPeriod + 1;
  return (
    <div className="form-row">
      <label className="form-field">
        <span>Tiết bắt đầu</span>
        <select
          className="select"
          value={startPeriod}
          onChange={(event) => {
            const start = Number(event.target.value);
            onChange(start, Math.min(count, periods.periodsPerDay - start + 1));
          }}
        >
          {Array.from({ length: periods.periodsPerDay }, (_, index) => (
            <option key={index} value={index + 1}>
              Tiết {index + 1} ({periodTime(periods, index + 1, 1).split(' – ')[0]})
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Số tiết</span>
        <select
          className="select"
          value={count}
          onChange={(event) => onChange(startPeriod, Number(event.target.value))}
        >
          {Array.from({ length: maxCount }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} tiết (đến {periodTime(periods, startPeriod, index + 1).split(' – ')[1]})
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function RoomSelect({
  rooms,
  value,
  currentRoomId,
  onChange,
}: {
  rooms: Room[];
  value: string;
  /** Phòng đang gắn (khi sửa) vẫn chọn được dù đã ngừng dùng. */
  currentRoomId?: string;
  onChange: (roomId: string) => void;
}) {
  const choices = rooms.filter((room) => room.active || room.id === currentRoomId);
  return (
    <label className="form-field">
      <span>Phòng học</span>
      <select
        className="select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      >
        <option value="">Chọn phòng…</option>
        {choices.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
            {room.building ? ` · ${room.building}` : ''}
            {room.capacity ? ` · ${room.capacity} chỗ` : ''}
            {room.active ? '' : ' (ngừng dùng)'}
          </option>
        ))}
      </select>
    </label>
  );
}

function KindField({
  value,
  onChange,
}: {
  value: MeetingKind;
  onChange: (kind: MeetingKind) => void;
}) {
  return (
    <div className="form-field">
      <span>Hình thức</span>
      <div className="segmented" role="radiogroup" aria-label="Hình thức">
        {([0, 1] as MeetingKind[]).map((kind) => (
          <button
            key={kind}
            type="button"
            role="radio"
            aria-checked={value === kind}
            className={value === kind ? 'selected' : ''}
            onClick={() => onChange(kind)}
          >
            {MEETING_KINDS[kind]}
          </button>
        ))}
      </div>
    </div>
  );
}

function NotifyField({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <label className="check-field">
      <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

/** Tạo / sửa quy tắc lặp hằng tuần của một khóa học. */
export function RuleDialog({
  context,
  rule,
  courseId,
  onClose,
  onSaved,
}: {
  context: ScheduleAdminContext;
  /** Có giá trị khi sửa. */
  rule?: ScheduleRule;
  /** Khóa học chọn sẵn khi tạo (đang lọc theo khóa học). */
  courseId?: string;
  onClose: () => void;
  onSaved: (result: ScheduleResult) => void;
}) {
  const { courses, rooms, periods } = context;
  const [course, setCourse] = useState(rule?.course.id ?? courseId ?? '');
  const [room, setRoom] = useState(rule?.room.id ?? '');
  const [weekday, setWeekday] = useState(rule?.weekday ?? 1);
  const [startPeriod, setStartPeriod] = useState(rule?.startPeriod ?? 1);
  const [count, setCount] = useState(rule?.periods ?? 3);
  const [kind, setKind] = useState<MeetingKind>(rule?.kind ?? 0);
  const [startsOn, setStartsOn] = useState(rule?.startsOn ?? '');
  const [endsOn, setEndsOn] = useState(rule?.endsOn ?? '');
  const [notify, setNotify] = useState(Boolean(rule));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const total = countWeekly(weekday, startsOn, endsOn);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const body = {
        courseId: course,
        roomId: room,
        weekday,
        startPeriod,
        periods: count,
        kind,
        startsOn,
        endsOn,
        notifyStudents: notify,
      };
      const result = await apiRequest<ScheduleResult>(
        rule ? `/admin/schedules/${encodeURIComponent(rule.id)}` : '/admin/schedules',
        { method: rule ? 'PUT' : 'POST', body },
      );
      onSaved(result);
    } catch (reason) {
      setError(reason);
      setBusy(false);
    }
  }

  return (
    <Modal
      title={rule ? 'Sửa lịch lặp' : 'Thêm lịch lặp hằng tuần'}
      onClose={() => !busy && onClose()}
    >
      <form onSubmit={submit}>
        <FormError error={error} />
        <label className="form-field">
          <span>Khóa học</span>
          {rule ? (
            <input
              className="input"
              value={`${rule.course.code} · ${rule.course.title}`}
              disabled
            />
          ) : (
            <select
              className="select"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              required
              autoFocus
            >
              <option value="">Chọn khóa học…</option>
              {courses.map((item) => (
                <option key={item.id} value={item.id}>
                  {courseName(item)}
                </option>
              ))}
            </select>
          )}
        </label>
        <div className="form-row">
          <label className="form-field">
            <span>Thứ</span>
            <select
              className="select"
              value={weekday}
              onChange={(event) => setWeekday(Number(event.target.value))}
            >
              {WEEKDAYS.map((label, index) => (
                <option key={label} value={index + 1}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <RoomSelect rooms={rooms} value={room} currentRoomId={rule?.room.id} onChange={setRoom} />
        </div>
        <PeriodFields
          periods={periods}
          startPeriod={startPeriod}
          count={count}
          onChange={(start, value) => {
            setStartPeriod(start);
            setCount(value);
          }}
        />
        <div className="form-row">
          <label className="form-field">
            <span>Từ ngày</span>
            <input
              className="input"
              type="date"
              value={startsOn}
              onChange={(event) => setStartsOn(event.target.value)}
              required
            />
          </label>
          <label className="form-field">
            <span>Đến ngày</span>
            <input
              className="input"
              type="date"
              value={endsOn}
              min={startsOn || undefined}
              onChange={(event) => setEndsOn(event.target.value)}
              required
            />
          </label>
        </div>
        <KindField value={kind} onChange={setKind} />
        <NotifyField
          value={notify}
          onChange={setNotify}
          label="Gửi thông báo lịch học cho sinh viên và giảng viên của lớp"
        />
        <p className="admin-hint">
          {startsOn && endsOn
            ? total > 0
              ? `Sẽ có ${total} buổi ${WEEKDAYS[weekday - 1].toLowerCase()} trong khoảng ngày này.`
              : 'Khoảng ngày này không có ngày nào trùng thứ đã chọn.'
            : 'Chọn khoảng ngày của học kỳ để xem số buổi.'}
          {rule &&
            ' Khi sửa, các buổi từ hôm nay trở đi chưa điểm danh được xếp lại (kể cả buổi đã dời, hủy riêng); buổi đã qua giữ nguyên.'}
        </p>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy || (!rule && total === 0)}>
            {busy ? 'Đang lưu…' : rule ? 'Lưu và xếp lại' : 'Tạo lịch'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/** Thêm buổi lẻ (buổi bù) hoặc dời một buổi đã có. */
export function MeetingDialog({
  context,
  meeting,
  courseId,
  date,
  onClose,
  onSaved,
}: {
  context: ScheduleAdminContext;
  /** Có giá trị khi dời buổi. */
  meeting?: Meeting;
  courseId?: string;
  date?: string;
  onClose: () => void;
  onSaved: (meeting: Meeting) => void;
}) {
  const { courses, rooms, periods } = context;
  const [course, setCourse] = useState(meeting?.course.id ?? courseId ?? '');
  const [room, setRoom] = useState(meeting?.room.id ?? '');
  const [day, setDay] = useState(meeting?.date ?? date ?? '');
  const [startPeriod, setStartPeriod] = useState(meeting?.startPeriod ?? 1);
  const [count, setCount] = useState(meeting?.periods ?? 3);
  const [kind, setKind] = useState<MeetingKind>(meeting?.kind ?? 0);
  const [note, setNote] = useState(meeting?.note ?? '');
  const [notify, setNotify] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const body = {
        courseId: course,
        roomId: room,
        date: day,
        startPeriod,
        periods: count,
        kind,
        note: note.trim(),
        notifyStudents: notify,
      };
      const saved = await apiRequest<Meeting>(
        meeting ? `/admin/meetings/${encodeURIComponent(meeting.id)}` : '/admin/meetings',
        { method: meeting ? 'PATCH' : 'POST', body },
      );
      onSaved(saved);
    } catch (reason) {
      setError(reason);
      setBusy(false);
    }
  }

  return (
    <Modal title={meeting ? 'Dời buổi học' : 'Thêm buổi học bù'} onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        <FormError error={error} />
        <label className="form-field">
          <span>Khóa học</span>
          {meeting ? (
            <input
              className="input"
              value={`${meeting.course.code} · ${meeting.course.title}`}
              disabled
            />
          ) : (
            <select
              className="select"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              required
              autoFocus
            >
              <option value="">Chọn khóa học…</option>
              {courses.map((item) => (
                <option key={item.id} value={item.id}>
                  {courseName(item)}
                </option>
              ))}
            </select>
          )}
        </label>
        <div className="form-row">
          <label className="form-field">
            <span>Ngày</span>
            <input
              className="input"
              type="date"
              value={day}
              onChange={(event) => setDay(event.target.value)}
              required
            />
          </label>
          <RoomSelect
            rooms={rooms}
            value={room}
            currentRoomId={meeting?.room.id}
            onChange={setRoom}
          />
        </div>
        <PeriodFields
          periods={periods}
          startPeriod={startPeriod}
          count={count}
          onChange={(start, value) => {
            setStartPeriod(start);
            setCount(value);
          }}
        />
        <KindField value={kind} onChange={setKind} />
        <label className="form-field">
          <span>
            Ghi chú <span className="optional">(không bắt buộc)</span>
          </span>
          <input
            className="input"
            value={note}
            maxLength={200}
            onChange={(event) => setNote(event.target.value)}
            placeholder={meeting ? 'Vd. Giảng viên đi công tác' : 'Vd. Bù cho buổi nghỉ ngày 20/11'}
          />
        </label>
        <NotifyField
          value={notify}
          onChange={setNotify}
          label="Gửi thông báo cho sinh viên và giảng viên của lớp"
        />
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy}>
            {busy ? 'Đang lưu…' : meeting ? 'Dời buổi' : 'Thêm buổi'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/** Hủy (cho nghỉ) hoặc khôi phục một buổi, kèm lý do và tùy chọn thông báo. */
export function CancelDialog({
  meeting,
  onClose,
  onSaved,
}: {
  meeting: Meeting;
  onClose: () => void;
  onSaved: (meeting: Meeting) => void;
}) {
  const restore = meeting.cancelled;
  const [note, setNote] = useState(meeting.note ?? '');
  const [notify, setNotify] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const saved = await apiRequest<Meeting>(
        `/admin/meetings/${encodeURIComponent(meeting.id)}/${restore ? 'restore' : 'cancel'}`,
        { method: 'POST', body: { note: note.trim(), notifyStudents: notify } },
      );
      onSaved(saved);
    } catch (reason) {
      setError(reason);
      setBusy(false);
    }
  }

  return (
    <Modal
      title={restore ? 'Học lại theo lịch' : 'Cho nghỉ buổi học'}
      onClose={() => !busy && onClose()}
    >
      <form onSubmit={submit}>
        <FormError error={error} />
        <label className="form-field">
          <span>
            {restore ? 'Ghi chú' : 'Lý do nghỉ'} <span className="optional">(không bắt buộc)</span>
          </span>
          <input
            className="input"
            value={note}
            maxLength={200}
            autoFocus
            onChange={(event) => setNote(event.target.value)}
            placeholder={restore ? '' : 'Vd. Nghỉ lễ, giảng viên ốm'}
          />
        </label>
        <NotifyField
          value={notify}
          onChange={setNotify}
          label="Gửi thông báo cho sinh viên và giảng viên của lớp"
        />
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Đóng
          </button>
          <button className={`button ${restore ? 'primary' : 'danger'}`} disabled={busy}>
            {busy ? 'Đang lưu…' : restore ? 'Khôi phục buổi' : 'Cho nghỉ'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
