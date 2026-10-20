'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import type { StudentPick } from '@/lib/teaching';

/**
 * Ô chọn giảng viên phụ trách (GET /teacher/teachers: giảng viên đang hoạt động, chỉ admin gọi được).
 * value = public id; '' = chưa chọn.
 */
export function TeacherSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (teacherId: string) => void;
}) {
  const [teachers, setTeachers] = useState<StudentPick[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<StudentPick[]>('/teacher/teachers', { signal: controller.signal })
      .then(setTeachers)
      .catch((reason) => {
        if (!controller.signal.aborted)
          setError(
            reason instanceof Error ? reason.message : 'Không tải được danh sách giảng viên.',
          );
      });
    return () => controller.abort();
  }, []);

  return (
    <label className="form-field">
      Giảng viên phụ trách
      <select
        className="select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={!teachers}
        required
      >
        <option value="" disabled>
          {teachers
            ? teachers.length
              ? 'Chọn giảng viên…'
              : 'Chưa có tài khoản giảng viên'
            : 'Đang tải…'}
        </option>
        {teachers?.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.fullName} ({teacher.username})
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
      {teachers && !teachers.length && (
        <span className="admin-hint">Tạo tài khoản giảng viên ở trang Tạo tài khoản trước.</span>
      )}
    </label>
  );
}
