'use client';

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import {
  ASSESSMENT_GROUPS,
  canDeleteAssessment,
  canEditAssessment,
  isoToLocalInput,
  localInputToIso,
  uploadProblem,
  type Assessment,
  type AssessmentType,
} from '@/lib/teaching';
import { AssessmentItem } from '@/components/course-items';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { errorFlash, type TabProps } from './course-manager';

type AssessmentTabProps = TabProps & { type: AssessmentType };

/** Tab Bài tập / Bài thực hành / Bài kiểm tra: danh sách bài đúng loại và form tạo bài loại đó. */
export function AssessmentsTab(props: AssessmentTabProps) {
  const { content, base, reload, notify, confirm, type, canTeach } = props;
  const { noun } = ASSESSMENT_GROUPS[type];
  const items = content.assessments.filter((assessment) => assessment.type === type);
  const [editing, setEditing] = useState<Assessment | null>(null);

  function remove(assessment: Assessment) {
    confirm({
      title: `Xóa ${noun}`,
      // Đề không có trong danh sách tài liệu là đề tải lên riêng cho bài: server xóa theo bài
      message: !assessment.paperFileId
        ? `Xóa "${assessment.title}"?`
        : content.files.some((file) => file.id === assessment.paperFileId)
          ? `Xóa "${assessment.title}"? File đề vẫn được giữ trong tài liệu.`
          : `Xóa "${assessment.title}"? File đề tải lên cho bài này cũng bị xóa.`,
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

  // Admin chỉ xem: không có form tạo bài, không sửa/xóa, vẫn xem được bài nộp và điểm
  return (
    <div className={canTeach ? 'columns' : undefined}>
      <section className="panel">
        {items.length ? (
          <ul className="assessment-list">
            {items.map((assessment) => (
              <AssessmentItem
                key={assessment.id}
                assessment={assessment}
                actions={
                  <span className="file-actions">
                    <Link
                      href={`${TEACHER_PATH}/course/submissions/?course=${encodeURIComponent(content.course.id)}&id=${encodeURIComponent(assessment.id)}`}
                      className="button small"
                    >
                      <Icon name="check" size={11} />
                      {canTeach ? 'Bài nộp & chấm điểm' : 'Xem bài nộp'}
                    </Link>
                    {canTeach && canEditAssessment(assessment) && (
                      <button
                        className="icon-button row-action"
                        title={`Sửa ${noun}`}
                        aria-label={`Sửa ${assessment.title}`}
                        onClick={() => setEditing(assessment)}
                      >
                        <Icon name="edit" size={13} />
                      </button>
                    )}
                    {!canTeach ? null : canDeleteAssessment(assessment) ? (
                      <button
                        className="icon-button row-action danger"
                        title={`Xóa ${noun}`}
                        aria-label={`Xóa ${assessment.title}`}
                        onClick={() => remove(assessment)}
                      >
                        <Icon name="trash" size={13} />
                      </button>
                    ) : (
                      <button
                        className="icon-button row-action"
                        title="Bài kiểm tra đã kết thúc, không thể sửa hoặc xóa"
                        aria-label={`${assessment.title} đã kết thúc, không thể sửa hoặc xóa`}
                        disabled
                      >
                        <Icon name="lock" size={13} />
                      </button>
                    )}
                  </span>
                }
              />
            ))}
          </ul>
        ) : (
          <p className="empty-cell">Chưa có {noun} nào.</p>
        )}
      </section>
      {/* Bài thực hành, bài kiểm tra tạo ở trang Tạo bài thi (trắc nghiệm hoặc tải đề lên); bài tập tạo ngay tại đây */}
      {canTeach &&
        (type === 0 ? (
          <CreateAssessment {...props} />
        ) : (
          <aside className="panel">
            <div className="panel-title">
              <h2>
                <i className="title-icon red">
                  <Icon name="exam" size={12} />
                </i>
                Tạo {noun}
              </h2>
            </div>
            <p className="admin-hint">
              Tạo ở trang Tạo bài thi: trắc nghiệm lấy câu hỏi từ ngân hàng, hoặc tải đề PDF lên để
              sinh viên nộp file.
            </p>
            <Link
              className="button primary full-width"
              href={`${TEACHER_PATH}/create-exam/?course=${encodeURIComponent(content.course.id)}&type=${type}`}
            >
              <Icon name="plus" size={12} />
              Tạo {noun}
            </Link>
          </aside>
        ))}
      {editing && (
        <EditAssessment {...props} assessment={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

/** Sửa tiêu đề, mô tả, giờ mở/đóng; loại bài và đề không đổi được (đổi đề: xóa và tạo bài mới). */
function EditAssessment({
  base,
  reload,
  notify,
  type,
  assessment,
  onClose,
}: AssessmentTabProps & { assessment: Assessment; onClose: () => void }) {
  const [form, setForm] = useState({
    title: assessment.title,
    description: assessment.description ?? '',
    opens: isoToLocalInput(assessment.opensAt),
    closes: isoToLocalInput(assessment.closesAt),
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { noun } = ASSESSMENT_GROUPS[type];
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  async function submit(event: FormEvent) {
    event.preventDefault();
    const opensAt = localInputToIso(form.opens);
    const closesAt = localInputToIso(form.closes);
    if (opensAt && closesAt && closesAt <= opensAt) {
      setError('Giờ đóng phải sau giờ mở.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await apiRequest(`${base}/assessments/${encodeURIComponent(assessment.id)}`, {
        method: 'PUT',
        body: {
          title: form.title.trim(),
          description: form.description.trim(),
          opensAt,
          closesAt,
        },
      });
      notify({ type: 'success', text: `Đã lưu ${form.title.trim()}.` });
      onClose();
      await reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được.');
      setBusy(false);
    }
  }

  return (
    <Modal title={`Sửa ${noun}`} onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          Tiêu đề
          <input
            className="input"
            value={form.title}
            onChange={(event) => set({ title: event.target.value })}
            maxLength={200}
            required
            autoFocus
          />
        </label>
        <label className="form-field">
          <span>
            Mô tả <span className="optional">(không bắt buộc)</span>
          </span>
          <textarea
            className="input"
            rows={3}
            value={form.description}
            onChange={(event) => set({ description: event.target.value })}
            maxLength={2000}
          />
        </label>
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
          Để trống giờ mở là mở ngay; để trống giờ đóng là không giới hạn. Muốn đổi đề thì xóa bài
          và tạo bài mới.
        </p>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy || !form.title.trim()}>
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

const EMPTY = {
  title: '',
  description: '',
  opens: '',
  closes: '',
  /** Chỉ bài tập mới hỏi; bài kiểm tra và bài thực hành server luôn thông báo. */
  notify: false,
};

/** Tạo bài tập; bài thực hành và bài kiểm tra tạo ở trang Tạo bài thi (/teacher/create-exam/). */
function CreateAssessment({ base, reload, notify, type }: AssessmentTabProps) {
  const [form, setForm] = useState(EMPTY);
  const [paperFile, setPaperFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const paperInput = useRef<HTMLInputElement>(null);
  const { noun } = ASSESSMENT_GROUPS[type];
  const set = (patch: Partial<typeof EMPTY>) => setForm({ ...form, ...patch });

  function pickPaper(file: File | null) {
    const problem =
      file &&
      (uploadProblem(file) ??
        (file.name.toLowerCase().endsWith('.pdf') ? null : 'File đề phải là PDF.'));
    setError(problem ?? '');
    setPaperFile(problem ? null : file);
    if (problem && paperInput.current) paperInput.current.value = '';
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const opensAt = localInputToIso(form.opens);
    const closesAt = localInputToIso(form.closes);
    if (opensAt && closesAt && closesAt <= opensAt) {
      setError('Giờ đóng phải sau giờ mở.');
      return;
    }
    setBusy(true);
    setError('');
    const data = {
      type,
      title: form.title.trim(),
      description: form.description.trim(),
      opensAt,
      closesAt,
      notifyStudents: form.notify,
    };
    // Đề gửi cùng request tạo bài: server lưu file và bài trong một lần,
    // file chỉ thuộc bài này (không vào tài liệu khóa học), xóa bài thì xóa luôn file.
    let body: unknown = data;
    if (paperFile) {
      const multipart = new FormData();
      multipart.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      multipart.append('paper', paperFile);
      body = multipart;
    }
    try {
      await apiRequest(`${base}/assessments`, { method: 'POST', body });
      notify({ type: 'success', text: `Đã tạo ${form.title.trim()}.` });
      setForm(EMPTY);
      setPaperFile(null);
      if (paperInput.current) paperInput.current.value = '';
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
          Tạo {noun}
        </h2>
      </div>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
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
          <span>
            File đề <span className="optional">(PDF, không bắt buộc)</span>
          </span>
          <input
            ref={paperInput}
            className="input file-input"
            type="file"
            accept=".pdf,application/pdf"
            onChange={(event) => pickPaper(event.target.files?.[0] ?? null)}
          />
        </label>
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
        <label className="check-field">
          <input
            type="checkbox"
            checked={form.notify}
            onChange={(event) => set({ notify: event.target.checked })}
          />
          Gửi thông báo cho sinh viên
        </label>
        <button className="button primary full-width" disabled={busy || !form.title.trim()}>
          {busy ? 'Đang tạo…' : `Tạo ${noun}`}
        </button>
      </form>
    </aside>
  );
}
