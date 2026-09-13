'use client';

import { useState } from 'react';
import {
  Boxes,
  Plus,
  ArrowDownRight,
  ArrowUpRight,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  X,
  History,
} from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { PRODUCTS } from '@/lib/data/products';
import { formatDate } from '@/lib/utils';
import { InventoryMovement } from '@/types';

export default function AdminInventoryPage() {
  const [movements, setMovements] = useState<InventoryMovement[]>(db.inventory.getAllMovements());
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState('var-sol-sand');
  const [restockQty, setRestockQty] = useState('10');
  const [restockReason, setRestockReason] = useState('Spring 2026 Batch Shipment from Atelier');

  const products = db.products.findMany();

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.inventory.addStock(
      selectedVariantId,
      Number(restockQty),
      restockReason,
      'admin@silvex-outdoor.com'
    );
    setMovements([...db.inventory.getAllMovements()]);
    setIsRestockModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
            Stock Logistics & Atelier Audit
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Outdoor Inventory & Movements
          </h1>
        </div>

        <button
          onClick={() => setIsRestockModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-wider font-bold shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record Restock Batch</span>
        </button>
      </div>

      {/* Live Variant Stock Levels */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm p-6 space-y-4">
        <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Boxes className="w-5 h-5 text-silvex-500" /> Active Variant Stock Levels
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Product & Variant</th>
                <th className="pb-3 font-semibold">SKU</th>
                <th className="pb-3 font-semibold">Stock Level</th>
                <th className="pb-3 font-semibold">Threshold</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {products.flatMap((p) =>
                p.variants.map((v) => {
                  const isLow = v.inventoryCount <= v.lowStockAlert;
                  return (
                    <tr key={v.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-950/40">
                      <td className="py-3">
                        <span className="font-bold text-stone-900 dark:text-white block">{p.title}</span>
                        <span className="text-[11px] text-stone-500">{v.title}</span>
                      </td>
                      <td className="py-3 font-mono text-[11px] text-stone-600 dark:text-stone-300">{v.sku}</td>
                      <td className="py-3 font-bold text-stone-900 dark:text-white">{v.inventoryCount} units</td>
                      <td className="py-3 text-stone-500">{v.lowStockAlert} units alert</td>
                      <td className="py-3">
                        {isLow ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" /> Low Stock
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Optimal
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedVariantId(v.id);
                            setIsRestockModalOpen(true);
                          }}
                          className="text-xs font-semibold text-silvex-600 hover:underline"
                        >
                          + Add Stock
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movement Audit Log */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm p-6 space-y-4">
        <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <History className="w-5 h-5 text-silvex-500" /> Stock Movement History & Fulfillment Audit
        </h2>

        <div className="space-y-3">
          {movements.map((mov) => (
            <div
              key={mov.id}
              className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    mov.quantity > 0
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {mov.quantity > 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block">
                    {mov.productTitle} — {mov.variantTitle}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {mov.reason} {mov.referenceId ? `(Ref: ${mov.referenceId})` : ''}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-bold text-sm block ${
                    mov.quantity > 0 ? 'text-emerald-600' : 'text-stone-900 dark:text-white'
                  }`}
                >
                  {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity} units
                </span>
                <span className="text-[10px] text-stone-400">{formatDate(mov.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restock Modal */}
      {isRestockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsRestockModalOpen(false)} className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-2xl z-10 space-y-6 animate-slide-up">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                Record Stock Inflow / Restock
              </h2>
              <button onClick={() => setIsRestockModalOpen(false)} className="p-1 text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRestockSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Select Outdoor Variant</label>
                <select
                  value={selectedVariantId}
                  onChange={(e) => setSelectedVariantId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                >
                  {products.flatMap((p) =>
                    p.variants.map((v) => (
                      <option key={v.id} value={v.id}>
                        {p.title} — {v.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Quantity Added</label>
                <input
                  type="number"
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  min={1}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Restock Reason & Batch Ref</label>
                <input
                  type="text"
                  value={restockReason}
                  onChange={(e) => setRestockReason(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all mt-4"
              >
                Confirm Restock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
