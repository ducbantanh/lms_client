'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { formatDateTime } from '@/lib/admin';
import { statusInfo, type MyAttendance } from '@/lib/attendance';
import {
  ASSESSMENT_TYPES,
  MAX_SCORE,
  SUBMISSION_STATUS,
  formatRelative,
  formatScore,
  isSubmittable,
  resultSummary,
  upcomingItems,
  type Assessment,
  type AssessmentType,
  type CourseContent,
  type CourseProgress,
  type MyResult,
} from '@/lib/teaching';
import { Icon } from '@/components/ui/icon';

/** Còn dưới 24 giờ tới hạn nộp mà chưa nộp thì tô đỏ. */
const URGENT_MS = 24 * 3600_000;

/** Link tới trang làm bài với bài nộp được (isSubmittable); bài khác mở tab của loại đó. */
function AssessmentLink({
  assessment,
  onOpenTab,
  className = '',
}: {
  assessment: Assessment;
  onOpenTab: (type: AssessmentType) => void;
  className?: string;
}) {
  const style = `min-w-0 text-left text-sm font-semibold wrap-anywhere text-ink transition-colors hover:text-primary-600 ${className}`;
  return isSubmittable(assessment) ? (
    <Link href={`/course/assessment/?id=${encodeURIComponent(assessment.id)}`} className={style}>
      {assessment.title}
    </Link>
  ) : (
    <button className={style} onClick={() => onOpenTab(assessment.type)}>
      {assessment.title}
    </button>
  );
}

/** Số lớn đầu khung (58%, 6/11, 0/2…). */
const BIG_NUMBER = 'text-[26px] leading-[1.2] font-bold text-ink tabular-nums';
const NEXT_LESSON = 'mt-3.5 flex flex-col gap-0.5 text-[13px] text-ink-muted';

/**
 * Cột phải tab Nội dung của sinh viên: tiến độ, bài sắp đến hạn, kết quả của mình, thông tin khóa học.
 * `results` null khi chưa tải hoặc tài khoản không có quyền nộp bài (khi đó ẩn phần kết quả);
 * `progress` null khi người xem không ghi danh (ẩn phần tiến độ).
 */
