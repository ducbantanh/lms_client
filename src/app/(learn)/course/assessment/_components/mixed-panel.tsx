'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useRemaining } from '@/hooks/use-remaining';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import type { MixedState } from '@/lib/mixed';
import {
  MAX_SCORE,
  MIXED_PART_LABELS,
  formatDuration,
  formatScore,
  mixedParts,
  scorePending,
  type Assessment,
  type MixedPartKey,
} from '@/lib/teaching';
import { ConfirmDialog, type ConfirmRequest } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { CodePanel } from './code-panel';
import { QuizPanel } from './quiz-panel';

/**
 * Bài tổng hợp của sinh viên (assessment.answerMode = 3). Chưa bắt đầu: các phần, điểm tối đa, thời gian và nút
 * "Bắt đầu". Đã bắt đầu: thanh trên có đồng hồ chung và nút nộp cả bài, dưới là tab từng phần (?part=quiz|code|file)
 * dùng lại QuizPanel, CodePanel và khung nộp file ở chế độ nhúng. Đã nộp: điểm từng phần và điểm cả bài; các tab
 * vẫn mở để xem lại bài làm. Hạn làm bài do server quyết định; đồng hồ ở đây chỉ hiển thị theo giờ server.
 */
export function MixedPanel({
  assessment,
  back,
  reload,
  filePart,
}: {
  assessment: Assessment;
  back: string;
  /** Bắt đầu / nộp xong: trang cha tải lại (đề PDF phần nộp file, nhãn trạng thái bài làm). */
  reload: () => void;
  /** Đề PDF và khung nộp file ở chế độ nhúng (assessment-view dựng sẵn). */
  filePart: ReactNode;
}) {
  const router = useRouter();
  const partParam = useSearchParams().get('part');
  const base = `/student/assessments/${encodeURIComponent(assessment.id)}/mixed`;
  const [state, setState] = useState<MixedState | null>(null);
  /** Giờ server − giờ máy, đo lúc nhận dữ liệu. */
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const phase = useRef<string | null>(null);
  const parentReload = useRef(reload);
  useEffect(() => {
    parentReload.current = reload;
  });

  const receive = useCallback((next: MixedState) => {
    setOffset(Date.parse(next.serverTime) - Date.now());
    setState(next);
    if (phase.current && phase.current !== next.phase) parentReload.current();
    phase.current = next.phase;
  }, []);

  const load = useCallback(
    (signal?: AbortSignal) =>
      apiRequest<MixedState>(base, { signal })
        .then(receive)
        .catch((reason) => {
          if (!signal?.aborted)
            setError(reason instanceof Error ? reason.message : 'Không tải được bài làm.');
        }),
    [base, receive],
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  // Hết giờ: tải lại, server chốt cả bài và chấm phần tự động
  const left = useRemaining(
    state?.phase === 'in_progress' ? state.deadline : null,
    offset,
    () => void load(),
  );

  if (error)
    return (
      <section className="panel">
        <p className="form-error" role="alert">
          {error}
        </p>
      </section>
    );
  if (!state)
    return (
      <section className="panel">
        <p className="empty-cell" role="status">
          Đang tải bài làm…
        </p>
      </section>
    );
  if (state.phase === 'not_started')
    return (
      <MixedIntro
        assessment={assessment}
        state={state}
        onStart={() =>
          setConfirm({
            title: 'Bắt đầu làm bài',
            message: state.timeLimitMinutes
              ? `Bạn có ${state.timeLimitMinutes} phút cho mọi phần kể từ bây giờ${assessment.closesAt ? ' (không quá giờ đóng bài)' : ''}. Đồng hồ vẫn chạy khi bạn đóng trang; hết giờ bài được nộp tự động. Mỗi sinh viên chỉ làm một lần.`
              : 'Mỗi sinh viên chỉ làm một lần. Hết giờ đóng bài mà chưa nộp thì bài làm ở mọi phần được nộp tự động.',
            confirmLabel: 'Bắt đầu',
            run: async () => {
              try {
                receive(await apiRequest<MixedState>(`${base}/start`, { method: 'POST' }));
              } catch (reason) {
                setError(reason instanceof Error ? reason.message : 'Không bắt đầu được bài.');
              }
            },
          })
        }
        confirm={confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
      />
    );

  const parts = mixedParts(assessment);
  const active: MixedPartKey =
    parts.find((part) => part.key === partParam)?.key ?? parts[0]?.key ?? 'quiz';
  const href = (key: MixedPartKey) =>
    `/course/assessment/?id=${encodeURIComponent(assessment.id)}&part=${key}`;

  function submit() {
    setConfirm({
      title: 'Nộp cả bài',
      message:
        'Nộp bài ở mọi phần? Sau khi nộp không trả lời, chạy code hay thêm file được nữa. Lần nộp code đang chấm vẫn được chấm và tính điểm.',
      confirmLabel: 'Nộp bài',
      run: async () => {
        try {
          receive(await apiRequest<MixedState>(`${base}/submit`, { method: 'POST' }));
        } catch (reason) {
          setError(reason instanceof Error ? reason.message : 'Không nộp được bài.');
        }
      },
    });
  }

  return (
    <div className="stack">
      <section className="panel">
        {state.phase === 'in_progress' ? (
          <div className="flex flex-wrap items-center gap-3">
            {left !== null ? (
              <p
                className={`time-left m-0 flex-1${left < 5 * 60_000 ? ' urgent' : ''}`}
                role="timer"
              >
                <Icon name="clock" size={13} />
                Còn lại <b>{formatDuration(left)}</b>
              </p>
            ) : (
              <p className="admin-hint m-0 flex-1">
                Làm tới khi nộp bài (bài không giới hạn thời gian).
              </p>
            )}
            <button className="button primary" onClick={submit}>
              <Icon name="upload" size={12} />
              Nộp cả bài
            </button>
          </div>
        ) : (
          <MixedResult assessment={assessment} state={state} back={back} />
        )}
        <div className="segmented compact mt-3.5" role="tablist" aria-label="Các phần của bài">
          {parts.map((part) => (
            <button
              key={part.key}
              role="tab"
              aria-selected={active === part.key}
              className={active === part.key ? 'selected' : ''}
              onClick={() => router.replace(href(part.key), { scroll: false })}
            >
              {MIXED_PART_LABELS[part.key]} · {formatScore(part.weight)}đ
            </button>
          ))}
        </div>
        {state.phase === 'in_progress' && (
          <p className="admin-hint">
            Làm các phần theo thứ tự tùy ý; bài làm ở mỗi phần được lưu ngay (đáp án, lần nộp code,
            file). Bắt đầu lúc {state.startedAt ? formatDateTime(state.startedAt) : ''}
            {state.deadline && ` · hạn ${formatDateTime(state.deadline)}`}.
          </p>
        )}
      </section>
      {/* key theo giai đoạn: nộp xong thì từng phần tải lại ở chế độ xem lại */}
      {active === 'quiz' && (
        <QuizPanel
          key={state.phase}
          assessment={assessment}
          back={back}
          onPhaseChange={() => void load()}
          embedded
        />
      )}
      {active === 'code' && (
        <CodePanel
          key={state.phase}
          assessment={assessment}
          back={back}
          onSubmitted={() => undefined}
          embedded
        />
      )}
      {active === 'file' && filePart}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </div>
  );
}

function MixedIntro({
  assessment,
  state,
  onStart,
  confirm,
}: {
  assessment: Assessment;
  state: MixedState;
  onStart: () => void;
  confirm: ReactNode;
}) {
  if (assessment.status === 'closed')
    return (
      <section className="panel">
        <p className="submission-note locked">Bài đã đóng, bạn chưa làm bài này.</p>
      </section>
    );
  return (
    <section className="panel [&_.button]:mt-1">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="layers" size={12} />
          </i>
          Bài tổng hợp
        </h2>
      </div>
      <ul className="quiz-facts">
        {state.quiz && (
          <li>
            Trắc nghiệm <b>{state.quiz.questionCount}</b> câu ·{' '}
            <b>{formatScore(state.quiz.weight)}</b> điểm
          </li>
        )}
        {state.code && (
          <li>
            Lập trình <b>{state.code.problemCount}</b> câu · <b>{formatScore(state.code.weight)}</b>{' '}
            điểm
          </li>
        )}
        {state.file && (
          <li>
            Nộp file · <b>{formatScore(state.file.weight)}</b> điểm
          </li>
        )}
        <li>
          {state.timeLimitMinutes ? (
            <>
              <b>{state.timeLimitMinutes}</b> phút cho cả bài
            </>
          ) : (
            <>
              Làm tới{' '}
              <b>{assessment.closesAt ? formatDateTime(assessment.closesAt) : 'khi nộp bài'}</b>
            </>
          )}
        </li>
      </ul>
      <p className="admin-hint">
        Thang điểm {MAX_SCORE}, bằng tổng điểm các phần. Trắc nghiệm: số câu đúng / tổng số câu ×
        điểm phần (câu nhiều đáp án phải chọn đúng hết). Lập trình: số câu đúng hết test / tổng số
        câu × điểm phần. Nộp file: giảng viên chấm. Đề các phần hiện sau khi bấm bắt đầu; nộp một
        lần cho cả bài.
      </p>
      <button className="button primary" onClick={onStart}>
        <Icon name="chevron" size={11} />
        Bắt đầu làm bài
      </button>
      {confirm}
    </section>
  );
}

/** Kết quả sau khi nộp: điểm cả bài, điểm từng phần, nhận xét; điểm chưa công bố thì báo khi nào có. */
function MixedResult({
  assessment,
  state,
  back,
}: {
  assessment: Assessment;
  state: MixedState;
  back: string;
}) {
  const pending = scorePending(assessment, Date.parse(state.serverTime));
  const rows: { key: MixedPartKey; detail: string; points: number | null; weight: number }[] = [];
  if (state.quiz)
    rows.push({
      key: 'quiz',
      detail:
        state.quiz.correct === null
          ? ''
          : `đúng ${state.quiz.correct}/${state.quiz.questionCount} câu`,
      points: state.quiz.points,
      weight: state.quiz.weight,
    });
  if (state.code)
    rows.push({
      key: 'code',
      detail:
        state.code.accepted === null
          ? ''
          : `AC ${state.code.accepted}/${state.code.problemCount} câu${state.code.pending ? ', còn lần nộp đang chấm' : ''}`,
      points: state.code.points,
      weight: state.code.weight,
    });
  if (state.file)
    rows.push({
      key: 'file',
      detail: `${state.file.fileCount} file`,
      points: state.file.points,
      weight: state.file.weight,
    });

  return (
    <>
      <p className="submission-note ok">
        <Icon name="check" size={12} />
        Đã nộp lúc {state.submittedAt ? formatDateTime(state.submittedAt) : ''}.
      </p>
      {state.scoreHidden ? (
        <p className="score-pending">
          <Icon name="clock" size={12} />
          {pending?.at
            ? `Điểm được công bố sau giờ đóng bài (${formatDateTime(pending.at)}).`
            : 'Giảng viên không công bố điểm của bài này.'}
        </p>
      ) : (
        <>
          <div className="grade-box">
            {state.score !== null ? (
              <b>
                {formatScore(state.score)} <small>/ {MAX_SCORE} điểm</small>
              </b>
            ) : (
              <p>Đang chờ giảng viên chấm phần nộp file; điểm cả bài hiện sau khi chấm.</p>
            )}
            {state.feedback && <p>{state.feedback}</p>}
          </div>
          <ul className="quiz-facts">
            {rows.map((row) => (
              <li key={row.key}>
                {MIXED_PART_LABELS[row.key]}
                {row.detail && ` (${row.detail})`}:{' '}
                <b>{row.points === null ? 'chưa chấm' : formatScore(row.points)}</b> /{' '}
                {formatScore(row.weight)}
              </li>
            ))}
          </ul>
        </>
      )}
      <Link href={back} className="button">
        Về danh sách bài
      </Link>
    </>
  );
}
