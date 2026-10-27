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
import {
  GRADER_ACTIONS,
  GRADER_META,
  GRADER_NAV,
  GRADER_POSITION,
  GRADER_STEPPER,
  GRADER_STUDENT,
} from './grader';
import { StatCard } from '@/components/ui/stat-card';
import { QuizReviewList } from '@/components/quiz-review';
import type { StudentReview, TeacherQuiz } from '@/lib/quiz';
import { CodeResultsPage } from './code-review';

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
  /**
   * Bài trắc nghiệm / lập trình: không có file, máy chấm sẵn; giảng viên xem bài làm và sửa điểm nếu cần.
   */
  const quiz = assessment.answerMode === 1;
  const auto = assessment.answerMode !== 0;
  const current = selected ? rows.findIndex((row) => row.studentId === selected) : -1;

  return (
    <main id="main-content" className="shell-main">
      <Link href={back} className="back-link">
        <Icon name="back" size={12} />
        {course.code} · {course.title}
      </Link>
      <div className="page-heading">
        <div>
          <p className="text-[13px] font-semibold text-ink-subtle">
            <span className="badge muted-solid">{ASSESSMENT_TYPES[assessment.type]}</span>
            <span className={`badge ${status.tone}`}>{status.label}</span>
          </p>
          <h1>{assessment.title}</h1>
          <p className="assessment-meta">
            <Icon name="calendar" size={12} />
            Mở: {assessment.opensAt ? formatDateTime(assessment.opensAt) : 'ngay'} · Đóng:{' '}
            {assessment.closesAt ? formatDateTime(assessment.closesAt) : 'không hạn'}
            {assessment.scoreRelease === 1 &&
              ` · Sinh viên thấy ${auto && !quiz ? 'kết quả' : 'điểm'} sau giờ đóng`}
            {assessment.scoreRelease === 2 &&
              ` · Sinh viên không xem được ${auto && !quiz ? 'kết quả' : 'điểm'}`}
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
        {auto ? null : summary.submitted > 0 ? (
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
      {assessment.answerMode === 2 ? (
        // Bài lập trình không chấm điểm: bảng kết quả sinh viên × câu thay cho danh sách chấm
        <CodeResultsPage
          courseId={course.id}
          assessmentId={assessment.id}
          canEdit={data.canGrade}
          notify={setFlash}
        />
      ) : current >= 0 ? (
        <Grader
          key={rows[current].studentId}
          row={rows[current]}
          quiz={assessment.answerMode === 1}
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
                      {!auto && <th>File</th>}
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
                          {!auto && <td>{row.files.length ? `${row.files.length} file` : '—'}</td>}
                          <td className="numeric font-bold">
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
                                disabled={!row.files.length && !row.grade && !(auto && gradable)}
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
          {quiz && <QuizStats courseId={course.id} assessmentId={assessment.id} />}
        </>
      )}
    </main>
  );
}

/** Khung chấm một sinh viên: xem file bài làm (PDF vẽ bằng pdf.js) bên trái, điểm và nhận xét bên phải. */
function Grader({
  row,
  quiz,
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
  /** Bài trắc nghiệm: bên trái là bài làm (đáp án đã chọn) thay cho file. */
  quiz: boolean;
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
    <div className="columns items-start">
      {quiz ? (
        <QuizAnswers url={`${base}/${encodeURIComponent(row.studentId)}/quiz`} />
      ) : (
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
            <div
              className="flex gap-1.5 overflow-x-auto border-t border-line px-4 py-2"
              role="tablist"
              aria-label="File bài làm"
            >
              {row.files.map((item, index) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={index === fileIndex}
                  className={`flex h-7.5 shrink-0 items-center gap-1.5 rounded-sm border px-2.5 text-[13px] ${
                    index === fileIndex
                      ? 'border-primary-600 bg-primary-50 font-semibold text-primary-600'
                      : 'border-line text-ink-muted hover:bg-surface-muted'
                  }`}
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
            <div className="flex flex-col items-center gap-2 border-t border-line px-5 py-12 text-center">
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
      )}
      <aside className="panel">
        <div className={GRADER_NAV}>
          <button className="button small" onClick={onBack}>
            <Icon name="list" size={11} />
            Danh sách
          </button>
          <span className={GRADER_STEPPER}>
            <button
              className="icon-button"
              title="Sinh viên trước"
              aria-label="Sinh viên trước"
              disabled={!onPrev || busy}
              onClick={onPrev}
            >
              <Icon name="back" size={12} />
            </button>
            <small className={GRADER_POSITION}>{position}</small>
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
        <h2 className={GRADER_STUDENT}>{row.fullName}</h2>
        <p className={GRADER_META}>
          <span className="font-mono text-[13px]">{row.username}</span>
          <span className={`badge ${label.tone}`}>{label.label}</span>
        </p>
        <p className={GRADER_META}>
          {row.submittedAt
            ? `Nộp lúc ${formatDateTime(row.submittedAt)}`
            : row.status === 'auto_submitted'
              ? 'Tự nộp khi hết giờ'
              : 'Không có bài nộp'}
          {row.files.length > 0 && ` · ${row.files.length} file`}
        </p>
        {row.grade && (
          <p className="admin-hint mt-3.5">
            {row.grade.gradedBy
              ? `Đã chấm ${formatDateTime(row.grade.gradedAt)} bởi ${row.grade.gradedBy}.`
              : row.grade.autoScore !== null
                ? `Máy chấm lúc ${formatDateTime(row.grade.gradedAt)}.`
                : `Đã chấm ${formatDateTime(row.grade.gradedAt)}.`}
            {row.grade.autoScore !== null &&
              row.grade.autoScore !== row.grade.score &&
              ` Điểm máy chấm: ${formatScore(row.grade.autoScore)}.`}
          </p>
        )}
        {!canGrade ? (
          <div className="mt-3.5 rounded-sm border border-line bg-surface-muted px-4 py-3.5">
            {row.grade ? (
              <>
                <b className="text-[26px] font-bold tabular-nums">
                  {formatScore(row.grade.score)}
                  <small className="text-sm font-semibold text-ink-subtle">/{MAX_SCORE}</small>
                </b>
                {row.grade.feedback && <p className="lesson-text mt-2">{row.grade.feedback}</p>}
              </>
            ) : (
              <p>Chưa chấm.</p>
            )}
            <p className="admin-hint">Chỉ giảng viên phụ trách mới chấm điểm bài này.</p>
          </div>
        ) : gradable ? (
          <form className="mt-3.5" onSubmit={(event) => submit(event, false)}>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <label className="form-field">
              Điểm (thang {MAX_SCORE})
              <span className="flex items-center gap-2 font-normal text-ink-muted">
                <input
                  className="input h-10 w-27.5 text-lg font-bold tabular-nums"
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
            <div className={GRADER_ACTIONS}>
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

/** Bài làm trắc nghiệm của một sinh viên: đáp án đã chọn so với đáp án đúng, theo thứ tự gốc của đề. */
function QuizAnswers({ url }: { url: string }) {
  const [review, setReview] = useState<StudentReview | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<StudentReview>(url, { signal: controller.signal })
      .then(setReview)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được bài làm.');
      });
    return () => controller.abort();
  }, [url]);

  return (
    <section className="stack">
      <div className="panel">
        <div className="panel-title">
          <h2>
            <i className="title-icon blue">
              <Icon name="check" size={12} />
            </i>
            Bài làm trắc nghiệm
          </h2>
        </div>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : !review ? (
          <p className="empty-cell" role="status">
            Đang tải bài làm…
          </p>
        ) : !review.startedAt ? (
          <p className="admin-hint">Sinh viên chưa làm bài. Dưới đây là đề và đáp án.</p>
        ) : (
          <p className="admin-hint">
            Bắt đầu {formatDateTime(review.startedAt)}
            {review.submittedAt && ` · nộp ${formatDateTime(review.submittedAt)}`}
            {review.result &&
              ` · đúng ${review.result.correct}/${review.result.total} câu = ${formatScore(review.result.score)} điểm`}
          </p>
        )}
      </div>
      {review && <QuizReviewList questions={review.questions} />}
    </section>
  );
}

/** Đề của bài (kèm đáp án) và số sinh viên làm đúng từng câu; chỉ tải khi mở. */
function QuizStats({ courseId, assessmentId }: { courseId: string; assessmentId: string }) {
  const [data, setData] = useState<TeacherQuiz | null>(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || data) return;
    const controller = new AbortController();
    apiRequest<TeacherQuiz>(
      `/teacher/courses/${encodeURIComponent(courseId)}/assessments/${encodeURIComponent(assessmentId)}/quiz`,
      { signal: controller.signal },
    )
      .then(setData)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Không tải được đề.');
      });
    return () => controller.abort();
  }, [open, data, courseId, assessmentId]);

  const stats = new Map(data?.stats.map((stat) => [stat.questionId, stat]));
  return (
    <details className="panel group mt-5" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary className="flex cursor-pointer items-center gap-2 font-semibold group-open:mb-3">
        <Icon name="list" size={12} />
        Đề và tỷ lệ làm đúng từng câu
      </summary>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : !data ? (
        <p className="empty-cell" role="status">
          Đang tải đề…
        </p>
      ) : (
        <>
          <p className="admin-hint">
            Tính trên {data.finished} bài đã nộp. Câu có tỷ lệ đúng thấp có thể là câu khó hoặc đáp
            án trong ngân hàng bị sai.
          </p>
          <QuizReviewList questions={data.questions} stats={stats} />
        </>
      )}
    </details>
  );
}
