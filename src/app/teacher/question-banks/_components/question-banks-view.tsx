'use client';

import Link from 'next/link';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type MouseEvent,
} from 'react';
import { apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import { formatDateTime } from '@/lib/admin';
import { coverFor, normalizeSearch } from '@/lib/course-utils';
import {
  groupBySubject,
  subjectLabel,
  type QuestionBankSummary,
  type Subject,
} from '@/lib/question-bank';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { useViewMode } from '@/hooks/use-view-mode';
import { useSession } from '@/providers/session-provider';
import { Icon } from '@/components/ui/icon';
import { Modal } from '@/components/ui/modal';
import { ViewToggle } from '@/components/ui/view-toggle';

export const bankHref = (bankId: string) =>
  `${TEACHER_PATH}/question-bank/?id=${encodeURIComponent(bankId)}`;

/** Lọc theo môn: 'all' mọi môn, '' ngân hàng chưa gắn môn, còn lại là mã học phần. */
const ALL = 'all';

/** Trang /teacher/question-banks/: ngân hàng câu hỏi của mình, gom theo môn học. */
export function QuestionBanksView() {
  const [banks, setBanks] = useState<QuestionBankSummary[] | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState(ALL);
  /** Đang tạo ngân hàng mới (kèm môn chọn sẵn) hoặc đang sửa một ngân hàng. */
  const [editing, setEditing] = useState<
    { bank: QuestionBankSummary } | { newIn: string | null } | null
  >(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  const deferredSearch = useDeferredValue(search);
  const { user } = useSession();
  // Lưới/danh sách nhớ theo tài khoản, mặc định lưới như trang Khóa học
  const [view, setView] = useViewMode(`lms.ui.question-banks.${user?.id ?? 'guest'}`, 'grid');

  const load = useCallback(
    () =>
      apiRequest<QuestionBankSummary[]>('/teacher/question-banks')
        .then(setBanks)
        .catch((reason) =>
          setError(reason instanceof Error ? reason.message : 'Không tải được ngân hàng câu hỏi.'),
        ),
    [],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const allGroups = useMemo(() => groupBySubject(banks ?? []), [banks]);
  const needle = normalizeSearch(deferredSearch);
  const groups = allGroups
    .filter((group) => subject === ALL || (group.subject?.code ?? '') === subject)
    .map((group) => ({
      ...group,
      banks: group.banks.filter((bank) =>
        normalizeSearch(`${bank.name} ${bank.description ?? ''}`).includes(needle),
      ),
    }))
    .filter((group) => group.banks.length);

  function remove(bank: QuestionBankSummary) {
    setConfirm({
      title: 'Xóa ngân hàng câu hỏi',
      message: `Xóa "${bank.name}" và ${bank.questionCount} câu hỏi bên trong? Bài thi đã tạo từ ngân hàng này không bị ảnh hưởng.`,
      confirmLabel: 'Xóa',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`/teacher/question-banks/${encodeURIComponent(bank.id)}`, {
            method: 'DELETE',
          });
          setFlash({ type: 'success', text: `Đã xóa ${bank.name}.` });
          await load();
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
      <AdminHeading
        title="Ngân hàng câu hỏi"
        description="Câu hỏi trắc nghiệm theo môn học, dùng chung cho các nhóm của học phần khi tạo bài thực hành và bài kiểm tra."
      >
        <button
          className="button primary"
          onClick={() => setEditing({ newIn: subject === ALL ? null : subject })}
        >
          <Icon name="plus" size={13} />
          Tạo ngân hàng
        </button>
      </AdminHeading>
      <FlashMessage flash={flash} onDone={clearFlash} />
      {banks && banks.length > 0 && (
        <div className="toolbar">
          <label className="search-field">
            <Icon name="search" size={14} />
            <span className="sr-only">Tìm ngân hàng câu hỏi</span>
            <input
              className="input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên, mô tả"
              maxLength={64}
            />
          </label>
          <select
            className="select"
            aria-label="Lọc theo môn học"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          >
            <option value={ALL}>Mọi môn học ({banks.length})</option>
            {allGroups.map((group) => (
              <option key={group.subject?.code ?? ''} value={group.subject?.code ?? ''}>
                {group.subject
                  ? subjectLabel(group.subject.code, group.subject.name)
                  : 'Chưa gắn môn học'}{' '}
                ({group.banks.length})
              </option>
            ))}
          </select>
          <div className="toolbar-right">
            <ViewToggle value={view} onChange={setView} />
          </div>
        </div>
      )}
      {error ? (
        <div className="empty-state" role="alert">
          <h3>Chưa tải được ngân hàng câu hỏi</h3>
          <p>{error}</p>
        </div>
      ) : !banks ? (
        <p className="empty-state" role="status">
          Đang tải ngân hàng câu hỏi…
        </p>
      ) : !banks.length ? (
        <div className="empty-state">
          <h3>Chưa có ngân hàng câu hỏi nào</h3>
          <p>
            Tạo ngân hàng cho môn học bạn dạy, có thể chia theo chương (vd. &quot;Chương 1 – Giới
            thiệu Java&quot;), rồi thêm câu hỏi hoặc dán cả đề từ Word.
          </p>
          <button className="button primary" onClick={() => setEditing({ newIn: null })}>
            <Icon name="plus" size={13} />
            Tạo ngân hàng
          </button>
        </div>
      ) : !groups.length ? (
        <div className="empty-state">
          <h3>Không có ngân hàng phù hợp</h3>
          <p>Thử từ khóa khác hoặc chọn &quot;Mọi môn học&quot;.</p>
        </div>
      ) : (
        <div className="stack">
          {groups.map((group) => {
            const title = group.subject
              ? subjectLabel(group.subject.code, group.subject.name)
              : 'Chưa gắn môn học';
            return (
              <section key={group.subject?.code ?? ''} aria-label={title}>
                <div className="bank-group-head">
                  <h2>
                    <i className="title-icon blue">
                      <Icon name={group.subject ? 'book' : 'bank'} size={12} />
                    </i>
                    {title}
                    <span className="count">{group.banks.length}</span>
                  </h2>
                  <button
                    className="link-button"
                    onClick={() => setEditing({ newIn: group.subject?.code ?? '' })}
                  >
                    + Thêm ngân hàng
                  </button>
                </div>
                <div className={`course-grid ${view === 'list' ? 'is-list' : ''}`}>
                  {group.banks.map((bank) => (
                    <BankCard
                      key={bank.id}
                      bank={bank}
                      onEdit={() => setEditing({ bank })}
                      onDelete={() => remove(bank)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
      {editing && (
        <BankDialog
          bank={'bank' in editing ? editing.bank : null}
          defaultSubject={'newIn' in editing ? editing.newIn : null}
          onClose={() => setEditing(null)}
          onSaved={async (saved, created) => {
            setEditing(null);
            setFlash({
              type: 'success',
              text: created ? `Đã tạo ${saved.name}.` : `Đã lưu ${saved.name}.`,
            });
            await load();
          }}
        />
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}

/**
 * Thẻ ngân hàng cùng khung với thẻ khóa học (lưới hoặc danh sách do .course-grid/.is-list bố trí):
 * màu theo mã môn như khóa học cùng môn, số câu hỏi, lần sửa gần nhất, menu Sửa/Xóa.
 */
function BankCard({
  bank,
  onEdit,
  onDelete,
}: {
  bank: QuestionBankSummary;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const href = bankHref(bank.id);
  /** Đóng menu <details> trước khi mở hộp thoại. */
  const run = (action: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.closest('details')?.removeAttribute('open');
    action();
  };
  return (
    <article className="course-card">
      <Link
        href={href}
        className={`course-cover cover-${coverFor(bank.subjectCode ?? bank.name)}`}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="course-body">
        <div className="course-meta">
          <span className="course-code">{bank.subjectCode ?? 'Chưa gắn môn'}</span>
          <details className="dropdown course-options">
            <summary className="icon-button" aria-label={`Tùy chọn ${bank.name}`}>
              <Icon name="more" size={15} />
            </summary>
            <div className="dropdown-panel">
              <button onClick={run(onEdit)}>Sửa tên, môn học, mô tả</button>
              <button className="danger" onClick={run(onDelete)}>
                Xóa ngân hàng
              </button>
            </div>
          </details>
        </div>
        <Link href={href} className="course-title">
          <h2>{bank.name}</h2>
        </Link>
        {bank.description && <p className="course-subtitle">{bank.description}</p>}
        <div className="course-footer">
          <span>Sửa {formatDateTime(bank.updatedAt)}</span>
          <b>{bank.questionCount} câu hỏi</b>
        </div>
      </div>
    </article>
  );
}

/**
 * Tạo (bank null) hoặc sửa tên, môn học, mô tả của một ngân hàng; dùng chung với trang chi tiết.
 * Môn học chọn trong các học phần mình phụ trách; môn đang gắn vẫn giữ được khi đã thôi dạy.
 */
export function BankDialog({
  bank,
  defaultSubject = null,
  onClose,
  onSaved,
}: {
  bank: QuestionBankSummary | null;
  /** Môn chọn sẵn khi tạo ('' = không gắn môn); null = môn đầu tiên trong danh sách. */
  defaultSubject?: string | null;
  onClose: () => void;
  onSaved: (saved: QuestionBankSummary, created: boolean) => Promise<void> | void;
}) {
  const [form, setForm] = useState({
    name: bank?.name ?? '',
    description: bank?.description ?? '',
  });
  /** null = chờ tải danh sách môn để chọn môn đầu tiên. */
  const [subjectCode, setSubjectCode] = useState<string | null>(
    bank ? (bank.subjectCode ?? '') : defaultSubject,
  );
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<Subject[]>('/teacher/question-banks/subjects', { signal: controller.signal })
      .then((list) => {
        setSubjects(list);
        // Tạo mới: môn chọn sẵn phải là môn đang dạy (server kiểm tra lại), không thì lấy môn đầu tiên
        const teaching = (code: string) =>
          list.some((item) => item.code.toUpperCase() === code.toUpperCase());
        setSubjectCode((current) =>
          current === null || (!bank && current && !teaching(current))
            ? (list[0]?.code ?? '')
            : current,
        );
      })
      .catch((reason) => {
        if (controller.signal.aborted) return;
        setSubjects([]);
        setSubjectCode((current) => current ?? '');
        setError(reason instanceof Error ? reason.message : 'Không tải được danh sách môn học.');
      });
    return () => controller.abort();
  }, [bank]);

  // Môn đang gắn mà đã thôi dạy vẫn hiện để giữ nguyên khi sửa ngân hàng
  const options = [...(subjects ?? [])];
  const kept = bank?.subjectCode;
  if (kept && !options.some((item) => item.code.toUpperCase() === kept.toUpperCase()))
    options.push({ code: kept, name: bank?.subjectName ?? '' });

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const saved = await apiRequest<QuestionBankSummary>(
        bank ? `/teacher/question-banks/${encodeURIComponent(bank.id)}` : '/teacher/question-banks',
        {
          method: bank ? 'PUT' : 'POST',
          body: {
            name: form.name.trim(),
            description: form.description.trim(),
            subjectCode: subjectCode ?? '',
          },
        },
      );
      await onSaved(saved, !bank);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được.');
      setBusy(false);
    }
  }

  return (
    <Modal
      title={bank ? 'Sửa ngân hàng câu hỏi' : 'Tạo ngân hàng câu hỏi'}
      onClose={() => !busy && onClose()}
    >
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <label className="form-field">
          Môn học
          <select
            className="select"
            value={subjects ? (subjectCode ?? '') : ''}
            disabled={!subjects}
            onChange={(event) => setSubjectCode(event.target.value)}
          >
            {!subjects && <option value="">Đang tải môn học…</option>}
            {options.map((item) => (
              <option key={item.code} value={item.code}>
                {subjectLabel(item.code, item.name)}
              </option>
            ))}
            <option value="">Không gắn môn học</option>
          </select>
        </label>
        {subjects && !subjects.length && (
          <p className="admin-hint">
            Bạn chưa được phân công khóa học nào nên chưa có môn để chọn; vẫn tạo được ngân hàng
            không gắn môn.
          </p>
        )}
        <label className="form-field">
          Tên ngân hàng
          <input
            className="input"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            maxLength={200}
            placeholder="vd. Chương 1 – Giới thiệu Java"
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
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            maxLength={2000}
          />
        </label>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" disabled={busy || !form.name.trim() || !subjects}>
            {busy ? 'Đang lưu…' : bank ? 'Lưu' : 'Tạo ngân hàng'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
