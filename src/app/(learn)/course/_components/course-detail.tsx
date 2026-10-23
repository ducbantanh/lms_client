'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { hasPermission } from '@/lib/auth';
import { useSession } from '@/providers/session-provider';
import { courseLabel, coverFor, initials } from '@/lib/course-utils';
import {
  ASSESSMENT_GROUPS,
  ASSESSMENT_TAB_PARAM,
  SUBMITTABLE_TYPES,
  groupContent,
  type AssessmentType,
  type ContentGroup,
  type CourseContent,
  type CourseProgress,
  type MyResult,
} from '@/lib/teaching';
import { AssessmentItem, FileRow, LessonItem, SectionCard } from '@/components/course-items';
import { ViewToggle } from '@/components/ui/view-toggle';
import { useViewMode } from '@/hooks/use-view-mode';
import { Icon } from '@/components/ui/icon';
import { CourseSidebar } from './course-sidebar';

/** Tab Nội dung, hoặc một loại bài (Bài tập / Bài thực hành / Bài kiểm tra). */
type Tab = 'content' | AssessmentType;
const ASSESSMENT_ORDER: AssessmentType[] = [0, 1, 2];

/** Query id phù hợp static export: khóa học thật không cần biết trước lúc build. */
export function CourseDetail() {
  const params = useSearchParams();
  const id = params.get('id') ?? '';
  // ?tab=exam... để trang làm bài quay về đúng tab
  const initialTab = ASSESSMENT_ORDER.find(
    (type) => ASSESSMENT_TAB_PARAM[type] === params.get('tab'),
  );
  const { user, refresh } = useSession();
  // Các mục/tuần hiện dạng lưới (thẻ) hay danh sách, nhớ theo user (dùng chung mọi khóa học)
  const [view, setView] = useViewMode(`lms.ui.sections.${user?.id ?? 'guest'}`);
  /** Dạng lưới: mục đang mở (id mục, 'loose' = nội dung chưa phân mục); null = xem các thẻ. */
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [content, setContent] = useState<CourseContent | null>(null);
  const [results, setResults] = useState<MyResult[] | null>(null);
  /** null khi chưa tải hoặc người xem không ghi danh (giảng viên xem khóa học): không có nút "đã học". */
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [busyLesson, setBusyLesson] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');
  /** Bài học mở sẵn và cuộn tới: từ ?lesson=... (dashboard) hoặc nút "Bài tiếp theo". */
  const [focusLesson, setFocusLesson] = useState(params.get('lesson'));
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>(initialTab ?? 'content');
  const userId = user?.id;
  const canSubmit = hasPermission(user, 'submissions.create');

  // Sang khóa khác (hoặc đổi tài khoản) thì trang không mount lại: bỏ dữ liệu của khóa cũ ngay
  // trong lần render này, effect bên dưới chỉ tải khóa mới.
  const courseKey = `${userId}:${id}`;
  const [shownKey, setShownKey] = useState(courseKey);
  if (shownKey !== courseKey) {
    setShownKey(courseKey);
    setContent(null);
    setError('');
    setResults(null);
    setProgress(null);
  }

  useEffect(() => {
    if (!userId || !id) return;
    const controller = new AbortController();
    // Server đã lọc bài học/tài liệu bị ẩn và đề của bài chưa mở.
    apiRequest<CourseContent>(`/student/courses/${encodeURIComponent(id)}`, {
      signal: controller.signal,
    })
      .then(setContent)
      .catch((reason) => {
        if (controller.signal.aborted) return;
        if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED') {
          void refresh();
          return;
        }
        setError(
          reason instanceof ApiError && (reason.code === 'NOT_FOUND' || reason.code === 'FORBIDDEN')
            ? 'Khóa học không tồn tại hoặc chưa được ghi danh cho tài khoản của bạn.'
            : reason instanceof Error
              ? reason.message
              : 'Không tải được khóa học.',
        );
      });
    // Kết quả và tiến độ của mình: không chặn trang; người không ghi danh (NOT_FOUND) thì bỏ qua
    if (canSubmit)
      apiRequest<MyResult[]>(`/student/assessments?course=${encodeURIComponent(id)}`, {
        signal: controller.signal,
      })
        .then(setResults)
        .catch(() => undefined);
    apiRequest<CourseProgress>(`/student/courses/${encodeURIComponent(id)}/progress`, {
      signal: controller.signal,
    })
      .then(setProgress)
      .catch(() => undefined);
    return () => controller.abort();
  }, [userId, id, canSubmit, refresh]);

  // Dạng lưới: khi có bài học cần xem (hoặc nội dung vừa tải xong) thì mở sẵn mục chứa bài đó
  const [focusedFor, setFocusedFor] = useState<[CourseContent | null, string | null]>([null, null]);
  if (focusedFor[0] !== content || focusedFor[1] !== focusLesson) {
    setFocusedFor([content, focusLesson]);
    const lesson = content?.lessons.find((item) => item.id === focusLesson);
    if (content && lesson) {
      const inSection = content.sections.some((section) => section.id === lesson.sectionId);
      setOpenSection(inSection ? lesson.sectionId : 'loose');
    }
  }

  async function toggleLesson(lessonId: string, done: boolean) {
    setBusyLesson(lessonId);
    setActionError('');
    try {
      setProgress(
        await apiRequest<CourseProgress>(
          `/student/courses/${encodeURIComponent(id)}/lessons/${encodeURIComponent(lessonId)}/completion`,
          { method: done ? 'DELETE' : 'PUT' },
        ),
      );
    } catch (reason) {
      setActionError(reason instanceof Error ? reason.message : 'Không lưu được tiến độ.');
    } finally {
      setBusyLesson(null);
    }
  }

  function openLesson(lessonId: string) {
    setTab('content');
    setFocusLesson(lessonId);
  }

  if (!id || error)
    return (
      <main id="main-content" className="shell-main">
        <div className="empty-state">
          <h1>Không mở được khóa học</h1>
          <p>{error || 'Đường dẫn không có mã khóa học.'}</p>
          <Link href="/" className="button">
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
  const groups = groupContent(content).filter(
    (group) => group.section || group.lessons.length || group.files.length,
  );
  const empty = !content.files.length && !content.sections.length && !content.lessons.length;
  const unit = course.format === 1 ? 'tuần' : 'mục';
  const groupKey = (group: ContentGroup) => group.section?.id ?? 'loose';
  const groupTitle = (group: ContentGroup) =>
    group.section ? group.section.title : course.format === 2 ? 'Tài liệu' : 'Nội dung khác';
  // Khóa học "chỉ danh sách tài liệu" không có mục nên luôn hiện dạng danh sách
  const grid = view === 'grid' && course.format !== 2;
  const opened = grid ? groups.find((group) => groupKey(group) === openSection) : undefined;
  const completed = progress ? new Set(progress.completedLessonIds) : undefined;

  /** Một mục/tuần với bài học (mở rộng tại chỗ) và tài liệu. */
  const renderSection = (group: ContentGroup) => (
    <section className="panel flush" key={groupKey(group)}>
      <div className="panel-title">
        <h2>{groupTitle(group)}</h2>
      </div>
      {!group.lessons.length && !group.files.length && (
        <p className="empty-cell">Chưa có nội dung.</p>
      )}
      {group.lessons.length > 0 && (
        <ul className="lesson-list">
          {group.lessons.map((item) => {
            const lessonId = item.lesson.id;
            const done = completed?.has(lessonId) ?? false;
            const focused = lessonId === focusLesson;
            return (
              <LessonItem
                // Đổi key khi được chọn để mở lại và cuộn tới, kể cả khi bài đang hiện
                key={focused ? `${lessonId}:focus` : lessonId}
                group={item}
                initiallyOpen={focused}
                completion={
                  completed && {
                    done,
                    busy: busyLesson === lessonId,
                    onToggle: () => void toggleLesson(lessonId, done),
                  }
                }
              />
            );
          })}
        </ul>
      )}
      {group.files.length > 0 && (
        <ul className="file-list">
          {group.files.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </ul>
      )}
    </section>
  );
  const ofType = (type: AssessmentType) =>
    content.assessments.filter((assessment) => assessment.type === type);
  // Cùng thứ tự tab với trang giảng viên (bỏ tab Sinh viên)
  const tabs: { value: Tab; label: string; count: number }[] = [
    { value: 'content', label: 'Nội dung', count: content.lessons.length + content.files.length },
    ...ASSESSMENT_ORDER.map((type) => ({
      value: type,
      label: ASSESSMENT_GROUPS[type].title,
      count: ofType(type).length,
    })),
  ];

  return (
    <main id="main-content" className="shell-main">
      <Link href="/" className="back-link">
        <Icon name="back" size={12} />
        Khóa học
      </Link>
      <div className="detail-header">
        <span className={`course-swatch cover-${coverFor(course.code)}`}>
          {initials(course.title)}
        </span>
        <div>
          <p className="detail-code">{courseLabel(course.code, course.group)}</p>
          <h1>{course.title}</h1>
          {course.description && <p className="detail-subtitle">{course.description}</p>}
          <p className="detail-teacher">Giảng viên: {course.teacherName || 'Chưa có thông tin'}</p>
        </div>
      </div>
      <div className="tabs" role="tablist" aria-label="Nội dung khóa học">
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
      {tab !== 'content' ? (
        <section className="panel">
          {ofType(tab).length ? (
            <ul className="assessment-list">
              {ofType(tab).map((assessment) => (
                <AssessmentItem
                  key={assessment.id}
                  assessment={assessment}
                  // Loại bài có trang làm bài + nộp file (SUBMITTABLE_TYPES)
                  href={
                    SUBMITTABLE_TYPES.includes(assessment.type)
                      ? `/course/assessment/?id=${encodeURIComponent(assessment.id)}`
                      : undefined
                  }
                />
              ))}
            </ul>
          ) : (
            <p className="empty-cell">Chưa có {ASSESSMENT_GROUPS[tab].noun} nào.</p>
          )}
        </section>
      ) : (
        <div className="columns">
          <div className="stack">
            {actionError && (
              <div className="notice" role="alert">
                {actionError}
              </div>
            )}
            {!empty && (
              <div className="content-toolbar">
                {opened ? (
                  <button className="link-button" onClick={() => setOpenSection(null)}>
                    <Icon name="back" size={11} /> Tất cả {unit}
                  </button>
                ) : (
                  <span>
                    {course.format !== 2 &&
                      `${groups.length} ${unit} · ${content.lessons.length} bài học · `}
                    {content.files.length} tài liệu
                  </span>
                )}
                {course.format !== 2 && (
                  <ViewToggle
                    value={view}
                    onChange={(next) => {
                      setView(next);
                      setOpenSection(null);
                    }}
                  />
                )}
              </div>
            )}
            {empty ? (
              <section className="panel">
                <p className="empty-cell">
                  Tài liệu sẽ xuất hiện khi giảng viên cập nhật nội dung khóa học.
                </p>
              </section>
            ) : opened ? (
              renderSection(opened)
            ) : grid ? (
              <div className="section-grid">
                {groups.map((group) => (
                  <SectionCard
                    key={groupKey(group)}
                    title={groupTitle(group)}
                    group={group}
                    completed={completed}
                    onOpen={() => setOpenSection(groupKey(group))}
                  />
                ))}
              </div>
            ) : (
              groups.map(renderSection)
            )}
          </div>
          <CourseSidebar
            content={content}
            results={results}
            progress={progress}
            onOpenTab={setTab}
            onOpenLesson={openLesson}
          />
        </div>
      )}
    </main>
  );
}
