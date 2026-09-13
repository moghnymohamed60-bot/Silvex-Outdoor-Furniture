'use client';

import { BarChart3, TrendingUp, Compass, TreePine, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency } from '@/lib/utils';

export default function AdminAnalyticsPage() {
  const kpis = db.analytics.getDashboardKPIs();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
          Executive Intelligence
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Outdoor Furniture Analytics & Trends
        </h1>
      </div>

      {/* Monthly Trajectory */}
      <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Monthly Revenue Trajectory
            </h2>
            <p className="text-xs text-stone-500">Historical performance across the past 6 months</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
            +32% Spring Surge
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.revenueByMonth.map((m) => (
            <div
              key={m.month}
              className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/60 dark:border-stone-800 text-center space-y-1"
            >
              <span className="text-[10px] uppercase font-bold text-stone-400 block">{m.month}</span>
              <p className="font-bold text-sm text-stone-900 dark:text-white">{formatCurrency(m.revenue)}</p>
              <span className="text-[10px] text-silvex-600 block">{m.orders} orders</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outdoor Space Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-silvex-500" /> Space Performance Share
          </h2>

          <div className="space-y-4">
            {kpis.salesByOutdoorSpace.map((item) => (
              <div key={item.space} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-stone-800 dark:text-stone-200">
                  <span>{item.space}</span>
                  <span>{formatCurrency(item.revenue)} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-forest-900 dark:bg-silvex-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <TreePine className="w-5 h-5 text-silvex-500" /> Material Popularity Index
          </h2>

          <div className="space-y-4">
            {kpis.salesByMaterial.map((mat) => (
              <div
                key={mat.material}
                className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/60 dark:border-stone-800 flex justify-between items-center text-xs"
              >
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">{mat.material}</span>
                  <span className="text-[11px] text-stone-500">{mat.count} sets commissioned</span>
                </div>
                <span className="font-bold text-stone-900 dark:text-white text-sm">{formatCurrency(mat.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
