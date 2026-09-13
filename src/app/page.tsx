'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Droplets,
  Sun,
  Award,
  Star,
  CheckCircle2,
  Sparkles,
  Heart,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Layers,
  Compass,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';
import { COLLECTIONS } from '@/lib/data/collections';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';

export default function HomePage() {
  const [selectedSpaceFilter, setSelectedSpaceFilter] = useState<string>('all');
  const addItemToCart = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  const filteredSpaceProducts =
    selectedSpaceFilter === 'all'
      ? PRODUCTS.slice(0, 6)
      : PRODUCTS.filter((p) => p.outdoorSpaceId === selectedSpaceFilter);

  const handleQuickAdd = (product: Product) => {
    if (product.variants.length > 0) {
      addItemToCart(product, product.variants[0], 1);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Silvex Luxury Outdoor Living Villa Terrace"
            className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-900/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white space-y-6 pt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-[0.2em] text-silvex-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Architectural Outdoor Living
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
            Elevate Your <br className="hidden sm:inline" />
            <span className="italic font-normal text-silvex-200">Outdoor Living.</span>
          </h1>

          <p className="text-base sm:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Handcrafted Grade-A Indonesian Teak, marine-grade aluminum, and hydrophobic Sunbrella® upholstery engineered to endure the elements with effortless elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-100 hover:bg-white text-stone-950 text-xs uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Shop Outdoor Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/spaces/terrace"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Outdoor Spaces</span>
            </Link>
          </div>

          {/* Quick Pillars Strip */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-white/15 max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="text-xs text-stone-300 font-medium">UV-50+ Sunbrella® Fabric</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Droplets className="w-5 h-5 text-sky-400 flex-shrink-0" />
              <span className="text-xs text-stone-300 font-medium">QuickDry® Core Drainage</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs text-stone-300 font-medium">10-Year Timber Warranty</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-silvex-400 flex-shrink-0" />
              <span className="text-xs text-stone-300 font-medium">FSC® Grade-A Teak</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY OUTDOOR SPACE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400 block mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-silvex-500" /> Curated Environments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-white">
              Shop by Outdoor Space
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md">
            Every outdoor environment possesses unique architectural demands. Select your setting to discover furniture tailored to your space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OUTDOOR_SPACES.map((space) => (
            <Link
              key={space.id}
              href={`/spaces/${space.slug}`}
              className="group relative h-[360px] rounded-2xl overflow-hidden shadow-lg border border-stone-200/60 dark:border-stone-800"
            >
              <img
                src={space.heroImage}
                alt={space.name}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent transition-opacity duration-300 group-hover:from-stone-950" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-silvex-400">
                  Outdoor Setting
                </span>
                <h3 className="font-serif text-2xl font-bold">{space.name}</h3>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {space.headline}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-silvex-300 group-hover:text-white transition-colors">
                  <span>Explore {space.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED EDITORIAL COLLECTIONS */}
      <section className="bg-stone-100 dark:bg-stone-900/60 py-20 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400 block">
              Signature Aesthetics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-white">
              Curated Outdoor Collections
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              Cohesive design languages merging monumental silhouette clarity with the raw warmth of nature.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {COLLECTIONS.slice(0, 3).map((col) => (
              <div
                key={col.id}
                className="bg-white dark:bg-stone-950 rounded-2xl overflow-hidden shadow-luxury border border-stone-200/80 dark:border-stone-800 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  {col.isFeatured && (
                    <div className="absolute top-4 right-4 bg-stone-900/85 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/20">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                      {col.name}
                    </h3>
                    <span className="text-xs font-medium text-silvex-600 dark:text-silvex-400 block mt-0.5">
                      {col.tagline}
                    </span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-3 line-clamp-3 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {col.materialsUsed.map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/collections/${col.slug}`}
                      className="w-full py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-silvex-500 text-xs font-semibold text-stone-900 dark:text-white uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      View Collection <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS & FEATURED CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400 block mb-2">
              Most Coveted Pieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-white">
              Best Sellers in Outdoor Living
            </h2>
          </div>
          <Link
            href="/shop?sortBy=bestseller"
            className="text-xs font-bold uppercase tracking-wider text-silvex-600 dark:text-silvex-400 hover:underline flex items-center gap-1"
          >
            View All Best Sellers <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <Link href={`/products/${product.slug}`}>
                    <img
                      src={product.images[0]?.url}
                      alt={product.title}
                      className="w-full h-full object-cover img-zoom"
                    />
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Save to wishlist"
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                      inWishlist
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80'
                        : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-rose-600' : ''}`} />
                  </button>

                  {/* Durability Highlights */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    <span className="bg-stone-900/80 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {product.specification.weatherResistance.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {product.ratingAverage}
                      </span>
                      <span className="text-[10px] text-stone-400">({product.ratingCount})</span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white group-hover:text-silvex-600 dark:group-hover:text-silvex-400 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                      {product.specification.material}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-stone-900 dark:text-white">
                        {formatCurrency(product.basePrice)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-stone-400 line-through ml-1.5">
                          {formatCurrency(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="p-2 rounded-lg bg-stone-900 hover:bg-silvex-600 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-silvex-400 transition-colors"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. THE ART OF WEATHERPROOF LUXURY (MATERIALS & CRAFT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-14 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-300 block">
              The Science of Longevity
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
              Crafted to Outlast the Elements.
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              We never compromise with indoor materials disguised as outdoor furniture. Every Silvex piece is built from the inside out using marine-grade components that resist intense equatorial sun, torrential rain, frost, and coastal salt spray.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2 border-l-2 border-silvex-400 pl-4">
                <h4 className="font-serif text-lg font-bold text-silvex-200">Grade-A Indonesian Teak</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Kiln-dried from mature 40-year sustainably managed plantations, rich in natural preserving silica and oils.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-silvex-400 pl-4">
                <h4 className="font-serif text-lg font-bold text-silvex-200">Sunbrella® Acrylic Weaves</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Solution-dyed to the core fibers. Colorfast against 2,000+ hours of direct UV exposure with built-in stain defense.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-silvex-400 pl-4">
                <h4 className="font-serif text-lg font-bold text-silvex-200">QuickDry® Reticulated Foam</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Open-cell honeycomb internal matrix allows rainwater to channel immediately through without damp accumulation or mold.
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-silvex-400 pl-4">
                <h4 className="font-serif text-lg font-bold text-silvex-200">Marine T6 Powder Aluminum</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Electrostatic multi-stage powder-coated chassis tested against 1,000+ hours of continuous salt-fog spray with zero rust.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-silvex-500 hover:bg-silvex-600 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Read Our Craft & Material Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOSPITALITY & CONTRACT CONCIERGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
              alt="Silvex Hospitality Resort Deck"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] uppercase tracking-widest font-bold text-silvex-400">
                Hospitality Project
              </span>
              <h4 className="font-serif text-lg font-semibold">The Azure Horizon Beach Club • St. Tropez</h4>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400 block">
              Contract & Commercial
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-white leading-tight">
              Hospitality Solutions for World-Class Resorts & Terraces
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              We partner with luxury hoteliers, landscape architects, Michelin-starred restauranteurs, and yacht clubs. Our contract division offers high-traffic durability certifications (100,000+ Martindale rubs), custom dimensions, rapid logistics, and 3D CAD modeling.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-silvex-600 dark:text-silvex-400 flex-shrink-0" />
                <span>Dedicated trade account manager and volume pricing tiers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-silvex-600 dark:text-silvex-400 flex-shrink-0" />
                <span>Full BIFMA & EN 581 commercial contract compliance</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-silvex-600 dark:text-silvex-400 flex-shrink-0" />
                <span>Custom Sunbrella® upholstery colors and weather-sealed finish options</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/hospitality"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs uppercase tracking-widest font-bold hover:bg-silvex-600 dark:hover:bg-silvex-300 transition-colors"
              >
                <span>Inquire About Trade & Contract Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CLIENT REVIEWS */}
      <section className="bg-stone-100/70 dark:bg-stone-900/40 py-20 border-t border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400 block">
              Endorsed by Architecture & Design
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-white">
              Voices of Outdoor Elegance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-stone-950 p-8 rounded-2xl shadow-sm border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                  &ldquo;Impervious to Malibu Ocean Salt Fog&rdquo;
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  &ldquo;After 8 months on our oceanfront terrace, the Solara Teak Sectional looks as breathtaking as day one. Rain simply glides right off the cushions and the wood has taken on a noble golden hue.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <p className="text-xs font-bold text-stone-900 dark:text-white">Sophia Laurent</p>
                <p className="text-[11px] text-stone-400">Malibu, California • Oceanfront Terrace</p>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-950 p-8 rounded-2xl shadow-sm border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                  &ldquo;A Masterpiece for Mountain Weather&rdquo;
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  &ldquo;We installed the Terra Dining Set and Aura Fire Table on our Aspen veranda. The heat output and architectural presence during snow flurries is unmatched.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <p className="text-xs font-bold text-stone-900 dark:text-white">Marcus Sterling</p>
                <p className="text-[11px] text-stone-400">Aspen, Colorado • Red Mountain Estate</p>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-950 p-8 rounded-2xl shadow-sm border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                  &ldquo;Five-Star Resort Durability&rdquo;
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  &ldquo;The Marina Poolside Sun Loungers survived a full season of heavy guest traffic, suntan oils, and chlorine without a single sign of wear. Truly contract-grade.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <p className="text-xs font-bold text-stone-900 dark:text-white">Elena Rostova</p>
                <p className="text-[11px] text-stone-400">Miami Beach, Florida • Boutique Hotelier</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
