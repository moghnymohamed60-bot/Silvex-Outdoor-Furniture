'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Sparkles, Truck } from 'lucide-react';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-forest-900 text-stone-200 text-xs tracking-wider uppercase py-2 px-4 relative z-50 border-b border-forest-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-3 text-center">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-silvex-300 font-medium">
            <Truck className="w-3.5 h-3.5" /> Complimentary White-Glove Installation
          </span>
          <span className="hidden sm:inline text-stone-500">•</span>
          <span>
            Spring Outdoor Season 2026: Enjoy 10% off with code{' '}
            <strong className="text-silvex-400 font-bold tracking-widest">SILVEX10</strong>
          </span>
          <Link
            href="/shop"
            className="underline underline-offset-4 hover:text-white transition-colors ml-1 font-semibold"
          >
            Explore Catalog
          </Link>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="text-stone-400 hover:text-stone-100 p-1 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
