'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { TEACHER_PATH, hasPermission } from '@/lib/auth';
import { courseLabel } from '@/lib/course-utils';
import { useSession } from '@/providers/session-provider';
import {
  ASSESSMENT_GROUPS,
  COURSE_FORMATS,
  gradebookUrl,
  type AssessmentType,
  type CourseContent,
  type CourseFormat,
  type CourseInfo,
} from '@/lib/teaching';
import { Modal } from '@/components/ui/modal';
import { TeacherSelect } from '@/components/teacher-select';
import { GroupField } from '@/components/course-group-field';
import {
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { Icon } from '@/components/ui/icon';
import { ContentTab } from './content-tab';
import { StudentsTab } from './students-tab';
import { AssessmentsTab } from './assessments-tab';
import { NotificationsTab } from './notifications-tab';
import { AttendanceTab } from './attendance-tab';

type Tab = 'content' | 'students' | 'attendance' | 'practice' | 'lab' | 'exam' | 'notifications';
const TABS: Tab[] = [
  'content',
  'students',
  'attendance',
  'practice',
  'lab',
  'exam',
  'notifications',
];

/** Tab bài: mỗi loại bài (Assessment.TYPE_*) một tab. */
const ASSESSMENT_TABS: { value: Tab; type: AssessmentType }[] = [
  { value: 'practice', type: 0 },
  { value: 'lab', type: 1 },
  { value: 'exam', type: 2 },
];

/** Những gì mỗi tab cần từ trang cha: dữ liệu khóa học, tải lại, báo kết quả, hỏi xác nhận. */
export interface TabProps {
  content: CourseContent;
  base: string;
  reload: () => Promise<void>;
  notify: (flash: Flash) => void;
  confirm: (request: ConfirmRequest) => void;
  /**
   * Người xem là giảng viên phụ trách: được thêm/sửa nội dung, bài, chấm điểm, gửi thông báo.
   * Admin chỉ xem (server trả TEACHER_ONLY); ghi danh sinh viên thì cả hai đều làm được.
   */
  canTeach: boolean;
}

/** Biến lỗi API thành thông báo đỏ; dùng trong catch của các thao tác. */
export function errorFlash(reason: unknown): Flash {
  return { type: 'error', text: reason instanceof Error ? reason.message : 'Lỗi không xác định.' };
}

/** Trang /teacher/course/?id=...: nội dung, sinh viên và bài kiểm tra của một khóa học. */
export function CourseManager() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const id = params.get('id') ?? '';
  // Tab nằm trong URL (?tab=...): F5/chia sẻ link giữ đúng tab, menu bên trái tô đúng mục con,
  // trang bài nộp quay về đúng tab bài
  const tab = TABS.find((value) => value === params.get('tab')) ?? 'content';
  const setTab = (next: Tab) =>
    router.replace(
      `${pathname}?id=${encodeURIComponent(id)}${next === 'content' ? '' : `&tab=${next}`}`,
      { scroll: false },
    );
  const base = `/teacher/courses/${encodeURIComponent(id)}`;
  const [content, setContent] = useState<CourseContent | null>(null);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [editing, setEditing] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const { user } = useSession();
  const canAssign = hasPermission(user, 'courses.assign');
  const clearFlash = useCallback(() => setFlash(null), []);

  const reload = useCallback(
    () =>
      apiRequest<CourseContent>(base)
        .then(setContent)
        .catch((reason) => {
          setError(
            reason instanceof ApiError && reason.code === 'NOT_FOUND'
              ? 'Khóa học không tồn tại hoặc bạn không phụ trách khóa học này.'
              : reason instanceof Error
                ? reason.message
                : 'Không tải được khóa học.',
          );
        }),
    [base],
  );

  // Chuyển sang khóa khác từ menu thì trang không mount lại: bỏ dữ liệu/lỗi của khóa cũ ngay
  // trong lần render này, effect bên dưới tải khóa mới.
  const [shownId, setShownId] = useState(id);
  if (shownId !== id) {
    setShownId(id);
    setContent(null);
    setError('');
    setEditing(false);
  }

  useEffect(() => {
    if (id) void reload();
  }, [id, reload]);

  if (!id || error)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state">
          <h1>{error ? 'Chưa mở được khóa học' : 'Thiếu mã khóa học'}</h1>
          <p>{error || 'Đường dẫn không có mã khóa học.'}</p>
          <Link href={`${TEACHER_PATH}/courses/`} className="button">
            Về danh sách khóa học
          </Link>
        </div>
      </main>
    );
  if (!content)
    return (
      <main id="main-content" className="shell-main">
        <p className="empty-state" role="status">
          Đang tải khóa học…
        </p>
      </main>
    );

  const { course } = content;
  const canTeach = !!course.teacherId && course.teacherId === user?.id;
  const tabProps: TabProps = {
    content,
    base,
    reload,
    notify: setFlash,
    confirm: setConfirm,
    canTeach,
  };
  const tabs: { value: Tab; label: string; count?: number }[] = [
    { value: 'content', label: 'Nội dung', count: content.lessons.length + content.files.length },
    { value: 'students', label: 'Sinh viên', count: course.studentCount },
    { value: 'attendance', label: 'Điểm danh' },
    ...ASSESSMENT_TABS.map(({ value, type }) => ({
      value,
      label: ASSESSMENT_GROUPS[type].title,
      count: content.assessments.filter((assessment) => assessment.type === type).length,
    })),
    { value: 'notifications', label: 'Thông báo' },
  ];
  const assessmentTab = ASSESSMENT_TABS.find((item) => item.value === tab);

  function deleteCourse() {
    setConfirm({
      title: 'Xóa khóa học',
      message: `Xóa "${courseLabel(course.code, course.group)} – ${course.title}"? Toàn bộ tài liệu, bài kiểm tra và danh sách sinh viên sẽ bị xóa vĩnh viễn.`,
      confirmLabel: 'Xóa khóa học',
      danger: true,
      run: async () => {
        try {
          await apiRequest(base, { method: 'DELETE' });
          router.replace(`${TEACHER_PATH}/courses/`);
        } catch (reason) {
          setFlash(errorFlash(reason));
        }
      },
    });
  }

  return (
    <main id="main-content" className="shell-main">
      <Link href={`${TEACHER_PATH}/courses/`} className="back-link">
        <Icon name="back" size={12} />
        Khóa học
      </Link>
      <div className="page-heading">
        <div>
          <p className="text-[13px] font-semibold text-ink-subtle">
            {courseLabel(course.code, course.group)} · {COURSE_FORMATS[course.format]} ·{' '}
            {course.teacherName ?? <span className="badge warn">Chưa phân công giảng viên</span>}
          </p>
          <h1>{course.title}</h1>
          {course.description && <p>{course.description}</p>}
        </div>
        <div className="button-row">
          <button className="button" onClick={() => setEditing(true)}>
            <Icon name="edit" size={13} />
            Sửa thông tin
          </button>
          {/* Server trả file CSV (Content-Disposition: attachment) nên link thường là đủ */}
          <a className="button" href={gradebookUrl(course.id)} download>
            <Icon name="download" size={13} />
            Bảng điểm
          </a>
          {/* Phân công và xóa khóa học chỉ dành cho admin (courses.assign) */}
          {canAssign && (
            <>
              <button className="button" onClick={() => setAssigning(true)}>
                <Icon name="teach" size={13} />
                Đổi giảng viên
              </button>
              <button className="button" onClick={deleteCourse}>
                <Icon name="trash" size={13} />
                Xóa khóa học
              </button>
            </>
          )}
        </div>
      </div>
      <FlashMessage flash={flash} onDone={clearFlash} />
      <div className="tabs p-1 bg-surface-muted/60 rounded-2xl border border-line/60 backdrop-blur-xs shadow-xs" role="tablist" aria-label="Quản lý khóa học">
        {tabs.map((item) => (
          <button
            key={item.value}
            role="tab"
            className={tab === item.value ? 'selected' : ''}
            aria-selected={tab === item.value}
            onClick={() => setTab(item.value)}
          >
            {item.label}
            {item.count !== undefined && <span className="count">{item.count}</span>}
          </button>
        ))}
      </div>
      {tab === 'content' && <ContentTab {...tabProps} />}
      {tab === 'students' && <StudentsTab {...tabProps} />}
      {tab === 'attendance' && <AttendanceTab {...tabProps} />}
      {tab === 'notifications' && <NotificationsTab {...tabProps} />}
      {assessmentTab && <AssessmentsTab {...tabProps} type={assessmentTab.type} />}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
      {editing && <CourseDialog {...tabProps} onClose={() => setEditing(false)} />}
      {assigning && <AssignTeacherDialog {...tabProps} onClose={() => setAssigning(false)} />}
    </main>
  );
}

