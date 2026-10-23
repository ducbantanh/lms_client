'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { TEACHER_PATH } from '@/lib/auth';
import {
  ASSESSMENT_STATUS,
  ASSESSMENT_TAB_PARAM,
  ASSESSMENT_TYPES,
  MAX_SCORE,
  PDF,
  SUBMISSION_STATUS,
  fileIcon,
  fileUrl,
  formatScore,
  formatSize,
  isGradable,
  parseScore,
  submissionFileUrl,
  submissionsZipUrl,
  type AssessmentSubmissions,
  type SubmissionRow,
  type SubmissionStatus,
} from '@/lib/teaching';
import { FlashMessage, type Flash } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { PdfViewer } from '@/components/pdf-viewer';
import { StatCard } from '@/components/ui/stat-card';

type Filter = 'all' | 'ungraded' | 'graded' | 'missing';

const FILTERS: { value: Filter; label: string; match: (row: SubmissionRow) => boolean }[] = [
  { value: 'all', label: 'Tất cả', match: () => true },
  { value: 'ungraded', label: 'Chưa chấm', match: (row) => isGradable(row.status) && !row.grade },
  { value: 'graded', label: 'Đã chấm', match: (row) => !!row.grade },
  {
    value: 'missing',
    label: 'Chưa nộp',
    match: (row) => row.status !== 'submitted' && row.status !== 'auto_submitted',
  },
];

/** Nhãn trạng thái ở góc nhìn giảng viên: "đang làm" thay vì "chưa nộp" của sinh viên. */
function statusLabel(status: SubmissionStatus) {
  if (status === 'in_progress') return { label: 'Đang làm', tone: 'warn' };
  return SUBMISSION_STATUS[status];
}

