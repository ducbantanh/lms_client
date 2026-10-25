import type { IconName } from '@/components/ui/icon';

/** Khớp NotificationViews.CATEGORIES của server (lms.notification). */
export type NotificationCategory = 'exam' | 'lab' | 'practice' | 'content' | 'announcement';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string | null;
  course: { id: string; code: string; title: string } | null;
  /** Có giá trị khi thông báo về một bài kiểm tra / thực hành / bài tập. */
  assessmentId: string | null;
  senderName: string | null;
  createdAt: string;
  read: boolean;
}

export interface NotificationSummary {
  unread: number;
  byCategory: Partial<Record<NotificationCategory, number>>;
}

export interface NotificationPage {
  items: AppNotification[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

/** Thông báo đã gửi của khóa học (trang giảng viên). */
export interface SentNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string | null;
  senderName: string | null;
  createdAt: string;
  recipients: number;
  read: number;
}

/** Thứ tự tab phân loại ở trang Thông báo. */
export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  'exam',
  'lab',
  'practice',
  'content',
  'announcement',
];

export const CATEGORY_INFO: Record<
  NotificationCategory,
  { label: string; icon: IconName; tone: string }
> = {
  exam: { label: 'Bài kiểm tra', icon: 'exam', tone: 'red' },
  lab: { label: 'Bài thực hành', icon: 'teach', tone: 'violet' },
  practice: { label: 'Bài tập', icon: 'file', tone: 'blue' },
  content: { label: 'Nội dung', icon: 'book', tone: 'green' },
  announcement: { label: 'Giảng viên', icon: 'bell', tone: 'orange' },
};

/**
 * Khung "thông báo chưa đọc" ở đầu trang (components/layout/unread-banner.tsx): sinh viên bấm ẩn thì
 * nhớ theo tài khoản, mỗi lần đăng nhập lại SessionProvider xóa key để khung hiện lại.
 */
export function unreadBannerKey(userId: string) {
  return `lms.ui.unread-banner.${userId}`;
}

/** Trang mở khi bấm thông báo: bài kiểm tra → trang làm bài; bài khác → tab của loại; còn lại → khóa học. */
export function notificationHref(notification: AppNotification) {
  const course = notification.course;
  if (!course) return '/';
  const courseHref = `/course/?id=${encodeURIComponent(course.id)}`;
  if (notification.category === 'exam' && notification.assessmentId)
    return `/course/assessment/?id=${encodeURIComponent(notification.assessmentId)}`;
  if (notification.category === 'lab' || notification.category === 'practice')
    return `${courseHref}&tab=${notification.category}`;
  return courseHref;
}

/** "Vừa xong", "5 phút trước", "3 giờ trước", "Hôm qua", "4 ngày trước", sau một tuần thì ghi ngày. */
export function timeAgo(iso: string, now = Date.now()) {
  const minutes = Math.floor((now - Date.parse(iso)) / 60_000);
  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Hôm qua';
  if (days < 7) return `${days} ngày trước`;
  return new Date(iso).toLocaleDateString('vi-VN');
}
