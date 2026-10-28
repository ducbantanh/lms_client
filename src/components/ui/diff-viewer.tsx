'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';

interface DiffViewerProps {
  expected: string;
  actual: string;
  input?: string;
  className?: string;
}

/** Biến đổi ký tự ẩn (dấu cách thành ·, xuống dòng thành ↵) để dễ phát hiện lỗi định dạng */
function renderWithInvisibles(text: string, showInvisibles: boolean) {
  if (!showInvisibles) return text;
  return text
    .replace(/ /g, '·')
    .replace(/\t/g, '→   ');
}

export function DiffViewer({ expected, actual, input, className = '' }: DiffViewerProps) {
  const [mode, setMode] = useState<'split' | 'unified'>('split');
  const [showInvisibles, setShowInvisibles] = useState<boolean>(true);
  const [copied, setCopied] = useState<string | null>(null);

  const expectedLines = (expected ?? '').replace(/\r\n/g, '\n').split('\n');
  const actualLines = (actual ?? '').replace(/\r\n/g, '\n').split('\n');
  const isExactMatch = (expected ?? '').trimEnd() === (actual ?? '').trimEnd();

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
    }
  }

  const maxLines = Math.max(expectedLines.length, actualLines.length);

  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-xs ${className}`}>
      {/* Thanh công cụ Diff Viewer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-muted px-3.5 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink">So sánh kết quả (Diff Output)</span>
          {isExactMatch ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Icon name="check" size={10} />
              Khớp nội dung
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-400">
              <Icon name="close" size={10} />
              Có điểm sai khác
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Nút toggle ký tự ẩn */}
          <button
            type="button"
            onClick={() => setShowInvisibles(!showInvisibles)}
            className={`rounded-md px-2 py-1 font-medium transition ${
              showInvisibles
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                : 'text-ink-muted hover:bg-surface hover:text-ink'
            }`}
            title="Hiển thị dấu cách (·) và tab (→) để kiểm tra lỗi định dạng"
          >
            Ký tự ẩn {showInvisibles ? 'Bật' : 'Tắt'}
          </button>

          {/* Chọn chế độ xem: Split hoặc Unified */}
          <div className="inline-flex rounded-lg border border-line bg-surface p-0.5">
            <button
              type="button"
              onClick={() => setMode('split')}
              className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                mode === 'split' ? 'bg-primary-600 text-white' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Cạnh nhau
            </button>
            <button
              type="button"
              onClick={() => setMode('unified')}
              className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                mode === 'unified' ? 'bg-primary-600 text-white' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Hợp nhất
            </button>
          </div>
        </div>
      </div>

      {/* Hiển thị input nếu có */}
      {input !== undefined && (
        <div className="border-b border-line bg-surface px-3.5 py-2">
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-ink-muted">
            <span>Dữ liệu đầu vào (Input):</span>
            <button
              type="button"
              onClick={() => copyText(input, 'input')}
              className="text-primary-600 hover:underline"
            >
              {copied === 'input' ? 'Đã chép!' : 'Sao chép input'}
            </button>
          </div>
          <pre className="max-h-24 overflow-auto rounded-md bg-surface-muted p-2 font-mono text-xs text-ink">
            {renderWithInvisibles(input || '(trống)', showInvisibles)}
          </pre>
        </div>
      )}

      {/* Nội dung so sánh */}
      <div className="overflow-x-auto font-mono text-xs">
        {mode === 'split' ? (
          <div className="grid grid-cols-2 divide-x divide-line min-w-[500px]">
            {/* Cột Mong đợi */}
            <div>
              <div className="flex items-center justify-between border-b border-line bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                <span>Output mong đợi (Expected)</span>
                <button
                  type="button"
                  onClick={() => copyText(expected, 'expected')}
                  className="font-normal text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  {copied === 'expected' ? 'Đã chép!' : 'Chép'}
                </button>
              </div>
              <div className="divide-y divide-line/40 p-1">
                {Array.from({ length: maxLines }).map((_, idx) => {
                  const line = expectedLines[idx];
                  const actualLine = actualLines[idx];
                  const hasLine = idx < expectedLines.length;
                  const isMatch = line === actualLine;

                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 py-0.5 px-2 ${
                        !hasLine
                          ? 'bg-transparent text-ink-subtle'
                          : isMatch
                            ? 'hover:bg-surface-muted'
                            : 'bg-emerald-50 text-emerald-900 font-medium dark:bg-emerald-950/40 dark:text-emerald-200'
                      }`}
                    >
                      <span className="w-5 shrink-0 select-none text-right text-[10px] text-ink-subtle">
                        {hasLine ? idx + 1 : ''}
                      </span>
                      <pre className="flex-1 whitespace-pre-wrap break-all">
                        {hasLine ? renderWithInvisibles(line, showInvisibles) || ' ' : ' '}
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cột Thực tế của bài nộp */}
            <div>
              <div className="flex items-center justify-between border-b border-line bg-rose-500/10 px-3 py-1.5 text-[11px] font-semibold text-rose-800 dark:text-rose-300">
                <span>Output của bạn (Actual)</span>
                <button
                  type="button"
                  onClick={() => copyText(actual, 'actual')}
                  className="font-normal text-rose-700 hover:underline dark:text-rose-400"
                >
                  {copied === 'actual' ? 'Đã chép!' : 'Chép'}
                </button>
              </div>
              <div className="divide-y divide-line/40 p-1">
                {Array.from({ length: maxLines }).map((_, idx) => {
                  const line = actualLines[idx];
                  const expLine = expectedLines[idx];
                  const hasLine = idx < actualLines.length;
                  const isMatch = line === expLine;

                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 py-0.5 px-2 ${
                        !hasLine
                          ? 'bg-transparent text-ink-subtle'
                          : isMatch
                            ? 'hover:bg-surface-muted'
                            : 'bg-rose-50 text-rose-900 font-medium dark:bg-rose-950/40 dark:text-rose-200'
                      }`}
                    >
                      <span className="w-5 shrink-0 select-none text-right text-[10px] text-ink-subtle">
                        {hasLine ? idx + 1 : ''}
                      </span>
                      <pre className="flex-1 whitespace-pre-wrap break-all">
                        {hasLine ? renderWithInvisibles(line, showInvisibles) || ' ' : ' '}
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Chế độ xem Unified */
          <div className="p-2 space-y-0.5">
            {Array.from({ length: maxLines }).map((_, idx) => {
              const exp = expectedLines[idx];
              const act = actualLines[idx];
              const hasExp = idx < expectedLines.length;
              const hasAct = idx < actualLines.length;

              if (hasExp && hasAct && exp === act) {
                return (
                  <div key={idx} className="flex items-start gap-3 px-2 py-0.5 text-ink-muted hover:bg-surface-muted">
                    <span className="w-6 shrink-0 select-none text-right text-[10px] text-ink-subtle">{idx + 1}</span>
                    <span className="w-3 select-none text-ink-subtle"> </span>
                    <pre className="flex-1 whitespace-pre-wrap break-all">{renderWithInvisibles(exp, showInvisibles)}</pre>
                  </div>
                );
              }

              return (
                <div key={idx} className="space-y-0.5">
                  {hasExp && (
                    <div className="flex items-start gap-3 rounded bg-emerald-50 px-2 py-0.5 text-emerald-900 font-medium dark:bg-emerald-950/40 dark:text-emerald-200">
                      <span className="w-6 shrink-0 select-none text-right text-[10px] text-emerald-600 dark:text-emerald-400">{idx + 1}</span>
                      <span className="w-3 select-none font-bold text-emerald-600">+</span>
                      <pre className="flex-1 whitespace-pre-wrap break-all">{renderWithInvisibles(exp, showInvisibles) || ' '}</pre>
                    </div>
                  )}
                  {hasAct && (
                    <div className="flex items-start gap-3 rounded bg-rose-50 px-2 py-0.5 text-rose-900 font-medium dark:bg-rose-950/40 dark:text-rose-200">
                      <span className="w-6 shrink-0 select-none text-right text-[10px] text-rose-600 dark:text-rose-400">{idx + 1}</span>
                      <span className="w-3 select-none font-bold text-rose-600">-</span>
                      <pre className="flex-1 whitespace-pre-wrap break-all">{renderWithInvisibles(act, showInvisibles) || ' '}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
