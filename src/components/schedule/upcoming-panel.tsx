'use client';

import Link from 'next/link';
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
import { Icon } from '@/components/ui/icon';
import { MeetingRow } from './week-schedule';

const SHOWN = 5;

/** Khối "Lịch học sắp tới" ở trang tổng quan: các buổi trong 7 ngày tới, buổi đang học tính là sắp tới. */
export function UpcomingPanel({
  href,
  title = 'Lịch học sắp tới',
}: {
  href: string;
  title?: string;
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
    <section className="panel flush upcoming-panel">
      <div className="panel-title">
        <h2>{title}</h2>
      </div>
      {failed ? (
        <p className="empty-cell">Không tải được lịch học.</p>
      ) : !feed ? (
        <p className="empty-cell">Đang tải…</p>
      ) : meetings.length === 0 ? (
        <p className="empty-cell">Không có buổi học nào trong 7 ngày tới.</p>
      ) : (
        meetings.map((meeting) => (
          <div key={meeting.id}>
            <small className="upcoming-day">
              {meeting.date === today ? 'Hôm nay' : dayLabel(meeting.date)}
            </small>
            <MeetingRow meeting={meeting} config={feed.periods} />
          </div>
        ))
      )}
      <Link href={href} className="panel-footer-link">
        Xem lịch tuần
        <Icon name="chevron" size={9} />
      </Link>
    </section>
  );
}
