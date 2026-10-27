'use client';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { PDFJS_ASSETS, loadPdfjs } from '@/lib/pdfjs-assets';
import { Icon } from '@/components/ui/icon';

/** Mức phóng so với "vừa chiều ngang khung". */
const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2];
/** Lề hai bên vùng xem, khớp padding (px-4) của khung cuộn các trang. */
const GUTTER = 32;

/**
 * Hiển thị PDF bằng pdf.js: các trang như tờ giấy xếp dọc trên nền xám, có số trang và phóng to/thu nhỏ,
 * thay cho trình xem PDF mặc định của trình duyệt. Cookie phiên được gửi kèm (cùng origin), nên server
 * vẫn kiểm tra quyền xem đề như khi tải file.
 */
export function PdfViewer({ url, title }: { url: string; title: string }) {
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(2);
  const [width, setWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Đổi đề: bỏ trang và lỗi của đề cũ ngay trong lần render này, effect bên dưới tải đề mới
  const [shownUrl, setShownUrl] = useState(url);
  if (shownUrl !== url) {
    setShownUrl(url);
    setDoc(null);
    setError('');
  }

  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | null = null;
    (async () => {
      const pdfjs = await loadPdfjs();
      const task = pdfjs.getDocument({ url, withCredentials: true, ...PDFJS_ASSETS });
      destroy = () => void task.destroy();
      const loaded = await task.promise;
      if (!cancelled) setDoc(loaded);
    })().catch(() => {
      if (!cancelled) setError('Không hiển thị được đề. Hãy mở đề trong tab mới.');
    });
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [url]);

  // Bề ngang vùng xem quyết định cỡ trang; đổi cỡ cửa sổ thì vẽ lại cho nét
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setWidth(Math.max(0, element.clientWidth - GUTTER)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const pages = doc ? Array.from({ length: doc.numPages }, (_, index) => index + 1) : [];
  const percent = Math.round(ZOOMS[zoom] * 100);

  return (
    <div className="border-t border-line">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 text-[13px] text-ink-muted">
        <span>{doc ? `${doc.numPages} trang` : error ? '' : 'Đang tải đề…'}</span>
        <span className="flex items-center gap-1">
          <button
            className="icon-button"
            title="Thu nhỏ"
            aria-label="Thu nhỏ"
            disabled={zoom === 0}
            onClick={() => setZoom(zoom - 1)}
          >
            <Icon name="minus" size={12} />
          </button>
          <button
            className="h-7 min-w-14 rounded-sm font-semibold text-ink tabular-nums hover:bg-surface-muted"
            title="Vừa khung"
            onClick={() => setZoom(2)}
          >
            {percent}%
          </button>
          <button
            className="icon-button"
            title="Phóng to"
            aria-label="Phóng to"
            disabled={zoom === ZOOMS.length - 1}
            onClick={() => setZoom(zoom + 1)}
          >
            <Icon name="plus" size={12} />
          </button>
        </span>
      </div>
      <div
        className="flex h-[min(78vh,960px)] flex-col items-start gap-5 overflow-auto rounded-b-lg bg-[#e9ebef] px-4 py-5"
        ref={scrollRef}
        role="document"
        aria-label={title}
      >
        {error && <p className="empty-cell">{error}</p>}
        {doc &&
          width > 0 &&
          pages.map((number) => (
            <PdfPage
              key={number}
              doc={doc}
              number={number}
              total={pages.length}
              width={width * ZOOMS[zoom]}
            />
          ))}
      </div>
    </div>
  );
}

/** Một trang vẽ lên canvas theo bề ngang `width`, nhân devicePixelRatio để chữ nét trên màn hình mật độ cao. */
function PdfPage({
  doc,
  number,
  total,
  width,
}: {
  doc: PDFDocumentProxy;
  number: number;
  total: number;
  width: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Giữ chỗ đúng tỉ lệ trang trong lúc vẽ để trang không nhảy. */
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let task: RenderTask | null = null;
    (async () => {
      const page = await doc.getPage(number);
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;
      const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      setHeight(viewport.height);
      task = page.render({
        canvas,
        viewport,
        transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
      });
      await task.promise;
    })().catch(() => {
      // Bị hủy khi đổi cỡ/phóng to giữa chừng: lần vẽ mới sẽ thay thế
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, number, width]);

  return (
    <figure className="mx-auto">
      <canvas
        className="block bg-white shadow-[0_1px_3px_rgb(16_24_40/0.12),0_6px_16px_rgb(16_24_40/0.08)]"
        ref={canvasRef}
        style={{ width, height: height ?? width * 1.414 }}
        aria-label={`Trang ${number}`}
      />
      <figcaption className="mt-1.5 text-center text-xs text-ink-subtle">
        Trang {number} / {total}
      </figcaption>
    </figure>
  );
}
