'use client';

import { useState, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  ShieldCheck,
  Droplets,
  Sun,
  Truck,
  Heart,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Wind,
  Wrench,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatCurrency } from '@/lib/utils';
import { Product, ProductVariant } from '@/types';

export function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || ({} as ProductVariant)
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'delivery' | 'reviews'>('specs');

  // Review Form States
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewContext, setReviewContext] = useState('Terrace & Veranda');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const addItemToCart = useCartStore((state) => state.addItem);
  const setCartDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.basePrice + (selectedVariant.priceAdjustment || 0);

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(
      0,
      3
    );
  }, [product]);

  const handleAddToCart = () => {
    addItemToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addItemToCart(product, selectedVariant, quantity);
    router.push('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-semibold">
        <Link href="/" className="hover:text-silvex-600">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-silvex-600">Catalog</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link href={`/shop?category=${product.category.slug}`} className="hover:text-silvex-600">
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-stone-900 dark:text-white truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Product Hero: Gallery + Purchasing Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Interactive Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-luxury border border-stone-200/80 dark:border-stone-800">
            <img
              src={product.images[activeImageIndex]?.url || product.images[0]?.url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/20">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-silvex-500 ring-2 ring-silvex-500/20'
                      : 'border-stone-200 dark:border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Durability Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-stone-100 dark:bg-stone-900/60 rounded-xl text-center space-y-1 border border-stone-200/60 dark:border-stone-800">
              <Sun className="w-4 h-4 text-amber-500 mx-auto" />
              <span className="text-[10px] font-bold uppercase tracking-wider block text-stone-900 dark:text-white">
                {product.specification.uvResistanceRating.split('/')[0]}
              </span>
              <span className="text-[9px] text-stone-500 block">UV Shield</span>
            </div>

            <div className="p-3 bg-stone-100 dark:bg-stone-900/60 rounded-xl text-center space-y-1 border border-stone-200/60 dark:border-stone-800">
              <Droplets className="w-4 h-4 text-sky-500 mx-auto" />
              <span className="text-[10px] font-bold uppercase tracking-wider block text-stone-900 dark:text-white">
                QuickDry® Foam
              </span>
              <span className="text-[9px] text-stone-500 block">Fast Drainage</span>
            </div>

            <div className="p-3 bg-stone-100 dark:bg-stone-900/60 rounded-xl text-center space-y-1 border border-stone-200/60 dark:border-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto" />
              <span className="text-[10px] font-bold uppercase tracking-wider block text-stone-900 dark:text-white">
                {product.specification.warrantyYears}-Year Warranty
              </span>
              <span className="text-[9px] text-stone-500 block">Timber & Frame</span>
            </div>

            <div className="p-3 bg-stone-100 dark:bg-stone-900/60 rounded-xl text-center space-y-1 border border-stone-200/60 dark:border-stone-800">
              <Truck className="w-4 h-4 text-silvex-500 mx-auto" />
              <span className="text-[10px] font-bold uppercase tracking-wider block text-stone-900 dark:text-white">
                White Glove
              </span>
              <span className="text-[9px] text-stone-500 block">Free Assembly</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Suite (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title & SKU */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-silvex-600 dark:text-silvex-400">
                  {product.category?.name} • SKU: {selectedVariant.sku || product.sku}
                </span>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-full border transition-colors ${
                    inWishlist
                      ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-rose-600'
                  }`}
                  title={inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-rose-600' : ''}`} />
                </button>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-900 dark:text-white">
                  {product.ratingAverage}
                </span>
                <span className="text-xs text-stone-400">
                  ({product.ratingCount} verified outdoor reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-2 border-y border-stone-200/80 dark:border-stone-800">
              <span className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                {formatCurrency(currentPrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-stone-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">
                Complimentary White-Glove Setup
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Finish & Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white block">
                  Select Finish & Upholstery:{' '}
                  <span className="font-normal text-stone-500">{selectedVariant.title}</span>
                </label>

                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        selectedVariant.id === v.id
                          ? 'border-silvex-500 bg-silvex-50/50 dark:bg-silvex-950/30 ring-1 ring-silvex-500'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full border border-stone-300 shadow-sm"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <div>
                          <span className="text-xs font-semibold text-stone-900 dark:text-white block">
                            {v.title}
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400">
                            {v.inventoryCount > 3 ? 'In Stock — Ready to ship' : `Only ${v.inventoryCount} remaining`}
                          </span>
                        </div>
                      </div>
                      {v.priceAdjustment !== 0 && (
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          +{formatCurrency(v.priceAdjustment)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white block">
                Quantity
              </label>
              <div className="flex items-center w-32 border border-stone-300 dark:border-stone-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-bold"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-bold text-stone-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-stone-200/80 dark:border-stone-800">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-full bg-stone-900 hover:bg-forest-900 dark:bg-white dark:hover:bg-silvex-400 text-white dark:text-stone-950 text-xs uppercase tracking-[0.2em] font-bold shadow-luxury transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Outdoor Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-silvex-500 text-xs uppercase tracking-[0.2em] font-bold text-stone-900 dark:text-white transition-colors"
            >
              Buy Now with 1-Click
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> In Stock & Ready
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-silvex-500" /> 10-Yr Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-stone-400" /> 30-Day Trial
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Specifications, Care & Customer Reviews */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury overflow-hidden">
        {/* Tabs Bar */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 overflow-x-auto bg-stone-50 dark:bg-stone-950">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-silvex-500 text-silvex-600 dark:text-silvex-400 bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'care'
                ? 'border-silvex-500 text-silvex-600 dark:text-silvex-400 bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Weather Resistance & Care Guide
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'delivery'
                ? 'border-silvex-500 text-silvex-600 dark:text-silvex-400 bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            White-Glove Delivery
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-silvex-500 text-silvex-600 dark:text-silvex-400 bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Client Reviews ({product.ratingCount})
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="p-8 sm:p-12">
          {/* TAB 1: SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                  Materials & Dimensions
                </h3>
                <div className="grid grid-cols-2 gap-y-3 py-2 border-y border-stone-100 dark:border-stone-800">
                  <span className="font-semibold text-stone-500">Material</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.material}</span>

                  <span className="font-semibold text-stone-500">Frame Structure</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.frameMaterial}</span>

                  <span className="font-semibold text-stone-500">Cushion Upholstery</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.cushionFabric || 'Sling Batyline®'}</span>

                  <span className="font-semibold text-stone-500">Internal Core</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.cushionFoam || 'Open-cell Hydrophobic'}</span>

                  <span className="font-semibold text-stone-500">Overall Dimensions</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.dimensions}</span>

                  <span className="font-semibold text-stone-500">Weight</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.weight}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                  Durability Ratings & Warranty
                </h3>
                <div className="grid grid-cols-2 gap-y-3 py-2 border-y border-stone-100 dark:border-stone-800">
                  <span className="font-semibold text-stone-500">Weather Resistance</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.weatherResistance}</span>

                  <span className="font-semibold text-stone-500">UV Resistance</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.uvResistanceRating}</span>

                  <span className="font-semibold text-stone-500">Rust Resistance</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.rustResistance}</span>

                  <span className="font-semibold text-stone-500">Wind Stability</span>
                  <span className="text-stone-900 dark:text-white font-medium">{product.specification.maxWindResistance || 'Heavy ballast weighted'}</span>

                  <span className="font-semibold text-stone-500">Structural Warranty</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{product.specification.warrantyYears} Years Comprehensive</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CARE & WINTER */}
          {activeTab === 'care' && (
            <div className="space-y-6 max-w-3xl text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                  Outdoor Maintenance Instructions
                </h3>
                <p>{product.specification.maintenanceInstructions}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                  Winter & Sub-Zero Storage Guide
                </h3>
                <p>{product.specification.winterCareGuide}</p>
              </div>

              <div className="p-4 bg-silvex-50 dark:bg-silvex-950/40 rounded-xl border border-silvex-200 dark:border-silvex-800 text-xs text-silvex-800 dark:text-silvex-300">
                <strong className="block mb-1">Silvex Teak Shield Recommendation:</strong>
                Indonesian Grade-A Teak naturally transforms into a silvery driftwood gray under rain and sun. If you wish to preserve the vibrant amber-honey tone, apply Silvex Teak Sealer twice annually during spring and autumn.
              </div>
            </div>
          )}

          {/* TAB 3: WHITE-GLOVE DELIVERY */}
          {activeTab === 'delivery' && (
            <div className="space-y-6 max-w-3xl text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-2">
                The Silvex White-Glove Promise
              </h3>
              <p>
                Every complete suite order qualifies for our signature White-Glove Delivery & Installation. Our certified logistics team schedules a precise 2-hour delivery window, transports the furniture directly to your terrace, garden, or rooftop, completes all assembly, and removes all packaging materials.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/60 dark:border-stone-800">
                  <Calendar className="w-5 h-5 text-silvex-500 mb-2" />
                  <strong className="block text-stone-900 dark:text-white text-xs">Scheduled Arrival</strong>
                  <span className="text-[11px] text-stone-500">Dedicated appointment with 30-min advance call</span>
                </div>
                <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/60 dark:border-stone-800">
                  <Wrench className="w-5 h-5 text-silvex-500 mb-2" />
                  <strong className="block text-stone-900 dark:text-white text-xs">Complete Assembly</strong>
                  <span className="text-[11px] text-stone-500">Full placement, leveling, and hardware checks</span>
                </div>
                <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/60 dark:border-stone-800">
                  <RotateCcw className="w-5 h-5 text-silvex-500 mb-2" />
                  <strong className="block text-stone-900 dark:text-white text-xs">30-Day In-Home Trial</strong>
                  <span className="text-[11px] text-stone-500">Experience the quality in your private setting</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Review Submission Form */}
              <div className="p-6 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                  Write a Verified Owner Review
                </h4>

                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-semibold">
                    Thank you! Your outdoor review has been recorded and published.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Rating:</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      >
                        <option value={5}>5 Stars - Outstanding Outdoor Luxury</option>
                        <option value={4}>4 Stars - High Quality</option>
                        <option value={3}>3 Stars - Satisfactory</option>
                      </select>

                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 ml-4">Environment:</label>
                      <select
                        value={reviewContext}
                        onChange={(e) => setReviewContext(e.target.value)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      >
                        <option value="Oceanfront Terrace">Oceanfront Terrace</option>
                        <option value="Poolside Deck">Poolside Deck</option>
                        <option value="Garden Pavilion">Garden Pavilion</option>
                        <option value="Rooftop Sky Lounge">Rooftop Sky Lounge</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Headline (e.g. Flawless in coastal weather)"
                      className="w-full px-4 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-silvex-500"
                      required
                    />

                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Describe the craftsmanship, comfort, and weather durability in your outdoor space..."
                      rows={3}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-silvex-500"
                      required
                    />

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-silvex-600 transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="p-6 bg-stone-50/50 dark:bg-stone-950/40 rounded-2xl border border-stone-100 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-stone-900 dark:text-white">
                        Exceptional timber joinery and weather resilience
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400">Verified Owner • Malibu, CA</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                    &ldquo;We have had this on our seaside deck for two seasons now. The teak has taken on an exquisite silver patina and the Sunbrella cushions have remained completely water-repellent.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-silvex-600 dark:text-silvex-400 block mb-1">
                Complementary Pieces
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                Frequently Curated Together
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={rel.images[0]?.url}
                    alt={rel.title}
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white group-hover:text-silvex-600 dark:group-hover:text-silvex-400">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1">{rel.specification.material}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-sm font-bold text-stone-900 dark:text-white">
                      {formatCurrency(rel.basePrice)}
                    </span>
                    <span className="text-xs font-semibold text-silvex-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
