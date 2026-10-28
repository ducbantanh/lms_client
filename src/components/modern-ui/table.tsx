'use client';

import React, { type ReactNode } from 'react';

export interface ColumnDef<T> {
  key: string;
  header: ReactNode;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface ModernTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string | number;
  isLoading?: boolean;
  emptyText?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function ModernTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyText = 'Không có dữ liệu',
  onRowClick,
  className = '',
}: ModernTableProps<T>) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    'px-5 py-3.5 whitespace-nowrap',
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                    col.className || '',
                  ].join(' ')}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              Array.from({ length: 5 }, (_, idx) => (
                <tr key={idx} className="animate-pulse">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4">
                      <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-xs text-slate-400 font-medium">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const key = keyExtractor(item, index);
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(item)}
                    className={[
                      'transition-colors duration-150',
                      onRowClick ? 'cursor-pointer hover:bg-blue-50/40 active:bg-blue-100/40' : 'hover:bg-slate-50/70',
                    ].join(' ')}
                  >
                    {columns.map((col) => {
                      const content = col.render ? col.render(item, index) : (item as Record<string, unknown>)[col.key] as ReactNode;
                      return (
                        <td
                          key={col.key}
                          className={[
                            'px-5 py-3.5 text-slate-700',
                            col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                            col.className || '',
                          ].join(' ')}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
