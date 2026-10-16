import type { Course, CourseFilter, SortOrder } from './types.ts';

/** Chuẩn hóa dấu tiếng Việt để "lap trinh" tìm được "Lập trình". */
export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

export interface CourseQuery {
  search: string;
  filter: CourseFilter;
  semester: string;
  sort: SortOrder;
  starred: string[];
  hidden: string[];
}

/** Hàm thuần: lọc + sắp xếp trên bản sao, không làm thay đổi dữ liệu nguồn. */
export function selectCourses(courses: Course[], query: CourseQuery): Course[] {
  const needle = normalizeSearch(query.search);
  return courses
    .filter((course) => {
      const isHidden = query.hidden.includes(course.id);
      if (query.filter === 'hidden' ? !isHidden : isHidden) return false;
      if (query.filter === 'current' && course.status !== 'current') return false;
      if (query.filter === 'completed' && course.status !== 'completed') return false;
      if (query.filter === 'starred' && !query.starred.includes(course.id)) return false;
      if (query.semester !== 'all' && course.semester !== query.semester) return false;
      return normalizeSearch(
        `${course.code} ${course.title} ${course.subtitle} ${course.teacher}`,
      ).includes(needle);
    })
    .sort((a, b) =>
      query.sort === 'recent'
        ? b.updatedAt.localeCompare(a.updatedAt)
        : a.title.localeCompare(b.title, 'vi'),
    );
}

/** Avatar không cần ảnh cá nhân; lấy chữ đầu của hai từ cuối trong họ tên. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
