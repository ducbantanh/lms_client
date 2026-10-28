'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import {
  addDays,
  dayLabel,
  scheduleQuery,
  toIsoDate,
  upcomingMeetings,
  type ScheduleFeed,
} from '@/lib/schedule';
import { Card, EmptyHint, Skeleton } from '@/components/ui/card';
import { MeetingRow } from './week-schedule';

const SHOWN = 5;

/** Khối "Lịch học sắp tới" ở trang tổng quan: các buổi trong 7 ngày tới, buổi đang học tính là sắp tới. */
export function UpcomingPanel({
  href,
  title = 'Lịch học sắp tới',
  delay = 0,
  className = '',
}: {
  href: string;
  title?: string;
  delay?: number;
  className?: string;
}) {
  const [feed, setFeed] = useState<ScheduleFeed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const today = toIsoDate(new Date());
    apiRequest<ScheduleFeed>(scheduleQuery(today, addDays(today, 6)), { signal: controller.signal })
      .then(setFeed)
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const meetings = feed ? upcomingMeetings(feed.meetings).slice(0, SHOWN) : [];
  const today = toIsoDate(new Date());
  return (
    <Card
      title={title}
      info="Các buổi học trong 7 ngày tới, buổi đang diễn ra tính là sắp tới."
      href={href}
      hrefLabel="Xem lịch tuần"
      delay={delay}
      className={className}
    >
      {failed ? (
        <EmptyHint>Không tải được lịch học.</EmptyHint>
      ) : !feed ? (
        <div className="space-y-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      ) : meetings.length === 0 ? (
        <EmptyHint>Không có buổi học nào trong 7 ngày tới.</EmptyHint>
      ) : (
        // Dòng buổi học (list-row) có lề riêng: kéo ra sát mép thẻ
        <div className="-mx-5 -mb-5 overflow-hidden rounded-b-card">
          {meetings.map((meeting) => (
            <div key={meeting.id}>
              <small className="upcoming-day">
                {meeting.date === today ? 'Hôm nay' : dayLabel(meeting.date)}
              </small>
              <MeetingRow meeting={meeting} config={feed.periods} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
