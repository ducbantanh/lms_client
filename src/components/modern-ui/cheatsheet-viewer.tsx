'use client';

import React, { useState } from 'react';
import { DEVOPS_CHEATSHEET, searchCheatsheet } from '@/lib/devops-cheatsheet';
import { IconSearch } from './icons';

export function CheatsheetViewer() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'Git', 'Linux', 'Networking', 'Docker'];
  const results = searchCheatsheet(query, activeCategory);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-3xl border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xs">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Tra cứu Lệnh & Công cụ Kỹ thuật</h3>
          <p className="text-xs text-slate-500 mt-0.5">Bảng tra cứu nhanh Git, Linux terminal, Docker và Network socket</p>
        </div>

        <div className="relative w-full sm:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconSearch size={14} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm lệnh, tham số..."
            className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'Tất cả' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
        {results.map((entry, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <code className="text-xs font-bold text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded-md">
                  {entry.command}
                </code>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full">
                  {entry.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{entry.description}</p>
              <div className="mt-2 text-xs font-mono text-slate-700 bg-slate-900 text-slate-100 p-2.5 rounded-xl overflow-x-auto">
                $ {entry.example}
              </div>
            </div>

            {entry.flags.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                {entry.flags.map((f, fIdx) => (
                  <span key={fIdx}>
                    <b className="font-mono text-slate-700">{f.flag}</b>: {f.meaning}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
