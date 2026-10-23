import Link from 'next/link';
import { TEACHER_PATH } from '@/lib/auth';
import { coverFor } from '@/lib/course-utils';
import { COURSE_FORMATS, type OverviewCourse } from '@/lib/teaching';

/**
 * Thẻ khóa học của giảng viên/admin, cùng khung với CourseCard của sinh viên (lưới hoặc danh sách,
 * CSS .course-grid/.is-list bố trí lại): việc cần làm (chờ chấm, đang mở), sĩ số và tiến độ trung bình.
 */
export function TeacherCourseCard({
  course,
  showTeacher,
}: {
  course: OverviewCourse;
  /** Admin xem mọi khóa học: hiện giảng viên phụ trách (hoặc "Chưa phân công"). */
  showTeacher: boolean;
}) {
  const href = `${TEACHER_PATH}/course/?id=${encodeURIComponent(course.id)}`;
  const progress = course.averageProgress;
  return (
    <article className="course-card">
      <Link
        href={href}
        className={`course-cover cover-${coverFor(course.code)}`}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="course-body">
        <div className="course-meta">
          <span className="course-code">
            {course.code} · {COURSE_FORMATS[course.format]}
          </span>
        </div>
        <Link href={href} className="course-title">
          <h2>{course.title}</h2>
        </Link>
        {showTeacher && (
          <p className="course-teacher">
            {course.teacherName ?? <span className="badge warn">Chưa phân công</span>}
          </p>
        )}
        {(course.toGrade > 0 || course.openAssessments > 0) && (
          <p className="course-badges">
            {course.toGrade > 0 && (
              <span className="badge warn" title="Bài đã nộp chưa chấm">
                {course.toGrade} chờ chấm
              </span>
            )}
            {course.openAssessments > 0 && (
              <span className="badge ok">{course.openAssessments} bài đang mở</span>
            )}
          </p>
        )}
        <div className="course-footer">
          <span>{course.studentCount} sinh viên</span>
          {progress !== null && <b title="Tiến độ trung bình của lớp">{progress}%</b>}
        </div>
        {progress !== null && (
          <div
            className="progress-track"
            role="progressbar"
            aria-label={`Tiến độ trung bình ${course.title}`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </article>
  );
}