export function CourseSidebar({
  content,
  results,
  progress,
  onOpenTab,
  onOpenLesson,
}: {
  content: CourseContent;
  results: MyResult[] | null;
  progress: CourseProgress | null;
  onOpenTab: (type: AssessmentType) => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const { course, assessments } = content;
  // Cập nhật "còn bao lâu" mỗi phút
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);
  const upcoming = upcomingItems(assessments, results ?? [], now);
  const summary = results ? resultSummary(assessments, results) : null;
  const graded = results
    ? assessments.flatMap((assessment) => {
        const score = results.find((result) => result.assessmentId === assessment.id)?.score;
        return score === null || score === undefined ? [] : [{ assessment, score }];
      })
    : [];

  return (
    <div className="stack">
      {progress && progress.percent !== null && (
        <section className="panel">
          <div className="panel-title">
            <h2>
              <i className="title-icon green">
                <Icon name="check" size={11} />
              </i>
              Tiến độ
            </h2>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <b className={BIG_NUMBER}>{progress.percent}%</b>
            <span className="text-[13px] text-ink-muted">
              {[
                progress.lessonsTotal > 0 &&
                  `${progress.lessonsDone}/${progress.lessonsTotal} bài học`,
                progress.assessmentsTotal > 0 &&
                  `${progress.assessmentsDone}/${progress.assessmentsTotal} bài kiểm tra`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </span>
          </div>
          <div
            className="progress-track mt-3 h-1.5"
            role="progressbar"
            aria-label="Tiến độ khóa học"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${progress.percent}%` }} />
          </div>
          {progress.nextLesson ? (
            <p className={NEXT_LESSON}>
              <span className="text-xs text-ink-subtle">Bài tiếp theo</span>
              <button
                className="text-left text-sm font-semibold wrap-anywhere text-primary-600 hover:text-primary-700"
                onClick={() => onOpenLesson(progress.nextLesson!.id)}
              >
                {progress.nextLesson.title}
              </button>
            </p>
          ) : (
            progress.lessonsTotal > 0 && <p className={NEXT_LESSON}>Bạn đã học hết các bài học.</p>
          )}
        </section>
      )}
      {progress && <AttendancePanel courseId={course.id} />}
      <section className="panel">
        <div className="panel-title">
          <h2>
            <i className="title-icon red">
              <Icon name="clock" size={12} />
            </i>
            Sắp đến hạn
          </h2>
        </div>
        {upcoming.length ? (
          <ul className="m-0 list-none p-0">
            {upcoming.map(({ assessment, kind, at, result }) => {
              const left = Date.parse(at) - now;
              const done = result?.status === 'submitted' || result?.status === 'auto_submitted';
              const urgent = kind === 'due' && !done && left < URGENT_MS;
              return (
                <li
                  key={assessment.id}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-0.5 border-t border-l-3 border-line py-2.5 pl-3 first:border-t-0 ${
                    urgent ? 'border-l-red-600' : ''
                  }`}
                >
                  <span className="col-start-1 text-xs font-semibold text-ink-subtle">
                    {ASSESSMENT_TYPES[assessment.type]}
                  </span>
                  <AssessmentLink
                    assessment={assessment}
                    onOpenTab={onOpenTab}
                    className="col-start-1"
                  />
                  <small
                    className={`col-start-1 text-[13px] ${urgent ? 'font-semibold text-red-600' : 'text-ink-muted'}`}
                  >
                    {kind === 'due'
                      ? `Hạn nộp còn ${formatRelative(left)}`
                      : `Mở sau ${formatRelative(left)}`}
                    {' · '}
                    {formatDateTime(at)}
                  </small>
                  {done && (
                    <span className="badge ok col-start-2 row-span-3 row-start-1 m-0 self-center">
                      {SUBMISSION_STATUS[result!.status].label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="empty-cell">Không có bài nào sắp mở hoặc sắp hết hạn.</p>
        )}
      </section>
      {summary && (
        <section className="panel">
          <div className="panel-title">
            <h2>
              <i className="title-icon blue">
                <Icon name="check" size={11} />
              </i>
              Kết quả của bạn
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <b className={BIG_NUMBER}>
                {summary.submitted}
                <small className="text-sm font-semibold text-ink-subtle">/{summary.total}</small>
              </b>
              <span className="text-[13px] text-ink-muted">bài kiểm tra đã nộp</span>
            </div>
            <div className="flex flex-col">
              <b className={BIG_NUMBER}>
                {summary.average === null ? '—' : formatScore(summary.average)}
              </b>
              <span className="text-[13px] text-ink-muted">
                điểm trung bình{summary.graded ? ` (${summary.graded} bài đã chấm)` : ''}
              </span>
            </div>
          </div>
          {summary.total > 0 && (
            <div
              className="progress-track mt-3 h-1.5"
              role="progressbar"
              aria-label="Tỉ lệ bài đã nộp"
              aria-valuenow={Math.round((summary.submitted / summary.total) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${(summary.submitted / summary.total) * 100}%` }} />
            </div>
          )}
          {graded.length > 0 && (
            <ul className="m-0 mt-3.5 list-none p-0">
              {graded.map(({ assessment, score }) => (
                <li
                  key={assessment.id}
                  className="flex items-baseline justify-between gap-3 border-t border-line py-2"
                >
                  <AssessmentLink assessment={assessment} onOpenTab={onOpenTab} />
                  <b className="shrink-0 text-base text-primary-600 tabular-nums">
                    {formatScore(score)}
                    <small className="text-sm font-semibold text-ink-subtle">/{MAX_SCORE}</small>
                  </b>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <section className="panel">
        <div className="panel-title">
          <h2>
            <i className="title-icon blue">
              <Icon name="info" size={11} />
            </i>
            Khóa học
          </h2>
        </div>
        <dl className="info-list">
          <div>
            <dt>Giảng viên</dt>
            <dd>{course.teacherName || 'Chưa có thông tin'}</dd>
          </div>
          {course.format !== 2 && (
            <div>
              <dt>Bài học</dt>
              <dd>{content.lessons.length}</dd>
            </div>
          )}
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
  );
}

/** Số buổi điểm danh gần nhất hiện trong cột phải; xem đủ thì hỏi giảng viên hoặc xuất từ phía giảng viên. */
const RECENT_SESSIONS = 5;

/** Điểm danh của mình: số buổi có mặt và các buổi gần nhất. Ẩn khi khóa học chưa có buổi điểm danh. */
function AttendancePanel({ courseId }: { courseId: string }) {
  const [sessions, setSessions] = useState<MyAttendance[] | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    apiRequest<MyAttendance[]>(`/student/courses/${encodeURIComponent(courseId)}/attendance`, {
      signal: controller.signal,
    })
      .then(setSessions)
      .catch(() => undefined);
    return () => controller.abort();
  }, [courseId]);

  if (!sessions?.length) return null;
  const attended = sessions.filter((item) => item.status === 0 || item.status === 1).length;
  return (
    <section className="panel">
      <div className="panel-title">
        <h2>
          <i className="title-icon violet">
            <Icon name="qrcode" size={11} />
          </i>
          Điểm danh
        </h2>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <b className={BIG_NUMBER}>
          {attended}/{sessions.length}
        </b>
        <span className="text-[13px] text-ink-muted">buổi có mặt</span>
      </div>
      <ul className="m-0 mt-3 list-none p-0">
        {sessions
          .slice(-RECENT_SESSIONS)
          .reverse()
          .map((item) => (
            <li
              key={item.sessionId}
              className="flex items-center justify-between gap-2 border-t border-line py-2 text-sm"
            >
              <span>
                {item.title}
                <small className="block text-xs text-ink-subtle">
                  {formatDateTime(item.createdAt)}
                </small>
              </span>
              <span className={`badge m-0 ${statusInfo(item.status).tone}`}>
                {statusInfo(item.status).label}
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
}
