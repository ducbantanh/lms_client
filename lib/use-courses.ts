'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/session-provider';
import { ApiError, apiRequest } from '@/lib/api';
import { DEMO_COURSES } from '@/lib/demo-data';
import type { Course } from '@/lib/types';

/** Khóa học thật chỉ lấy từ dashboard đã có trong Spring; không tự bù bằng mock khi lỗi. */
export function useCourses() {
  const { isDemo, user, loading: sessionLoading, error: sessionError } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (
      isDemo ||
      sessionLoading ||
      sessionError ||
      user.id === 'anonymous' ||
      user.mustChangePassword
    )
      return;
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setCourses([]);
    // Cleanup hủy request cũ khi chuyển tài khoản hoặc rời trang.
    apiRequest<{ courses: { id: string; code: string; title: string; teacherName?: string }[] }>(
      '/student/dashboard',
      { signal: controller.signal },
    )
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
            progress: null,
            lessons: null,
            cover: 'blue',
            updatedAt: '',
          })),
        );
      })
      .catch((reason) => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : 'Không tải được khóa học.');
        if (reason instanceof ApiError && reason.code === 'UNAUTHENTICATED')
          router.replace('/login/');
        if (reason instanceof ApiError && reason.code === 'PASSWORD_CHANGE_REQUIRED')
          router.replace('/change-password/');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [isDemo, user.id, user.mustChangePassword, sessionLoading, sessionError, reloadKey, router]);

  return {
    courses: isDemo ? DEMO_COURSES : courses,
    loading: sessionLoading || (!isDemo && loading),
    error: sessionError || error,
    reload: () => setReloadKey((value) => value + 1),
  };
}
