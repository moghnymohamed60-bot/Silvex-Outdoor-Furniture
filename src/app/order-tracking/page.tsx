'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Order } from '@/types';

export default function OrderTrackingPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = db.orders.findById(orderQuery.trim());
    setSearchedOrder(found);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
          Real-Time Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Track Your Outdoor Furniture Shipment
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
          Enter your Silvex order number (e.g. SLX-9842-88 or SLX-9850-12) to view live carrier updates and white-glove delivery scheduling.
        </p>
      </div>

      {/* Tracker Form */}
      <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Order Number</label>
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. SLX-9842-88"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white uppercase font-mono"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Email Address</label>
            <input
              type="email"
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              placeholder="Purchaser's email"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold transition-all shadow-luxury flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Track Outdoor Delivery</span>
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
            {searchedOrder ? (
              <div className="p-6 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-bold text-sm text-stone-900 dark:text-white">
                      Order #{searchedOrder.orderNumber}
                    </span>
                    <span className="text-xs text-stone-500 block">
                      Carrier: {searchedOrder.carrier} • Tracking #{searchedOrder.trackingNumber || 'SLX-882910'}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-silvex-100 text-silvex-800">
                    {searchedOrder.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 text-xs">
                  <span className="text-stone-500">{searchedOrder.items.length} pieces • Total: {formatCurrency(searchedOrder.totalAmount)}</span>
                  <Link
                    href={`/account/orders/${searchedOrder.id}`}
                    className="font-bold text-silvex-600 hover:underline flex items-center gap-1"
                  >
                    View Interactive Timeline <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-stone-500">
                No matching order found for &ldquo;{orderQuery}&rdquo;. Try <button onClick={() => setOrderQuery('SLX-9842-88')} className="text-silvex-600 underline font-semibold">SLX-9842-88</button> or <button onClick={() => setOrderQuery('SLX-9850-12')} className="text-silvex-600 underline font-semibold">SLX-9850-12</button>.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