/** Chỉ admin: đổi giảng viên phụ trách; giảng viên cũ mất quyền quản lý khóa học ngay. */
function AssignTeacherDialog({
  content,
  base,
  reload,
  notify,
  onClose,
}: TabProps & { onClose: () => void }) {
  const { course } = content;
  const [teacherId, setTeacherId] = useState(course.teacherId ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const saved = await apiRequest<CourseInfo>(`${base}/teacher`, {
        method: 'PUT',
        body: { teacherId },
      });
      notify({ type: 'success', text: `Đã phân công ${saved.teacherName} phụ trách khóa học.` });
      onClose();
      await reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không phân công được.');
      setBusy(false);
    }
  }

  return (
    <Modal title="Đổi giảng viên phụ trách" onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <TeacherSelect value={teacherId} onChange={setTeacherId} />
        <p className="admin-hint">
          Giảng viên mới quản lý toàn bộ nội dung, sinh viên và bài kiểm tra của khóa học; giảng
          viên cũ không còn thấy khóa học này.
        </p>
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button
            className="button primary"
            disabled={busy || !teacherId || teacherId === course.teacherId}
          >
            {busy ? 'Đang lưu…' : 'Phân công'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/** Sửa mã, nhóm, tên, mô tả; dạng khóa học chỉ đổi được giữa "theo mục" và "theo tuần". */
function CourseDialog({
  content,
  base,
  reload,
  notify,
  onClose,
}: TabProps & { onClose: () => void }) {
  const { course } = content;
  const [form, setForm] = useState({
    code: course.code,
    group: course.group ?? '',
    title: course.title,
    description: course.description ?? '',
    format: course.format,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await apiRequest(base, {
        method: 'PUT',
        body: {
          ...form,
          code: form.code.trim(),
          group: form.group.trim(),
          title: form.title.trim(),
        },
      });
      notify({ type: 'success', text: 'Đã lưu thông tin khóa học.' });
      onClose();
      await reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không lưu được.');
      setBusy(false);
    }
  }

  return (
    <Modal title="Sửa thông tin khóa học" onClose={() => !busy && onClose()}>
      <form onSubmit={submit}>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="form-row">
          <label className="form-field">
            Mã học phần
            <input
              className="input"
              value={form.code}
              onChange={(event) => set({ code: event.target.value })}
              maxLength={32}
              required
            />
          </label>
          <GroupField value={form.group} onChange={(group) => set({ group })} />
        </div>
        <label className="form-field">
          Tên khóa học
          <input
            className="input"
            value={form.title}
            onChange={(event) => set({ title: event.target.value })}
            maxLength={200}
            required
            autoFocus
          />
        </label>
        {course.format !== 2 && (
          <label className="form-field">
            Dạng
            <select
              className="select"
              value={form.format}
              onChange={(event) => set({ format: Number(event.target.value) as CourseFormat })}
            >
              {([0, 1] as const).map((value) => (
                <option key={value} value={value}>
                  {COURSE_FORMATS[value]}
                </option>
              ))}
            </select>
          </label>
        )}
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
        <div className="dialog-actions">
          <button type="button" className="button" disabled={busy} onClick={onClose}>
            Hủy
          </button>
          <button
            className="button primary"
            disabled={busy || !form.code.trim() || !form.title.trim()}
          >
            {busy ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
