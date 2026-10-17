'use client';

import { useCallback, useState, type ChangeEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { countImportLines, importReason, type ImportReport } from '@/lib/admin';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';

/** Khớp giới hạn app.student-import.max-bytes của server (256 KB). */
const MAX_FILE_BYTES = 256 * 1024;
const SAMPLE = '# student_id|ddmmyyyy|Họ tên\nB21DCCN001|01012003|Nguyễn Văn A';

type Tab = 'created' | 'duplicates' | 'errors';

/**
 * Trang /admin/import/: dán text hoặc nạp file .txt, xem kết quả theo 3 nhóm.
 * File được đọc ngay trên trình duyệt và đổ vào ô text để admin xem lại trước khi gửi.
 */
export function ImportView() {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [report, setReport] = useState<ImportReport | null>(null);
  const [tab, setTab] = useState<Tab>('created');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  const lines = countImportLines(content);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.txt')) {
      setFlash({ type: 'error', text: 'Chỉ chấp nhận file .txt' });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFlash({ type: 'error', text: 'File quá lớn (tối đa 256 KB).' });
      return;
    }
    setContent(await file.text());
    setFileName(file.name);
  }

  function askImport() {
    if (lines === 0) {
      setFlash({ type: 'error', text: 'Chưa có dòng dữ liệu nào.' });
      return;
    }
    setConfirm({
      title: 'Tạo tài khoản',
      message: `Tạo tài khoản cho ${lines} dòng dữ liệu? Tài khoản đã có sẽ không bị ghi đè.`,
      confirmLabel: 'Import',
      run: async () => {
        try {
          const result = await apiRequest<ImportReport>('/admin/users/import', {
            method: 'POST',
            body: { content },
          });
          setReport(result);
          // Mở nhóm có vấn đề trước nếu có lỗi.
          setTab(
            result.errors.length
              ? 'errors'
              : result.duplicates.length && !result.created.length
                ? 'duplicates'
                : 'created',
          );
          setFlash({ type: 'success', text: `Đã tạo ${result.created.length} tài khoản.` });
        } catch (reason) {
          setFlash({ type: 'error', text: reason instanceof Error ? reason.message : 'Lỗi.' });
        }
      },
    });
  }

  const tabs: { key: Tab; label: string; count: number }[] = report
    ? [
        { key: 'created', label: 'Đã tạo', count: report.created.length },
        { key: 'duplicates', label: 'Trùng', count: report.duplicates.length },
        { key: 'errors', label: 'Lỗi', count: report.errors.length },
      ]
    : [];

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Tạo tài khoản"
        description="Tạo nhiều tài khoản sinh viên một lần. Mật khẩu ban đầu là ngày sinh (ddmmyyyy), người dùng phải đổi ở lần đăng nhập đầu."
      />
      <FlashMessage flash={flash} onDone={clearFlash} />
      <div className="columns even">
        <section className="panel">
          <div className="panel-title">
            <h2>Danh sách</h2>
            <span>{lines} dòng</span>
          </div>
          <p className="admin-hint">
            Mỗi dòng: <code>mã_sinh_viên|ddmmyyyy|Họ tên</code>. Dòng trống và dòng bắt đầu bằng{' '}
            <code>#</code> được bỏ qua.
          </p>
          <textarea
            className="input admin-textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={SAMPLE}
            spellCheck={false}
            rows={14}
            aria-label="Danh sách sinh viên"
          />
          <div className="admin-import-actions">
            <label className="button">
              {fileName || 'Chọn file .txt'}
              <input type="file" accept=".txt,text/plain" hidden onChange={handleFile} />
            </label>
            <button
              className="button"
              onClick={() => {
                setContent('');
                setFileName('');
              }}
            >
              Xóa
            </button>
            <button className="button primary" onClick={askImport}>
              Import
            </button>
          </div>
        </section>
        <section className="panel">
          <div className="panel-title">
            <h2>Kết quả</h2>
            {report && <span>{report.totalLines} dòng đã đọc</span>}
          </div>
          {!report ? (
            <p className="empty-cell">Kết quả import sẽ hiện ở đây.</p>
          ) : (
            <>
              <div className="tabs" role="tablist">
                {tabs.map((item) => (
                  <button
                    key={item.key}
                    role="tab"
                    aria-selected={tab === item.key}
                    className={tab === item.key ? 'selected' : ''}
                    onClick={() => setTab(item.key)}
                  >
                    {item.label}
                    <span className="count">{item.count}</span>
                  </button>
                ))}
              </div>
              <ReportTable report={report} tab={tab} />
            </>
          )}
        </section>
      </div>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}

function ReportTable({ report, tab }: { report: ImportReport; tab: Tab }) {
  const rows =
    tab === 'created'
      ? report.created.map((row) => ({ line: row.line, id: row.username, text: row.fullName }))
      : report[tab].map((row) => ({
          line: row.line,
          id: row.studentId ?? '—',
          text: importReason(row.reason),
        }));
  if (rows.length === 0) return <p className="empty-cell">Không có dòng nào.</p>;
  return (
    <div className="table-responsive admin-report">
      <table className="table admin-table">
        <thead>
          <tr>
            <th>Dòng</th>
            <th>{tab === 'created' ? 'Tài khoản' : 'Mã SV'}</th>
            <th>{tab === 'created' ? 'Họ tên' : 'Lý do'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.line}-${row.id}`}>
              <td className="numeric">{row.line}</td>
              <td className="mono">{row.id}</td>
              <td>{row.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
