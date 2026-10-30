'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { addDays, scheduleQuery, toIsoDate, weekStart, type ScheduleFeed } from '@/lib/schedule';

/** Hôm nay theo giờ máy (yyyy-MM-dd); kiểm tra lại mỗi phút để trang mở qua nửa đêm vẫn đúng. */
export function useToday() {
  const [today, setToday] = useState(() => toIsoDate(new Date()));
  useEffect(() => {
    const timer = setInterval(() => setToday(toIsoDate(new Date())), 60_000);
    return () => clearInterval(timer);
  }, []);
  return today;
}

/** Lịch trong một khoảng ngày tùy ý (backend cho phép tối đa 62 ngày). */
export function useScheduleRange(
  from: string,
  to: string,
  filter: { course?: string; room?: string } = {},
) {
  const [version, setVersion] = useState(0);
  const { course, room } = filter;
  const key = `${from}|${to}|${course ?? ''}|${room ?? ''}|${version}`;
  const [loaded, setLoaded] = useState<{ key: string; feed: ScheduleFeed | null; error: string }>({
    key: '',
    feed: null,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<ScheduleFeed>(scheduleQuery(from, to, { course, room }), {
      signal: controller.signal,
    })
      .then((feed) => setLoaded({ key, feed, error: '' }))
      .catch((reason) => {
        if (!controller.signal.aborted)
          setLoaded({
            key,
            feed: null,
            error: reason instanceof Error ? reason.message : 'Không tải được lịch học.',
          });
      });
    return () => controller.abort();
  }, [key, from, to, course, room]);

  const reload = useCallback(() => setVersion((value) => value + 1), []);
  const current = loaded.key === key;
  return {
    feed: current ? loaded.feed : null,
    error: current ? loaded.error : '',
    reload,
  };
}

/** Lịch một tuần (thứ 2 → chủ nhật) của người đang đăng nhập, lọc thêm theo khóa học / phòng nếu có. */
export function useWeekSchedule(filter: { course?: string; room?: string } = {}) {
  const today = useToday();
  const [monday, setMonday] = useState(() => weekStart(today));
  const [version, setVersion] = useState(0);
  const { course, room } = filter;
  // Kết quả gắn với tuần + bộ lọc đã tải; đổi tuần thì feed về null (đang tải) mà không cần setState trong effect
  const key = `${monday}|${course ?? ''}|${room ?? ''}|${version}`;
  const [loaded, setLoaded] = useState<{ key: string; feed: ScheduleFeed | null; error: string }>({
    key: '',
    feed: null,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<ScheduleFeed>(scheduleQuery(monday, addDays(monday, 6), { course, room }), {
      signal: controller.signal,
    })
      .then((feed) => setLoaded({ key, feed, error: '' }))
      .catch((reason) => {
        if (!controller.signal.aborted)
          setLoaded({
            key,
            feed: null,
            error: reason instanceof Error ? reason.message : 'Không tải được lịch học.',
          });
      });
    return () => controller.abort();
  }, [key, monday, course, room]);

  const reload = useCallback(() => setVersion((value) => value + 1), []);
  const current = loaded.key === key;
  return {
    today,
    monday,
    setMonday,
    feed: current ? loaded.feed : null,
    error: current ? loaded.error : '',
    reload,
  };
}
