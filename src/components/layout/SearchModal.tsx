'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Teak Lounge Set',
  'Poolside Sun Loungers',
  'Sunbrella Sectional',
  'Volcanic Fire Table',
  'Cantilever Umbrella',
  'Grade-A Teak Dining',
  'Outdoor Daybed',
  'Terrace Bar Stools',
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const matched = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.specification.material.toLowerCase().includes(q) ||
        p.specification.weatherResistance.toLowerCase().includes(q)
    ).slice(0, 5);

    setResults(matched);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  const handlePopularClick = (term: string) => {
    onClose();
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 animate-slide-up">
        {/* Search Header */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center px-6 py-4 border-b border-stone-200 dark:border-stone-800 gap-3"
        >
          <Search className="w-5 h-5 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search outdoor furniture by material, space, or collection..."
            className="flex-1 bg-transparent text-base sm:text-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-white ml-2"
          >
            Esc
          </button>
        </form>

        {/* Search Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
          {/* Live Matching Products */}
          {results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-silvex-600 dark:text-silvex-400">
                  Matching Outdoor Furniture ({results.length})
                </span>
                <button
                  onClick={handleSearchSubmit}
                  className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:underline inline-flex items-center gap-1"
                >
                  View all results <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                      <img
                        src={product.images[0]?.url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-white truncate group-hover:text-silvex-600 dark:group-hover:text-silvex-400">
                        {product.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        {product.specification.material} • {product.specification.weatherResistance}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-stone-900 dark:text-white">
                        {formatCurrency(product.basePrice)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.trim() ? (
            <div className="text-center py-8">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                No matching outdoor pieces found for &ldquo;<strong className="text-stone-900 dark:text-white">{query}</strong>&rdquo;.
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Try searching for materials like <em>Teak</em>, <em>Aluminum</em>, or <em>Sunbrella</em>.
              </p>
            </div>
          ) : null}

          {/* Popular Search Suggestions */}
          {!query.trim() && (
            <>
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 dark:text-stone-500 block mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Outdoor Inquiries
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularClick(term)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-silvex-100 hover:text-silvex-700 dark:hover:bg-silvex-900/40 dark:hover:text-silvex-300 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Outdoor Space Fast Links */}
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 dark:text-stone-500 block mb-3 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-forest-500" /> Shop by Outdoor Space
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {OUTDOOR_SPACES.slice(0, 6).map((space) => (
                    <Link
                      key={space.id}
                      href={`/spaces/${space.slug}`}
                      onClick={onClose}
                      className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:border-silvex-500 dark:hover:border-silvex-400 transition-colors text-xs font-semibold text-stone-800 dark:text-stone-200"
                    >
                      {space.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
