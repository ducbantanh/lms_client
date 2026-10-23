'use client';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { Icon } from '@/components/ui/icon';

/** Worker và dữ liệu chép từ node_modules khi npm install (scripts/copy-pdf-worker.mjs), cùng origin, không CDN. */
const VENDOR = '/vendor/pdfjs/';
/** Mức phóng so với "vừa chiều ngang khung". */
const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2];
/** Lề hai bên vùng xem, khớp padding của .pdf-pages. */
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
      // Nạp pdf.js lúc chạy trên trình duyệt: thư viện cần DOM, không chạy được lúc export tĩnh
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = `${VENDOR}pdf.worker.min.js`;
      const task = pdfjs.getDocument({
        url,
        withCredentials: true,
        cMapUrl: `${VENDOR}cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `${VENDOR}standard_fonts/`,
        wasmUrl: `${VENDOR}wasm/`,
        iccUrl: `${VENDOR}iccs/`,
      });
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
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <span>{doc ? `${doc.numPages} trang` : error ? '' : 'Đang tải đề…'}</span>
        <span className="pdf-zoom">
          <button
            className="icon-button"
            title="Thu nhỏ"
            aria-label="Thu nhỏ"
            disabled={zoom === 0}
            onClick={() => setZoom(zoom - 1)}
          >
            <Icon name="minus" size={12} />
          </button>
          <button className="pdf-zoom-value" title="Vừa khung" onClick={() => setZoom(2)}>
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
      <div className="pdf-pages" ref={scrollRef} role="document" aria-label={title}>
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
    <figure className="pdf-page">
      <canvas
        ref={canvasRef}
        style={{ width, height: height ?? width * 1.414 }}
        aria-label={`Trang ${number}`}
      />
      <figcaption>
        Trang {number} / {total}
      </figcaption>
    </figure>
  );
}
