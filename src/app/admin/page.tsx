'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Boxes,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Compass,
  TreePine,
  CheckCircle2,
} from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';

export default function AdminDashboardPage() {
  const kpis = db.analytics.getDashboardKPIs();
  const [orders, setOrders] = useState(db.orders.findAll());

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    db.orders.updateStatus(orderId, newStatus);
    setOrders([...db.orders.findAll()]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
            Executive Performance Suite
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Silvex Outdoor Business Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-wider font-bold shadow-sm transition-colors"
          >
            + Add Outdoor Product
          </Link>
          <Link
            href="/admin/inventory"
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-800 dark:text-stone-200 hover:border-silvex-500 transition-colors"
          >
            Manage Stock
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>Gross Revenue</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-white">
            {formatCurrency(kpis.grossRevenue)}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from last quarter
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>Outdoor Orders</span>
            <div className="w-8 h-8 rounded-full bg-silvex-50 dark:bg-silvex-950 text-silvex-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-white">
            {kpis.totalOrders}
          </p>
          <span className="text-[11px] text-stone-500">
            {kpis.pendingOrders} awaiting white-glove fulfillment
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>Average Order Value</span>
            <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-white">
            {formatCurrency(kpis.averageOrderValue)}
          </p>
          <span className="text-[11px] text-stone-500">
            {kpis.unitsSold} total outdoor units placed
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>Low Stock Alerts</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-white">
            {kpis.lowStockCount} Variants
          </p>
          <Link href="/admin/inventory" className="text-[11px] text-silvex-600 font-semibold hover:underline block">
            Review stock triggers →
          </Link>
        </div>
      </div>

      {/* Analytics Charts & Space Performance (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales by Outdoor Space (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-silvex-600 dark:text-silvex-400">
                Environment Share
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-silvex-500" /> Revenue by Outdoor Space
              </h3>
            </div>
            <span className="text-xs font-semibold text-stone-500">2026 YTD</span>
          </div>

          <div className="space-y-4">
            {kpis.salesByOutdoorSpace.map((item) => (
              <div key={item.space} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-stone-800 dark:text-stone-200">
                  <span>{item.space}</span>
                  <span>{formatCurrency(item.revenue)} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-silvex-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Material & Craft (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-silvex-600 dark:text-silvex-400">
                Craft Breakdown
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <TreePine className="w-4 h-4 text-silvex-500" /> Sales by Material
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {kpis.salesByMaterial.map((m) => (
              <div
                key={m.material}
                className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200/60 dark:border-stone-800 flex justify-between items-center text-xs"
              >
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">{m.material}</span>
                  <span className="text-[10px] text-stone-500">{m.count} suites placed</span>
                </div>
                <span className="font-bold text-stone-900 dark:text-white">{formatCurrency(m.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Management Table */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-silvex-600 dark:text-silvex-400">
              Live Fulfillment
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Recent Outdoor Client Orders
            </h3>
          </div>
          <Link href="/admin/orders" className="text-xs text-silvex-600 hover:underline font-semibold">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Order</th>
                <th className="pb-3 font-semibold">Customer & Destination</th>
                <th className="pb-3 font-semibold">Pieces</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status Workflow</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-950/40 transition-colors">
                  <td className="py-4">
                    <span className="font-bold text-stone-900 dark:text-white block">#{order.orderNumber}</span>
                    <span className="text-[10px] text-stone-400">{formatDate(order.createdAt)}</span>
                  </td>
                  <td className="py-4">
                    <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                      {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                    </span>
                    <span className="text-[10px] text-stone-400 truncate max-w-xs block">
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} • {order.email}
                    </span>
                  </td>
                  <td className="py-4 font-medium text-stone-600 dark:text-stone-300">
                    {order.items.length} items
                  </td>
                  <td className="py-4 font-bold text-stone-900 dark:text-white">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                          : order.status === 'SHIPPED'
                          ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300'
                          : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="READY_FOR_SHIPMENT">Ready for Shipment</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-silvex-600 hover:text-silvex-700 font-semibold inline-flex items-center gap-1"
                    >
                      View <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
