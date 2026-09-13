'use client';

import { Users, Mail, Phone, Calendar, DollarSign, Award } from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminCustomersPage() {
  const users = db.users.findAll();
  const orders = db.orders.findAll();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
          Client Relations
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Client Profiles & Lifetime Value ({users.length})
        </h1>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider text-[10px] bg-stone-50 dark:bg-stone-950">
                <th className="py-3 px-6 font-semibold">Client Name</th>
                <th className="py-3 font-semibold">Contact</th>
                <th className="py-3 font-semibold">Role Tier</th>
                <th className="py-3 font-semibold">Orders Placed</th>
                <th className="py-3 font-semibold">Total Lifetime Value</th>
                <th className="py-3 px-6 text-right font-semibold">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {users.map((client) => {
                const clientOrders = orders.filter((o) => o.email.toLowerCase() === client.email.toLowerCase() || o.userId === client.id);
                const ltv = clientOrders.reduce((sum, o) => sum + o.totalAmount, 0);

                return (
                  <tr key={client.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-950/40">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-silvex-100 dark:bg-silvex-950 text-silvex-700 dark:text-silvex-300 font-bold flex items-center justify-center text-xs">
                          {client.firstName[0]}
                        </div>
                        <div>
                          <span className="font-bold text-stone-900 dark:text-white block">
                            {client.firstName} {client.lastName}
                          </span>
                          <span className="text-[10px] text-stone-400">ID: {client.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-stone-800 dark:text-stone-200 block">{client.email}</span>
                      <span className="text-[10px] text-stone-400">{client.phone || '+1 (555) 000-0000'}</span>
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {client.role}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-stone-800 dark:text-stone-200">
                      {clientOrders.length} orders
                    </td>
                    <td className="py-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(ltv)}
                    </td>
                    <td className="py-4 px-6 text-right text-stone-500">
                      {formatDate(client.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
