'use client';

import type { CSSProperties, ReactNode } from 'react';
import { coverFor } from '@/lib/course-utils';
import { formatTime } from '@/lib/admin';
import { LEAVE_STATUS } from '@/lib/leave';
import {
  MEETING_KINDS,
  WEEKDAYS,
  addDays,
  dayLabel,
  meetingsByDay,
  movedLabel,
  periodLabel,
  periodTime,
  toIsoDate,
  weekDays,
  weekLabel,
  weekStart,
  type Deadline,
  type Meeting,
  type ScheduleFeed,
} from '@/lib/schedule';
import { Icon } from '@/components/ui/icon';

/** Chiều cao một tiết trên lưới tuần (px). */
const ROW = 46;
/** Lưới luôn hiện ít nhất tới tiết này để tuần ít buổi vẫn đủ khung buổi sáng, chiều. */
const MIN_LAST_PERIOD = 10;

/** Màu theo mã học phần (bỏ phần nhóm), giống màu bìa khóa học ở các trang khác. */
const coverOf = (meeting: Meeting) => `cover-${coverFor(meeting.course.code.split(' · ')[0])}`;

/**
 * Lịch tuần dùng chung cho sinh viên, giảng viên và admin: màn rộng là lưới thứ × tiết,
 * màn hẹp là danh sách theo ngày. Bấm một buổi gọi onSelect (xem chi tiết, điểm danh, dời/hủy).
 */
