'use client';

import { useState } from 'react';
import { Star, CheckCircle2, XCircle, Trash2, ShieldCheck, MapPin } from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { PRODUCTS } from '@/lib/data/products';
import { formatDate } from '@/lib/utils';
import { Review } from '@/types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(db.reviews.findAll());

  const handleUpdateStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    db.reviews.updateStatus(id, status);
    setReviews([...db.reviews.findAll()]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
          Reputation & Testimonials
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Client Review Moderation ({reviews.length})
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => {
          const product = PRODUCTS.find((p) => p.id === rev.productId);

          return (
            <div
              key={rev.id}
              className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-sm text-stone-900 dark:text-white">{rev.title}</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    Reviewed on piece:{' '}
                    <strong className="text-stone-800 dark:text-stone-200">{product?.title || rev.productId}</strong> • {rev.userName} ({rev.userLocation || 'USA'})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      rev.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {rev.status}
                  </span>
                  <span className="text-[10px] text-stone-400">{formatDate(rev.createdAt)}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic bg-stone-50 dark:bg-stone-950 p-3 rounded-xl">
                &ldquo;{rev.comment}&rdquo;
              </p>

              <div className="flex justify-between items-center pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-stone-400 text-[11px]">
                  Setting context: {rev.outdoorContext || 'Private Terrace'}
                </span>

                <div className="flex items-center gap-2">
                  {rev.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'APPROVED')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1 hover:bg-emerald-700 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {rev.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'REJECTED')}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs flex items-center gap-1 hover:text-rose-600 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
