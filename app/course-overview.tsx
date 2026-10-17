'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { Icon } from '@/components/icon';
import { CourseCard } from '@/components/course-card';
import { useCourses } from '@/lib/use-courses';
import { useCoursePreferences } from '@/lib/use-course-preferences';
import { useSession } from '@/lib/session-provider';
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
  const preferences = useCoursePreferences(user.id);
  // Các state này chỉ điều khiển UI, không ảnh hưởng việc ghi danh hay quyền server.
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<CourseFilter>('all');
  const [semester, setSemester] = useState('all');
  const [sort, setSort] = useState<SortOrder>('recent');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [announcement, setAnnouncement] = useState('');
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
    <main id="main-content" className="page-width main-content">
      <div className="breadcrumb">
        <Icon name="home" size={14} />
        <span>Trang chủ</span>
        <Icon name="chevron" size={12} />
        <span className="current">Các khóa học của tôi</span>
      </div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">KHÔNG GIAN HỌC TẬP</p>
          <h1>
            Các khóa học của tôi<span className="heading-dot">.</span>
          </h1>
          <p>Tiếp tục hành trình học tập và khám phá những kiến thức mới.</p>
        </div>
        <span className="academic-year">
          <Icon name="calendar" size={17} />
          Năm học 2026 – 2027
        </span>
      </div>

      <section className="card overview-panel" aria-labelledby="overview-title">
        <div className="card-header overview-heading">
          <h2 id="overview-title">
            <span className="section-icon">
              <Icon name="book" size={19} />
            </span>
            Tổng quan khóa học<span className="count-badge">{courses.length}</span>
          </h2>
          <span className="overview-caption">Học theo cách của bạn</span>
        </div>
        <div className="filter-row">
          <div className="nav nav-pills filter-tabs" aria-label="Trạng thái khóa học">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                className={`nav-link ${filter === item.value ? 'active selected' : ''}`}
                aria-pressed={filter === item.value}
                onClick={() => {
                  setFilter(item.value);
                  resetPage();
                }}
              >
                {item.value === 'starred' && <Icon name="star" size={15} />}
                {item.label}
                {item.value === 'all' && <span>{courses.length - hiddenCount}</span>}
              </button>
            ))}
          </div>
          <label className="select-wrapper semester-select">
            <span className="sr-only">Lọc học kỳ</span>
            <Icon name="calendar" size={16} />
            <select
              className="custom-select custom-select-sm"
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
            <Icon name="down" size={14} />
          </label>
        </div>
        <div className="toolbar">
          <label className="search-field">
            <Icon name="search" size={19} />
            <span className="sr-only">Tìm kiếm khóa học</span>
            <input
              className="form-control"
              id="course-search"
              type="search"
              placeholder="Tìm tên khóa học, mã học phần…"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetPage();
              }}
            />
            <kbd aria-hidden="true">⌕</kbd>
          </label>
          <div className="toolbar-right">
            <label className="select-wrapper sort-select">
              <span className="sort-label">Sắp xếp:</span>
              <select
                className="custom-select custom-select-sm"
                aria-label="Sắp xếp khóa học"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as SortOrder);
                  resetPage();
                }}
              >
                <option value="recent">Gần đây nhất</option>
                <option value="name">Tên khóa học A–Z</option>
              </select>
              <Icon name="down" size={14} />
            </label>
            <div className="btn-group view-toggle" aria-label="Kiểu hiển thị">
              <button
                className={preferences.view === 'grid' ? 'selected' : ''}
                aria-label="Hiển thị dạng lưới"
                aria-pressed={preferences.view === 'grid'}
                onClick={() => preferences.setView('grid')}
              >
                <Icon name="grid" size={17} />
              </button>
              <button
                className={preferences.view === 'list' ? 'selected' : ''}
                aria-label="Hiển thị dạng danh sách"
                aria-pressed={preferences.view === 'list'}
                onClick={() => preferences.setView('list')}
              >
                <Icon name="list" size={20} />
              </button>
            </div>
          </div>
        </div>

        <p className="sr-only" role="status">
          {announcement}
        </p>
        {loading ? (
          <div
            className="row course-grid loading-grid"
            aria-label="Đang tải khóa học"
            aria-busy="true"
          >
            {Array.from({ length: 4 }, (_, index) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3 course-column" key={index}>
                <div className="course-skeleton w-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            <Icon name="help" size={36} />
            <h3>Chưa tải được khóa học</h3>
            <p>{error}</p>
            <button
              className="btn btn-outline-secondary button"
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
            <Icon name={filter === 'starred' ? 'star' : 'book'} size={40} />
            <h3>
              {courses.length === 0
                ? 'Bạn chưa có khóa học nào'
                : 'Không tìm thấy khóa học phù hợp'}
            </h3>
            <p>
              {courses.length === 0
                ? 'Khóa học sẽ xuất hiện khi nhà trường mở lớp và ghi danh cho bạn.'
                : filter === 'starred'
                  ? 'Nhấn biểu tượng ngôi sao trên một khóa học để lưu vào đây.'
                  : 'Thử từ khóa khác hoặc đặt lại các bộ lọc của bạn.'}
            </p>
            {courses.length > 0 && (
              <button className="btn btn-outline-secondary button" onClick={clearFilters}>
                Xem tất cả khóa học
              </button>
            )}
          </div>
        ) : (
          <div
            className={`row course-grid ${preferences.view === 'list' ? 'course-list' : ''}`}
            aria-label="Danh sách khóa học"
          >
            {shownCourses.map((course) => (
              // Bootstrap 4 grid chịu trách nhiệm breakpoint; card chỉ lo nội dung.
              <div
                key={course.id}
                className={`course-column ${preferences.view === 'list' ? 'col-12 col-xl-6' : 'col-12 col-sm-6 col-lg-4 col-xl-3'}`}
              >
                <CourseCard
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
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="results-footer">
            <span aria-live="polite">
              Hiển thị <b>{Math.min(visibleCount, filteredCourses.length)}</b> trên{' '}
              <b>{filteredCourses.length}</b> khóa học
            </span>
            {visibleCount < filteredCourses.length && (
              <button
                className="btn btn-outline-secondary button load-more"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Xem thêm khóa học
                <Icon name="down" size={16} />
              </button>
            )}
            <button
              className={`hidden-courses-button ${filter === 'hidden' ? 'selected' : ''}`}
              onClick={() => {
                setFilter(filter === 'hidden' ? 'all' : 'hidden');
                resetPage();
              }}
            >
              <Icon name="hidden" size={15} />
              Đã ẩn ({hiddenCount})
            </button>
          </div>
        )}
      </section>
      <div className="learning-note">
        <span className="learning-note-icon">
          <Icon name="cap" size={23} />
        </span>
        <p>
          <b>Mỗi ngày một chút, tiến xa hơn mỗi ngày.</b>
          <span>Chọn một khóa học và bắt đầu hành trình của bạn.</span>
        </p>
        <span className="note-line" />
        <span className="note-mark">LEARN. GROW. CONNECT.</span>
      </div>
    </main>
  );
}
