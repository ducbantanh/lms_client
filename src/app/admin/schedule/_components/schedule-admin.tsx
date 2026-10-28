'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import type { TeacherCourse } from '@/lib/teaching';
import type { PeriodConfig, Room } from '@/lib/schedule';
import {
  AdminHeading,
  ConfirmDialog,
  FlashMessage,
  type ConfirmRequest,
  type Flash,
} from '@/components/admin-ui';
import type { ScheduleAdminContext } from './schedule-forms';
import { RoomsTab } from './rooms-tab';
import { RulesTab } from './rules-tab';
import { WeekTab } from './week-tab';

type Tab = 'week' | 'rules' | 'rooms';
const TABS: { value: Tab; label: string }[] = [
  { value: 'week', label: 'Lịch tuần' },
  { value: 'rules', label: 'Thời khóa biểu' },
  { value: 'rooms', label: 'Phòng học' },
];

/**
 * Trang /admin/schedule/: admin xếp lịch học cho mọi khóa học. Thời khóa biểu là các lịch lặp hằng tuần
 * (server sinh sẵn từng buổi), Lịch tuần để thêm buổi bù, dời, cho nghỉ; phòng học chọn từ danh mục phòng.
 */
export function ScheduleAdmin() {
  const [tab, setTab] = useState<Tab>('week');
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [periods, setPeriods] = useState<PeriodConfig | null>(null);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState<Flash | null>(null);
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const clearFlash = useCallback(() => setFlash(null), []);

  const loadRooms = useCallback(
    () =>
      apiRequest<Room[]>('/admin/rooms')
        .then(setRooms)
        .catch((reason) => setError(reason instanceof Error ? reason.message : 'Không tải được.')),
    [],
  );

  useEffect(() => {
    void loadRooms();
    Promise.all([
      apiRequest<TeacherCourse[]>('/teacher/courses'),
      apiRequest<PeriodConfig>('/schedule/periods'),
    ])
      .then(([courseList, config]) => {
        setCourses(
          [...courseList].sort(
            (a, b) => a.code.localeCompare(b.code) || (a.group ?? '').localeCompare(b.group ?? ''),
          ),
        );
        setPeriods(config);
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Không tải được.'));
  }, [loadRooms]);

  const context: ScheduleAdminContext | null =
    rooms && periods
      ? {
          courses,
          rooms,
          periods,
          reloadRooms: () => void loadRooms(),
          notify: setFlash,
          confirm: setConfirm,
        }
      : null;

  return (
    <main id="main-content" className="shell-main">
      <AdminHeading
        title="Lịch học"
        description="Xếp thời khóa biểu theo phòng học cho các khóa học; sinh viên và giảng viên xem lịch của mình."
      />
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      <FlashMessage flash={flash} onDone={clearFlash} />
      <div className="tabs" role="tablist" aria-label="Lịch học">
        {TABS.map((item) => (
          <button
            key={item.value}
            role="tab"
            className={tab === item.value ? 'selected' : ''}
            aria-selected={tab === item.value}
            onClick={() => setTab(item.value)}
          >
            {item.label}
            {item.value === 'rooms' && rooms && <span className="count">{rooms.length}</span>}
          </button>
        ))}
      </div>
      {!context ? (
        <p className="empty-state" role="status">
          Đang tải…
        </p>
      ) : (
        <>
          {context.rooms.length === 0 && tab !== 'rooms' && (
            <div className="notice" role="status">
              Chưa có phòng học nào. Thêm phòng ở tab &quot;Phòng học&quot; trước khi xếp lịch.
            </div>
          )}
          {tab === 'week' && <WeekTab context={context} />}
          {tab === 'rules' && <RulesTab context={context} />}
          {tab === 'rooms' && <RoomsTab context={context} />}
        </>
      )}
      {confirm && <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />}
    </main>
  );
}
