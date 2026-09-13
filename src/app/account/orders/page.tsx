'use client';

import Link from 'next/link';
import { Package, ChevronRight, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function OrderHistoryPage() {
  const orders = db.orders.findAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-semibold">
          <Link href="/account" className="hover:text-silvex-600">Account</Link>
          <span>/</span>
          <span className="text-stone-900 dark:text-white">Orders & Shipments</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Outdoor Furniture Orders
        </h1>
        <p className="text-xs text-stone-500">
          Track real-time white-glove logistics and order history.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div>
                <span className="font-bold text-sm text-stone-900 dark:text-white block">
                  Order #{order.orderNumber}
                </span>
                <span className="text-xs text-stone-400">
                  Placed on {formatDate(order.createdAt)} • {order.items.length} pieces
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : order.status === 'SHIPPED'
                      ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  {order.status.replace(/_/g, ' ')}
                </span>
                <span className="text-base font-bold text-stone-900 dark:text-white">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>

            {/* Line Items Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center p-2 bg-stone-50 dark:bg-stone-950 rounded-xl">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0">
                    <img src={item.imageUrl} alt={item.productTitle} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold text-stone-900 dark:text-white block truncate">{item.productTitle}</span>
                    <span className="text-[10px] text-stone-500 block truncate">{item.variantTitle}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-stone-100 dark:border-stone-800 text-xs gap-3">
              <span className="text-stone-500">
                Logistics Carrier: <strong className="text-stone-800 dark:text-stone-200">{order.carrier || 'Silvex Logistics'}</strong> (Tracking #{order.trackingNumber || 'Pending'})
              </span>

              <Link
                href={`/account/orders/${order.id}`}
                className="px-5 py-2 rounded-full bg-stone-900 hover:bg-forest-900 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Shipment Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
