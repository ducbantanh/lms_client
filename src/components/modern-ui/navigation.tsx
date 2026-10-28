'use client';

import React from 'react';
import Link from 'next/link';

export function ModernBreadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 select-none py-1">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-slate-300">/</span>}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-slate-900 font-bold' : ''}>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
