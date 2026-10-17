'use client';

import { useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import {
  ASSESSMENT_TYPES,
  PDF,
  localInputToIso,
  type Assessment,
  type AssessmentType,
} from '@/lib/teaching';
import { AssessmentItem } from '@/components/course-items';
import { Icon } from '@/components/icon';
import { errorFlash, type TabProps } from './course-manager';

/** Tab Bài kiểm tra: danh sách bài và form tạo bài mới. */
export function AssessmentsTab(props: TabProps) {
  const { content, base, reload, notify, confirm } = props;

  function remove(assessment: Assessment) {
    confirm({
      title: 'Xóa bài kiểm tra',
      message: `Xóa "${assessment.title}"? File đề (nếu có) vẫn được giữ trong tài liệu.`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/assessments/${encodeURIComponent(assessment.id)}`, {
            method: 'DELETE',
          });
          await reload();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  return (
    <div className="columns">
      <section className="panel">
        {content.assessments.length ? (
          <ul className="assessment-list">
            {content.assessments.map((assessment) => (
              <AssessmentItem
                key={assessment.id}
                assessment={assessment}
                actions={
                  <button
                    className="icon-button row-action danger"
                    title="Xóa bài"
                    aria-label={`Xóa ${assessment.title}`}
                    onClick={() => remove(assessment)}
                  >
                    <Icon name="trash" size={13} />
                  </button>
                }
              />
            ))}
          </ul>
        ) : (
          <p className="empty-cell">Chưa có bài kiểm tra nào.</p>
        )}
      </section>
      <CreateAssessment {...props} />
    </div>
  );
}

const EMPTY = {
  type: 0 as AssessmentType,
  title: '',
  description: '',
  paper: '',
  opens: '',
  closes: '',
};

function CreateAssessment({ content, base, reload, notify }: TabProps) {
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pdfs = content.files.filter((file) => file.contentType === PDF);
  const set = (patch: Partial<typeof EMPTY>) => setForm({ ...form, ...patch });

  async function submit(event: FormEvent) {
    event.preventDefault();
    const opensAt = localInputToIso(form.opens);
    const closesAt = localInputToIso(form.closes);
    if (opensAt && closesAt && closesAt <= opensAt) {
      setError('Giờ đóng phải sau giờ mở.');
      return;
    }
    if (form.type === 2 && !form.paper) {
      setError('Bài thi cần chọn file đề (PDF).');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await apiRequest(`${base}/assessments`, {
        method: 'POST',
        body: {
          type: form.type,
          title: form.title.trim(),
          description: form.description.trim(),
          paperFileId: form.paper || null,
          opensAt,
          closesAt,
        },
      });
      notify({ type: 'success', text: `Đã tạo ${form.title.trim()}.` });
      setForm(EMPTY);
      await reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không tạo được bài.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon red">
            <Icon name="exam" size={12} />
          </i>
          Tạo bài mới
        </h2>
      </div>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          Loại bài
          <select
            className="select"
            value={form.type}
            onChange={(event) => set({ type: Number(event.target.value) as AssessmentType })}
          >
            {Object.entries(ASSESSMENT_TYPES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field">
          Tiêu đề
          <input
            className="input"
            value={form.title}
            onChange={(event) => set({ title: event.target.value })}
            maxLength={200}
            required
          />
        </label>
        <label className="form-field">
          <span>
            Mô tả <span className="optional">(không bắt buộc)</span>
          </span>
          <textarea
            className="input"
            rows={2}
            value={form.description}
            onChange={(event) => set({ description: event.target.value })}
            maxLength={2000}
          />
        </label>
        <label className="form-field">
          File đề (PDF trong tài liệu)
          <select
            className="select"
            value={form.paper}
            onChange={(event) => set({ paper: event.target.value })}
          >
            <option value="">Không có đề</option>
            {pdfs.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name}
                {file.hidden ? ' (đang ẩn)' : ''}
              </option>
            ))}
          </select>
        </label>
        {form.type === 2 && (
          <p className="admin-hint">
            File đề của bài thi được ẩn khỏi danh sách tài liệu; sinh viên chỉ thấy đề khi bài mở.
          </p>
        )}
        <div className="form-row">
          <label className="form-field">
            Mở lúc
            <input
              className="input"
              type="datetime-local"
              value={form.opens}
              onChange={(event) => set({ opens: event.target.value })}
            />
          </label>
          <label className="form-field">
            Đóng lúc
            <input
              className="input"
              type="datetime-local"
              value={form.closes}
              onChange={(event) => set({ closes: event.target.value })}
            />
          </label>
        </div>
        <p className="admin-hint">
          Để trống giờ mở là mở ngay; để trống giờ đóng là không giới hạn.
        </p>
        <button className="button primary full-width" disabled={busy || !form.title.trim()}>
          {busy ? 'Đang tạo…' : 'Tạo bài'}
        </button>
      </form>
    </aside>
  );
}
