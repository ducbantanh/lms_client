'use client';

import { useCallback, useId, useRef, useState, type FormEvent } from 'react';
import { apiRequest } from '@/lib/api';
import {
  DIFFICULTIES,
  MAX_BODY,
  MAX_EXPLANATION,
  MAX_OPTION,
  MAX_OPTIONS,
  MIN_OPTIONS,
  draftFrom,
  emptyDraft,
  optionLetter,
  questionProblem,
  setCorrect,
  setMultiple,
  toQuestionRequest,
  type BankQuestion,
  type Difficulty,
  type QuestionDraft,
} from '@/lib/question-bank';
import { FlashMessage, type Flash } from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';

/**
 * Thêm (question null) hoặc sửa một câu hỏi. Khi thêm có nút "Lưu và thêm câu khác": lưu xong
 * form trống lại (giữ kiểu câu và mức độ) để soạn liền nhiều câu.
 */
export function QuestionEditor({
  base,
  question,
  nextNumber,
  onClose,
  onSaved,
}: {
  base: string;
  question: BankQuestion | null;
  /** Số thứ tự của câu sắp thêm (trang cha tải lại sau mỗi lần lưu nên tự tăng). */
  nextNumber: number;
  onClose: () => void;
  /** keepOpen: vừa bấm "Lưu và thêm câu khác", hộp thoại vẫn mở. */
  onSaved: (keepOpen: boolean) => Promise<void>;
}) {
  const [draft, setDraft] = useState<QuestionDraft>(() =>
    question ? draftFrom(question) : emptyDraft(),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState<Flash | null>(null);
  const [added, setAdded] = useState(0);
  const clearNotice = useCallback(() => setNotice(null), []);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const radioName = useId();
  const set = (patch: Partial<QuestionDraft>) => setDraft({ ...draft, ...patch });

  function setOption(index: number, body: string) {
    set({
      options: draft.options.map((option, i) => (i === index ? { ...option, body } : option)),
    });
  }

  async function save(keepOpen: boolean) {
    const problem = questionProblem(draft);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    setError('');
    try {
      await apiRequest(
        question ? `${base}/questions/${encodeURIComponent(question.id)}` : `${base}/questions`,
        { method: question ? 'PUT' : 'POST', body: toQuestionRequest(draft) },
      );
      if (keepOpen) {
        setDraft(emptyDraft(draft));
        setAdded(added + 1);
        setNotice({ type: 'success', text: `Đã thêm câu ${nextNumber}. Soạn tiếp câu mới.` });
        bodyRef.current?.focus();
      }
      await onSaved(keepOpen);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được câu hỏi.');
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void save(false);
  }

  return (
    <Modal
      title={question ? 'Sửa câu hỏi' : `Thêm câu hỏi (câu ${nextNumber})`}
      wide
      onClose={() => !busy && onClose()}
    >
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <FlashMessage flash={notice} onDone={clearNotice} />
        <label className="form-field">
          Nội dung câu hỏi
          <textarea
            ref={bodyRef}
            className="input"
            rows={4}
            value={draft.body}
            onChange={(event) => set({ body: event.target.value })}
            maxLength={MAX_BODY}
            required
            autoFocus
          />
        </label>
        <div className="form-row">
          <div className="form-field">
            Kiểu câu hỏi
            <div className="segmented" role="group" aria-label="Kiểu câu hỏi">
              <button
                type="button"
                className={draft.multiple ? '' : 'selected'}
                aria-pressed={!draft.multiple}
                onClick={() => setDraft(setMultiple(draft, false))}
              >
                Chọn một đáp án
              </button>
              <button
                type="button"
                className={draft.multiple ? 'selected' : ''}
                aria-pressed={draft.multiple}
                onClick={() => setDraft(setMultiple(draft, true))}
              >
                Chọn nhiều đáp án
              </button>
            </div>
          </div>
          <label className="form-field">
            Mức độ
            <select
              className="select"
              value={draft.difficulty}
              onChange={(event) => set({ difficulty: Number(event.target.value) as Difficulty })}
            >
              {([0, 1, 2] as Difficulty[]).map((value) => (
                <option key={value} value={value}>
                  {DIFFICULTIES[value].label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <fieldset className="m-0 mb-4 border-0 p-0">
          <legend className="mb-1.5 text-sm font-semibold text-ink">
            Đáp án{' '}
            <span className="optional">
              — đánh dấu {draft.multiple ? 'các đáp án đúng' : 'đáp án đúng'}
            </span>
          </legend>
          {draft.options.map((option, index) => {
            const letter = optionLetter(index);
            return (
              <div
                key={index}
                className={`mb-2 flex items-center gap-2 ${option.correct ? 'is-correct' : ''}`}
              >
                <input
                  className="size-4 shrink-0 cursor-pointer accent-emerald-700"
                  type={draft.multiple ? 'checkbox' : 'radio'}
                  name={radioName}
                  checked={option.correct}
                  onChange={(event) => setDraft(setCorrect(draft, index, event.target.checked))}
                  aria-label={`Đáp án ${letter} là đáp án đúng`}
                />
                <span className="option-letter">{letter}</span>
                <input
                  className={`input h-9 min-w-0 flex-1 ${option.correct ? 'border-emerald-700 bg-emerald-50' : ''}`}
                  value={option.body}
                  onChange={(event) => setOption(index, event.target.value)}
                  maxLength={MAX_OPTION}
                  placeholder={`Đáp án ${letter}`}
                  aria-label={`Nội dung đáp án ${letter}`}
                />
                <button
                  type="button"
                  className="icon-button row-action danger disabled:cursor-default disabled:opacity-35"
                  title="Xóa đáp án"
                  aria-label={`Xóa đáp án ${letter}`}
                  disabled={draft.options.length <= MIN_OPTIONS}
                  onClick={() => set({ options: draft.options.filter((_, i) => i !== index) })}
                >
                  <Icon name="trash" size={12} />
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className="button small"
            disabled={draft.options.length >= MAX_OPTIONS}
            onClick={() => set({ options: [...draft.options, { body: '', correct: false }] })}
          >
            <Icon name="plus" size={11} />
            Thêm đáp án
          </button>
        </fieldset>
        <label className="form-field">
          <span>
            Giải thích{' '}
            <span className="optional">(không bắt buộc, sinh viên xem khi được xem đáp án)</span>
          </span>
          <textarea
            className="input"
            rows={2}
            value={draft.explanation}
            onChange={(event) => set({ explanation: event.target.value })}
            maxLength={MAX_EXPLANATION}
          />
        </label>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            {added ? 'Đóng' : 'Hủy'}
          </button>
          {!question && (
            <button
              type="button"
              className="button"
              disabled={busy}
              onClick={() => void save(true)}
            >
              Lưu và thêm câu khác
            </button>
          )}
          <button className="button primary" disabled={busy}>
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
