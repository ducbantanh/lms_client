'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRemaining } from '@/hooks/use-remaining';
import { ApiError, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { useSession } from '@/providers/session-provider';
import {
  ASSESSMENT_GROUPS,
  ASSESSMENT_STATUS,
  ASSESSMENT_TAB_PARAM,
  ASSESSMENT_TYPES,
  MAX_SUBMISSION_FILES,
  SUBMISSION_STATUS,
  fileIcon,
  fileUrl,
  MAX_SCORE,
  formatDuration,
  formatScore,
  formatSize,
  quizSummary,
  scorePending,
  splitDuration,
  submissionFileUrl,
  submissionProblem,
  type StudentAssessment,
  type Submission,
} from '@/lib/teaching';
import {
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { CodePanel } from './code-panel';
import { QuizPanel } from './quiz-panel';
import { PdfViewer } from '@/components/pdf-viewer';

/**
 * Trang /course/assessment/?id=...: đếm ngược khi chưa mở; khi mở thì xem đề và nộp file bài làm,
 * làm bài trắc nghiệm (QuizPanel) hoặc bài lập trình (CodePanel).
 */
export function AssessmentView() {
  const id = useSearchParams().get('id') ?? '';
  const { user, refresh } = useSession();
  const [data, setData] = useState<StudentAssessment | null>(null);
  /** Giờ server − giờ máy, đo lúc nhận dữ liệu. */
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState('');

  const load = useCallback(
    (signal?: AbortSignal) =>
      apiRequest<StudentAssessment>(`/student/assessments/${encodeURIComponent(id)}`, { signal })
        .then((result) => {
          setOffset(Date.parse(result.serverTime) - Date.now());
          setData(result);
        })
        .catch((reason) => {
          if (signal?.aborted) return;
          if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED') {
            void refresh();
            return;
          }
          setError(
            reason instanceof ApiError &&
              (reason.code === 'NOT_FOUND' || reason.code === 'FORBIDDEN')
              ? 'Bài không tồn tại hoặc bạn chưa được ghi danh vào khóa học này.'
              : reason instanceof Error
                ? reason.message
                : 'Không tải được bài.',
          );
        }),
    [id, refresh],
  );

  const userId = user?.id;
  useEffect(() => {
    if (!userId || !id) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [userId, id, load]);

  if (!id || error)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state">
          <h1>Không mở được bài</h1>
          <p>{error || 'Đường dẫn không có mã bài.'}</p>
          <Link href="/" className="button">
            Về danh sách khóa học
          </Link>
        </div>
      </main>
    );
  if (!data)
    return (
      <main id="main-content" className="shell-main">
        <p className="empty-state" role="status">
          Đang tải bài…
        </p>
      </main>
    );

  return (
    <AssessmentPage data={data} offset={offset} reload={() => void load()} setData={setData} />
  );
}

function AssessmentPage({
  data,
  offset,
  reload,
  setData,
}: {
  data: StudentAssessment;
  offset: number;
  reload: () => void;
  setData: (data: StudentAssessment) => void;
}) {
  const { course, assessment, submission } = data;
  const back = `/course/?id=${encodeURIComponent(course.id)}&tab=${ASSESSMENT_TAB_PARAM[assessment.type]}`;
  const status = ASSESSMENT_STATUS[assessment.status];
  const work = SUBMISSION_STATUS[submission.status];
  // Đang đếm ngược tới giờ mở thì tới giờ tải lại để lấy đề
  const untilOpen = useRemaining(
    assessment.status === 'upcoming' ? assessment.opensAt : null,
    offset,
    reload,
  );

  return (
    <main id="main-content" className="shell-main">
      <Link href={back} className="back-link">
        <Icon name="back" size={12} />
        {course.code} · {ASSESSMENT_GROUPS[assessment.type].title}
      </Link>
      <div className="page-heading">
        <div>
          <p className="detail-code">
            <span className="badge muted-solid">{ASSESSMENT_TYPES[assessment.type]}</span>
            <span className={`badge ${status.tone}`}>{status.label}</span>
            {assessment.status !== 'upcoming' && (
              <span className={`badge ${work.tone}`}>{work.label}</span>
            )}
            {quizSummary(assessment) && (
              <span className="badge muted">{quizSummary(assessment)}</span>
            )}
          </p>
          <h1>{assessment.title}</h1>
          {assessment.description && <p>{assessment.description}</p>}
          <p className="assessment-meta">
            <Icon name="calendar" size={12} />
            Mở: {assessment.opensAt ? formatDateTime(assessment.opensAt) : 'ngay'} · Đóng:{' '}
            {assessment.closesAt ? formatDateTime(assessment.closesAt) : 'không hạn'}
          </p>
        </div>
      </div>
      {assessment.status === 'upcoming' ? (
        <section className="panel countdown-panel">
          <p className="countdown-caption">Bài sẽ mở sau</p>
          <Countdown ms={untilOpen ?? 0} />
          {assessment.opensAt && (
            <p className="countdown-caption">
              Mở lúc {formatDateTime(assessment.opensAt)}. Đề bài và chỗ nộp bài sẽ hiện khi bài mở.
            </p>
          )}
        </section>
      ) : assessment.answerMode === 1 ? (
        <QuizPanel assessment={assessment} back={back} onPhaseChange={reload} />
      ) : assessment.answerMode === 2 ? (
        <CodePanel assessment={assessment} back={back} onSubmitted={reload} />
      ) : (
        <div className="columns exam-columns">
          <section className="panel flush">
            <div className="panel-title">
              <h2>
                <i className="title-icon red">
                  <Icon name="filePdf" size={12} />
                </i>
                Đề bài
              </h2>
              {assessment.paperFileId && (
                <a href={fileUrl(assessment.paperFileId)} target="_blank" rel="noopener">
                  Mở trong tab mới
                </a>
              )}
            </div>
            {assessment.paperFileId ? (
              <PdfViewer
                url={fileUrl(assessment.paperFileId)}
                title={`Đề bài: ${assessment.paperFileName ?? assessment.title}`}
              />
            ) : (
              <p className="empty-cell">Bài này không có file đề.</p>
            )}
          </section>
          <SubmissionPanel
            data={data}
            offset={offset}
            back={back}
            reload={reload}
            onChange={(next) => setData({ ...data, submission: next })}
          />
        </div>
      )}
    </main>
  );
}

function Countdown({ ms }: { ms: number }) {
  const { days, hours, minutes, seconds } = splitDuration(ms);
  const units: [number, string][] = [
    [days, 'ngày'],
    [hours, 'giờ'],
    [minutes, 'phút'],
    [seconds, 'giây'],
  ];
  return (
    <div className="countdown" role="timer" aria-live="off" aria-label={formatDuration(ms)}>
      {units.map(([value, label]) => (
        <span className="countdown-unit" key={label}>
          <b>{String(value).padStart(2, '0')}</b>
          <small>{label}</small>
        </span>
      ))}
    </div>
  );
}

/** Khung bài làm: thời gian còn lại, file đã tải, chọn thêm file, nộp bài. */
function SubmissionPanel({
  data,
  offset,
  back,
  reload,
  onChange,
}: {
  data: StudentAssessment;
  offset: number;
  back: string;
  reload: () => void;
  onChange: (submission: Submission) => void;
}) {
  const router = useRouter();
  const { assessment, submission } = data;
  const base = `/student/assessments/${encodeURIComponent(assessment.id)}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState('');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  // Hết giờ thì tải lại: server khóa bài làm và tính các file đã tải là bài nộp
  const left = useRemaining(submission.editable ? assessment.closesAt : null, offset, reload);
  const room = MAX_SUBMISSION_FILES - submission.files.length;
  const pending = scorePending(assessment, Date.parse(data.serverTime));

  async function upload(list: FileList | null) {
    const picked = Array.from(list ?? []);
    if (inputRef.current) inputRef.current.value = '';
    if (!picked.length) return;
    if (picked.length > room) {
      setFlash({ type: 'error', text: `Mỗi bài nộp tối đa ${MAX_SUBMISSION_FILES} file.` });
      return;
    }
    const failed: string[] = [];
    for (const [index, file] of picked.entries()) {
      const problem = submissionProblem(file);
      if (problem) {
        failed.push(`${file.name}: ${problem}`);
        continue;
      }
      setBusy(`Đang tải lên ${index + 1}/${picked.length}…`);
      const form = new FormData();
      form.append('file', file);
      try {
        onChange(await apiRequest<Submission>(`${base}/files`, { method: 'POST', body: form }));
      } catch (reason) {
        failed.push(`${file.name}: ${reason instanceof Error ? reason.message : 'lỗi'}`);
        // Hết giờ hoặc đã nộp ở tab khác: tải lại để hiện đúng trạng thái
        if (reason instanceof ApiError && reason.code === 'SUBMISSION_LOCKED') {
          reload();
          break;
        }
      }
    }
    setBusy('');
    setFlash(failed.length ? { type: 'error', text: failed.join(' · ') } : null);
  }

  async function remove(fileId: string) {
    setBusy('Đang xóa…');
    try {
      onChange(
        await apiRequest<Submission>(`${base}/files/${encodeURIComponent(fileId)}`, {
          method: 'DELETE',
        }),
      );
    } catch (reason) {
      setFlash({
        type: 'error',
        text: reason instanceof Error ? reason.message : 'Không xóa được.',
      });
      if (reason instanceof ApiError && reason.code === 'SUBMISSION_LOCKED') reload();
    } finally {
      setBusy('');
    }
  }

  function submit() {
    setConfirm({
      title: 'Nộp bài',
      message: `Nộp ${submission.files.length} file? Sau khi nộp bạn không thể thêm hay xóa file nữa.`,
      confirmLabel: 'Nộp bài',
      run: async () => {
        try {
          await apiRequest(`${base}/submit`, { method: 'POST' });
          router.push(back);
        } catch (reason) {
          setFlash({
            type: 'error',
            text: reason instanceof Error ? reason.message : 'Không nộp được bài.',
          });
          if (reason instanceof ApiError && reason.code === 'SUBMISSION_LOCKED') reload();
        }
      },
    });
  }

  return (
    <aside className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="upload" size={12} />
          </i>
          Bài làm
        </h2>
      </div>
      <FlashMessage flash={flash} onDone={clearFlash} />
      {submission.editable && left !== null && (
        <p className={`time-left${left < 5 * 60_000 ? ' urgent' : ''}`} role="timer">
          <Icon name="clock" size={13} />
          Còn lại <b>{formatDuration(left)}</b>
        </p>
      )}
      {submission.grade && (
        <div className="grade-box">
          <b>
            {formatScore(submission.grade.score)} <small>/ {MAX_SCORE} điểm</small>
          </b>
          {submission.grade.feedback && <p>{submission.grade.feedback}</p>}
          <p className="admin-hint">
            Chấm lúc {formatDateTime(submission.grade.gradedAt)}
            {submission.grade.gradedBy && ` · ${submission.grade.gradedBy}`}
          </p>
        </div>
      )}
      <SubmissionNote submission={submission} closesAt={assessment.closesAt} />
      {!submission.editable && !submission.grade && pending && (
        <p className="score-pending">
          <Icon name="clock" size={12} />
          {pending.at
            ? `Điểm và nhận xét được công bố sau giờ đóng bài (${formatDateTime(pending.at)}).`
            : 'Giảng viên không công bố điểm và nhận xét của bài này.'}
        </p>
      )}
      {submission.files.length > 0 ? (
        <ul className="file-list attach-list">
          {submission.files.map((file) => (
            <li className="file-row" key={file.id}>
              <Icon name={fileIcon(file.contentType)} size={16} className="file-icon" />
              <span className="file-name">
                <a className="file-link" href={submissionFileUrl(file.id)} download={file.name}>
                  {file.name}
                </a>
                <small>{formatSize(file.size)}</small>
              </span>
              {submission.editable && (
                <span className="file-actions">
                  <button
                    className="icon-button row-action danger"
                    title="Xóa file"
                    aria-label={`Xóa ${file.name}`}
                    disabled={!!busy}
                    onClick={() => remove(file.id)}
                  >
                    <Icon name="trash" size={13} />
                  </button>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        submission.editable && <p className="admin-hint">Chưa có file bài làm.</p>
      )}
      {submission.editable ? (
        <>
          <label className="form-field submission-pick">
            Chọn file bài làm (PDF, DOCX, PPTX, ZIP · tối đa 20 MB/file, {MAX_SUBMISSION_FILES}{' '}
            file)
            <input
              ref={inputRef}
              className="input file-input"
              type="file"
              accept=".pdf,.docx,.pptx,.zip"
              multiple
              disabled={!!busy || room <= 0}
              onChange={(event) => void upload(event.target.files)}
            />
          </label>
          <button
            className="button primary full-width"
            disabled={!!busy || !submission.files.length}
            onClick={submit}
          >
            {busy || (assessment.closesAt ? 'Nộp bài sớm' : 'Nộp bài')}
          </button>
        </>
      ) : (
        <Link href={back} className="button full-width">
          Về danh sách {ASSESSMENT_GROUPS[assessment.type].noun}
        </Link>
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </aside>
  );
}

function SubmissionNote({
  submission,
  closesAt,
}: {
  submission: Submission;
  closesAt: string | null;
}) {
  switch (submission.status) {
    case 'submitted':
      return (
        <p className="submission-note ok">
          <Icon name="check" size={12} />
          Đã nộp lúc {submission.submittedAt ? formatDateTime(submission.submittedAt) : ''}.
        </p>
      );
    case 'auto_submitted':
      return (
        <p className="submission-note ok">
          <Icon name="check" size={12} />
          Đã hết giờ{closesAt ? ` (${formatDateTime(closesAt)})` : ''}; các file dưới đây được tính
          là bài nộp.
        </p>
      );
    case 'missed':
      return <p className="submission-note locked">Đã hết giờ làm bài, bạn chưa nộp file nào.</p>;
    default:
      return null;
  }
}
