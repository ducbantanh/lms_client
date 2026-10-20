'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/session-provider';
import { ApiError, apiRequest } from '@/lib/api';
import { coverFor } from '@/lib/course-utils';
import type { NextLesson } from '@/lib/teaching';
import type { Course } from '@/lib/types';

/** Khóa học thật chỉ lấy từ dashboard đã có trong Spring; không tự bù bằng dữ liệu mẫu khi lỗi. */
export function useCourses() {
  const { user, loading: sessionLoading, error: sessionError, refresh } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // SessionProvider đã lo chuyển trang khi chưa đăng nhập hoặc phải đổi mật khẩu.
    if (sessionLoading || sessionError || !user || user.mustChangePassword) return;
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setCourses([]);
    // Cleanup hủy request cũ khi chuyển tài khoản hoặc rời trang.
    apiRequest<{
      courses: {
        id: string;
        code: string;
        title: string;
        teacherName?: string;
        progress: number | null;
        nextLesson: NextLesson | null;
      }[];
    }>('/student/dashboard', { signal: controller.signal })
      .then((dashboard) => {
        if (controller.signal.aborted) return;
        setCourses(
          dashboard.courses.map((item) => ({
            id: item.id,
            code: item.code,
            title: item.title,
            subtitle: '',
            teacher: item.teacherName ?? '',
            semester: 'unscheduled',
            semesterLabel: 'Chưa có lịch học',
            status: 'current',
            progress: item.progress,
            nextLesson: item.nextLesson && { id: item.nextLesson.id, title: item.nextLesson.title },
            lessons: null,
            cover: coverFor(item.code),
            updatedAt: '',
          })),
        );
      })
      .catch((reason) => {
        if (controller.signal.aborted) return;
        // Phiên hết hạn / bị bắt đổi mật khẩu: hỏi lại server để SessionProvider chuyển trang.
        if (
          reason instanceof ApiError &&
          (reason.code === 'UNAUTHENTICATED' || reason.code === 'PASSWORD_CHANGE_REQUIRED')
        ) {
          void refresh();
          return;
        }
        setError(reason instanceof Error ? reason.message : 'Không tải được khóa học.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [user?.id, user?.mustChangePassword, sessionLoading, sessionError, reloadKey]);

  return {
    courses,
    loading: sessionLoading || loading,
    error: sessionError || error,
    reload: () => setReloadKey((value) => value + 1),
  };
}
