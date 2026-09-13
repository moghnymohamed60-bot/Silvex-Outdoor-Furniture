'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency, FREE_SHIPPING_THRESHOLD } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscountAmount,
    getShippingAmount,
    getTotal,
    discountCode,
    applyDiscount,
    removeDiscount,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [loadingPromo, setLoadingPromo] = useState(false);

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shippingAmount = getShippingAmount();
  const total = getTotal();

  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    setLoadingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    try {
      const res = await fetch('/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput.trim(), subtotal }),
      });
      const data = await res.json();

      if (data.success) {
        if (data.data.type === 'PERCENTAGE') {
          applyDiscount(data.data.code, data.data.value, 0);
        } else {
          applyDiscount(data.data.code, 0, data.data.value);
        }
        setPromoSuccess(`Applied: ${data.data.description}`);
        setPromoInput('');
      } else {
        setPromoError(data.error || 'Invalid promotion code');
      }
    } catch {
      setPromoError('Failed to validate promotion code');
    } finally {
      setLoadingPromo(false);
    }
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col animate-slide-up">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800 dark:text-stone-200" />
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                Your Outdoor Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-stone-100 dark:bg-stone-800/80 px-6 py-3 border-b border-stone-200/80 dark:border-stone-700/80">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                <Truck className="w-3.5 h-3.5 text-silvex-600 dark:text-silvex-400" />
                {remainingForFreeShipping === 0
                  ? 'Unlocked: Complimentary White-Glove Installation!'
                  : `Add ${formatCurrency(remainingForFreeShipping)} for Complimentary White-Glove Setup`}
              </span>
              <span className="font-semibold text-silvex-600 dark:text-silvex-400">
                {Math.round(progressToFreeShipping)}%
              </span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-silvex-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-200/70 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-white">
                  Your outdoor curation is empty
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
                  Explore our handcrafted teak sectionals, poolside loungers, and alfresco dining collections.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs uppercase tracking-widest font-semibold hover:bg-silvex-600 dark:hover:bg-silvex-400 transition-colors"
                >
                  Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = item.product.basePrice + (item.variant.priceAdjustment || 0);
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white dark:bg-stone-950 rounded-xl border border-stone-200/80 dark:border-stone-800 transition-all"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-white truncate">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-rose-500 p-1 -mr-1"
                            title="Remove piece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                          {item.variant.title}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100 dark:border-stone-850">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-900">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-stone-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                          {formatCurrency(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 space-y-4">
              {/* Promo Code Input */}
              <div>
                {discountCode ? (
                  <div className="flex items-center justify-between bg-silvex-50 dark:bg-silvex-950/40 p-2.5 rounded-lg border border-silvex-200 dark:border-silvex-800 text-xs">
                    <span className="font-semibold text-silvex-700 dark:text-silvex-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Promo &ldquo;{discountCode}&rdquo; Applied (-{formatCurrency(discountAmount)})
                    </span>
                    <button
                      onClick={removeDiscount}
                      className="text-stone-500 hover:text-rose-500 text-xs font-semibold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. SILVEX10)"
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white uppercase placeholder-stone-400 focus:outline-none focus:border-silvex-500"
                    />
                    <button
                      type="submit"
                      disabled={loadingPromo}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:bg-silvex-600 dark:hover:bg-silvex-300 transition-colors disabled:opacity-50"
                    >
                      {loadingPromo ? 'Applying...' : 'Apply'}
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-600 mt-1">{promoSuccess}</p>}
              </div>

              {/* Order Summary Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 dark:text-white">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Outdoor Season Savings</span>
                    <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Delivery & Installation</span>
                  <span>{shippingAmount === 0 ? <strong className="text-emerald-600">FREE</strong> : formatCurrency(shippingAmount)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-900 dark:text-white">
                  <span>Estimated Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 dark:bg-silvex-500 dark:hover:bg-silvex-600 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 dark:text-stone-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>10-Year Warranty • 30-Day In-Home Outdoor Trial</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
