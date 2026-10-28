'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import { formatDateTime } from '@/lib/admin';
import {
  DIFFICULTIES,
  filterQuestions,
  optionLetter,
  subjectLabel,
  type BankQuestion,
  type Difficulty,
  type DifficultyFilter,
  type QuestionBankDetail,
} from '@/lib/question-bank';
import {
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { BankDialog } from '@/app/teacher/question-banks/_components/question-banks-view';
import { QuestionEditor } from './question-editor';
import { ImportDialog } from './import-dialog';

const BANKS_PATH = `${TEACHER_PATH}/question-banks/`;

/** Trang /teacher/question-bank/?id=...: câu hỏi của một ngân hàng; thêm, sửa, xóa, nhập từ văn bản. */
export function QuestionBankView() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id') ?? '';
  const base = `/teacher/question-banks/${encodeURIComponent(id)}`;
  const [data, setData] = useState<QuestionBankDetail | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  /** 'new' = đang thêm câu mới. */
  const [editing, setEditing] = useState<BankQuestion | 'new' | null>(null);
  const [importing, setImporting] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  const deferredSearch = useDeferredValue(search);

  const reload = useCallback(
    () =>
      apiRequest<QuestionBankDetail>(base)
        .then((next) => {
          setData(next);
          // Bỏ chọn những câu vừa bị xóa
          const ids = new Set(next.questions.map((question) => question.id));
          setSelected((prev) => new Set([...prev].filter((questionId) => ids.has(questionId))));
        })
        .catch((reason) =>
          setError(
            reason instanceof ApiError && reason.code === 'NOT_FOUND'
              ? 'Ngân hàng câu hỏi không tồn tại hoặc không phải của bạn.'
              : reason instanceof Error
                ? reason.message
                : 'Không tải được ngân hàng câu hỏi.',
          ),
        ),
    [base],
  );

  // Như trang khóa học: đổi id trên URL thì bỏ dữ liệu cũ ngay trong lần render này
  const [shownId, setShownId] = useState(id);
  if (shownId !== id) {
    setShownId(id);
    setData(null);
    setError('');
    setSelected(new Set());
  }

  useEffect(() => {
    if (id) void reload();
  }, [id, reload]);

  const questions = data?.questions;
  const filtered = useMemo(
    () => filterQuestions(questions ?? [], { search: deferredSearch, difficulty }),
    [questions, deferredSearch, difficulty],
  );
  /** Số thứ tự trong cả ngân hàng, không đổi khi lọc. */
  const numbers = useMemo(
    () => new Map((questions ?? []).map((question, index) => [question.id, index + 1])),
    [questions],
  );

  if (!id || error)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state rounded-2xl border border-line/80 bg-white/90 p-12 text-center shadow-card backdrop-blur-xs">
          <h1>{error ? 'Chưa mở được ngân hàng câu hỏi' : 'Thiếu mã ngân hàng câu hỏi'}</h1>
          <p>{error || 'Đường dẫn không có mã ngân hàng câu hỏi.'}</p>
          <Link href={BANKS_PATH} className="button">
            Về danh sách ngân hàng
          </Link>
        </div>
      </main>
    );
  if (!data)
    return (
      <main id="main-content" className="shell-main">
        <p className="empty-state" role="status">
          Đang tải ngân hàng câu hỏi…
        </p>
      </main>
    );

  const { bank } = data;
  const allShownSelected = filtered.length > 0 && filtered.every((q) => selected.has(q.id));
  const countOf = (value: Difficulty) =>
    data.questions.filter((question) => question.difficulty === value).length;

  function toggle(questionId: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(questionId);
      else next.delete(questionId);
      return next;
    });
  }

  function toggleShown(checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const question of filtered) {
        if (checked) next.add(question.id);
        else next.delete(question.id);
      }
      return next;
    });
  }

  function removeQuestions(ids: string[]) {
    setConfirm({
      title: 'Xóa câu hỏi',
      message:
        ids.length === 1
          ? `Xóa câu ${numbers.get(ids[0])}? Bài thi đã tạo từ câu này không bị ảnh hưởng.`
          : `Xóa ${ids.length} câu hỏi đã chọn? Bài thi đã tạo từ các câu này không bị ảnh hưởng.`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`${base}/questions/delete`, { method: 'POST', body: { ids } });
          setFlash({ type: 'success', text: `Đã xóa ${ids.length} câu hỏi.` });
          await reload();
        } catch (reason) {
          setFlash({
            type: 'error',
            text: reason instanceof Error ? reason.message : 'Không xóa được.',
          });
        }
      },
    });
  }

  function deleteBank() {
    setConfirm({
      title: 'Xóa ngân hàng câu hỏi',
      message: `Xóa "${bank.name}" và ${bank.questionCount} câu hỏi bên trong? Bài thi đã tạo từ ngân hàng này không bị ảnh hưởng.`,
      confirmLabel: 'Xóa ngân hàng',
      danger: true,
      run: async () => {
        try {
          await apiRequest(base, { method: 'DELETE' });
          router.replace(BANKS_PATH);
        } catch (reason) {
          setFlash({
            type: 'error',
            text: reason instanceof Error ? reason.message : 'Không xóa được.',
          });
        }
      },
    });
  }

  return (
    <main id="main-content" className="shell-main">
      <Link href={BANKS_PATH} className="back-link">
        <Icon name="back" size={12} />
        Ngân hàng câu hỏi
      </Link>
      <div className="page-heading">
        <div>
          <p className="text-[13px] font-semibold text-ink-subtle">
            {bank.subjectCode
              ? subjectLabel(bank.subjectCode, bank.subjectName)
              : 'Chưa gắn môn học'}{' '}
            · {bank.questionCount} câu hỏi · Sửa lần cuối {formatDateTime(bank.updatedAt)}
          </p>
          <h1>{bank.name}</h1>
          {bank.description && <p>{bank.description}</p>}
        </div>
        <div className="button-row">
          <button className="button" onClick={() => setRenaming(true)}>
            <Icon name="edit" size={13} />
            Sửa thông tin
          </button>
          <button className="button" onClick={deleteBank}>
            <Icon name="trash" size={13} />
            Xóa ngân hàng
          </button>
        </div>
      </div>
      <FlashMessage flash={flash} onDone={clearFlash} />
      <div className="toolbar rounded-2xl bg-white/70 p-2.5 border border-line/80 shadow-xs backdrop-blur-xs">
        <label className="search-field">
          <Icon name="search" size={14} />
          <span className="sr-only">Tìm câu hỏi</span>
          <input
            className="input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm trong câu hỏi và đáp án"
            maxLength={100}
          />
        </label>
        <select
          className="select"
          aria-label="Lọc theo mức độ"
          value={difficulty}
          onChange={(event) =>
            setDifficulty(
              event.target.value === 'all' ? 'all' : (Number(event.target.value) as Difficulty),
            )
          }
        >
          <option value="all">Mọi mức độ ({data.questions.length})</option>
          {([0, 1, 2] as Difficulty[]).map((value) => (
            <option key={value} value={value}>
              {DIFFICULTIES[value].label} ({countOf(value)})
            </option>
          ))}
        </select>
        <div className="toolbar-right">
          <button className="button" onClick={() => setImporting(true)}>
            <Icon name="upload" size={13} />
            Nhập từ văn bản
          </button>
          <button className="button primary" onClick={() => setEditing('new')}>
            <Icon name="plus" size={13} />
            Thêm câu hỏi
          </button>
        </div>
      </div>
      {!data.questions.length ? (
        <div className="empty-state panel">
          <h3>Ngân hàng chưa có câu hỏi nào</h3>
          <p>Thêm từng câu, hoặc dán cả đề trắc nghiệm từ Word bằng &quot;Nhập từ văn bản&quot;.</p>
        </div>
      ) : !filtered.length ? (
        <div className="empty-state">
          <h3>Không có câu hỏi phù hợp</h3>
          <p>Thử từ khóa khác hoặc chọn &quot;Mọi mức độ&quot;.</p>
        </div>
      ) : (
        <>
          <div className="selection-bar">
            <label className="check-field">
              <input
                type="checkbox"
                checked={allShownSelected}
                onChange={(event) => toggleShown(event.target.checked)}
              />
              {filtered.length === data.questions.length
                ? `Chọn tất cả ${filtered.length} câu`
                : `Chọn ${filtered.length} câu đang hiện`}
            </label>
            {selected.size > 0 && (
              <>
                <span>Đã chọn {selected.size} câu</span>
                <button className="link-button" onClick={() => setSelected(new Set())}>
                  Bỏ chọn
                </button>
                <button
                  className="button small danger"
                  onClick={() => removeQuestions([...selected])}
                >
                  <Icon name="trash" size={11} />
                  Xóa {selected.size} câu
                </button>
              </>
            )}
          </div>
          <ol className="question-list" aria-label="Câu hỏi">
            {filtered.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                number={numbers.get(question.id) ?? 0}
                checked={selected.has(question.id)}
                onCheck={(checked) => toggle(question.id, checked)}
                onEdit={() => setEditing(question)}
                onDelete={() => removeQuestions([question.id])}
              />
            ))}
          </ol>
        </>
      )}
      {editing && (
        <QuestionEditor
          base={base}
          question={editing === 'new' ? null : editing}
          nextNumber={data.questions.length + 1}
          onClose={() => setEditing(null)}
          onSaved={async (keepOpen) => {
            if (!keepOpen) {
              setEditing(null);
              setFlash({
                type: 'success',
                text: editing === 'new' ? 'Đã thêm câu hỏi.' : 'Đã lưu câu hỏi.',
              });
            }
            await reload();
          }}
        />
      )}
      {importing && (
        <ImportDialog
          base={base}
          onClose={() => setImporting(false)}
          onImported={async (added) => {
            setImporting(false);
            setFlash({ type: 'success', text: `Đã thêm ${added} câu hỏi.` });
            await reload();
          }}
        />
      )}
      {renaming && (
        <BankDialog
          bank={bank}
          onClose={() => setRenaming(false)}
          onSaved={async (saved) => {
            setRenaming(false);
            setFlash({ type: 'success', text: `Đã lưu ${saved.name}.` });
            await reload();
          }}
        />
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}

/** Một câu hỏi: nội dung, đáp án (đáp án đúng tô xanh), giải thích. */
function QuestionCard({
  question,
  number,
  checked,
  onCheck,
  onEdit,
  onDelete,
}: {
  question: BankQuestion;
  number: number;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const difficulty = DIFFICULTIES[question.difficulty];
  return (
    <li className={`question-card${checked ? ' is-selected' : ''}`}>
      <div className="question-head">
        <label className="question-number">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => onCheck(event.target.checked)}
          />
          Câu {number}
        </label>
        <span className={`badge ${difficulty.tone}`}>{difficulty.label}</span>
        {question.multiple && <span className="badge muted-solid">Chọn nhiều</span>}
        <span className="file-actions">
          <button
            className="icon-button row-action"
            title="Sửa câu hỏi"
            aria-label={`Sửa câu ${number}`}
            onClick={onEdit}
          >
            <Icon name="edit" size={13} />
          </button>
          <button
            className="icon-button row-action danger"
            title="Xóa câu hỏi"
            aria-label={`Xóa câu ${number}`}
            onClick={onDelete}
          >
            <Icon name="trash" size={13} />
          </button>
        </span>
      </div>
      <p className="lesson-text question-body">{question.body}</p>
      <ol className="question-options">
        {question.options.map((option, index) => (
          <li key={index} className={option.correct ? 'is-correct' : undefined}>
            <span className="option-letter">{optionLetter(index)}</span>
            <span className="lesson-text">{option.body}</span>
            {option.correct && (
              <>
                <Icon name="check" size={12} className="option-check" />
                <span className="sr-only">(đáp án đúng)</span>
              </>
            )}
          </li>
        ))}
      </ol>
      {question.explanation && (
        <p className="question-explanation lesson-text">
          <b>Giải thích:</b> {question.explanation}
        </p>
      )}
    </li>
  );
}
