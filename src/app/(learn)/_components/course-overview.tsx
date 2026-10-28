'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { CourseCard } from './course-card';
import { FlashMessage, type Flash } from '@/components/admin-ui';
import { JoinCourseDialog } from './join-course-dialog';
import { ViewToggle } from '@/components/ui/view-toggle';
import { RESULTS_FOOTER, TILE_GRID, TILE_SKELETON } from '@/components/ui/tile';
import { useCourses } from '@/hooks/use-courses';
import { useCoursePreferences } from '@/hooks/use-course-preferences';
import { useSession } from '@/providers/session-provider';
import { selectCourses } from '@/lib/course-utils';
import type { CourseFilter, SortOrder } from '@/lib/types';

const FILTERS: { value: CourseFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'current', label: 'Đang học' },
  { value: 'completed', label: 'Đã hoàn thành' },
  { value: 'starred', label: 'Yêu thích' },
];
const PAGE_SIZE = 8;

export function CourseOverview() {
  const { user, refresh } = useSession();
  const { courses, loading, error, reload } = useCourses();
  // SessionProvider chỉ hiện trang này khi đã đăng nhập; fallback chỉ để thỏa kiểu dữ liệu.
  const preferences = useCoursePreferences(user?.id ?? 'anonymous');
  // Các state này chỉ điều khiển UI, không ảnh hưởng việc ghi danh hay quyền server.
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<CourseFilter>('all');
  const [semester, setSemester] = useState('all');
  const [sort, setSort] = useState<SortOrder>('recent');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [announcement, setAnnouncement] = useState('');
  const [joining, setJoining] = useState(false);
  const [flash, setFlash] = useState<Flash | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);
  // Ưu tiên phản hồi ô nhập, chỉ tính lại kết quả sau cập nhật tìm kiếm.
  const deferredSearch = useDeferredValue(search);

  const filteredCourses = useMemo(
    () =>
      selectCourses(courses, {
        search: deferredSearch,
        filter,
        semester,
        sort,
        starred: preferences.starred,
        hidden: preferences.hidden,
      }),
    [courses, deferredSearch, filter, semester, sort, preferences.starred, preferences.hidden],
  );

  const semesters = useMemo(
    () =>
      [...new Map(courses.map((course) => [course.semester, course.semesterLabel])).entries()].sort(
        ([a], [b]) => b.localeCompare(a),
      ),
    [courses],
  );
  const shownCourses = filteredCourses.slice(0, visibleCount);
  const hiddenCount = courses.filter((course) => preferences.hidden.includes(course.id)).length;

  /** Khi đổi bộ lọc, bắt đầu lại trang đầu để số lượng card luôn dễ dự đoán. */
  function resetPage() {
    setVisibleCount(PAGE_SIZE);
  }
  function clearFilters() {
    setSearch('');
    setFilter('all');
    setSemester('all');
    resetPage();
  }

  return (
    <main id="main-content" className="shell-main">
      <div className="page-heading">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Khóa học của tôi</h1>
          <p className="mt-0.5 text-xs text-ink-muted">Danh sách các học phần bạn đang tham gia trong học kỳ</p>
        </div>
        <button className="button primary shadow-xs" onClick={() => setJoining(true)}>
          <Icon name="plus" size={12} />
          Tham gia bằng mã
        </button>
      </div>
      <FlashMessage flash={flash} onDone={clearFlash} />

      <div className="tabs" aria-label="Trạng thái khóa học">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            className={filter === item.value ? 'selected' : ''}
            aria-pressed={filter === item.value}
            onClick={() => {
              setFilter(item.value);
              resetPage();
            }}
          >
            {item.label}
            {item.value === 'all' && <span className="count">{courses.length - hiddenCount}</span>}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <label className="search-field">
          <Icon name="search" size={14} />
          <span className="sr-only">Tìm kiếm khóa học</span>
          <input
            className="input"
            type="search"
            placeholder="Tìm theo tên, mã học phần, giảng viên"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
          />
        </label>
        <div className="toolbar-right">
          {/* Chỉ một học kỳ thì bộ lọc không có tác dụng. */}
          {semesters.length > 1 && (
            <select
              className="select"
              aria-label="Lọc học kỳ"
              value={semester}
              onChange={(event) => {
                setSemester(event.target.value);
                resetPage();
              }}
            >
              <option value="all">Tất cả học kỳ</option>
              {semesters.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          )}
          <select
            className="select"
            aria-label="Sắp xếp khóa học"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as SortOrder);
              resetPage();
            }}
          >
            <option value="recent">Mới cập nhật</option>
            <option value="name">Tên A–Z</option>
          </select>
          <ViewToggle value={preferences.view} onChange={preferences.setView} />
        </div>
      </div>

      <p className="sr-only" role="status">
        {announcement}
      </p>
      {loading ? (
        <div className={TILE_GRID} aria-label="Đang tải khóa học" aria-busy="true">
          {Array.from({ length: 4 }, (_, index) => (
            <div className={TILE_SKELETON} key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="empty-state" role="alert">
          <h3>Chưa tải được khóa học</h3>
          <p>{error}</p>
          <button
            className="button"
            onClick={() => {
              void refresh();
              reload();
            }}
          >
            Thử lại
          </button>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="empty-state">
          <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 shadow-xs">
            <Icon name="book" size={20} />
          </span>
          <h3>
            {courses.length === 0 ? 'Bạn chưa có khóa học nào' : 'Không tìm thấy khóa học phù hợp'}
          </h3>
          <p className="mx-auto max-w-md">
            {courses.length === 0
              ? 'Khóa học sẽ xuất hiện khi giảng viên ghi danh cho bạn, hoặc khi bạn tham gia bằng mã.'
              : filter === 'starred'
                ? 'Chọn "Đánh dấu yêu thích" trong menu của khóa học để lưu vào đây.'
                : 'Thử từ khóa khác hoặc đặt lại bộ lọc.'}
          </p>
          {courses.length > 0 ? (
            <button className="button" onClick={clearFilters}>
              Xem tất cả khóa học
            </button>
          ) : (
            <button className="button primary shadow-xs" onClick={() => setJoining(true)}>
              <Icon name="plus" size={12} />
              Tham gia bằng mã ngay
            </button>
          )}
        </div>
      ) : (
        <div className={TILE_GRID} data-view={preferences.view} aria-label="Danh sách khóa học">
          {shownCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              starred={preferences.starred.includes(course.id)}
              hidden={preferences.hidden.includes(course.id)}
              onStar={() => {
                preferences.toggleStar(course.id);
                setAnnouncement(`${course.title}: đã cập nhật yêu thích.`);
              }}
              onHide={() => {
                preferences.toggleHidden(course.id);
                setAnnouncement(`${course.title}: đã thay đổi hiển thị.`);
              }}
            />
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className={RESULTS_FOOTER}>
          <span className="min-w-30" aria-live="polite">
            {Math.min(visibleCount, filteredCourses.length)} / {filteredCourses.length} khóa học
          </span>
          {visibleCount < filteredCourses.length && (
            <button
              className="button max-md:order-3 max-md:w-full"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Xem thêm
            </button>
          )}
          {(hiddenCount > 0 || filter === 'hidden') && (
            <button
              className={`link-button min-w-30 text-right ${filter === 'hidden' ? 'selected' : ''}`}
              onClick={() => {
                setFilter(filter === 'hidden' ? 'all' : 'hidden');
                resetPage();
              }}
            >
              {filter === 'hidden' ? 'Quay lại danh sách' : `Đã ẩn (${hiddenCount})`}
            </button>
          )}
        </div>
      )}
      {joining && (
        <JoinCourseDialog
          onClose={() => setJoining(false)}
          onJoined={(title) => {
            setJoining(false);
            setFlash({ type: 'success', text: `Đã tham gia ${title}.` });
            reload();
          }}
        />
      )}
    </main>
  );
}
