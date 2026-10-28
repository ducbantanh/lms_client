'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import {
  EVENT_BATCH,
  HEARTBEAT_MS,
  MAX_QUEUE,
  blockedShortcut,
  type ClientEvent,
  type ClientEventType,
  type StudentProctor,
} from '@/lib/proctor';

/** Vùng được chép / dán bên trong bài (ô soạn code): đánh dấu bằng thuộc tính này. */
export const ALLOW_COPY_ATTR = 'data-exam-allow-copy';
/** Số đoạn đã chép trong bài được nhớ để cho dán lại. */
const INTERNAL_CLIPS = 20;

interface ScreenWithExtended extends Screen {
  isExtended?: boolean;
}

function extendedScreen(): boolean {
  return (window.screen as ScreenWithExtended).isExtended === true;
}

function insideAllowed(target: EventTarget | null): boolean {
  return target instanceof Element && !!target.closest(`[${ALLOW_COPY_ATTR}]`);
}

/**
 * Theo dõi trang làm bài trong giờ thi có giám sát và báo server (POST .../proctor/events):
 * - rời trang (chuyển tab, chuyển cửa sổ / ứng dụng) kèm thời gian rời; hộp chọn file khi tải bài làm thì ghi riêng;
 * - thoát toàn màn hình (nếu bài bắt buộc), trừ khi do rời trang (đã tính ở lần rời trang);
 * - chặn chép đề ra ngoài, dán nội dung không chép từ trong bài, kéo thả chữ, chuột phải, phím tắt in / lưu / xem mã;
 * - máy nối thêm màn hình (Chrome báo qua screen.isExtended), tải lại trang.
 * Nhịp 15 giây một lần gửi trạng thái rời trang / toàn màn hình; sự kiện gửi ngay, mất mạng thì giữ lại gửi sau.
 * onState nhận trạng thái mới (số vi phạm, bị khóa); onError nhận lỗi PROCTOR_* (máy khác, kết thúc...).
 */
