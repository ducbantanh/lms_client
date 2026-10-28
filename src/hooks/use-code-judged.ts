'use client';

import { useEffect, useRef } from 'react';
import type { CodeJudgedEvent } from '@/lib/code';
import { useSession } from '@/providers/session-provider';

/**
 * Gọi onJudged khi một lần chạy/nộp của bài assessmentId vừa chấm xong (sự kiện WebSocket code.judged).
 * onJudged có thể đổi mỗi lần render; hook giữ bản mới nhất mà không đăng ký lại listener.
 */
export function useCodeJudged(assessmentId: string, onJudged: (event: CodeJudgedEvent) => void) {
  const { subscribe } = useSession();
  const handler = useRef(onJudged);
  useEffect(() => {
    handler.current = onJudged;
  });
  useEffect(
    () =>
      subscribe('code.judged', (data) => {
        const event = data as CodeJudgedEvent;
        if (event.assessmentId === assessmentId) handler.current(event);
      }),
    [subscribe, assessmentId],
  );
}
