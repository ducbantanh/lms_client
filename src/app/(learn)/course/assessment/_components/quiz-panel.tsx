'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRemaining } from '@/hooks/use-remaining';
import { ApiError, apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { optionLetter } from '@/lib/question-bank';
import {
  answeredCount,
  toggleChoice,
  type AnswerSaved,
  type QuizQuestionView,
  type QuizState,
} from '@/lib/quiz';
import {
  ASSESSMENT_GROUPS,
  MAX_SCORE,
  formatDuration,
  formatScore,
  type Assessment,
} from '@/lib/teaching';
import {
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { QuizReviewList } from '@/components/quiz-review';

/**
 * Bài trắc nghiệm của sinh viên (assessment.answerMode = 1): giới thiệu và nút "Bắt đầu", làm bài
 * (mỗi lần chọn đáp án được lưu ngay lên server), kết quả sau khi nộp hoặc hết giờ.
 * Hạn làm bài do server quyết định; đồng hồ ở đây chỉ hiển thị theo giờ server.
 */
export function QuizPanel({
  assessment,
  back,
  onPhaseChange,
}: {
  assessment: Assessment;
  back: string;
  /** Bắt đầu / nộp xong: trang cha tải lại để nhãn trạng thái bài làm khớp. */
  onPhaseChange: () => void;
}) {
  const base = `/student/assessments/${encodeURIComponent(assessment.id)}/quiz`;
  const [state, setState] = useState<QuizState | null>(null);
  /** Giờ server − giờ máy, đo lúc nhận dữ liệu. */
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState('');
  const phase = useRef<string | null>(null);
  const phaseChanged = useRef(onPhaseChange);
  useEffect(() => {
    phaseChanged.current = onPhaseChange;
  });

  const receive = useCallback((next: QuizState) => {
    setOffset(Date.parse(next.serverTime) - Date.now());
    setState(next);
    if (phase.current && phase.current !== next.phase) phaseChanged.current();
    phase.current = next.phase;
  }, []);

  const load = useCallback(
    (signal?: AbortSignal) =>
      apiRequest<QuizState>(base, { signal })
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
    return <QuizIntro assessment={assessment} state={state} base={base} onStarted={receive} />;
  if (state.phase === 'in_progress')
    return (
      <QuizRunner
        key={state.startedAt}
        state={state}
        offset={offset}
        base={base}
        onFinished={receive}
        reload={() => void load()}
      />
    );
  return <QuizResultView assessment={assessment} state={state} back={back} />;
}

function QuizIntro({
  assessment,
  state,
  base,
  onStarted,
}: {
  assessment: Assessment;
  state: QuizState;
  base: string;
  onStarted: (state: QuizState) => void;
}) {
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [error, setError] = useState('');

  if (assessment.status === 'closed')
    return (
      <section className="panel quiz-intro">
        <p className="submission-note locked">Bài đã đóng, bạn chưa làm bài này.</p>
      </section>
    );

  function start() {
    setConfirm({
      title: 'Bắt đầu làm bài',
      message: state.timeLimitMinutes
        ? `Bạn có ${state.timeLimitMinutes} phút kể từ bây giờ${assessment.closesAt ? ' (không quá giờ đóng bài)' : ''}. Đồng hồ vẫn chạy khi bạn đóng trang; hết giờ bài được nộp tự động. Mỗi sinh viên chỉ làm một lần.`
        : 'Mỗi sinh viên chỉ làm một lần. Hết giờ đóng bài mà chưa nộp thì các câu đã chọn được nộp tự động.',
      confirmLabel: 'Bắt đầu',
      run: async () => {
        try {
          onStarted(await apiRequest<QuizState>(`${base}/start`, { method: 'POST' }));
        } catch (reason) {
          setError(reason instanceof Error ? reason.message : 'Không bắt đầu được bài.');
        }
      },
    });
  }

  return (
    <section className="panel quiz-intro">
      <div className="panel-title">
        <h2>
          <i className="title-icon blue">
            <Icon name="exam" size={12} />
          </i>
          Bài trắc nghiệm
        </h2>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <ul className="quiz-facts">
        <li>
          <b>{state.questionCount}</b> câu hỏi
        </li>
        <li>
          {state.timeLimitMinutes ? (
            <>
              <b>{state.timeLimitMinutes}</b> phút làm bài
            </>
          ) : (
            <>
              Làm tới{' '}
              <b>{assessment.closesAt ? formatDateTime(assessment.closesAt) : 'khi nộp bài'}</b>
            </>
          )}
        </li>
        <li>
          Thang điểm <b>{MAX_SCORE}</b>, mỗi câu bằng điểm
        </li>
      </ul>
      <p className="admin-hint">
        Câu có ô vuông được chọn nhiều đáp án và phải chọn đúng hết mới được điểm. Đáp án được lưu
        ngay mỗi lần bạn chọn, tải lại trang không mất bài.
      </p>
      <button className="button primary" onClick={start}>
        <Icon name="chevron" size={11} />
        Bắt đầu làm bài
      </button>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </section>
  );
}

type SaveState = 'saving' | 'saved' | 'error';

function QuizRunner({
  state,
  offset,
  base,
  onFinished,
  reload,
}: {
  state: QuizState;
  offset: number;
  base: string;
  onFinished: (state: QuizState) => void;
  reload: () => void;
}) {
  const [questions, setQuestions] = useState<QuizQuestionView[]>(state.questions);
  const [saving, setSaving] = useState<Record<string, SaveState>>({});
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  /** Lần lưu mới nhất của từng câu: phản hồi của lần cũ hơn đến sau thì bỏ qua. */
  const latest = useRef<Record<string, number>>({});
  // Hết giờ: tải lại, server chốt bài và trả kết quả
  const left = useRemaining(state.deadline, offset, reload);
  const answered = answeredCount(questions);
  const pending = Object.values(saving).some((value) => value === 'saving');

  async function choose(question: QuizQuestionView, chosen: number[]) {
    setQuestions((current) =>
      current.map((item) => (item.id === question.id ? { ...item, chosen } : item)),
    );
    const seq = (latest.current[question.id] ?? 0) + 1;
    latest.current[question.id] = seq;
    setSaving((current) => ({ ...current, [question.id]: 'saving' }));
    try {
      await apiRequest<AnswerSaved>(`${base}/answers/${encodeURIComponent(question.id)}`, {
        method: 'PUT',
        body: { chosen },
      });
      if (latest.current[question.id] === seq)
        setSaving((current) => ({ ...current, [question.id]: 'saved' }));
    } catch (reason) {
      if (latest.current[question.id] !== seq) return;
      setSaving((current) => ({ ...current, [question.id]: 'error' }));
      // Hết giờ hoặc đã nộp ở tab khác: tải lại để xem kết quả
      if (reason instanceof ApiError && reason.code === 'SUBMISSION_LOCKED') {
        reload();
        return;
      }
      setFlash({
        type: 'error',
        text: `Chưa lưu được câu ${questions.findIndex((item) => item.id === question.id) + 1}: ${reason instanceof Error ? reason.message : 'lỗi'} Chọn lại để thử lại.`,
      });
    }
  }

  function submit() {
    const missing = questions.length - answered;
    setConfirm({
      title: 'Nộp bài',
      message: `${missing ? `Bạn còn ${missing} câu chưa trả lời. ` : ''}Nộp bài và xem kết quả? Sau khi nộp không sửa được nữa.`,
      confirmLabel: 'Nộp bài',
      run: async () => {
        try {
          onFinished(await apiRequest<QuizState>(`${base}/submit`, { method: 'POST' }));
        } catch (reason) {
          setFlash({
            type: 'error',
            text: reason instanceof Error ? reason.message : 'Không nộp được bài.',
          });
        }
      },
    });
  }

  return (
    <div className="columns quiz-columns">
      <ol className="quiz-questions" aria-label="Câu hỏi">
        {questions.map((question, index) => (
          <li key={question.id} id={`q-${question.id}`} className="question-card">
            <div className="question-head">
              <b className="question-number">Câu {index + 1}</b>
              {question.multiple && <span className="badge muted-solid">Chọn nhiều đáp án</span>}
              <span className={`quiz-save ${saving[question.id] ?? ''}`} aria-live="polite">
                {saving[question.id] === 'saving'
                  ? 'Đang lưu…'
                  : saving[question.id] === 'saved'
                    ? 'Đã lưu'
                    : saving[question.id] === 'error'
                      ? 'Chưa lưu'
                      : ''}
              </span>
            </div>
            <p className="lesson-text question-body">{question.body}</p>
            <div
              className="quiz-options"
              role={question.multiple ? 'group' : 'radiogroup'}
              aria-label={`Đáp án câu ${index + 1}`}
            >
              {question.options.map((option, shown) => {
                const checked = question.chosen.includes(option.position);
                return (
                  <label
                    key={option.position}
                    className={`quiz-option${checked ? ' is-chosen' : ''}`}
                  >
                    <input
                      type={question.multiple ? 'checkbox' : 'radio'}
                      name={`q-${question.id}`}
                      checked={checked}
                      onChange={() =>
                        void choose(
                          question,
                          toggleChoice(question.chosen, option.position, question.multiple),
                        )
                      }
                    />
                    <span className="option-letter">{optionLetter(shown)}</span>
                    <span className="lesson-text">{option.body}</span>
                  </label>
                );
              })}
            </div>
            {!question.multiple && question.chosen.length > 0 && (
              <button className="link-button quiz-clear" onClick={() => void choose(question, [])}>
                Bỏ chọn
              </button>
            )}
          </li>
        ))}
      </ol>
      <aside className="panel quiz-sidebar">
        {left !== null && (
          <p className={`time-left${left < 5 * 60_000 ? ' urgent' : ''}`} role="timer">
            <Icon name="clock" size={13} />
            Còn lại <b>{formatDuration(left)}</b>
          </p>
        )}
        <p className="quiz-progress">
          Đã trả lời <b>{answered}</b>/{questions.length} câu
        </p>
        <nav className="quiz-map" aria-label="Đi tới câu">
          {questions.map((question, index) => (
            <a
              key={question.id}
              href={`#q-${question.id}`}
              className={question.chosen.length ? 'is-answered' : undefined}
              aria-label={`Câu ${index + 1}${question.chosen.length ? ', đã trả lời' : ''}`}
            >
              {index + 1}
            </a>
          ))}
        </nav>
        <FlashMessage flash={flash} onDone={clearFlash} />
        <button className="button primary full-width" disabled={pending} onClick={submit}>
          {pending ? 'Đang lưu…' : 'Nộp bài'}
        </button>
        <p className="admin-hint">
          Bắt đầu lúc {state.startedAt ? formatDateTime(state.startedAt) : ''}
          {state.deadline && ` · hạn ${formatDateTime(state.deadline)}`}. Hết giờ bài được nộp tự
          động.
        </p>
      </aside>
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </div>
  );
}

function QuizResultView({
  assessment,
  state,
  back,
}: {
  assessment: Assessment;
  state: QuizState;
  back: string;
}) {
  const { result } = state;
  return (
    <div className="stack">
      <section className="panel quiz-result">
        <div className="panel-title">
          <h2>
            <i className="title-icon green">
              <Icon name="check" size={12} />
            </i>
            Kết quả
          </h2>
        </div>
        {result && (
          <div className="grade-box">
            <b>
              {formatScore(result.score)} <small>/ {MAX_SCORE} điểm</small>
            </b>
            <p>
              Đúng {result.correct}/{result.total} câu
            </p>
          </div>
        )}
        <p className="submission-note ok">
          <Icon name="check" size={12} />
          Đã nộp lúc {state.submittedAt ? formatDateTime(state.submittedAt) : ''}.
        </p>
        {state.scoreHidden ? (
          <p className="score-pending">
            <Icon name="clock" size={12} />
            {assessment.scoreRelease === 2
              ? 'Giảng viên không công bố điểm và đáp án của bài này.'
              : `Điểm và đáp án được công bố sau giờ đóng bài${assessment.closesAt ? ` (${formatDateTime(assessment.closesAt)})` : ''}.`}
          </p>
        ) : (
          !state.revealed && (
            <p className="admin-hint">
              Giảng viên chưa công bố đáp án
              {assessment.closesAt
                ? ` (có thể sau giờ đóng ${formatDateTime(assessment.closesAt)})`
                : ''}
              .
            </p>
          )
        )}
        <Link href={back} className="button">
          Về danh sách {ASSESSMENT_GROUPS[assessment.type].noun}
        </Link>
      </section>
      {state.revealed && <QuizReviewList questions={state.questions} />}
    </div>
  );
}
