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
}: {
  assessment: Assessment;
  onOpenTab: (type: AssessmentType) => void;
}) {
  return isSubmittable(assessment) ? (
    <Link href={`/course/assessment/?id=${encodeURIComponent(assessment.id)}`}>
      {assessment.title}
    </Link>
  ) : (
    <button className="link-button" onClick={() => onOpenTab(assessment.type)}>
      {assessment.title}
    </button>
  );
}

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
          <div className="progress-head">
            <b>{progress.percent}%</b>
            <span>
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
            className="progress-track"
            role="progressbar"
            aria-label="Tiến độ khóa học"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${progress.percent}%` }} />
          </div>
          {progress.nextLesson ? (
            <p className="next-lesson">
              <span>Bài tiếp theo</span>
              <button className="link-button" onClick={() => onOpenLesson(progress.nextLesson!.id)}>
                {progress.nextLesson.title}
              </button>
            </p>
          ) : (
            progress.lessonsTotal > 0 && <p className="next-lesson">Bạn đã học hết các bài học.</p>
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
          <ul className="upcoming-list">
            {upcoming.map(({ assessment, kind, at, result }) => {
              const left = Date.parse(at) - now;
              const done = result?.status === 'submitted' || result?.status === 'auto_submitted';
              const urgent = kind === 'due' && !done && left < URGENT_MS;
              return (
                <li key={assessment.id} className={urgent ? 'urgent' : ''}>
                  <span className="upcoming-type">{ASSESSMENT_TYPES[assessment.type]}</span>
                  <AssessmentLink assessment={assessment} onOpenTab={onOpenTab} />
                  <small>
                    {kind === 'due'
                      ? `Hạn nộp còn ${formatRelative(left)}`
                      : `Mở sau ${formatRelative(left)}`}
                    {' · '}
                    {formatDateTime(at)}
                  </small>
                  {done && (
                    <span className="badge ok">{SUBMISSION_STATUS[result!.status].label}</span>
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
          <div className="result-stats">
            <div>
              <b>
                {summary.submitted}
                <small>/{summary.total}</small>
              </b>
              <span>bài kiểm tra đã nộp</span>
            </div>
            <div>
              <b>{summary.average === null ? '—' : formatScore(summary.average)}</b>
              <span>điểm trung bình{summary.graded ? ` (${summary.graded} bài đã chấm)` : ''}</span>
            </div>
          </div>
          {summary.total > 0 && (
            <div
              className="progress-track"
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
            <ul className="score-list">
              {graded.map(({ assessment, score }) => (
                <li key={assessment.id}>
                  <AssessmentLink assessment={assessment} onOpenTab={onOpenTab} />
                  <b>
                    {formatScore(score)}
                    <small>/{MAX_SCORE}</small>
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
      <div className="progress-head">
        <b>
          {attended}/{sessions.length}
        </b>
        <span>buổi có mặt</span>
      </div>
      <ul className="attendance-mine">
        {sessions
          .slice(-RECENT_SESSIONS)
          .reverse()
          .map((item) => (
            <li key={item.sessionId}>
              <span>
                {item.title}
                <small>{formatDateTime(item.createdAt)}</small>
              </span>
              <span className={`badge ${statusInfo(item.status).tone}`}>
                {statusInfo(item.status).label}
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
}
