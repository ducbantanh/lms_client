'use client';

import { useEffect, useRef, useState, type DragEvent, type ReactNode } from 'react';

function hasFiles(event: { dataTransfer: DataTransfer | null }) {
  return Array.from(event.dataTransfer?.types ?? []).includes('Files');
}

/**
 * Vùng kéo thả file cho <input type="file"> nằm bên trong (hiện hoặc ẩn sau một nút).
 * File thả vào được gán cho input rồi phát sự kiện change, nên onChange, ref và phần kiểm tra
 * định dạng/dung lượng sẵn có chạy y như khi chọn bằng hộp thoại. Input không multiple chỉ nhận file đầu.
 * `hint`: dòng gợi ý hiện cố định bên dưới (dùng với khung viền đứt `drop-box`); `label`: chữ hiện khi đang kéo.
 */
export function DropZone({
  children,
  className = '',
  hint,
  label = 'Thả file vào đây',
}: {
  children: ReactNode;
  className?: string;
  hint?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // dragenter/dragleave bắn cả khi đi qua phần tử con: đếm để không nhấp nháy
  const depth = useRef(0);
  const [over, setOver] = useState(false);

  function target() {
    const input = ref.current?.querySelector<HTMLInputElement>('input[type="file"]');
    return input && !input.disabled ? input : null;
  }

  function onDragEnter(event: DragEvent) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    depth.current += 1;
    if (target()) setOver(true);
  }

  function onDragOver(event: DragEvent) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = target() ? 'copy' : 'none';
  }

  function onDragLeave(event: DragEvent) {
    if (!hasFiles(event)) return;
    depth.current = Math.max(0, depth.current - 1);
    if (!depth.current) setOver(false);
  }

  function onDrop(event: DragEvent) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    depth.current = 0;
    setOver(false);
    const input = target();
    const dropped = Array.from(event.dataTransfer.files);
    if (!input || !dropped.length) return;
    const transfer = new DataTransfer();
    (input.multiple ? dropped : dropped.slice(0, 1)).forEach((file) => transfer.items.add(file));
    input.files = transfer.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  return (
    <div
      ref={ref}
      className={`drop-zone ${className}${over ? ' is-over' : ''}`}
      data-label={label}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
      {hint && <span className="drop-hint">{hint}</span>}
    </div>
  );
}

/**
 * Thả file trượt ra ngoài vùng kéo thả thì trình duyệt mặc định mở file đó, làm mất form đang soạn.
 * Chặn ở cấp cửa sổ (vùng kéo thả đã tự xử lý trước); mount một lần ở root layout.
 */
export function FileDropGuard() {
  useEffect(() => {
    function block(event: globalThis.DragEvent) {
      if (event.defaultPrevented || !hasFiles(event)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'none';
    }
    window.addEventListener('dragover', block);
    window.addEventListener('drop', block);
    return () => {
      window.removeEventListener('dragover', block);
      window.removeEventListener('drop', block);
    };
  }, []);
  return null;
}