export function WeekSchedule({
  feed,
  monday,
  today,
  onWeekChange,
  onSelect,
  toolbar,
  emptyText = 'Tuần này không có buổi học nào.',
}: {
  feed: ScheduleFeed | null;
  monday: string;
  today: string;
  onWeekChange: (monday: string) => void;
  onSelect?: (meeting: Meeting) => void;
  /** Bộ lọc, nút thêm… đặt bên phải thanh chuyển tuần. */
  toolbar?: ReactNode;
  emptyText?: string;
}) {
  const days = weekDays(monday);
  const byDay = meetingsByDay(feed?.meetings ?? []);
  const deadlinesByDay = new Map<string, Deadline[]>();
  for (const deadline of feed?.deadlines ?? []) {
    const day = toIsoDate(new Date(deadline.at));
    deadlinesByDay.set(day, [...(deadlinesByDay.get(day) ?? []), deadline]);
  }
  const config = feed?.periods ?? { firstHour: 7, periodsPerDay: 14 };
  const lastUsed = Math.max(
    MIN_LAST_PERIOD,
    ...(feed?.meetings ?? []).map((meeting) => meeting.startPeriod + meeting.periods - 1),
  );
  const rows = Math.min(config.periodsPerDay, lastUsed);
  const isCurrentWeek = days.includes(today);

  return (
    <section className="panel week-schedule">
      <div className="toolbar">
        <div className="week-nav">
          <button
            className="icon-button"
            aria-label="Tuần trước"
            title="Tuần trước"
            onClick={() => onWeekChange(addDays(monday, -7))}
          >
            <Icon name="back" size={12} />
          </button>
          <button
            className="button small"
            disabled={isCurrentWeek}
            onClick={() => onWeekChange(weekStart(today))}
          >
            Tuần này
          </button>
          <button
            className="icon-button"
            aria-label="Tuần sau"
            title="Tuần sau"
            onClick={() => onWeekChange(addDays(monday, 7))}
          >
            <Icon name="chevron" size={12} />
          </button>
          <b className="week-label">{weekLabel(monday)}</b>
        </div>
        {toolbar && <div className="toolbar-right">{toolbar}</div>}
      </div>

      {!feed ? (
        <p className="empty-cell">Đang tải lịch…</p>
      ) : (
        <>
          <div
            className="week-grid"
            style={{ ['--rows' as string]: rows, ['--row' as string]: `${ROW}px` }}
          >
            <div className="week-corner" />
            {days.map((day) => (
              <div key={day} className={`week-day-head${day === today ? ' today' : ''}`}>
                <b>{WEEKDAYS[days.indexOf(day)]}</b>
                <span>
                  {day.slice(8)}/{day.slice(5, 7)}
                </span>
                {(deadlinesByDay.get(day) ?? []).map((deadline) => (
                  <DeadlineChip key={deadline.assessmentId + deadline.kind} deadline={deadline} />
                ))}
              </div>
            ))}
            <div className="week-periods">
              {Array.from({ length: rows }, (_, index) => (
                <div key={index} className="week-period">
                  <b>Tiết {index + 1}</b>
                  <span>{periodTime(config, index + 1, 1).split(' – ')[0]}</span>
                </div>
              ))}
            </div>
            {days.map((day) => (
              <div key={day} className={`week-column${day === today ? ' today' : ''}`}>
                {lanes(byDay.get(day) ?? []).map(({ meeting, lane, laneCount }) => (
                  <MeetingBlock
                    key={meeting.id}
                    meeting={meeting}
                    style={{
                      top: (meeting.startPeriod - 1) * ROW,
                      height: meeting.periods * ROW - 4,
                      left: `calc(${(lane / laneCount) * 100}% + 2px)`,
                      width: `calc(${100 / laneCount}% - 4px)`,
                    }}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="week-list">
            {days.filter((day) => byDay.has(day) || deadlinesByDay.has(day)).length === 0 && (
              <p className="empty-cell">{emptyText}</p>
            )}
            {days
              .filter((day) => byDay.has(day) || deadlinesByDay.has(day))
              .map((day) => (
                <div key={day} className="week-list-day">
                  <h3 className={day === today ? 'today' : ''}>
                    {dayLabel(day)}
                    {day === today && <span className="badge ok">Hôm nay</span>}
                  </h3>
                  {(byDay.get(day) ?? []).map((meeting) => (
                    <MeetingRow
                      key={meeting.id}
                      meeting={meeting}
                      config={config}
                      onSelect={onSelect}
                    />
                  ))}
                  {(deadlinesByDay.get(day) ?? []).map((deadline) => (
                    <DeadlineChip key={deadline.assessmentId + deadline.kind} deadline={deadline} />
                  ))}
                </div>
              ))}
          </div>
          {feed.meetings.length === 0 && <p className="week-empty-note hide-sm">{emptyText}</p>}
        </>
      )}
    </section>
  );
}

function MeetingBlock({
  meeting,
  style,
  onSelect,
}: {
  meeting: Meeting;
  style: CSSProperties;
  onSelect?: (meeting: Meeting) => void;
}) {
  const moved = movedLabel(meeting);
  return (
    <button
      className={`meeting-block ${coverOf(meeting)}${meeting.cancelled ? ' cancelled' : ''}${meeting.kind === 1 ? ' practice' : ''}`}
      style={style}
      onClick={() => onSelect?.(meeting)}
      disabled={!onSelect}
      title={`${meeting.course.code} · ${meeting.course.title}\n${periodLabel(meeting.startPeriod, meeting.periods)}, phòng ${meeting.room.name}${moved ? `\n${moved}` : ''}`}
    >
      <b>{meeting.course.code.split(' · ')[0]}</b>
      <span className="meeting-title">{meeting.course.title}</span>
      <span className="meeting-meta">
        <Icon name="layers" size={9} /> {meeting.room.name}
      </span>
      <MeetingBadge meeting={meeting} />
    </button>
  );
}

/**
 * Một nhãn trạng thái, theo thứ tự ưu tiên: nghỉ → đơn xin nghỉ của mình → đơn chờ duyệt (giảng viên) → đã dời
 * → đã điểm danh.
 */
function MeetingBadge({ meeting }: { meeting: Meeting }) {
  if (meeting.cancelled) return <span className="badge locked">Nghỉ</span>;
  if (meeting.leave) {
    const status = LEAVE_STATUS[meeting.leave.status];
    return <span className={`badge ${status.badge}`}>Xin nghỉ: {status.label.toLowerCase()}</span>;
  }
  if (meeting.pendingLeaves > 0)
    return <span className="badge warn">{meeting.pendingLeaves} đơn xin nghỉ</span>;
  if (movedLabel(meeting)) return <span className="badge warn">Đã dời</span>;
  if (meeting.attendanceSessionId) return <span className="badge ok">Đã điểm danh</span>;
  return null;
}

/** Dòng một buổi trong danh sách theo ngày (màn hẹp, khối "Hôm nay"). */
export function MeetingRow({
  meeting,
  config,
  onSelect,
}: {
  meeting: Meeting;
  config: ScheduleFeed['periods'];
  onSelect?: (meeting: Meeting) => void;
}) {
  const moved = movedLabel(meeting);
  const content = (
    <>
      <span className={`meeting-swatch ${coverOf(meeting)}`} />
      <span className="list-row-text">
        <b className={meeting.cancelled ? 'struck' : ''}>
          {meeting.course.code} · {meeting.course.title}
        </b>
        <small>
          {periodLabel(meeting.startPeriod, meeting.periods)} ·{' '}
          {periodTime(config, meeting.startPeriod, meeting.periods)} · phòng {meeting.room.name} ·{' '}
          {MEETING_KINDS[meeting.kind]}
          {moved && ` · ${moved}`}
          {meeting.note && ` · ${meeting.note}`}
        </small>
      </span>
      <MeetingBadge meeting={meeting} />
    </>
  );
  return onSelect ? (
    <button className="list-row meeting-row" onClick={() => onSelect(meeting)}>
      {content}
    </button>
  ) : (
    <div className="list-row meeting-row">{content}</div>
  );
}

function DeadlineChip({ deadline }: { deadline: Deadline }) {
  return (
    <span
      className={`deadline-chip ${deadline.kind}`}
      title={`${deadline.course.code} · ${deadline.title}`}
    >
      <Icon name={deadline.kind === 'closes' ? 'clock' : 'exam'} size={9} />
      {deadline.kind === 'closes' ? 'Hạn' : 'Mở'} {formatTime(new Date(deadline.at))} ·{' '}
      {deadline.title}
    </span>
  );
}

/** Chia buổi chồng giờ trong cùng ngày thành các làn đặt cạnh nhau (buổi hủy vẫn chiếm chỗ). */
function lanes(meetings: Meeting[]) {
  const placed: { meeting: Meeting; lane: number; group: number }[] = [];
  const laneEnds: number[] = [];
  let group = 0;
  let groupEnd = 0;
  const groupSize = new Map<number, number>();
  for (const meeting of meetings) {
    const start = meeting.startPeriod;
    const end = start + meeting.periods;
    if (start >= groupEnd) {
      group += 1;
      laneEnds.length = 0;
    }
    groupEnd = Math.max(groupEnd, end);
    let lane = laneEnds.findIndex((laneEnd) => laneEnd <= start);
    if (lane < 0) lane = laneEnds.length;
    laneEnds[lane] = end;
    placed.push({ meeting, lane, group });
    groupSize.set(group, Math.max(groupSize.get(group) ?? 0, lane + 1));
  }
  return placed.map((item) => ({ ...item, laneCount: groupSize.get(item.group) ?? 1 }));
}
