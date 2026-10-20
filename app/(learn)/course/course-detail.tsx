'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ApiError, apiRequest } from '@/lib/api';
import { useSession } from '@/lib/session-provider';
import { coverFor, initials } from '@/lib/course-utils';
import { COURSE_FORMATS, groupFiles, type CourseContent } from '@/lib/teaching';
import { AssessmentItem, FileRow } from '@/components/course-items';
import { Icon } from '@/components/icon';

/** Query id phù hợp static export: khóa học thật không cần biết trước lúc build. */
export function CourseDetail() {
  const id = useSearchParams().get('id') ?? '';
  const { user, refresh } = useSession();
  const [content, setContent] = useState<CourseContent | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !id) return;
    const controller = new AbortController();
    setContent(null);
    setError('');
    // Server đã lọc tài liệu bị ẩn và đề của bài chưa mở.
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
    return () => controller.abort();
  }, [user?.id, id]);

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
  const groups = groupFiles(content).filter((group) => group.section || group.files.length);
  const empty = !content.files.length && !content.sections.length;

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
          <p className="detail-code">{course.code}</p>
          <h1>{course.title}</h1>
          {course.description && <p className="detail-subtitle">{course.description}</p>}
          <p className="detail-teacher">Giảng viên: {course.teacherName || 'Chưa có thông tin'}</p>
        </div>
      </div>
      <div className="columns">
        <div className="stack">
          {empty ? (
            <section className="panel">
              <p className="empty-cell">
                Tài liệu sẽ xuất hiện khi giảng viên cập nhật nội dung khóa học.
              </p>
            </section>
          ) : (
            groups.map(({ section, files }) => (
              <section className="panel flush" key={section?.id ?? 'loose'}>
                <div className="panel-title">
                  <h2>
                    {section ? section.title : course.format === 2 ? 'Tài liệu' : 'Tài liệu khác'}
                  </h2>
                </div>
                {files.length ? (
                  <ul className="file-list">
                    {files.map((file) => (
                      <FileRow key={file.id} file={file} />
                    ))}
                  </ul>
                ) : (
                  <p className="empty-cell">Chưa có tài liệu.</p>
                )}
              </section>
            ))
          )}
        </div>
        <div className="stack">
          <section className="panel">
            <div className="panel-title">
              <h2>
                <i className="title-icon red">
                  <Icon name="exam" size={12} />
                </i>
                Bài kiểm tra
              </h2>
            </div>
            {content.assessments.length ? (
              <ul className="assessment-list">
                {content.assessments.map((assessment) => (
                  <AssessmentItem key={assessment.id} assessment={assessment} />
                ))}
              </ul>
            ) : (
              <p className="empty-cell">Chưa có bài kiểm tra.</p>
            )}
          </section>
          <section className="panel">
            <div className="panel-title">
              <h2>
                <i className="title-icon blue">
                  <Icon name="info" size={11} />
                </i>
                Thông tin
              </h2>
            </div>
            <dl className="info-list">
              <div>
                <dt>Định dạng</dt>
                <dd>{COURSE_FORMATS[course.format]}</dd>
              </div>
              <div>
                <dt>Tài liệu</dt>
                <dd>{content.files.length}</dd>
              </div>
              <div>
                <dt>Sinh viên</dt>
                <dd>{course.studentCount}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
