'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight, Star } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleMoveToBag = (product: any) => {
    if (product.variants && product.variants.length > 0) {
      addItemToCart(product, product.variants[0], 1);
      removeItem(product.id);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Save your favorite outdoor sofas, dining tables, and poolside loungers to review anytime.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-900 hover:bg-forest-900 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all"
        >
          Explore Outdoor Collection <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Saved Outdoor Pieces ({items.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Your personal curation of architectural outdoor living.
          </p>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs text-stone-500 hover:text-rose-600 underline font-semibold"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
              <Link href={`/products/${product.slug}`}>
                <img
                  src={product.images[0]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-stone-900/80 text-rose-500 hover:bg-white"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white hover:text-silvex-600 line-clamp-1">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                  {product.specification?.material}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900 dark:text-white">
                  {formatCurrency(product.basePrice)}
                </span>
                <button
                  onClick={() => handleMoveToBag(product)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-silvex-600 text-white text-xs font-semibold transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
