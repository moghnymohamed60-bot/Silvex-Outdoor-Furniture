'use client';

import { useState } from 'react';
import { Tag, Plus, Sparkles, Check, X } from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Discount } from '@/types';

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>(db.discounts.findAll());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState('');
  const [type, setType] = useState<'PERCENTAGE' | 'FIXED_AMOUNT'>('PERCENTAGE');
  const [value, setValue] = useState('15');
  const [minOrder, setMinOrder] = useState('2000');
  const [description, setDescription] = useState('');

  const handleCreateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount: Discount = {
      id: `dsc-${Date.now()}`,
      code: code.trim().toUpperCase(),
      description: description || `${value}% off outdoor furniture collections`,
      type,
      value: Number(value),
      minimumOrder: Number(minOrder),
      usageLimit: 250,
      usedCount: 0,
      isActive: true,
      expiresAt: '2026-12-31T23:59:59Z',
    };

    db.discounts.create(newDiscount);
    setDiscounts(db.discounts.findAll());
    setIsModalOpen(false);
    setCode('');
    setDescription('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
            Promotions & Seasonal Campaigns
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Outdoor Promotion Rules ({discounts.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-wider font-bold shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promotion Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {discounts.map((disc) => (
          <div
            key={disc.id}
            className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-xl bg-silvex-100 dark:bg-silvex-950 font-mono font-bold text-sm text-silvex-800 dark:text-silvex-300">
                  {disc.code}
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-600">Active</span>
              </div>
              <h3 className="font-bold text-stone-900 dark:text-white text-sm">
                {disc.type === 'PERCENTAGE' ? `${disc.value}% Savings` : formatCurrency(disc.value)} Discount
              </h3>
              <p className="text-xs text-stone-500 line-clamp-2">{disc.description}</p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 space-y-1">
              <p>Min. Order: <strong className="text-stone-800 dark:text-stone-200">{formatCurrency(disc.minimumOrder)}</strong></p>
              <p>Redeemed: <strong className="text-stone-800 dark:text-stone-200">{disc.usedCount} times</strong></p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-2xl z-10 space-y-6 animate-slide-up">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                Create Promotion Code
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDiscount} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Promotion Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. SUMMER2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 uppercase font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Discount Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED_AMOUNT">Fixed Amount ($)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Value</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Minimum Order Threshold ($)</label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 15% off full dining sets"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all mt-4"
              >
                Activate Promotion Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
