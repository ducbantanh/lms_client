'use client';

import React from 'react';

export function ModernSparkline({
  data,
  color = '#2563eb',
  height = 36,
  strokeWidth = 2,
  className = '',
}: {
  data: number[];
  color?: string;
  height?: number;
  strokeWidth?: number;
  className?: string;
}) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      className={`overflow-visible inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function ModernRadialProgress({
  value,
  max = 100,
  size = 72,
  strokeWidth = 6,
  color = '#3b82f6',
  trackColor = '#e2e8f0',
  label,
  className = '',
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-black text-slate-800 tabular-nums leading-none">
          {Math.round(percent)}%
        </span>
        {label && <span className="text-[9px] text-slate-400 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

export function ModernActivityHeatmap({
  weeks = 12,
  days = 7,
  activeMatrix,
}: {
  weeks?: number;
  days?: number;
  activeMatrix?: number[][];
}) {
  const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <div className="flex gap-2 text-[10px] text-slate-400 select-none overflow-x-auto py-2">
      <div className="flex flex-col justify-between py-0.5 pr-1">
        {dayLabels.map((d, i) => (
          <span key={i} className="h-3 leading-3 font-medium">{d}</span>
        ))}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: weeks }, (_, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {Array.from({ length: days }, (_, dIdx) => {
              const level = activeMatrix ? activeMatrix[wIdx]?.[dIdx] || 0 : ((wIdx * 7 + dIdx) % 5);
              const bg =
                level === 0
                  ? 'bg-slate-100'
                  : level === 1
                  ? 'bg-blue-100'
                  : level === 2
                  ? 'bg-blue-300'
                  : level === 3
                  ? 'bg-blue-500'
                  : 'bg-blue-700';
              return (
                <div
                  key={dIdx}
                  className={`size-3 rounded-xs transition-colors hover:ring-2 hover:ring-blue-400 ${bg}`}
                  title={`Tuần ${wIdx + 1}, Thứ ${dIdx + 2}: ${level} bài học`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
