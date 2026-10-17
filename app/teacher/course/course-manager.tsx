'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { TEACHER_PATH } from '@/lib/auth';
import { COURSE_FORMATS, type CourseContent } from '@/lib/teaching';
import {
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import { Icon } from '@/components/icon';
import { ContentTab } from './content-tab';
import { StudentsTab } from './students-tab';
import { AssessmentsTab } from './assessments-tab';

type Tab = 'content' | 'students' | 'assessments';

/** Những gì mỗi tab cần từ trang cha: dữ liệu khóa học, tải lại, báo kết quả, hỏi xác nhận. */
export interface TabProps {
  content: CourseContent;
  base: string;
  reload: () => Promise<void>;
  notify: (flash: Flash) => void;
  confirm: (request: ConfirmRequest) => void;
}

/** Biến lỗi API thành thông báo đỏ; dùng trong catch của các thao tác. */
export function errorFlash(reason: unknown): Flash {
  return { type: 'error', text: reason instanceof Error ? reason.message : 'Lỗi không xác định.' };
}

/** Trang /teacher/course/?id=...: nội dung, sinh viên và bài kiểm tra của một khóa học. */
export function CourseManager() {
  const router = useRouter();
  const id = useSearchParams().get('id') ?? '';
  const base = `/teacher/courses/${encodeURIComponent(id)}`;
  const [content, setContent] = useState<CourseContent | null>(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('content');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);

  const reload = useCallback(async () => {
    try {
      setContent(await apiRequest<CourseContent>(base));
    } catch (reason) {
      setError(
        reason instanceof ApiError && reason.code === 'NOT_FOUND'
          ? 'Khóa học không tồn tại hoặc bạn không phụ trách khóa học này.'
          : reason instanceof Error
            ? reason.message
            : 'Không tải được khóa học.',
      );
    }
  }, [base]);

  useEffect(() => {
    if (id) void reload();
  }, [id, reload]);

  if (!id || error)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state">
          <h1>{error ? 'Chưa mở được khóa học' : 'Thiếu mã khóa học'}</h1>
          <p>{error || 'Đường dẫn không có mã khóa học.'}</p>
          <Link href={`${TEACHER_PATH}/`} className="button">
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
  const tabProps: TabProps = { content, base, reload, notify: setFlash, confirm: setConfirm };
  const tabs: { value: Tab; label: string; count: number }[] = [
    { value: 'content', label: 'Nội dung', count: content.files.length },
    { value: 'students', label: 'Sinh viên', count: course.studentCount },
    { value: 'assessments', label: 'Bài kiểm tra', count: content.assessments.length },
  ];

  function deleteCourse() {
    setConfirm({
      title: 'Xóa khóa học',
      message: `Xóa "${course.code} – ${course.title}"? Toàn bộ tài liệu, bài kiểm tra và danh sách sinh viên sẽ bị xóa vĩnh viễn.`,
      confirmLabel: 'Xóa khóa học',
      danger: true,
      run: async () => {
        try {
          await apiRequest(base, { method: 'DELETE' });
          router.replace(`${TEACHER_PATH}/`);
        } catch (reason) {
          setFlash(errorFlash(reason));
        }
      },
    });
  }

  return (
    <main id="main-content" className="shell-main">
      <Link href={`${TEACHER_PATH}/`} className="back-link">
        <Icon name="back" size={12} />
        Khóa học
      </Link>
      <div className="page-heading">
        <div>
          <p className="detail-code">
            {course.code} · {COURSE_FORMATS[course.format]}
            {course.teacherName && ` · ${course.teacherName}`}
          </p>
          <h1>{course.title}</h1>
          {course.description && <p>{course.description}</p>}
        </div>
        <button className="button" onClick={deleteCourse}>
          <Icon name="trash" size={13} />
          Xóa khóa học
        </button>
      </div>
      <FlashMessage flash={flash} onDone={clearFlash} />
      <div className="tabs" role="tablist" aria-label="Quản lý khóa học">
        {tabs.map((item) => (
          <button
            key={item.value}
            role="tab"
            className={tab === item.value ? 'selected' : ''}
            aria-selected={tab === item.value}
            onClick={() => setTab(item.value)}
          >
            {item.label}
            <span className="count">{item.count}</span>
          </button>
        ))}
      </div>
      {tab === 'content' && <ContentTab {...tabProps} />}
      {tab === 'students' && <StudentsTab {...tabProps} />}
      {tab === 'assessments' && <AssessmentsTab {...tabProps} />}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}
