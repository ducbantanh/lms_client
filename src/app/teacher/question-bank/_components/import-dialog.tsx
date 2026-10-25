'use client';

import { useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { docxToText, pdfToText, type ExtractedText } from '@/lib/document-text';
import {
  IMPORT_SAMPLE,
  MAX_IMPORT,
  importIssueText,
  type ImportIssue,
  type ImportReport,
} from '@/lib/question-bank';
import { MAX_UPLOAD_BYTES } from '@/lib/teaching';
import { FlashMessage, type Flash } from '@/components/admin-ui';
import { DropZone } from '@/components/ui/drop-zone';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';

/** Khớp ImportRequest của server (500 000 ký tự). */
const MAX_CHARS = 500_000;

/** Chuyển file thành chữ theo đuôi file; Word, PDF đọc ngay trên trình duyệt (lib/document-text). */
const READERS: Record<string, (file: File) => Promise<ExtractedText>> = {
  txt: async (file) => ({ text: await file.text(), skipped: 0, marked: 0 }),
  docx: async (file) => docxToText(await file.arrayBuffer()),
  pdf: async (file) => pdfToText(await file.arrayBuffer()),
};

/**
 * Dán câu hỏi, hoặc mở file .txt / Word (.docx) / PDF (định dạng của QuestionImportParser).
 * File Word/PDF được chuyển thành chữ vào ô để xem lại trước khi nhập. Server không thêm câu nào
 * nếu có câu lỗi: sửa ngay trong ô theo số dòng được báo rồi bấm Nhập lại, không bị trùng câu.
 */
export function ImportDialog({
  base,
  onClose,
  onImported,
}: {
  base: string;
  onClose: () => void;
  onImported: (added: number) => Promise<void>;
}) {
  const [content, setContent] = useState('');
  const [issues, setIssues] = useState<ImportIssue[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState<Flash | null>(null);

  async function pickFile(file: File | undefined) {
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    const read = READERS[extension];
    setIssues([]);
    setNotice(null);
    if (!read) {
      setError(
        extension === 'doc'
          ? 'File Word cũ (.doc) chưa đọc được: mở bằng Word rồi lưu lại dạng .docx.'
          : 'Chỉ mở được file .txt, Word (.docx) hoặc PDF.',
      );
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError('File quá lớn (tối đa 20 MB). Chia nhỏ rồi nhập từng phần.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { text, skipped, marked } = await read(file);
      if (!text.trim()) {
        setError(
          extension === 'pdf'
            ? 'Không đọc được chữ trong file PDF (có thể là ảnh scan).'
            : 'File không có nội dung chữ.',
        );
      } else if (text.length > MAX_CHARS) {
        setError('Nội dung quá dài. Chia file nhỏ hơn rồi nhập từng phần.');
      } else {
        setContent(text);
        if (extension !== 'txt')
          setNotice({
            type: skipped ? 'error' : 'success',
            text: [
              `Đã chuyển ${file.name} thành chữ (${text.split('\n').length} dòng).`,
              marked
                ? `Nhận ${marked} đáp án đúng theo in đậm/gạch chân/chữ màu (đánh dấu * trong ô).`
                : '',
              skipped ? `Có ${skipped} hình ảnh/công thức không chuyển được thành chữ.` : '',
              'Kiểm tra lại, nhất là đáp án đúng, rồi bấm Nhập.',
            ]
              .filter(Boolean)
              .join(' '),
          });
      }
    } catch {
      setError(`Không đọc được file ${file.name}. File có thể bị hỏng hoặc đặt mật khẩu.`);
    } finally {
      setBusy(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setIssues([]);
    try {
      const report = await apiRequest<ImportReport>(`${base}/import`, {
        method: 'POST',
        body: { content },
      });
      if (report.errors.length) setIssues(report.errors);
      else if (!report.added) setError('Không tìm thấy câu hỏi nào trong văn bản.');
      else {
        await onImported(report.added);
        return;
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không nhập được câu hỏi.');
    }
    setBusy(false);
  }

  return (
    <Modal title="Nhập câu hỏi từ văn bản" wide onClose={() => !busy && onClose()}>
      <DropZone label="Thả file để mở">
        <form onSubmit={submit}>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <FlashMessage flash={notice} onDone={() => setNotice(null)} />
          <p className="admin-hint">
            Dán câu hỏi, hoặc mở (kéo thả) file .txt, Word (.docx), PDF: nội dung được chuyển thành
            chữ vào ô bên dưới để bạn xem lại trước khi nhập. Các câu cách nhau một dòng trống (hoặc
            bắt đầu bằng <code>Câu 1:</code>, <code>Câu 2:</code>…). Đáp án bắt đầu bằng{' '}
            <code>A.</code> <code>B.</code> <code>C.</code>… Đáp án đúng ghi ở dòng{' '}
            <code>ĐÁP ÁN: A</code> (nhiều đáp án đúng: <code>ĐÁP ÁN: A, C</code>) hoặc thêm dấu{' '}
            <code>*</code> trước đáp án đúng. Có thể thêm dòng <code>MỨC ĐỘ: dễ</code> /{' '}
            <code>trung bình</code> / <code>khó</code> và <code>GIẢI THÍCH: …</code>. Tối đa{' '}
            {MAX_IMPORT} câu mỗi lần. Với file Word, đáp án in đậm, gạch chân, chữ màu hoặc tô nền
            được tự đánh dấu <code>*</code> (khi trong câu chỉ một phần đáp án được đánh dấu); file
            PDF cần dòng <code>ĐÁP ÁN</code> hoặc dấu <code>*</code>. Hình ảnh và công thức không
            chuyển được thành chữ.
          </p>
          <details className="import-sample">
            <summary>Xem mẫu</summary>
            <pre>{IMPORT_SAMPLE}</pre>
            <button
              type="button"
              className="button small"
              onClick={() => setContent(IMPORT_SAMPLE)}
            >
              Dán mẫu vào ô bên dưới
            </button>
          </details>
          <textarea
            className="input admin-textarea import-textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={MAX_CHARS}
            placeholder="Dán câu hỏi vào đây…"
            aria-label="Nội dung câu hỏi cần nhập"
            spellCheck={false}
            autoFocus
          />
          {issues.length > 0 && (
            <div className="import-issues" role="alert">
              <p>
                <b>{issues.length} câu bị lỗi, chưa thêm câu nào.</b> Sửa trong ô trên rồi bấm Nhập
                lại.
              </p>
              <ul>
                {issues.map((issue) => (
                  <li key={`${issue.line}-${issue.reason}`}>{importIssueText(issue)}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="dialog-actions import-actions">
            <label className="button">
              <Icon name="file" size={13} />
              {busy ? 'Đang đọc…' : 'Mở file (.txt, .docx, .pdf)'}
              <input
                type="file"
                accept=".txt,.docx,.pdf,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                disabled={busy}
                hidden
                onChange={(event) => {
                  void pickFile(event.target.files?.[0]);
                  event.target.value = '';
                }}
              />
            </label>
            <button type="button" className="button" disabled={busy} onClick={onClose}>
              Hủy
            </button>
            <button className="button primary" disabled={busy || !content.trim()}>
              {busy ? 'Đang nhập…' : 'Nhập'}
            </button>
          </div>
        </form>
      </DropZone>
    </Modal>
  );
}
