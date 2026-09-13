'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  MapPin,
  ShieldCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
  Edit,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AccountPage() {
  const { user, logout, updateProfile, isAdmin } = useAuthStore();
  const [editingProfile, setEditingProfile] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || 'Sophia');
  const [lastName, setLastName] = useState(user?.lastName || 'Laurent');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 890-1234');

  const orders = db.orders.findAll().slice(0, 3);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ firstName, lastName, phone });
    setEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
            Private Client Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Welcome, {user?.firstName || 'Sophia'}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">{user?.email || 'sophia.laurent@villa-azure.com'}</p>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-full bg-forest-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-forest-800 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </Link>
          )}
          <button
            onClick={logout}
            className="px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-600 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile & Addresses (1 Col) */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-silvex-500" /> Client Profile
              </h2>
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className="text-xs text-silvex-600 dark:text-silvex-400 hover:underline font-semibold"
              >
                {editingProfile ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-stone-900 text-white font-semibold uppercase tracking-wider text-[11px]"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 pt-2">
                <p>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Full Name</span>
                  <strong className="text-stone-900 dark:text-white">{user?.firstName} {user?.lastName}</strong>
                </p>
                <p>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Email</span>
                  <strong className="text-stone-900 dark:text-white">{user?.email}</strong>
                </p>
                <p>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Phone</span>
                  <strong className="text-stone-900 dark:text-white">{user?.phone || '+1 (555) 890-1234'}</strong>
                </p>
              </div>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-silvex-500" /> Default Delivery Residence
            </h2>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <p className="font-bold text-stone-900 dark:text-white">Villa Azure • Oceanfront Residence</p>
              <p>28400 Pacific Coast Highway</p>
              <p>Malibu, CA 90265, United States</p>
            </div>
          </div>
        </div>

        {/* Right: Recent Orders & Tracking (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-silvex-500" /> Recent Outdoor Furniture Orders
              </h2>
              <Link href="/account/orders" className="text-xs text-silvex-600 dark:text-silvex-400 hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/60 dark:border-stone-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white">
                        Order #{order.orderNumber}
                      </span>
                      <span className="text-stone-400 block text-[11px]">
                        Placed on {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'DELIVERED'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : order.status === 'SHIPPED'
                            ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <span className="font-bold text-stone-900 dark:text-white">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800 text-xs">
                    <span className="text-stone-500">{order.items.length} items • {order.shippingMethod}</span>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-silvex-600 hover:text-silvex-700 font-semibold inline-flex items-center gap-1"
                    >
                      Track Shipment <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
