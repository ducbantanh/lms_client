'use client';

import Link from 'next/link';
import { formatTime } from '@/lib/admin';
import { TEACHER_PATH } from '@/lib/auth';
import { coverFor } from '@/lib/course-utils';
import {
  WEEKDAYS,
  addMonths,
  dayLabel,
  meetingsByDay,
  monthGridDays,
  monthLabel,
  monthStart,
  shortDate,
  toIsoDate,
  type Deadline,
  type Meeting,
  type ScheduleFeed,
} from '@/lib/schedule';
import { Icon } from '@/components/ui/icon';
import { MeetingRow } from './week-schedule';

export type ScheduleViewMode = 'week' | 'month' | 'agenda';

/** Bộ chuyển chế độ dùng chung cho lịch tuần, tháng và agenda. */
export function ScheduleViewSwitch({
  value,
  onChange,
}: {
  value: ScheduleViewMode;
  onChange: (value: ScheduleViewMode) => void;
}) {
  const options: { value: ScheduleViewMode; label: string }[] = [
    { value: 'week', label: 'Tuần' },
    { value: 'month', label: 'Tháng' },
    { value: 'agenda', label: 'Danh sách' },
  ];
  return (
    <div className="segmented compact schedule-view-switch" aria-label="Kiểu hiển thị lịch">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? 'selected' : ''}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/** Lịch tháng hoặc danh sách agenda; cùng dùng một feed bao trọn lưới tháng. */
export function MonthAgendaSchedule({
  mode,
  view,
  anchor,
  today,
  feed,
  onAnchorChange,
  onSelect,
  toolbar,
}: {
  mode: 'learn' | 'teach';
  view: Exclude<ScheduleViewMode, 'week'>;
  anchor: string;
  today: string;
  feed: ScheduleFeed | null;
  onAnchorChange: (value: string) => void;
  onSelect: (meeting: Meeting) => void;
  toolbar: React.ReactNode;
}) {
  const days = monthGridDays(anchor);
  const currentMonth = monthStart(anchor).slice(0, 7);
  const byDay = meetingsByDay(feed?.meetings ?? []);
  const deadlinesByDay = deadlinesByDate(feed?.deadlines ?? []);
  const populated = days.filter((day) => byDay.has(day) || deadlinesByDay.has(day));

  return (
    <section className={`panel month-schedule ${view === 'agenda' ? 'agenda-mode' : ''}`}>
      <div className="toolbar">
        <div className="week-nav">
          <button
            type="button"
            className="icon-button"
            aria-label="Tháng trước"
            title="Tháng trước"
            onClick={() => onAnchorChange(addMonths(anchor, -1))}
          >
            <Icon name="back" size={12} />
          </button>
          <button
            type="button"
            className="button small"
            disabled={currentMonth === today.slice(0, 7)}
            onClick={() => onAnchorChange(monthStart(today))}
          >
            Tháng này
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Tháng sau"
            title="Tháng sau"
            onClick={() => onAnchorChange(addMonths(anchor, 1))}
          >
            <Icon name="chevron" size={12} />
          </button>
          <b className="week-label">{monthLabel(anchor)}</b>
        </div>
        <div className="toolbar-right">{toolbar}</div>
      </div>

      {!feed ? (
        <p className="empty-cell">Đang tải lịch…</p>
      ) : view === 'month' ? (
        <MonthGrid
          mode={mode}
          days={days}
          currentMonth={currentMonth}
          today={today}
          byDay={byDay}
          deadlinesByDay={deadlinesByDay}
          onSelect={onSelect}
        />
      ) : (
        <AgendaList
          mode={mode}
          days={populated}
          today={today}
          feed={feed}
          byDay={byDay}
          deadlinesByDay={deadlinesByDay}
          onSelect={onSelect}
        />
      )}
    </section>
  );
}

function MonthGrid({
  mode,
  days,
  currentMonth,
  today,
  byDay,
  deadlinesByDay,
  onSelect,
}: {
  mode: 'learn' | 'teach';
  days: string[];
  currentMonth: string;
  today: string;
  byDay: Map<string, Meeting[]>;
  deadlinesByDay: Map<string, Deadline[]>;
  onSelect: (meeting: Meeting) => void;
}) {
  return (
    <div className="month-grid" role="grid" aria-label={`Lịch ${monthLabel(currentMonth + '-01')}`}>
      {WEEKDAYS.map((weekday) => (
        <div key={weekday} className="month-weekday" role="columnheader">
          {weekday}
        </div>
      ))}
      {days.map((day) => {
        const meetings = byDay.get(day) ?? [];
        const deadlines = deadlinesByDay.get(day) ?? [];
        const events = meetings.length + deadlines.length;
        const shownMeetings = meetings.slice(0, 2);
        const slotsLeft = Math.max(0, 3 - shownMeetings.length);
        const shownDeadlines = deadlines.slice(0, slotsLeft);
        const hidden = events - shownMeetings.length - shownDeadlines.length;
        return (
          <div
            key={day}
            className={`month-day${day === today ? ' today' : ''}${day.slice(0, 7) !== currentMonth ? ' outside' : ''}`}
            role="gridcell"
          >
            <time dateTime={day} className="month-day-number">
              {Number(day.slice(8))}
            </time>
            <div className="month-events">
              {shownMeetings.map((meeting) => (
                <button
                  key={meeting.id}
                  type="button"
                  className={`month-event cover-${coverFor(meeting.course.code.split(' · ')[0])}${meeting.cancelled ? ' cancelled' : ''}`}
                  title={`${meeting.course.code} · ${meeting.course.title}`}
                  onClick={() => onSelect(meeting)}
                >
                  <span>{formatTime(new Date(meeting.startsAt)).slice(0, 5)}</span>
                  <b>{meeting.course.code.split(' · ')[0]}</b>
                </button>
              ))}
              {shownDeadlines.map((deadline) => (
                <Link
                  key={`${deadline.assessmentId}-${deadline.kind}`}
                  className={`month-event deadline ${deadline.kind}`}
                  href={deadlineHref(deadline, mode)}
                  title={`${deadline.course.code} · ${deadline.title}`}
                >
                  <Icon name={deadline.kind === 'closes' ? 'clock' : 'exam'} size={9} />
                  <b>
                    {deadline.kind === 'closes' ? 'Hạn' : 'Mở'} · {deadline.title}
                  </b>
                </Link>
              ))}
              {hidden > 0 && <span className="month-more">+{hidden} mục</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AgendaList({
  mode,
  days,
  today,
  feed,
  byDay,
  deadlinesByDay,
  onSelect,
}: {
  mode: 'learn' | 'teach';
  days: string[];
  today: string;
  feed: ScheduleFeed;
  byDay: Map<string, Meeting[]>;
  deadlinesByDay: Map<string, Deadline[]>;
  onSelect: (meeting: Meeting) => void;
}) {
  if (!days.length)
    return <p className="empty-cell">Tháng này chưa có lịch học hoặc hạn bài nào.</p>;
  return (
    <div className="agenda-list">
      {days.map((day) => (
        <section key={day} className="agenda-day">
          <div className={`agenda-date${day === today ? ' today' : ''}`}>
            <time dateTime={day}>
              <b>{day === today ? 'Hôm nay' : dayLabel(day)}</b>
              <span>{shortDate(day)}</span>
            </time>
          </div>
          <div className="agenda-items">
            {(byDay.get(day) ?? []).map((meeting) => (
              <MeetingRow
                key={meeting.id}
                meeting={meeting}
                config={feed.periods}
                onSelect={onSelect}
              />
            ))}
            {(deadlinesByDay.get(day) ?? []).map((deadline) => (
              <Link
                key={`${deadline.assessmentId}-${deadline.kind}`}
                href={deadlineHref(deadline, mode)}
                className="agenda-deadline"
              >
                <span className={`agenda-deadline-icon ${deadline.kind}`}>
                  <Icon name={deadline.kind === 'closes' ? 'clock' : 'exam'} size={12} />
                </span>
                <span className="list-row-text">
                  <b>{deadline.title}</b>
                  <small>
                    {deadline.course.code} · {deadline.kind === 'closes' ? 'Hạn nộp' : 'Mở bài'} lúc{' '}
                    {formatTime(new Date(deadline.at))}
                  </small>
                </span>
                <Icon name="chevron" size={10} />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function deadlinesByDate(deadlines: Deadline[]) {
  const result = new Map<string, Deadline[]>();
  for (const deadline of [...deadlines].sort((a, b) => Date.parse(a.at) - Date.parse(b.at))) {
    const day = toIsoDate(new Date(deadline.at));
    result.set(day, [...(result.get(day) ?? []), deadline]);
  }
  return result;
}

function deadlineHref(deadline: Deadline, mode: 'learn' | 'teach') {
  return mode === 'learn'
    ? `/course/assessment/?id=${encodeURIComponent(deadline.assessmentId)}`
    : `${TEACHER_PATH}/course/?id=${encodeURIComponent(deadline.course.id)}`;
}
