'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Filter, ChevronRight, CheckCircle2, Truck } from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(db.orders.findAll());
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const handleStatusChange = (id: string, status: OrderStatus) => {
    db.orders.updateStatus(id, status);
    setOrders([...db.orders.findAll()]);
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.shippingAddress?.firstName.toLowerCase().includes(q) ||
        o.shippingAddress?.lastName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
            Fulfillment Logistics
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Client Order Management ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, client, email..."
            className="bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none flex-1"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                statusFilter === st
                  ? 'bg-silvex-500 text-white font-bold'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider text-[10px] bg-stone-50 dark:bg-stone-950">
                <th className="py-3 px-6 font-semibold">Order</th>
                <th className="py-3 font-semibold">Client Destination</th>
                <th className="py-3 font-semibold">Total</th>
                <th className="py-3 font-semibold">Carrier / Tracking</th>
                <th className="py-3 font-semibold">Fulfillment Status</th>
                <th className="py-3 px-6 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-950/40">
                  <td className="py-4 px-6">
                    <span className="font-bold text-stone-900 dark:text-white block">#{order.orderNumber}</span>
                    <span className="text-[10px] text-stone-400">{formatDate(order.createdAt)} • {order.items.length} items</span>
                  </td>
                  <td className="py-4">
                    <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                      {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                    </span>
                    <span className="text-[10px] text-stone-400 block truncate max-w-xs">
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} • {order.email}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-stone-900 dark:text-white">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="py-4 font-mono text-[11px] text-stone-600 dark:text-stone-300">
                    <span className="block font-sans text-xs">{order.carrier || 'Silvex Logistics'}</span>
                    <span className="text-[10px] text-stone-400">{order.trackingNumber || 'Pending'}</span>
                  </td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
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
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-silvex-600 hover:text-silvex-700 font-semibold inline-flex items-center gap-1"
                    >
                      View <ChevronRight className="w-3.5 h-3.5" />
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
