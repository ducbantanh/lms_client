'use client';

import Link from 'next/link';
import { useSession } from '@/providers/session-provider';
import { useCourses } from '@/hooks/use-courses';
import { initials } from '@/lib/course-utils';
import { average, firstName, greeting, progressBuckets } from '@/lib/dashboard';
import { courseHref } from '@/lib/teaching';
import { Card, EmptyHint, PageHeading, Skeleton } from '@/components/ui/card';
import { CountUp, Donut, Legend, ProgressBar, SegmentBar } from '@/components/ui/charts';
import { RatioCard } from '@/components/ui/ratio-card';
import { UpcomingPanel } from '@/components/schedule/upcoming-panel';

/**
 * Trang /dashboard/ của sinh viên: khóa học đang học (tiến độ dạng vạch), biểu đồ vòng tình hình học tập, tiến độ
 * từng khóa, lịch học sắp tới, mức hoàn thành trung bình và giảng viên.
 */
export function StudentDashboard() {
  const { user } = useSession();
  const { courses, loading, error } = useCourses();
  const buckets = progressBuckets(courses.map((course) => course.progress));
  const averageProgress = average(courses.map((course) => course.progress));
  // Giảng viên lấy từ chính danh sách khóa học, kèm số khóa người học đang theo cùng giảng viên đó.
  const teachers = [
    ...courses
      .filter((course) => course.teacher)
      .reduce(
        (map, course) => map.set(course.teacher, (map.get(course.teacher) ?? 0) + 1),
        new Map<string, number>(),
      ),
  ];
  const segments = [
    { label: 'Đang học', value: buckets.learning, color: 'var(--color-chart-blue)' },
    { label: 'Đã học xong', value: buckets.done, color: 'var(--color-chart-green)' },
    { label: 'Chưa bắt đầu', value: buckets.notStarted, color: 'var(--color-chart-amber)' },
  ];
  const byProgress = [...courses].sort((a, b) => (b.progress ?? -1) - (a.progress ?? -1));

  return (
    <main id="main-content" className="shell-main">
      <PageHeading
        title={`${greeting(new Date().getHours())}, ${firstName(user?.fullName)}`}
        description="Tổng quan việc học của bạn."
      />
      {error ? (
        <div className="notice" role="alert">
          {error}
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-12">
          <Card
            title="Khóa học đang học"
            info="Khóa học bạn đã ghi danh; bấm vào khóa để học tiếp bài kế tiếp."
            href="/"
            hrefLabel="Tất cả khóa học"
            className="xl:col-span-7"
          >
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-11" />
                <Skeleton className="h-11" />
                <Skeleton className="h-11" />
              </div>
            ) : courses.length ? (
              <div className="-mx-5 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="text-xs font-medium text-ink-subtle">
                      <th className="px-5 pb-2 font-medium">Khóa học</th>
                      <th className="px-3 pb-2 font-medium">Giảng viên</th>
                      <th className="px-3 pb-2 font-medium">Tiến độ</th>
                      <th className="px-5 pb-2 text-right font-medium">Bài tiếp theo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.slice(0, 5).map((course, index) => (
                      <tr
                        key={course.id}
                        className="group border-t border-line transition-colors hover:bg-surface-muted"
                        style={{ animationDelay: `${120 + index * 50}ms` }}
                      >
                        <td className="max-w-[240px] px-5 py-3">
                          <Link
                            href={courseHref(course.id, course.nextLesson?.id)}
                            className="block truncate font-semibold text-ink transition-colors group-hover:text-primary-600"
                          >
                            {course.title}
                          </Link>
                          <span className="block truncate text-xs text-ink-subtle">
                            {course.code}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          {course.teacher ? (
                            <span className="flex items-center gap-2">
                              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-50 text-[10px] font-bold text-primary-600 ring-2 ring-white">
                                {initials(course.teacher)}
                              </span>
                              <span className="max-w-[140px] truncate text-ink-muted">
                                {course.teacher}
                              </span>
                            </span>
                          ) : (
                            <span className="text-ink-subtle">—</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          {course.progress !== null ? (
                            <span className="flex items-center gap-2.5">
                              <SegmentBar value={course.progress} />
                              <b className="w-9 text-right text-xs font-semibold text-ink tabular-nums">
                                {course.progress}%
                              </b>
                            </span>
                          ) : (
                            <span className="text-xs text-ink-subtle">Chưa có bài học</span>
                          )}
                        </td>
                        <td className="max-w-[180px] truncate px-5 py-3 text-right text-ink-muted">
                          {course.nextLesson?.title ??
                            (course.progress === 100 ? 'Đã học xong' : '—')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyHint>Bạn chưa ghi danh khóa học nào.</EmptyHint>
            )}
          </Card>

          <Card
            title="Tình hình học tập"
            info="Khóa học theo tiến độ: học xong là đã đánh dấu học hết các bài."
            delay={60}
            className="xl:col-span-5"
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Donut
                segments={segments}
                center={
                  <div>
                    <b className="block text-4xl font-semibold tracking-tight text-ink">
                      {loading ? '…' : <CountUp value={courses.length} />}
                    </b>
                    <span className="text-xs text-ink-subtle">khóa học</span>
                  </div>
                }
              />
              <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
                <Legend segments={segments} />
                <div>
                  <div className="mb-2 flex items-center justify-between text-[13px]">
                    <span className="text-ink-muted">Tiến độ trung bình</span>
                    <span className="rounded-sm bg-sidebar px-1.5 py-0.5 text-[11px] font-semibold text-white tabular-nums">
                      {averageProgress ?? 0}%
                    </span>
                  </div>
                  <ProgressBar
                    value={averageProgress ?? 0}
                    color="var(--color-chart-green)"
                    delay={300}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="Tiến độ theo khóa"
            info="Phần trăm bài học đã học của từng khóa."
            delay={120}
            className="xl:col-span-4"
          >
            {byProgress.length ? (
              <ul className="m-0 list-none p-0 space-y-4">
                {byProgress.slice(0, 6).map((course, index) => (
                  <li key={course.id}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px]">
                      <span className="truncate text-ink-muted">{course.title}</span>
                      <b className="font-semibold text-ink tabular-nums">
                        {course.progress === null ? '—' : `${course.progress}%`}
                      </b>
                    </div>
                    <ProgressBar value={course.progress ?? 0} delay={200 + index * 70} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyHint>{loading ? 'Đang tải…' : 'Chưa có khóa học.'}</EmptyHint>
            )}
          </Card>

          <UpcomingPanel href="/schedule/" delay={180} className="xl:col-span-5" />

          <div className="flex flex-col gap-5 xl:col-span-3">
            <RatioCard
              title="Mức hoàn thành"
              info="Trung bình tiến độ của các khóa học đang có bài học."
              value={averageProgress ?? 0}
              leftLabel="Đã học"
              rightLabel="Còn lại"
              delay={240}
              note={
                buckets.done
                  ? `Bạn đã học xong ${buckets.done} khóa học. Tiếp tục nhé!`
                  : 'Học đều mỗi tuần để theo kịp lớp.'
              }
            />
            <Card title="Giảng viên của bạn" delay={300}>
              {teachers.length ? (
                <ul className="m-0 list-none p-0 space-y-3">
                  {teachers.map(([name, count]) => (
                    <li key={name} className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-chart-sky to-chart-violet text-xs font-bold text-white">
                        {initials(name)}
                      </span>
                      <span className="min-w-0">
                        <b className="block truncate text-sm font-semibold text-ink">{name}</b>
                        <small className="text-xs text-ink-subtle">{count} khóa học</small>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyHint>{loading ? 'Đang tải…' : 'Chưa có thông tin giảng viên.'}</EmptyHint>
              )}
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
