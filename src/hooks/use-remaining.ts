import { useEffect, useRef, useState } from 'react';

/**
 * Thời gian còn lại tới `target` theo giờ server (offset = giờ server − giờ máy), cập nhật mỗi giây.
 * Hết giờ thì gọi onDone một lần để tải lại bài (đề hiện ra, hoặc bài làm bị khóa).
 */
export function useRemaining(target: string | null, offset: number, onDone: () => void) {
  const [now, setNow] = useState(() => Date.now() + offset);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });
  const end = target ? Date.parse(target) : null;
  useEffect(() => {
    if (end === null) return;
    let fired = false;
    const tick = () => {
      const current = Date.now() + offset;
      setNow(current);
      // Trễ 0,5 giây để server chắc chắn đã qua mốc, tránh tải lại liên tục khi đồng hồ lệch
      if (!fired && current >= end + 500) {
        fired = true;
        done.current();
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [end, offset]);
  return end === null ? null : Math.max(0, end - now);
}
