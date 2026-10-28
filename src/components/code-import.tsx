'use client';

import { useRef, useState, type DragEvent } from 'react';
import {
  buildImport,
  decodeText,
  planImport,
  sampleImportZip,
  type ImportResult,
  type ImportSource,
} from '@/lib/code-import';
import { docxToText, pdfToText } from '@/lib/document-text';
import { readZip } from '@/lib/zip';
import { Icon } from '@/components/ui/icon';

function fileSource(file: File, path: string): ImportSource {
  return { path, size: file.size, read: async () => new Uint8Array(await file.arrayBuffer()) };
}

/** File ZIP (kể cả ZIP nằm trong thư mục) được mở ra như một thư mục cùng tên. */
async function expand(file: File, path: string): Promise<ImportSource[]> {
  if (!/\.zip$/i.test(path)) return [fileSource(file, path)];
  const folder = path.replace(/\.zip$/i, '');
  return readZip(await file.arrayBuffer()).map((entry) => ({
    ...entry,
    path: `${folder}/${entry.path}`,
  }));
}

/** Thư mục kéo thả: đi hết cây thư mục (readEntries trả từng đợt tới khi rỗng). */
async function walk(entry: FileSystemEntry): Promise<ImportSource[]> {
  if (entry.isFile) {
    const file = await new Promise<File>((resolve, reject) =>
      (entry as FileSystemFileEntry).file(resolve, reject),
    );
    return expand(file, entry.fullPath.replace(/^\/+/, ''));
  }
  const reader = (entry as FileSystemDirectoryEntry).createReader();
  const children: FileSystemEntry[] = [];
  for (;;) {
    const batch = await new Promise<FileSystemEntry[]>((resolve, reject) =>
      reader.readEntries(resolve, reject),
    );
    if (!batch.length) break;
    children.push(...batch);
  }
  return (await Promise.all(children.map(walk))).flat();
}

/** Đề .docx, .pdf đọc bằng lib/document-text; .md, .txt đọc theo mã UTF-8 / Windows-1258. */
async function readStatement(file: ImportSource, bytes: Uint8Array) {
  const buffer = bytes.slice().buffer;
  if (/\.docx$/i.test(file.path)) return (await docxToText(buffer)).text;
  if (/\.pdf$/i.test(file.path)) return (await pdfToText(buffer)).text;
  return decodeText(bytes, true);
}

const READ_ERRORS: Record<string, string> = {
  NOT_ZIP: 'File không phải ZIP hoặc bị hỏng.',
  UNSUPPORTED_ZIP: 'File ZIP dùng kiểu nén hoặc mã hóa chưa hỗ trợ; hãy nén lại bằng ZIP thường.',
};

/**
 * Khung "Nhập nhanh" của bài lập trình: kéo thả hoặc chọn thư mục / file ZIP, đọc ngay trên trình duyệt
 * (lib/code-import) rồi giao kết quả cho form; chưa có gì được lưu cho tới khi bấm tạo/lưu bài.
 */
