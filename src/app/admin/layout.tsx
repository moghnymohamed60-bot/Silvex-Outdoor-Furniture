'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Compass,
  Boxes,
  ShoppingBag,
  Users,
  Star,
  Tag,
  BarChart3,
  Settings,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Discounts', href: '/admin/discounts', icon: Tag },
  { name: 'Outdoor Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col lg:flex-row">
      {/* Mobile Admin Header */}
      <div className="lg:hidden bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-silvex-400" />
          <span className="font-serif font-bold text-sm tracking-widest uppercase">SILVEX ADMIN</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 text-stone-300">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-stone-900 text-stone-300 border-r border-stone-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo & Role Badge */}
          <div>
            <Link href="/admin" className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.25em] font-semibold text-white uppercase">
                SILVEX
              </span>
              <span className="text-[9px] tracking-[0.38em] uppercase text-silvex-400 -mt-0.5 font-bold">
                Executive Management
              </span>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="space-y-1 text-xs font-semibold">
            {ADMIN_LINKS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-silvex-500 text-white shadow-md font-bold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User & Storefront Link Footer */}
        <div className="p-4 border-t border-stone-800 space-y-3 bg-stone-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-silvex-600 text-white flex items-center justify-center font-bold text-xs">
              {user?.firstName?.[0] || 'A'}
            </div>
            <div className="min-w-0 flex-1 text-xs">
              <span className="font-bold text-white block truncate">{user?.firstName} {user?.lastName}</span>
              <span className="text-[10px] text-stone-400 block">{user?.role || 'SUPER_ADMIN'}</span>
            </div>
          </div>

          <Link
            href="/"
            className="w-full py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-silvex-400" />
            <span>View Public Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
