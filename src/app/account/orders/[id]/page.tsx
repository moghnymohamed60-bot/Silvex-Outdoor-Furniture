'use client';

export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronLeft,
  Printer,
  Sparkles,
} from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';

const TIMELINE_STEPS: { status: OrderStatus; label: string; description: string }[] = [
  { status: 'CONFIRMED', label: 'Order Confirmed', description: 'Order reviewed and allocated at atelier' },
  { status: 'PROCESSING', label: 'Artisanal Preparation', description: 'Finishing checks & hardware torque testing' },
  { status: 'SHIPPED', label: 'In Transit', description: 'Dispatched with climate-controlled freight' },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for White-Glove Setup', description: 'Logistics crew arriving in appointment window' },
  { status: 'DELIVERED', label: 'Installed & Placed', description: 'Room-of-choice setup completed and inspected' },
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = db.orders.findById(params.id);

  if (!order) {
    notFound();
  }

  const currentStepIndex = TIMELINE_STEPS.findIndex((s) => s.status === order.status);
  const activeStep = currentStepIndex >= 0 ? currentStepIndex : 1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Back Link */}
      <div className="space-y-3">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" /> Back to All Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Order #{order.orderNumber}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Placed on {formatDate(order.createdAt)} • Status:{' '}
              <strong className="text-silvex-600 uppercase">{order.status.replace(/_/g, ' ')}</strong>
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 text-xs font-semibold flex items-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print Formal Receipt
          </button>
        </div>
      </div>

      {/* Interactive Shipment Tracking Timeline */}
      <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-silvex-600 dark:text-silvex-400 block">
              Logistics Status
            </span>
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              White-Glove Delivery Progress
            </h2>
          </div>
          <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
            Carrier: {order.carrier} (Tracking #{order.trackingNumber || 'SLX-774910'})
          </span>
        </div>

        {/* Timeline Horizontal / Vertical */}
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6">
          {TIMELINE_STEPS.map((stepItem, idx) => {
            const isCompleted = idx <= activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div key={stepItem.status} className="flex md:flex-col items-start gap-4 md:gap-3 relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-forest-900 text-white shadow-md'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>

                <div>
                  <h3 className={`text-xs font-bold ${isCurrent ? 'text-silvex-600 dark:text-silvex-400' : 'text-stone-900 dark:text-white'}`}>
                    {stepItem.label}
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Line Items & Delivery Destination */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
            Curated Outdoor Pieces ({order.items.length})
          </h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex gap-4 items-center"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                  <img src={item.imageUrl} alt={item.productTitle} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white truncate">
                    {item.productTitle}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">{item.variantTitle}</p>
                  <p className="text-[11px] text-stone-500">Qty: {item.quantity} • SKU: {item.sku}</p>
                </div>
                <span className="text-sm font-bold text-stone-900 dark:text-white">
                  {formatCurrency(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Destination & Payment Breakdown (1 Col) */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm text-xs">
            <h3 className="font-serif text-sm font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-2">
              Delivery Destination
            </h3>
            <div className="text-stone-600 dark:text-stone-300 space-y-1">
              <p className="font-bold text-stone-900 dark:text-white">
                {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
              </p>
              {order.shippingAddress?.company && <p>{order.shippingAddress?.company}</p>}
              <p>{order.shippingAddress?.street}</p>
              {order.shippingAddress?.apartment && <p>{order.shippingAddress?.apartment}</p>}
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.phone}</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-3 shadow-sm text-xs">
            <h3 className="font-serif text-sm font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-2">
              Financial Summary
            </h3>
            <div className="flex justify-between">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-semibold">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-semibold">-{formatCurrency(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-stone-500">White-Glove Setup</span>
              <span className="font-semibold">{order.shippingAmount === 0 ? 'FREE' : formatCurrency(order.shippingAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tax</span>
              <span className="font-semibold">{formatCurrency(order.taxAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-900 dark:text-white">
              <span>Total Paid</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
