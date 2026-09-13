'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';
import { CATEGORIES } from '@/lib/data/categories';
import { COLLECTIONS } from '@/lib/data/collections';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';

const MATERIALS = [
  'Grade-A Indonesian Teak',
  'Marine-Grade T6 Aluminum',
  'Italian Olefin Nautical Cord',
  'Sunbrella® All-Weather Fabric',
  'GFRC Volcanic Stone Composite',
  'Batyline® Serge Ferrari Mesh',
];

const WEATHER_RESISTANCE_OPTIONS = [
  'All-Weather UV50+',
  '100% Rust-Proof Marine Aluminum',
  'QuickDry Reticulated Drainage',
  'Chlorine & Salt-Mist Proof',
];

export function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States
  const [selectedSpace, setSelectedSpace] = useState<string>(searchParams.get('space') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedCollection, setSelectedCollection] = useState<string>(searchParams.get('collection') || '');
  const [selectedMaterial, setSelectedMaterial] = useState<string>(searchParams.get('material') || '');
  const [selectedWeatherRes, setSelectedWeatherRes] = useState<string>(searchParams.get('weather') || '');
  const [inStockOnly, setInStockOnly] = useState<boolean>(searchParams.get('inStock') === 'true');
  const [minPrice, setMinPrice] = useState<number | undefined>(
    searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
  );
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'featured');
  const searchQuery = searchParams.get('q') || '';

  const addItemToCart = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    setSelectedSpace(searchParams.get('space') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedCollection(searchParams.get('collection') || '');
    setSelectedMaterial(searchParams.get('material') || '');
    setSelectedWeatherRes(searchParams.get('weather') || '');
    setInStockOnly(searchParams.get('inStock') === 'true');
    setSortBy(searchParams.get('sortBy') || 'featured');
  }, [searchParams]);

  const updateQueryParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/shop?${params.toString()}`);
  };

  const handleClearAll = () => {
    setSelectedSpace('');
    setSelectedCategory('');
    setSelectedCollection('');
    setSelectedMaterial('');
    setSelectedWeatherRes('');
    setInStockOnly(false);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSortBy('featured');
    router.replace('/shop');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.specification.material.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedSpace) {
        const space = OUTDOOR_SPACES.find((s) => s.slug === selectedSpace || s.id === selectedSpace);
        if (space && p.outdoorSpaceId !== space.id) return false;
      }

      if (selectedCategory) {
        const cat = CATEGORIES.find((c) => c.slug === selectedCategory || c.id === selectedCategory);
        if (cat && p.categoryId !== cat.id) return false;
      }

      if (selectedCollection) {
        const col = COLLECTIONS.find((c) => c.slug === selectedCollection || c.id === selectedCollection);
        if (col && p.collectionId !== col.id) return false;
      }

      if (selectedMaterial) {
        if (!p.specification.material.toLowerCase().includes(selectedMaterial.toLowerCase())) {
          return false;
        }
      }

      if (selectedWeatherRes) {
        if (!p.specification.weatherResistance.toLowerCase().includes(selectedWeatherRes.toLowerCase())) {
          return false;
        }
      }

      if (inStockOnly) {
        const hasStock = p.variants.some((v) => v.inventoryCount - v.reservedCount > 0);
        if (!hasStock) return false;
      }

      if (minPrice !== undefined && p.basePrice < minPrice) return false;
      if (maxPrice !== undefined && p.basePrice > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.basePrice - b.basePrice;
        case 'price-desc':
          return b.basePrice - a.basePrice;
        case 'rating':
          return b.ratingAverage - a.ratingAverage;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'bestseller':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [
    searchQuery,
    selectedSpace,
    selectedCategory,
    selectedCollection,
    selectedMaterial,
    selectedWeatherRes,
    inStockOnly,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedSpace ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (selectedCollection ? 1 : 0) +
    (selectedMaterial ? 1 : 0) +
    (selectedWeatherRes ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-semibold">
          <Link href="/" className="hover:text-silvex-600">Home</Link>
          <span>/</span>
          <span className="text-stone-900 dark:text-white">Outdoor Furniture Catalog</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 dark:text-white">
              Outdoor Living Catalog
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Showing {filteredProducts.length} pieces engineered for architectural exterior living.
            </p>
          </div>

          {/* Sort Selector & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-stone-500 font-medium hidden sm:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateQueryParam('sortBy', e.target.value);
                }}
                className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white font-medium focus:outline-none focus:border-silvex-500"
              >
                <option value="featured">Featured Outdoor Pieces</option>
                <option value="bestseller">Best Selling</option>
                <option value="newest">New Arrivals</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-stone-500">Active Filters:</span>

            {selectedSpace && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-silvex-100 dark:bg-silvex-950/60 text-silvex-800 dark:text-silvex-300 text-xs font-medium border border-silvex-200 dark:border-silvex-800">
                Space: {OUTDOOR_SPACES.find((s) => s.slug === selectedSpace || s.id === selectedSpace)?.name || selectedSpace}
                <button onClick={() => { setSelectedSpace(''); updateQueryParam('space', ''); }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-silvex-100 dark:bg-silvex-950/60 text-silvex-800 dark:text-silvex-300 text-xs font-medium border border-silvex-200 dark:border-silvex-800">
                Category: {CATEGORIES.find((c) => c.slug === selectedCategory || c.id === selectedCategory)?.name || selectedCategory}
                <button onClick={() => { setSelectedCategory(''); updateQueryParam('category', ''); }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedMaterial && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium">
                Material: {selectedMaterial}
                <button onClick={() => { setSelectedMaterial(''); updateQueryParam('material', ''); }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                In Stock & Ready to Ship
                <button onClick={() => { setInStockOnly(false); updateQueryParam('inStock', ''); }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearAll}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-4 border-r border-stone-200/80 dark:border-stone-800">
          {/* Outdoor Space Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white">
              Outdoor Space
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setSelectedSpace('');
                  updateQueryParam('space', '');
                }}
                className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors flex items-center justify-between ${
                  !selectedSpace
                    ? 'bg-silvex-50 dark:bg-silvex-950/40 text-silvex-700 dark:text-silvex-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>All Environments</span>
                {!selectedSpace && <Check className="w-3.5 h-3.5" />}
              </button>
              {OUTDOOR_SPACES.map((space) => (
                <button
                  key={space.id}
                  onClick={() => {
                    setSelectedSpace(space.slug);
                    updateQueryParam('space', space.slug);
                  }}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors flex items-center justify-between ${
                    selectedSpace === space.slug
                      ? 'bg-silvex-50 dark:bg-silvex-950/40 text-silvex-700 dark:text-silvex-300 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{space.name}</span>
                  {selectedSpace === space.slug && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3 pt-6 border-t border-stone-200/80 dark:border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white">
              Furniture Category
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  updateQueryParam('category', '');
                }}
                className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors flex items-center justify-between ${
                  !selectedCategory
                    ? 'bg-silvex-50 dark:bg-silvex-950/40 text-silvex-700 dark:text-silvex-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>All Categories</span>
                {!selectedCategory && <Check className="w-3.5 h-3.5" />}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    updateQueryParam('category', cat.slug);
                  }}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-silvex-50 dark:bg-silvex-950/40 text-silvex-700 dark:text-silvex-300 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Materials & Performance */}
          <div className="space-y-3 pt-6 border-t border-stone-200/80 dark:border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white">
              Material & Craft
            </h3>
            <div className="space-y-1.5">
              {MATERIALS.map((mat) => (
                <button
                  key={mat}
                  onClick={() => {
                    const next = selectedMaterial === mat ? '' : mat;
                    setSelectedMaterial(next);
                    updateQueryParam('material', next);
                  }}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors flex items-center justify-between ${
                    selectedMaterial === mat
                      ? 'bg-silvex-50 dark:bg-silvex-950/40 text-silvex-700 dark:text-silvex-300 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{mat}</span>
                  {selectedMaterial === mat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Stock & Availability Checkbox */}
          <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800 dark:text-stone-200">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  updateQueryParam('inStock', e.target.checked ? 'true' : '');
                }}
                className="rounded border-stone-300 text-silvex-600 focus:ring-silvex-500 w-4 h-4"
              />
              <span>In Stock & Ready for White Glove Delivery</span>
            </label>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-stone-100 dark:bg-stone-900/40 rounded-2xl p-8 space-y-4">
              <Sparkles className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                No matching outdoor pieces found
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Try widening your price range or clearing material filters to view our full collection.
              </p>
              <button
                onClick={handleClearAll}
                className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const inWishlist = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image Area */}
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

                      {/* Outdoor weather resistance badge */}
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                        <span className="bg-stone-900/80 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                          {product.specification.weatherResistance.split(',')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Information */}
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

                      {/* Color Swatches */}
                      {product.variants.length > 1 && (
                        <div className="flex items-center gap-1.5 pt-1">
                          {product.variants.map((v) => (
                            <span
                              key={v.id}
                              className="w-3 h-3 rounded-full border border-stone-300 dark:border-stone-700 shadow-sm"
                              style={{ backgroundColor: v.colorHex }}
                              title={v.colorName}
                            />
                          ))}
                          <span className="text-[10px] text-stone-400 ml-1">
                            {product.variants.length} finishes
                          </span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
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
                          onClick={() => {
                            if (product.variants.length > 0) {
                              addItemToCart(product, product.variants[0], 1);
                            }
                          }}
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
          )}
        </div>
      </div>
    </div>
  );
}