export function CodeImportBox({
  onImport,
  many,
  disabled,
  next = 'Kiểm tra lại từng câu rồi bấm tạo bài.',
}: {
  onImport: (result: ImportResult) => void;
  /** Câu hướng dẫn sau khi đọc xong (trang kho: bấm lưu vào kho). */
  next?: string;
  /** Trang Tạo bài thi: thư mục có nhiều thư mục bài thì tạo nhiều bài cùng lúc. */
  many?: boolean;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState<{ summary: string; warnings: string[] } | null>(null);
  const folderInput = useRef<HTMLInputElement>(null);
  const zipInput = useRef<HTMLInputElement>(null);

  async function run(load: () => Promise<ImportSource[]>) {
    if (disabled || busy) return;
    setBusy(true);
    setError('');
    setReport(null);
    try {
      const plan = planImport(await load());
      const problems = plan.assessments.reduce((sum, item) => sum + item.problems.length, 0);
      if (!problems) {
        setError(
          'Không tìm thấy cặp file test nào (vd. 1.in/1.out, input1.txt/output1.txt, Test01/BAI.INP). Tải file mẫu để xem cách sắp xếp.',
        );
        return;
      }
      const result = await buildImport(plan, readStatement);
      const count = result.assessments.length;
      setReport({
        summary: `Đã đọc ${count > 1 ? `${count} bài, ` : ''}${problems} câu, ${result.tests} test. ${next}`,
        warnings: result.warnings,
      });
      onImport(result);
    } catch (reason) {
      const code = reason instanceof Error ? reason.message : '';
      if (!READ_ERRORS[code]) console.error('[code-import]', reason);
      setError(READ_ERRORS[code] ?? 'Không đọc được thư mục hoặc file đã chọn.');
    } finally {
      setBusy(false);
    }
  }

  /** Đọc xong mới xóa ô chọn file: xóa sớm thì trình duyệt thu hồi quyền đọc các file đã chọn. */
  function pick(input: HTMLInputElement) {
    const files = Array.from(input.files ?? []);
    void run(async () =>
      (
        await Promise.all(files.map((file) => expand(file, file.webkitRelativePath || file.name)))
      ).flat(),
    ).finally(() => {
      input.value = '';
    });
  }

  function onDrop(event: DragEvent) {
    if (!Array.from(event.dataTransfer.types).includes('Files')) return;
    event.preventDefault();
    setOver(false);
    // Lấy entry ngay trong sự kiện: dataTransfer bị xóa sau khi hàm xử lý kết thúc
    const entries = Array.from(event.dataTransfer.items)
      .map((item) => item.webkitGetAsEntry())
      .filter((entry): entry is FileSystemEntry => !!entry);
    void run(async () => (await Promise.all(entries.map(walk))).flat());
  }

  async function downloadSample() {
    const url = URL.createObjectURL(await sampleImportZip());
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bai-lap-trinh-mau.zip';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div
      className={`drop-zone code-import${over ? ' is-over' : ''}`}
      data-label="Thả thư mục hoặc file ZIP để nhập"
      onDragOver={(event) => {
        if (disabled || !Array.from(event.dataTransfer.types).includes('Files')) return;
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOver(false);
      }}
      onDrop={disabled ? undefined : onDrop}
    >
      <div className="code-import-head">
        <i className="title-icon green">
          <Icon name="upload" size={12} />
        </i>
        <div>
          <b>Nhập nhanh nhiều câu từ thư mục hoặc file ZIP</b>
          <p className="admin-hint">
            Kéo thả vào đây. Mỗi thư mục con là một câu: file đề (.docx, .pdf, .md, .txt) và các cặp
            file test (1.in/1.out, input1.txt/output1.txt, Test01/BAI.INP…); test tên sample/vd/mau
            hoặc test đầu tiên là test mẫu.
            {many && ' Thư mục chứa nhiều thư mục bài thì tạo được nhiều bài cùng lúc.'}
          </p>
        </div>
      </div>
      <div className="button-row">
        <button
          type="button"
          className="button small"
          disabled={disabled || busy}
          onClick={() => folderInput.current?.click()}
        >
          <Icon name="layers" size={11} />
          Chọn thư mục
        </button>
        <button
          type="button"
          className="button small"
          disabled={disabled || busy}
          onClick={() => zipInput.current?.click()}
        >
          <Icon name="fileZip" size={11} />
          Chọn file ZIP
        </button>
        <button type="button" className="link-button" onClick={() => void downloadSample()}>
          <Icon name="download" size={11} /> Tải file mẫu
        </button>
        <input
          ref={(element) => {
            folderInput.current = element;
            // Thuộc tính chưa có trong kiểu React: chọn cả thư mục thay vì từng file
            element?.setAttribute('webkitdirectory', '');
          }}
          type="file"
          hidden
          multiple
          onChange={(event) => pick(event.target)}
        />
        <input
          ref={zipInput}
          type="file"
          accept=".zip,application/zip"
          hidden
          multiple
          onChange={(event) => pick(event.target)}
        />
      </div>
      {busy && (
        <p className="admin-hint" role="status">
          Đang đọc thư mục, đề và bộ test…
        </p>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {report && (
        <div className="code-import-report" role="status">
          <p>{report.summary}</p>
          {report.warnings.length > 0 && (
            <ul>
              {report.warnings.slice(0, 20).map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
              {report.warnings.length > 20 && (
                <li>… và {report.warnings.length - 20} lưu ý khác</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