/** Trang /teacher/course/submissions/?course=...&id=...: danh sách bài nộp của một bài và chấm điểm. */
export function SubmissionsView() {
  const params = useSearchParams();
  const courseId = params.get('course') ?? '';
  const id = params.get('id') ?? '';
  const base = `/teacher/courses/${encodeURIComponent(courseId)}/assessments/${encodeURIComponent(id)}/submissions`;
  const [data, setData] = useState<AssessmentSubmissions | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  /** Sinh viên đang chấm; null = xem danh sách. */
  const [selected, setSelected] = useState<string | null>(null);
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);

  const load = useCallback(
    () =>
      apiRequest<AssessmentSubmissions>(base)
        .then(setData)
        .catch((reason) => {
          setError(
            reason instanceof ApiError && reason.code === 'NOT_FOUND'
              ? 'Bài không tồn tại hoặc bạn không phụ trách khóa học này.'
              : reason instanceof Error
                ? reason.message
                : 'Không tải được bài nộp.',
          );
        }),
    [base],
  );

  useEffect(() => {
    if (courseId && id) void load();
  }, [courseId, id, load]);

  if (!courseId || !id || error)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state">
          <h1>Chưa mở được bài nộp</h1>
          <p>{error || 'Đường dẫn thiếu mã khóa học hoặc mã bài.'}</p>
          <Link href={`${TEACHER_PATH}/courses/`} className="button">
            Về danh sách khóa học
          </Link>
        </div>
      </main>
    );
  if (!data)
    return (
      <main id="main-content" className="shell-main">
        <p className="empty-state" role="status">
          Đang tải bài nộp…
        </p>
      </main>
    );

  const { course, assessment, summary, rows } = data;
  const back = `${TEACHER_PATH}/course/?id=${encodeURIComponent(course.id)}&tab=${ASSESSMENT_TAB_PARAM[assessment.type]}`;
  const status = ASSESSMENT_STATUS[assessment.status];
  const visible = rows.filter(FILTERS.find((item) => item.value === filter)!.match);
  const current = selected ? rows.findIndex((row) => row.studentId === selected) : -1;

  return (
    <main id="main-content" className="shell-main">
      <Link href={back} className="back-link">
        <Icon name="back" size={12} />
        {course.code} · {course.title}
      </Link>
      <div className="page-heading">
        <div>
          <p className="detail-code">
            <span className="badge muted-solid">{ASSESSMENT_TYPES[assessment.type]}</span>
            <span className={`badge ${status.tone}`}>{status.label}</span>
          </p>
          <h1>{assessment.title}</h1>
          <p className="assessment-meta">
            <Icon name="calendar" size={12} />
            Mở: {assessment.opensAt ? formatDateTime(assessment.opensAt) : 'ngay'} · Đóng:{' '}
            {assessment.closesAt ? formatDateTime(assessment.closesAt) : 'không hạn'}
            {assessment.paperFileId && (
              <>
                {' · '}
                <a
                  className="file-link"
                  href={fileUrl(assessment.paperFileId)}
                  target="_blank"
                  rel="noopener"
                >
                  Xem đề
                </a>
              </>
            )}
          </p>
        </div>
        {/* ZIP chỉ gồm bài đã chốt (đã nộp / nộp khi hết giờ), mỗi sinh viên một thư mục */}
        {summary.submitted > 0 ? (
          <a className="button" href={submissionsZipUrl(course.id, assessment.id)} download>
            <Icon name="download" size={13} />
            Tải bài nộp (ZIP)
          </a>
        ) : (
          <button className="button" disabled title="Chưa có bài nộp nào">
            <Icon name="download" size={13} />
            Tải bài nộp (ZIP)
          </button>
        )}
      </div>
      <FlashMessage flash={flash} onDone={clearFlash} />
      {current >= 0 ? (
        <Grader
          key={rows[current].studentId}
          row={rows[current]}
          canGrade={data.canGrade}
          position={`${current + 1} / ${rows.length}`}
          base={base}
          onPrev={current > 0 ? () => setSelected(rows[current - 1].studentId) : undefined}
          onNext={
            current < rows.length - 1 ? () => setSelected(rows[current + 1].studentId) : undefined
          }
          onBack={() => setSelected(null)}
          onSaved={async (next) => {
            await load();
            if (next) {
              // Sang bài kế tiếp còn chưa chấm (sau bài hiện tại), hết thì về danh sách
              const after = rows
                .slice(current + 1)
                .find((row) => isGradable(row.status) && !row.grade);
              setSelected(after?.studentId ?? null);
              if (!after) setFlash({ type: 'success', text: 'Đã chấm hết các bài đã nộp.' });
            }
          }}
          notify={setFlash}
        />
      ) : (
        <>
          <div className="stats cols-4">
            <StatCard label="Sinh viên" value={summary.students} icon="users" tone="blue" />
            <StatCard label="Đã nộp" value={summary.submitted} icon="upload" tone="green" />
            <StatCard label="Đã chấm" value={summary.graded} icon="check" tone="violet" />
            <StatCard
              label="Điểm trung bình"
              value={summary.average === null ? '—' : formatScore(summary.average)}
              icon="exam"
              tone="red"
            />
          </div>
          <section className="panel">
            <div className="segmented" role="tablist" aria-label="Lọc bài nộp">
              {FILTERS.map((item) => (
                <button
                  key={item.value}
                  role="tab"
                  aria-selected={filter === item.value}
                  className={filter === item.value ? 'selected' : ''}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label} ({rows.filter(item.match).length})
                </button>
              ))}
            </div>
            {visible.length ? (
              <div className="table-responsive">
                <table className="table admin-table">
                  <thead>
                    <tr>
                      <th>MSSV</th>
                      <th>Họ tên</th>
                      <th>Trạng thái</th>
                      <th>Nộp lúc</th>
                      <th>File</th>
                      <th className="numeric">Điểm</th>
                      <th className="actions" aria-label="Thao tác" />
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((row) => {
                      const label = statusLabel(row.status);
                      const gradable = isGradable(row.status);
                      return (
                        <tr key={row.studentId}>
                          <td className="mono">{row.username}</td>
                          <td>{row.fullName}</td>
                          <td>
                            <span className={`badge ${label.tone}`}>{label.label}</span>
                          </td>
                          <td className="numeric">
                            {row.submittedAt
                              ? formatDateTime(row.submittedAt)
                              : row.status === 'auto_submitted'
                                ? 'Khi hết giờ'
                                : '—'}
                          </td>
                          <td>{row.files.length ? `${row.files.length} file` : '—'}</td>
                          <td className="numeric score-cell">
                            {row.grade ? formatScore(row.grade.score) : '—'}
                          </td>
                          <td className="actions">
                            {data.canGrade ? (
                              <button
                                className={`button small${gradable && !row.grade ? ' primary' : ''}`}
                                disabled={!gradable}
                                title={
                                  gradable ? undefined : 'Sinh viên chưa chốt bài, chưa chấm được'
                                }
                                onClick={() => setSelected(row.studentId)}
                              >
                                {row.grade ? 'Sửa điểm' : 'Chấm'}
                              </button>
                            ) : (
                              // Admin chỉ xem bài làm và điểm
                              <button
                                className="button small"
                                disabled={!row.files.length && !row.grade}
                                onClick={() => setSelected(row.studentId)}
                              >
                                Xem
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-cell">
                {rows.length ? 'Không có sinh viên nào ở mục này.' : 'Khóa học chưa có sinh viên.'}
              </p>
            )}
          </section>
        </>
      )}
    </main>
  );
}

/** Khung chấm một sinh viên: xem file bài làm (PDF vẽ bằng pdf.js) bên trái, điểm và nhận xét bên phải. */
function Grader({
  row,
  canGrade,
  position,
  base,
  onPrev,
  onNext,
  onBack,
  onSaved,
  notify,
}: {
  row: SubmissionRow;
  /** false: admin xem bài làm, điểm và nhận xét nhưng không chấm. */
  canGrade: boolean;
  position: string;
  base: string;
  onPrev?: () => void;
  onNext?: () => void;
  onBack: () => void;
  onSaved: (next: boolean) => Promise<void>;
  notify: (flash: Flash) => void;
}) {
  const [fileIndex, setFileIndex] = useState(0);
  const [score, setScore] = useState(row.grade ? String(row.grade.score).replace('.', ',') : '');
  const [feedback, setFeedback] = useState(row.grade?.feedback ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const file = row.files[fileIndex];
  const gradable = isGradable(row.status);
  const label = statusLabel(row.status);

  async function save(value: number | null, next: boolean) {
    setBusy(true);
    setError('');
    try {
      await apiRequest(`${base}/${encodeURIComponent(row.studentId)}/grade`, {
        method: 'PUT',
        body: { score: value, feedback: value === null ? null : feedback },
      });
      notify({
        type: 'success',
        text:
          value === null
            ? `Đã xóa điểm của ${row.fullName}.`
            : `Đã lưu ${formatScore(value)} điểm cho ${row.fullName}.`,
      });
      await onSaved(next);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được điểm.');
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent, next: boolean) {
    event.preventDefault();
    const parsed = parseScore(score);
    if ('error' in parsed) {
      setError(parsed.error);
      return;
    }
    if (parsed.value === null) {
      setError('Nhập điểm trước khi lưu.');
      return;
    }
    void save(parsed.value, next);
  }

  return (
    <div className="columns exam-columns">
      <section className="panel flush">
        <div className="panel-title">
          <h2>
            <i className="title-icon blue">
              <Icon name="file" size={12} />
            </i>
            Bài làm
          </h2>
          {file && (
            <a className="file-link" href={submissionFileUrl(file.id)} download={file.name}>
              Tải file
            </a>
          )}
        </div>
        {row.files.length > 1 && (
          <div className="grader-files" role="tablist" aria-label="File bài làm">
            {row.files.map((item, index) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={index === fileIndex}
                className={index === fileIndex ? 'selected' : ''}
                onClick={() => setFileIndex(index)}
              >
                <Icon name={fileIcon(item.contentType)} size={12} />
                {item.name}
              </button>
            ))}
          </div>
        )}
        {!file ? (
          <p className="empty-cell">Sinh viên không nộp file nào.</p>
        ) : file.contentType === PDF ? (
          <PdfViewer
            key={file.id}
            url={submissionFileUrl(file.id)}
            title={`Bài làm: ${file.name}`}
          />
        ) : (
          <div className="grader-download">
            <Icon name={fileIcon(file.contentType)} size={36} className="file-icon" />
            <p>
              <b>{file.name}</b> · {formatSize(file.size)}
            </p>
            <p className="admin-hint">
              File {file.name.split('.').pop()?.toUpperCase()} không xem trực tiếp được.
            </p>
            <a className="button" href={submissionFileUrl(file.id)} download={file.name}>
              <Icon name="upload" size={12} />
              Tải về để xem
            </a>
          </div>
        )}
      </section>
      <aside className="panel">
        <div className="grader-nav">
          <button className="button small" onClick={onBack}>
            <Icon name="list" size={11} />
            Danh sách
          </button>
          <span>
            <button
              className="icon-button"
              title="Sinh viên trước"
              aria-label="Sinh viên trước"
              disabled={!onPrev || busy}
              onClick={onPrev}
            >
              <Icon name="back" size={12} />
            </button>
            <small>{position}</small>
            <button
              className="icon-button"
              title="Sinh viên sau"
              aria-label="Sinh viên sau"
              disabled={!onNext || busy}
              onClick={onNext}
            >
              <Icon name="chevron" size={12} />
            </button>
          </span>
        </div>
        <h2 className="grader-student">{row.fullName}</h2>
        <p className="grader-meta">
          <span className="mono">{row.username}</span>
          <span className={`badge ${label.tone}`}>{label.label}</span>
        </p>
        <p className="grader-meta">
          {row.submittedAt
            ? `Nộp lúc ${formatDateTime(row.submittedAt)}`
            : row.status === 'auto_submitted'
              ? 'Tự nộp khi hết giờ'
              : 'Không có bài nộp'}
          {row.files.length > 0 && ` · ${row.files.length} file`}
        </p>
        {row.grade && (
          <p className="admin-hint">
            Đã chấm {formatDateTime(row.grade.gradedAt)}
            {row.grade.gradedBy && ` bởi ${row.grade.gradedBy}`}.
          </p>
        )}
        {!canGrade ? (
          <div className="grade-readonly">
            {row.grade ? (
              <>
                <b>
                  {formatScore(row.grade.score)}
                  <small>/{MAX_SCORE}</small>
                </b>
                {row.grade.feedback && <p className="lesson-text">{row.grade.feedback}</p>}
              </>
            ) : (
              <p>Chưa chấm.</p>
            )}
            <p className="admin-hint">Chỉ giảng viên phụ trách mới chấm điểm bài này.</p>
          </div>
        ) : gradable ? (
          <form onSubmit={(event) => submit(event, false)}>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <label className="form-field">
              Điểm (thang {MAX_SCORE})
              <span className="score-input">
                <input
                  className="input"
                  inputMode="decimal"
                  value={score}
                  onChange={(event) => setScore(event.target.value)}
                  placeholder="Ví dụ 8,5"
                  autoFocus
                />
                <span>/ {MAX_SCORE}</span>
              </span>
            </label>
            <label className="form-field">
              <span>
                Nhận xét <span className="optional">(sinh viên xem được)</span>
              </span>
              <textarea
                className="input"
                rows={5}
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                maxLength={2000}
              />
            </label>
            <div className="grader-actions">
              <button className="button primary" disabled={busy}>
                {busy ? 'Đang lưu…' : 'Lưu điểm'}
              </button>
              <button
                type="button"
                className="button"
                disabled={busy}
                onClick={(event) => submit(event, true)}
              >
                Lưu và chấm bài tiếp
              </button>
              {row.grade && (
                <button
                  type="button"
                  className="button danger"
                  disabled={busy}
                  onClick={() => void save(null, false)}
                >
                  Xóa điểm
                </button>
              )}
            </div>
          </form>
        ) : (
          <p className="admin-hint">
            Sinh viên chưa chốt bài (bài chưa mở hoặc đang làm), chưa chấm được.
          </p>
        )}
      </aside>
    </div>
  );
}
