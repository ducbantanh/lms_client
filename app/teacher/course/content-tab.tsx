'use client';

import { useRef, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { groupFiles, uploadProblem, type CourseFile, type Section } from '@/lib/teaching';
import { FileRow } from '@/components/course-items';
import { Icon } from '@/components/icon';
import { errorFlash, type TabProps } from './course-manager';

/** Tab Nội dung: mục/tuần, tài liệu trong từng mục, tải tài liệu lên. */
export function ContentTab(props: TabProps) {
  const { content, base, reload, notify, confirm } = props;
  const format = content.course.format;
  const unit = format === 1 ? 'tuần' : 'mục';

  async function toggleHidden(file: CourseFile) {
    try {
      await apiRequest(`${base}/files/${encodeURIComponent(file.id)}`, {
        method: 'PATCH',
        body: { hidden: !file.hidden },
      });
      await reload();
    } catch (reason) {
      notify(errorFlash(reason));
    }
  }

  function deleteFile(file: CourseFile) {
    confirm({
      title: 'Xóa tài liệu',
      message: `Xóa "${file.name}"? Sinh viên sẽ không tải được file này nữa.`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/files/${encodeURIComponent(file.id)}`, { method: 'DELETE' });
          notify({ type: 'success', text: `Đã xóa ${file.name}.` });
          await reload();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  function deleteSection(section: Section) {
    confirm({
      title: `Xóa ${unit}`,
      message: `Xóa "${section.title}"? Tài liệu trong ${unit} này được giữ lại ở nhóm "Chưa phân mục".`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/sections/${encodeURIComponent(section.id)}`, {
            method: 'DELETE',
          });
          await reload();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  const groups = groupFiles(content);
  const empty = format !== 2 && !content.sections.length && !content.files.length;

  return (
    <div className="columns">
      <div className="stack">
        {empty ? (
          <section className="panel">
            <p className="empty-cell">
              Chưa có {unit} nào. Thêm {unit} đầu tiên rồi tải tài liệu lên.
            </p>
          </section>
        ) : (
          groups.map(({ section, files }) => (
            <section className="panel flush" key={section?.id ?? 'loose'}>
              <div className="panel-title">
                <h2>{section ? section.title : format === 2 ? 'Tài liệu' : 'Chưa phân mục'}</h2>
                {section && (
                  <button
                    className="icon-button row-action danger"
                    title={`Xóa ${unit}`}
                    aria-label={`Xóa ${section.title}`}
                    onClick={() => deleteSection(section)}
                  >
                    <Icon name="trash" size={13} />
                  </button>
                )}
              </div>
              {files.length ? (
                <ul className="file-list">
                  {files.map((file) => (
                    <FileRow
                      key={file.id}
                      file={file}
                      actions={
                        <>
                          <button
                            className="icon-button row-action"
                            title={file.hidden ? 'Hiện với sinh viên' : 'Ẩn với sinh viên'}
                            aria-label={`${file.hidden ? 'Hiện' : 'Ẩn'} ${file.name}`}
                            onClick={() => toggleHidden(file)}
                          >
                            <Icon name={file.hidden ? 'eye' : 'hidden'} size={14} />
                          </button>
                          <button
                            className="icon-button row-action danger"
                            title="Xóa tài liệu"
                            aria-label={`Xóa ${file.name}`}
                            onClick={() => deleteFile(file)}
                          >
                            <Icon name="trash" size={13} />
                          </button>
                        </>
                      }
                    />
                  ))}
                </ul>
              ) : (
                <p className="empty-cell">Chưa có tài liệu.</p>
              )}
            </section>
          ))
        )}
        {format !== 2 && <AddSection {...props} unit={unit} />}
      </div>
      <UploadPanel {...props} />
    </div>
  );
}

/** Khóa học theo tuần được gợi ý sẵn tên "Tuần N". */
function AddSection({ content, base, reload, notify, unit }: TabProps & { unit: string }) {
  const suggestion = content.course.format === 1 ? `Tuần ${content.sections.length + 1}` : '';
  const [title, setTitle] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const value = title ?? suggestion;

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    setBusy(true);
    try {
      await apiRequest(`${base}/sections`, { method: 'POST', body: { title: value.trim() } });
      setTitle(null);
      await reload();
    } catch (reason) {
      notify(errorFlash(reason));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="inline-form" onSubmit={submit}>
      <input
        className="input"
        value={value}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={`Tên ${unit} mới`}
        aria-label={`Tên ${unit} mới`}
        maxLength={200}
      />
      <button className="button" disabled={busy || !value.trim()}>
        <Icon name="plus" size={12} />
        Thêm {unit}
      </button>
    </form>
  );
}

function UploadPanel({ content, base, reload, notify }: TabProps) {
  const format = content.course.format;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  /** null: chưa chọn, mặc định là mục cuối cùng (thường là tuần đang dạy). */
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const target = sectionId ?? content.sections.at(-1)?.id ?? '';

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!file) return;
    const problem = uploadProblem(file);
    if (problem) {
      setError(problem);
      return;
    }
    const form = new FormData();
    form.append('file', file);
    if (format !== 2 && target) form.append('sectionId', target);
    form.append('hidden', String(hidden));
    setBusy(true);
    setError('');
    try {
      await apiRequest(`${base}/files`, { method: 'POST', body: form });
      notify({ type: 'success', text: `Đã tải lên ${file.name}.` });
      setFile(null);
      setHidden(false);
      if (inputRef.current) inputRef.current.value = '';
      await reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tải lên được.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="upload" size={12} />
          </i>
          Tải tài liệu lên
        </h2>
      </div>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          File (PDF, DOCX, PPTX · tối đa 20 MB)
          <input
            ref={inputRef}
            className="input file-input"
            type="file"
            accept=".pdf,.docx,.pptx"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setError('');
            }}
          />
        </label>
        {format !== 2 && (
          <label className="form-field">
            {format === 1 ? 'Tuần' : 'Mục'}
            <select
              className="select"
              value={target}
              onChange={(event) => setSectionId(event.target.value)}
            >
              {content.sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
              <option value="">Chưa phân mục</option>
            </select>
          </label>
        )}
        <label className="check-field">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(event) => setHidden(event.target.checked)}
          />
          Ẩn với sinh viên (ví dụ đề thi chưa công bố)
        </label>
        <button className="button primary full-width" disabled={busy || !file}>
          {busy ? 'Đang tải lên…' : 'Tải lên'}
        </button>
      </form>
    </aside>
  );
}
