'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency, FREE_SHIPPING_THRESHOLD } from '@/lib/utils';
import { PRODUCTS } from '@/lib/data/products';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscountAmount,
    getShippingAmount,
    getTaxAmount,
    getTotal,
    discountCode,
    applyDiscount,
    removeDiscount,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shippingAmount = getShippingAmount();
  const taxAmount = getTaxAmount();
  const total = getTotal();

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setLoading(true);
    setPromoError('');
    setPromoSuccess('');

    try {
      const res = await fetch('/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode.trim(), subtotal }),
      });
      const data = await res.json();

      if (data.success) {
        if (data.data.type === 'PERCENTAGE') {
          applyDiscount(data.data.code, data.data.value, 0);
        } else {
          applyDiscount(data.data.code, 0, data.data.value);
        }
        setPromoSuccess(`Applied: ${data.data.description}`);
        setPromoCode('');
      } else {
        setPromoError(data.error || 'Invalid promo code');
      }
    } catch {
      setPromoError('Failed to validate promo code');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Your Outdoor Curation is Empty
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Explore our handcrafted teak modular sectionals, cantilever shades, and resort poolside daybeds.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-900 hover:bg-forest-900 dark:bg-white dark:hover:bg-silvex-400 text-white dark:text-stone-900 text-xs uppercase tracking-widest font-bold shadow-luxury transition-all"
        >
          Explore Outdoor Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
          Your Shopping Bag
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          {items.reduce((s, i) => s + i.quantity, 0)} pieces in your outdoor selection
        </p>
      </div>

      {/* Free Shipping Progress */}
      <div className="p-4 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-silvex-100 dark:bg-silvex-950 flex items-center justify-center text-silvex-600 flex-shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900 dark:text-white">
              {remaining === 0
                ? 'Unlocked: Complimentary White-Glove Installation on Your Order!'
                : `Add ${formatCurrency(remaining)} for Complimentary White-Glove Placement & Assembly`}
            </p>
            <p className="text-[11px] text-stone-500">
              Includes scheduled room-of-choice placement and debris removal.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-48 bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
          <div className="bg-silvex-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const price = item.product.basePrice + (item.variant.priceAdjustment || 0);
            return (
              <div
                key={item.id}
                className="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center"
              >
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white hover:text-silvex-600">
                        {item.product.title}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-rose-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-500">
                    Finish: <strong className="text-stone-800 dark:text-stone-200">{item.variant.title}</strong>
                  </p>
                  <p className="text-xs text-stone-500">
                    Material: {item.product.specification.material}
                  </p>

                  <div className="pt-3 flex items-center justify-between">
                    <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-base font-bold text-stone-900 dark:text-white">
                      {formatCurrency(price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-5">
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
              Order Summary
            </h2>

            {/* Promo code */}
            <div>
              {discountCode ? (
                <div className="flex items-center justify-between p-2.5 bg-silvex-50 dark:bg-silvex-950/40 rounded-xl border border-silvex-200 text-xs">
                  <span className="font-semibold text-silvex-700 dark:text-silvex-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> &ldquo;{discountCode}&rdquo; Applied
                  </span>
                  <button onClick={removeDiscount} className="text-stone-500 hover:text-rose-500 underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. SILVEX10)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 uppercase"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl hover:bg-silvex-600 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-emerald-600 mt-1">{promoSuccess}</p>}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Season Savings</span>
                  <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Delivery</span>
                <span>{shippingAmount === 0 ? <strong className="text-emerald-600">FREE</strong> : formatCurrency(shippingAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-stone-200 dark:border-stone-800 text-base font-bold text-stone-900 dark:text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 dark:bg-silvex-500 dark:hover:bg-silvex-600 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted Checkout • 10-Year Structural Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
