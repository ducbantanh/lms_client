'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/providers/session-provider';
import { ApiError, apiRequest } from '@/lib/api';
import { courseLabel, coverFor } from '@/lib/course-utils';
import type { NextLesson } from '@/lib/teaching';
import type { Course } from '@/lib/types';

/** Khóa học thật chỉ lấy từ dashboard đã có trong Spring; không tự bù bằng dữ liệu mẫu khi lỗi. */
export function useCourses() {
  const { user, loading: sessionLoading, error: sessionError, refresh } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  // SessionProvider đã lo chuyển trang khi chưa đăng nhập hoặc phải đổi mật khẩu.
  const ready = !sessionLoading && !sessionError && !!user && !user.mustChangePassword;
  const userId = user?.id;

  // Bắt đầu tải lại (đổi tài khoản / reload): xóa kết quả cũ ngay trong lần render này,
  // effect bên dưới chỉ gửi request và nhận kết quả.
  const requestKey = ready ? `${userId}:${reloadKey}` : null;
  const [startedKey, setStartedKey] = useState<string | null>(null);
  if (requestKey !== startedKey) {
    setStartedKey(requestKey);
    if (requestKey) {
      setLoading(true);
      setError('');
      setCourses([]);
    }
  }

  useEffect(() => {
    if (!requestKey) return;
    const controller = new AbortController();
    // Cleanup hủy request cũ khi chuyển tài khoản hoặc rời trang.
    apiRequest<{
      courses: {
        id: string;
        code: string;
        group: string | null;
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
            code: courseLabel(item.code, item.group),
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
  }, [requestKey, refresh]);

  return {
    courses,
    loading: sessionLoading || loading,
    error: sessionError || error,
    reload: () => setReloadKey((value) => value + 1),
  };
}
