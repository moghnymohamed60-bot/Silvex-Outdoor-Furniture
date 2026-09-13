'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  MapPin,
  Building,
  User,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscountAmount, getShippingAmount, getTaxAmount, getTotal, clearCart } =
    useCartStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    email: 'sophia.laurent@villa-azure.com',
    firstName: 'Sophia',
    lastName: 'Laurent',
    phone: '+1 (555) 890-1234',
    company: 'Villa Azure Estate',
    street: '28400 Pacific Coast Highway',
    apartment: 'Private Residence & Terrace',
    city: 'Malibu',
    state: 'CA',
    postalCode: '90265',
    country: 'US',
    customerNotes: 'Please call 30 minutes in advance. White-glove setup on oceanfront terrace.',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '08/29',
    cardCvc: '888',
    cardName: 'Sophia Laurent',
  });

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingAmount();
  const tax = getTaxAmount();
  const total = getTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        email: formData.email,
        phone: formData.phone,
        subtotal,
        discountAmount: discount,
        shippingAmount: shipping,
        taxAmount: tax,
        totalAmount: total,
        customerNotes: formData.customerNotes,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company,
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        items: items.map((item) => ({
          productId: item.productId,
          productTitle: item.product.title,
          variantTitle: item.variant.title,
          sku: item.variant.sku || item.product.sku,
          imageUrl: item.product.images[0]?.url || '',
          price: item.product.basePrice + (item.variant.priceAdjustment || 0),
          quantity: item.quantity,
          totalPrice: (item.product.basePrice + (item.variant.priceAdjustment || 0)) * item.quantity,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        setOrderComplete(data.data);
        clearCart();
      } else {
        alert(data.error || 'Failed to place order.');
      }
    } catch {
      alert('An error occurred during checkout processing.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
            Thank You for Elevating Your Outdoor Living.
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto">
            Your order <strong className="text-stone-900 dark:text-white">#{orderComplete.orderNumber}</strong> has been received. Our White-Glove Logistics Concierge will contact you to schedule your preferred delivery and installation window.
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 text-left space-y-4 max-w-xl mx-auto shadow-luxury">
          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
            <span className="text-xs font-semibold text-stone-500">Order Number</span>
            <span className="text-xs font-bold text-stone-900 dark:text-white">{orderComplete.orderNumber}</span>
          </div>

          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
            <span className="text-xs font-semibold text-stone-500">Delivery Address</span>
            <span className="text-xs text-stone-900 dark:text-white text-right">
              {orderComplete.shippingAddress?.street}, {orderComplete.shippingAddress?.city}, {orderComplete.shippingAddress?.state}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
            <span className="text-xs font-semibold text-stone-500">Delivery Service</span>
            <span className="text-xs font-semibold text-emerald-600">White-Glove Placement & Assembly</span>
          </div>

          <div className="flex justify-between items-center pt-1 text-sm font-bold text-stone-900 dark:text-white">
            <span>Total Paid</span>
            <span>{formatCurrency(orderComplete.totalAmount)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/account/orders"
            className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-forest-900 text-white text-xs uppercase tracking-widest font-bold transition-colors"
          >
            Track Order Status
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-silvex-500 text-xs uppercase tracking-widest font-bold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            Secure Outdoor Checkout
          </h1>
          <p className="text-xs text-stone-500">
            Encrypted with 256-Bit SSL • Stripe Payment Protection
          </p>
        </div>

        {/* Step Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold">
          <span className={step >= 1 ? 'text-silvex-600' : 'text-stone-400'}>1. Customer</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className={step >= 2 ? 'text-silvex-600' : 'text-stone-400'}>2. Delivery</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className={step === 3 ? 'text-silvex-600' : 'text-stone-400'}>3. Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: CONTACT */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                <User className="w-4 h-4 text-silvex-500" />
                <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                  1. Customer Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Email Address (for order updates)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Mobile Phone (for delivery scheduling)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Continue to Delivery Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: SHIPPING ADDRESS & METHOD */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-silvex-500" />
                  <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                    2. Delivery Address & Installation Instructions
                  </h2>
                </div>
                <button type="button" onClick={() => setStep(1)} className="text-xs text-silvex-600 underline">
                  Back
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Villa / Apt / Terrace</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Access Notes & Gate Codes (for Delivery Crew)
                </label>
                <textarea
                  name="customerNotes"
                  value={formData.customerNotes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                />
              </div>

              {/* Delivery Service Selection */}
              <div className="p-4 bg-silvex-50 dark:bg-silvex-950/40 rounded-2xl border border-silvex-200 dark:border-silvex-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-silvex-600" /> Silvex White-Glove Installation Included
                  </span>
                  <span className="text-xs font-bold text-emerald-600">FREE</span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300">
                  Full placement on terrace/garden, packaging unpack and removal, and hardware torque verification.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <form onSubmit={handlePlaceOrder} className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-silvex-500" />
                  <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                    3. Secure Payment with Stripe
                  </h2>
                </div>
                <button type="button" onClick={() => setStep(2)} className="text-xs text-silvex-600 underline">
                  Back
                </button>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" /> End-to-End Encrypted
                  </span>
                  <span className="font-semibold text-stone-900 dark:text-white">Stripe Verified</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-white font-mono"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Expiration</label>
                    <input
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-white font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">CVC</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-white font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {loading ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatCurrency(total)} & Complete Order</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Order Review Sidebar (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
              Order Review ({items.length} pieces)
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0">
                    <img src={item.product.images[0]?.url} alt={item.product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-stone-900 dark:text-white block truncate">{item.product.title}</span>
                    <span className="text-stone-500 text-[11px] block">{item.variant.title}</span>
                    <span className="text-stone-500 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-white">
                    {formatCurrency((item.product.basePrice + (item.variant.priceAdjustment || 0)) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>White-Glove Delivery</span>
                <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>Total Amount</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