export function useExamGuard({
  assessmentId,
  enabled,
  fullscreenRequired,
  offset,
  onState,
  onError,
}: {
  assessmentId: string;
  enabled: boolean;
  fullscreenRequired: boolean;
  /** Giờ server − giờ máy. */
  offset: number;
  onState: (state: StudentProctor) => void;
  onError: (error: ApiError) => void;
}) {
  const [fullscreen, setFullscreen] = useState(
    () => typeof document !== 'undefined' && !!document.fullscreenElement,
  );
  const queue = useRef<ClientEvent[]>([]);
  const sending = useRef(false);
  const awaySince = useRef<number | null>(null);
  const awayKind = useRef<string>('tab');
  const pickerOpen = useRef(false);
  const lastAwayAt = useRef(0);
  const clips = useRef<string[]>([]);
  const handlers = useRef({ onState, onError, offset });
  useEffect(() => {
    handlers.current = { onState, onError, offset };
  });

  /** Có lần gửi bị gọi trong lúc đang gửi (sự kiện mới, trạng thái rời trang đổi): gửi thêm một lượt. */
  const dirty = useRef(false);

  const flush = useCallback(async () => {
    if (sending.current) {
      dirty.current = true;
      return;
    }
    sending.current = true;
    try {
      do {
        dirty.current = false;
        const batch = queue.current.slice(0, EVENT_BATCH);
        try {
          const state = await apiRequest<StudentProctor>(
            `/student/assessments/${encodeURIComponent(assessmentId)}/proctor/events`,
            {
              method: 'POST',
              body: {
                away: awaySince.current !== null,
                fullscreen: !!document.fullscreenElement,
                events: batch,
              },
            },
          );
          queue.current = queue.current.slice(batch.length);
          handlers.current.onState(state);
        } catch (reason) {
          // Mất mạng: giữ sự kiện, nhịp sau gửi lại; lỗi nghiệp vụ (máy khác, đã kết thúc) báo trang làm bài
          if (reason instanceof ApiError && reason.code !== 'NETWORK_ERROR') {
            queue.current = queue.current.slice(batch.length);
            handlers.current.onError(reason);
          }
          return;
        }
      } while (dirty.current || queue.current.length);
    } finally {
      sending.current = false;
    }
  }, [assessmentId]);

  const report = useCallback(
    (type: ClientEventType, durationMs?: number, detail?: string) => {
      const at = new Date(Date.now() + handlers.current.offset).toISOString();
      queue.current = [...queue.current, { type, at, durationMs, detail }].slice(-MAX_QUEUE);
      void flush();
    },
    [flush],
  );

  useEffect(() => {
    if (!enabled) return;
    const id = encodeURIComponent(assessmentId);
    // Tải lại trang: trình duyệt báo lần tải là reload và tab này đã mở bài thi trước đó (sessionStorage còn dấu)
    try {
      const key = `lms.exam.${id}`;
      const navigation = performance.getEntriesByType('navigation')[0] as
        PerformanceNavigationTiming | undefined;
      if (navigation?.type === 'reload' && sessionStorage.getItem(key)) report('reloaded');
      sessionStorage.setItem(key, '1');
    } catch {
      /* Trình duyệt chặn storage: bỏ qua */
    }

    function isAway() {
      return document.visibilityState === 'hidden' || !document.hasFocus();
    }
    function checkAway() {
      const away = isAway();
      if (away && awaySince.current === null) {
        awaySince.current = Date.now();
        awayKind.current = pickerOpen.current
          ? 'file_picker'
          : document.visibilityState === 'hidden'
            ? 'tab'
            : 'window';
        void flush();
      } else if (!away && awaySince.current !== null) {
        const duration = Date.now() - awaySince.current;
        awaySince.current = null;
        lastAwayAt.current = Date.now();
        pickerOpen.current = false;
        report('left_page', duration, awayKind.current);
      }
    }
    // Focus chuyển vào iframe / hộp thoại trong trang cũng phát blur: kiểm tra lại sau một nhịp
    const onBlur = () => setTimeout(checkAway, 0);
    const poll = setInterval(checkAway, 1000);
    const heartbeat = setInterval(() => void flush(), HEARTBEAT_MS);
    document.addEventListener('visibilitychange', checkAway);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', checkAway);

    function onFullscreenChange() {
      const on = !!document.fullscreenElement;
      setFullscreen(on);
      if (on || !fullscreenRequired) {
        void flush();
        return;
      }
      // Chuyển tab cũng thoát toàn màn hình: lần đó đã tính là rời trang
      setTimeout(() => {
        const byLeaving = awaySince.current !== null || Date.now() - lastAwayAt.current < 1500;
        if (!byLeaving && !document.fullscreenElement) report('fullscreen_exit');
        else void flush();
      }, 1000);
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);

    // Hộp chọn file của hệ điều hành làm trang mất focus: không tính là rời trang
    function onClick(event: MouseEvent) {
      if (event.target instanceof HTMLInputElement && event.target.type === 'file')
        pickerOpen.current = true;
    }
    function onCopy(event: ClipboardEvent) {
      if (insideAllowed(event.target)) return;
      event.preventDefault();
      report('copy_blocked');
    }
    // Pha nổi bọt: ô soạn code đã đặt nội dung vào clipboardData, nhớ lại để cho dán trong bài
    function rememberCopy(event: ClipboardEvent) {
      if (!insideAllowed(event.target)) return;
      const text =
        event.clipboardData?.getData('text/plain') || String(window.getSelection() ?? '');
      if (text)
        clips.current = [...clips.current.filter((clip) => clip !== text), text].slice(
          -INTERNAL_CLIPS,
        );
    }
    function onPaste(event: ClipboardEvent) {
      const text = event.clipboardData?.getData('text/plain') ?? '';
      if (!text.trim() || clips.current.includes(text)) return;
      event.preventDefault();
      event.stopPropagation();
      report('paste_blocked', undefined, String(text.length));
    }
    function onDrop(event: DragEvent) {
      // Kéo thả file bài làm vào ô tải lên thì được; kéo chữ từ ngoài vào là dán
      if (event.dataTransfer?.types.includes('Files')) return;
      const text = event.dataTransfer?.getData('text/plain') ?? '';
      if (!text.trim() || clips.current.includes(text)) return;
      event.preventDefault();
      event.stopPropagation();
      report('paste_blocked', undefined, 'kéo thả');
    }
    function onContextMenu(event: MouseEvent) {
      if (!insideAllowed(event.target)) event.preventDefault();
    }
    function onKeyDown(event: KeyboardEvent) {
      const name = blockedShortcut(event);
      if (!name) return;
      event.preventDefault();
      event.stopPropagation();
      report('shortcut_blocked', undefined, name);
    }
    function onBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }
    document.addEventListener('click', onClick, true);
    document.addEventListener('copy', onCopy, true);
    document.addEventListener('cut', onCopy, true);
    document.addEventListener('copy', rememberCopy);
    document.addEventListener('cut', rememberCopy);
    document.addEventListener('paste', onPaste, true);
    document.addEventListener('drop', onDrop, true);
    document.addEventListener('contextmenu', onContextMenu, true);
    document.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('beforeunload', onBeforeUnload);

    // Màn hình phụ: báo khi vào thi và mỗi lần cắm thêm
    let extended = extendedScreen();
    if (extended) report('multi_screen');
    function onScreenChange() {
      const next = extendedScreen();
      if (next && !extended) report('multi_screen');
      extended = next;
    }
    const screen = window.screen as ScreenWithExtended & EventTarget;
    screen.addEventListener?.('change', onScreenChange);

    checkAway();
    void flush();
    return () => {
      clearInterval(poll);
      clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', checkAway);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', checkAway);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('copy', onCopy, true);
      document.removeEventListener('cut', onCopy, true);
      document.removeEventListener('copy', rememberCopy);
      document.removeEventListener('cut', rememberCopy);
      document.removeEventListener('paste', onPaste, true);
      document.removeEventListener('drop', onDrop, true);
      document.removeEventListener('contextmenu', onContextMenu, true);
      document.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('beforeunload', onBeforeUnload);
      screen.removeEventListener?.('change', onScreenChange);
    };
  }, [enabled, assessmentId, fullscreenRequired, flush, report]);

  /** Bật toàn màn hình; phải gọi trong thao tác của người dùng (bấm nút). */
  const enterFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    } catch {
      /* Trình duyệt từ chối (không phải thao tác người dùng): người dùng bấm lại */
    }
    setFullscreen(!!document.fullscreenElement);
  }, []);

  return { fullscreen, enterFullscreen };
}

/** Thoát toàn màn hình khi rời chế độ thi (nộp bài, hết giờ). */
export function exitFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
}
