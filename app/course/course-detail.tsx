'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@/components/icon';
import { Modal } from '@/components/modal';
import { useCourses } from '@/lib/use-courses';
import { useSession } from '@/lib/session-provider';

/** Query id phù hợp static export: khóa học thật không cần biết trước lúc build. */
export function CourseDetail() {
  const searchParams = useSearchParams();
  const { courses, loading, error } = useCourses();
  const { isDemo } = useSession();
  const course = courses.find((item) => item.id === searchParams.get('id'));
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  if (loading)
    return (
      <main id="main-content" className="page-width main-content">
        <p role="status">Đang tải khóa học…</p>
      </main>
    );
  if (!course || error)
    return (
      <main id="main-content" className="page-width main-content">
        <div className="empty-state">
          <Icon name="book" size={40} />
          <h1>{error ? 'Chưa tải được khóa học' : 'Không tìm thấy khóa học'}</h1>
          <p>{error || 'Khóa học không tồn tại hoặc chưa được ghi danh cho tài khoản của bạn.'}</p>
          <Link href="/" className="btn btn-outline-secondary button">
            Về danh sách khóa học
          </Link>
        </div>
      </main>
    );

  return (
    <main id="main-content" className="page-width main-content">
      <div className="breadcrumb">
        <Link href="/">Các khóa học của tôi</Link>
        <Icon name="chevron" size={12} />
        <span className="current">{course.title}</span>
      </div>
      <div className={`detail-hero cover-${course.cover}`}>
        <span className="cover-pattern" />
        <div>
          <span className="detail-code">{course.code}</span>
          <h1>{course.title}</h1>
          <p>{course.subtitle}</p>
          <span className="detail-teacher">
            <Icon name="user" size={16} />
            {course.teacher || 'Chưa có thông tin giảng viên'}
          </span>
        </div>
        <span className="detail-hero-icon">
          <Icon name="book" size={100} />
        </span>
      </div>
      <div className="detail-columns">
        <section className="card content-panel">
          <div className="panel-title">
            <h2>
              <Icon name="book" />
              Nội dung khóa học
            </h2>
            <span>{isDemo ? 'Nội dung minh họa' : 'Tài liệu học tập'}</span>
          </div>
          {isDemo ? (
            [
              'Giới thiệu và mục tiêu môn học',
              'Kiến thức nền tảng',
              'Thực hành và ứng dụng',
              'Ôn tập và đánh giá',
            ].map((chapter, index) => (
              <details className="chapter" key={chapter} open={index === 0}>
                <summary>
                  <span className="chapter-number">0{index + 1}</span>
                  <span>
                    <small>TUẦN {index + 1}</small>
                    <b>{chapter}</b>
                  </span>
                  <Icon name="down" size={18} />
                </summary>
                <div className="chapter-content">
                  {['Tổng quan bài học', 'Tài liệu và hướng dẫn', 'Bài thực hành'].map(
                    (lesson, lessonIndex) => (
                      <button
                        key={lesson}
                        className="lesson-row"
                        onClick={() => setSelectedLesson(`${chapter} — ${lesson}`)}
                      >
                        <Icon name={lessonIndex === 2 ? 'cap' : 'file'} size={19} />
                        <span>{lesson}</span>
                        <span className="lesson-kind">
                          {lessonIndex === 2 ? 'Thực hành' : 'Bài học'}
                        </span>
                        <Icon name="chevron" size={15} />
                      </button>
                    ),
                  )}
                </div>
              </details>
            ))
          ) : (
            <div className="empty-state">
              <p>Tài liệu sẽ xuất hiện khi giảng viên cập nhật nội dung khóa học.</p>
            </div>
          )}
        </section>
        <aside className="detail-sidebar">
          <section className="card content-panel">
            <h2>Thông tin khóa học</h2>
            <dl>
              <div>
                <dt>Học kỳ</dt>
                <dd>{course.semesterLabel}</dd>
              </div>
              <div>
                <dt>Trạng thái</dt>
                <dd>{course.status === 'current' ? 'Đang học' : 'Đã hoàn thành'}</dd>
              </div>
              <div>
                <dt>Số bài học</dt>
                <dd>{course.lessons ?? 'Chưa cập nhật'}</dd>
              </div>
            </dl>
            <div className="course-progress-heading">
              <span>Tiến độ của bạn</span>
              <b>{course.progress === null ? '—' : `${course.progress}%`}</b>
            </div>
            <div className="progress progress-track">
              <span className="progress-bar" style={{ width: `${course.progress ?? 0}%` }} />
            </div>
          </section>
          {isDemo && (
            <p className="notice">
              Bạn đang xem khóa học mẫu. Nội dung bài học, nộp bài và điểm số chưa kết nối dữ liệu
              thật.
            </p>
          )}
          <Link href="/" className="btn btn-outline-secondary button full-width">
            Quay lại khóa học
          </Link>
        </aside>
      </div>
      {selectedLesson && (
        <Modal title="Xem trước bài học" onClose={() => setSelectedLesson(null)}>
          <span className="eyebrow">{course.title}</span>
          <h3>{selectedLesson}</h3>
          <p>
            Đây là phần xem trước bố cục nội dung. Trong phiên bản kết nối đầy đủ, bài học và tài
            liệu do giảng viên đăng tải sẽ xuất hiện ở đây.
          </p>
          <div className="notice">
            Chức năng xem tài liệu và nộp bài cần API khóa học từ máy chủ.
          </div>
          <button
            className="btn btn-primary button primary"
            onClick={() => setSelectedLesson(null)}
          >
            Quay lại nội dung
          </button>
        </Modal>
      )}
    </main>
  );
}
