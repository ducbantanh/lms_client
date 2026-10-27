'use client';

import type { ReactNode } from 'react';
import {
  MEETING_KINDS,
  dayLabel,
  movedLabel,
  periodLabel,
  periodTime,
  type Meeting,
  type PeriodConfig,
} from '@/lib/schedule';
import { Modal } from '@/components/ui/modal';

/**
 * Hộp chi tiết một buổi học; extra hiện dưới thông tin buổi (vd. đơn xin nghỉ), nút thao tác (điểm danh, dời,
 * hủy, xin nghỉ…) truyền qua children.
 */
export function MeetingDetail({
  meeting,
  config,
  onClose,
  extra,
  children,
}: {
  meeting: Meeting;
  config: PeriodConfig;
  onClose: () => void;
  extra?: ReactNode;
  children?: ReactNode;
}) {
  const moved = movedLabel(meeting);
  return (
    <Modal title={`${meeting.course.code} · ${meeting.course.title}`} onClose={onClose}>
      {meeting.cancelled && (
        <div className="notice" role="status">
          Buổi học này đã bị hủy{meeting.note ? `: ${meeting.note}` : '.'}
        </div>
      )}
      <dl className="meeting-facts">
        <dt>Ngày</dt>
        <dd>
          {dayLabel(meeting.date)}/{meeting.date.slice(0, 4)}
        </dd>
        <dt>Thời gian</dt>
        <dd>
          {periodLabel(meeting.startPeriod, meeting.periods)} (
          {periodTime(config, meeting.startPeriod, meeting.periods)})
        </dd>
        <dt>Phòng</dt>
        <dd>
          {meeting.room.name}
          {meeting.room.building && ` · ${meeting.room.building}`}
        </dd>
        <dt>Hình thức</dt>
        <dd>{MEETING_KINDS[meeting.kind]}</dd>
        <dt>Giảng viên</dt>
        <dd>{meeting.course.teacherName ?? 'Chưa phân công'}</dd>
        {moved && (
          <>
            <dt>Thay đổi</dt>
            <dd>{moved}</dd>
          </>
        )}
        {meeting.note && !meeting.cancelled && (
          <>
            <dt>Ghi chú</dt>
            <dd>{meeting.note}</dd>
          </>
        )}
      </dl>
      {extra}
      {children && <div className="dialog-actions">{children}</div>}
    </Modal>
  );
}
