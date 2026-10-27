'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { courseLabel } from '@/lib/course-utils';
import {
  MEETING_KINDS,
  WEEKDAYS,
  periodLabel,
  periodTime,
  ruleLabel,
  shortDate,
  type ScheduleRule,
} from '@/lib/schedule';
import { errorFlash } from '@/app/teacher/course/_components/course-manager';
import { Icon } from '@/components/ui/icon';
import { RuleDialog, type ScheduleAdminContext } from './schedule-forms';
import { ScheduleImportDialog } from './schedule-import';

/** Thời khóa biểu: các lịch lặp hằng tuần của mọi khóa học, lọc theo khóa học; nhập cả học kỳ từ file. */
export function RulesTab({ context }: { context: ScheduleAdminContext }) {
  const { courses, periods, notify, confirm } = context;
  const [course, setCourse] = useState('');
  const [editing, setEditing] = useState<ScheduleRule | 'new' | null>(null);
  const [importing, setImporting] = useState(false);
  const [version, setVersion] = useState(0);
  // Danh sách gắn với bộ lọc đã tải; đổi bộ lọc thì rules về null (đang tải)
  const key = `${course}|${version}`;
  const [loaded, setLoaded] = useState<{ key: string; rules: ScheduleRule[] } | null>(null);
  const rules = loaded?.key === key ? loaded.rules : null;
  const load = useCallback(() => setVersion((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<ScheduleRule[]>(
      `/admin/schedules${course ? `?course=${encodeURIComponent(course)}` : ''}`,
      { signal: controller.signal },
    )
      .then((list) => setLoaded({ key, rules: list }))
      .catch((reason) => {
        if (controller.signal.aborted) return;
        setLoaded({ key, rules: [] });
        notify(errorFlash(reason));
      });
    return () => controller.abort();
  }, [key, course, notify]);

  function remove(rule: ScheduleRule) {
    confirm({
      title: 'Xóa lịch lặp',
      message: `Xóa lịch ${ruleLabel(rule)} của ${rule.course.code}? Các buổi từ hôm nay trở đi chưa điểm danh bị bỏ; buổi đã qua vẫn giữ trong lịch sử.`,
      confirmLabel: 'Xóa lịch',
      danger: true,
      run: async () => {
        try {
          await apiRequest(`/admin/schedules/${encodeURIComponent(rule.id)}`, { method: 'DELETE' });
          notify({ type: 'success', text: 'Đã xóa lịch lặp.' });
          load();
        } catch (reason) {
          notify(errorFlash(reason));
        }
      },
    });
  }

  return (
    <section className="panel">
      <div className="toolbar">
        <select
          className="select"
          value={course}
          aria-label="Lọc theo khóa học"
          onChange={(event) => setCourse(event.target.value)}
        >
          <option value="">Mọi khóa học</option>
          {courses.map((item) => (
            <option key={item.id} value={item.id}>
              {courseLabel(item.code, item.group)} · {item.title}
            </option>
          ))}
        </select>
        <p className="table-summary">{rules ? `${rules.length} lịch lặp` : 'Đang tải…'}</p>
        <div className="toolbar-right">
          <button className="button" onClick={() => setImporting(true)}>
            <Icon name="upload" size={12} />
            Nhập thời khóa biểu
          </button>
          <button className="button primary" onClick={() => setEditing('new')}>
            <Icon name="plus" size={12} />
            Thêm lịch
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table admin-table">
          <thead>
            <tr>
              <th>Khóa học</th>
              <th>Lịch</th>
              <th className="hide-sm">Phòng</th>
              <th className="hide-sm">Thời gian áp dụng</th>
              <th className="numeric">Số buổi</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {!rules ? (
              <tr>
                <td colSpan={6} className="empty-cell">
                  Đang tải…
                </td>
              </tr>
            ) : rules.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-cell">
                  Chưa có lịch lặp nào. Bấm &quot;Thêm lịch&quot; để xếp thời khóa biểu cho khóa
                  học.
                </td>
              </tr>
            ) : (
              rules.map((rule) => (
                <tr key={rule.id}>
                  <td>
                    <b>{rule.course.code}</b>
                    <small className="cell-sub">
                      {rule.course.title}
                      {rule.course.teacherName ? ` · ${rule.course.teacherName}` : ''}
                    </small>
                  </td>
                  <td>
                    {WEEKDAYS[rule.weekday - 1]}, {periodLabel(rule.startPeriod, rule.periods)}
                    <small className="cell-sub">
                      {periodTime(periods, rule.startPeriod, rule.periods)} ·{' '}
                      {MEETING_KINDS[rule.kind]}
                    </small>
                  </td>
                  <td className="hide-sm">{rule.room.name}</td>
                  <td className="hide-sm">
                    {shortDate(rule.startsOn)} – {shortDate(rule.endsOn)}
                  </td>
                  <td className="numeric">{rule.meetings}</td>
                  <td className="actions">
                    <button
                      className="icon-button row-action"
                      title="Sửa lịch"
                      aria-label={`Sửa lịch ${ruleLabel(rule)}`}
                      onClick={() => setEditing(rule)}
                    >
                      <Icon name="edit" size={12} />
                    </button>
                    <button
                      className="icon-button row-action danger"
                      title="Xóa lịch"
                      aria-label={`Xóa lịch ${ruleLabel(rule)}`}
                      onClick={() => remove(rule)}
                    >
                      <Icon name="trash" size={12} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {importing && (
        <ScheduleImportDialog
          onClose={() => setImporting(false)}
          onImported={(report) => {
            notify({
              type: 'success',
              text: `Đã nhập ${report.rules.length} lịch, ${report.meetings} buổi học.`,
            });
            load();
          }}
        />
      )}
      {editing && (
        <RuleDialog
          context={context}
          rule={editing === 'new' ? undefined : editing}
          courseId={course || undefined}
          onClose={() => setEditing(null)}
          onSaved={(result) => {
            setEditing(null);
            notify({
              type: 'success',
              text:
                editing === 'new'
                  ? `Đã tạo lịch ${ruleLabel(result.schedule)} với ${result.created} buổi.`
                  : `Đã sửa lịch: thêm ${result.created} buổi, bỏ ${result.removed} buổi cũ.`,
            });
            load();
          }}
        />
      )}
    </section>
  );
}
