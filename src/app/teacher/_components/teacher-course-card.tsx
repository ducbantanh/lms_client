import Link from 'next/link';
import { TEACHER_PATH } from '@/lib/auth';
import { courseLabel, coverFor } from '@/lib/course-utils';
import { COURSE_FORMATS, type OverviewCourse } from '@/lib/teaching';
import {
  TILE,
  TILE_BODY,
  TILE_CODE,
  TILE_COVER,
  TILE_FOOTER,
  TILE_FOOTER_VALUE,
  TILE_HEADING,
  TILE_LINE,
  TILE_META,
  TILE_TITLE,
} from '@/components/ui/tile';

/**
 * Thẻ khóa học của giảng viên/admin, cùng khung với CourseCard của sinh viên (lưới hoặc danh sách,
 * lưới đặt data-view): việc cần làm (chờ chấm, đang mở), sĩ số và tiến độ trung bình.
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
    <article className={TILE}>
      <Link
        href={href}
        className={`${TILE_COVER} cover-${coverFor(course.code)}`}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className={TILE_BODY}>
        <div className={TILE_META}>
          <span className={TILE_CODE}>
            {courseLabel(course.code, course.group)} · {COURSE_FORMATS[course.format]}
          </span>
        </div>
        <Link href={href} className={TILE_TITLE}>
          <h2 className={TILE_HEADING}>{course.title}</h2>
        </Link>
        {showTeacher && (
          <p className={`${TILE_LINE} mt-1.5`}>
            {course.teacherName ?? <span className="badge warn">Chưa phân công</span>}
          </p>
        )}
        {(course.toGrade > 0 || course.openAssessments > 0) && (
          <p className="mt-2 flex flex-wrap gap-1.5">
            {course.toGrade > 0 && (
              <span className="badge warn m-0" title="Bài đã nộp chưa chấm">
                {course.toGrade} chờ chấm
              </span>
            )}
            {course.openAssessments > 0 && (
              <span className="badge ok m-0">{course.openAssessments} bài đang mở</span>
            )}
          </p>
        )}
        <div className={TILE_FOOTER}>
          <span>{course.studentCount} sinh viên</span>
          {progress !== null && (
            <b className={TILE_FOOTER_VALUE} title="Tiến độ trung bình của lớp">
              {progress}%
            </b>
          )}
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
