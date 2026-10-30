'use client';

import React from 'react';
import { IconChevronLeft, IconChevronRight } from './icons';

export interface ModernPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export function ModernPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className = '',
}: ModernPaginationProps) {
  if (totalPages <= 1 && !totalItems) return null;

  // Tính toán dãy số trang hiển thị
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : currentPage * pageSize;

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-xs text-xs text-slate-600 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2">
        {totalItems !== undefined && (
          <span className="text-slate-500">
            Hiển thị <b className="text-slate-800 font-bold">{startItem}</b>–<b className="text-slate-800 font-bold">{endItem}</b> trên{' '}
            <b className="text-slate-800 font-bold">{totalItems}</b> kết quả
          </span>
        )}
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-3">
            <span className="text-slate-400">Số dòng:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-7.5 px-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="grid size-8 place-items-center rounded-xl border border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.96]"
          aria-label="Trang trước"
        >
          <IconChevronLeft size={14} />
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="grid size-8 place-items-center text-slate-400 select-none">
                …
              </span>
            );
          }

          const pageNum = p as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`grid size-8 place-items-center rounded-xl text-xs font-bold transition-all active:scale-[0.96] ${
                isActive
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20'
                  : 'border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="grid size-8 place-items-center rounded-xl border border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.96]"
          aria-label="Trang tiếp"
        >
          <IconChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
