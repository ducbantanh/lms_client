'use client';

import React from 'react';
import { ModernRadialProgress } from './charts-extended';

export function CourseProgressHero({
  title,
  code,
  teacher,
  progress,
  totalLessons,
  completedLessons,
}: {
  title: string;
  code: string;
  teacher: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 p-6 shadow-sm backdrop-blur-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs">
            {code}
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
          <p className="text-xs font-medium text-slate-500">Giảng viên: <b className="text-slate-800">{teacher}</b></p>
        </div>

        <div className="flex items-center gap-6 bg-white/90 p-4 rounded-2xl border border-slate-200/70 shadow-xs">
          <ModernRadialProgress value={progress} size={84} strokeWidth={8} color="#2563eb" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Tiến độ hoàn thành</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">
              {completedLessons} / {totalLessons} bài học
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-0.5">
              {progress >= 100 ? 'Đã hoàn thành khóa học' : 'Đang tiếp tục lộ trình'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
