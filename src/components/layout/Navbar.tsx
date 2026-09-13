'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Compass,
  TreePine,
  Sun,
  LayoutGrid,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { SearchModal } from './SearchModal';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';
import { CATEGORIES } from '@/lib/data/categories';
import { COLLECTIONS } from '@/lib/data/collections';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cartItemCount = useCartStore((state) => state.getItemCount());
  const setCartDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { user, isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isStorefront = !pathname.startsWith('/admin');

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header shadow-sm py-3.5 border-b border-stone-200/60 dark:border-stone-800/60'
            : 'bg-stone-50/95 dark:bg-stone-950/95 py-5 border-b border-stone-200/40 dark:border-stone-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-2 -ml-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex flex-col group">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-semibold text-stone-900 dark:text-white uppercase transition-colors group-hover:text-silvex-600 dark:group-hover:text-silvex-400">
                  SILVEX
                </span>
                <span className="text-[9px] tracking-[0.38em] uppercase text-stone-500 dark:text-stone-400 -mt-1 font-medium text-center">
                  Outdoor Furniture
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Shop by Category Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-sm tracking-wider uppercase font-medium text-stone-800 dark:text-stone-200 hover:text-silvex-600 dark:hover:text-silvex-400 transition-colors py-2"
                >
                  <span>Shop Catalog</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {activeDropdown === 'categories' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white dark:bg-stone-900 shadow-2xl rounded-lg p-6 border border-stone-200 dark:border-stone-800 grid grid-cols-3 gap-6 animate-fade-in z-50">
                    <div>
                      <h4 className="text-xs font-semibold tracking-widest uppercase text-silvex-600 dark:text-silvex-400 mb-3 flex items-center gap-1.5">
                        <LayoutGrid className="w-3.5 h-3.5" /> Outdoor Seating
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/shop?category=outdoor-sofas" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Outdoor Sofas & Sectionals
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=outdoor-lounge-sets" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Outdoor Lounge Sets
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=sun-loungers" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Sun Loungers & Daybeds
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=outdoor-dining-chairs" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Outdoor Dining Chairs
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold tracking-widest uppercase text-silvex-600 dark:text-silvex-400 mb-3 flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5" /> Tables & Shade
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/shop?category=outdoor-dining-tables" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Outdoor Dining Tables
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=outdoor-coffee-tables" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Coffee & Side Tables
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=outdoor-bar-furniture" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Bar Tables & Stools
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=umbrellas-shade" className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white block py-1">
                            Cantilever Umbrellas & Pergolas
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-md flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-silvex-600 dark:text-silvex-400 block mb-1">
                          Craftsmanship
                        </span>
                        <h5 className="font-serif text-sm font-semibold text-stone-900 dark:text-white mb-2">
                          100% Grade-A Teak & Sunbrella®
                        </h5>
                        <p className="text-xs text-stone-600 dark:text-stone-300">
                          Hydrophobic quick-drain engineering with an industry-leading 10-year outdoor warranty.
                        </p>
                      </div>
                      <Link
                        href="/about"
                        className="text-xs font-medium text-silvex-600 dark:text-silvex-400 hover:underline mt-3 inline-flex items-center"
                      >
                        Learn About Our Materials →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Shop by Outdoor Space Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('spaces')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/spaces/terrace"
                  className="flex items-center gap-1 text-sm tracking-wider uppercase font-medium text-stone-800 dark:text-stone-200 hover:text-silvex-600 dark:hover:text-silvex-400 transition-colors py-2"
                >
                  <span>Outdoor Spaces</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {activeDropdown === 'spaces' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white dark:bg-stone-900 shadow-2xl rounded-lg p-5 border border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-3 animate-fade-in z-50">
                    {OUTDOOR_SPACES.map((space) => (
                      <Link
                        key={space.id}
                        href={`/spaces/${space.slug}`}
                        className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-stone-200 dark:bg-stone-700">
                          <img
                            src={space.heroImage}
                            alt={space.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-stone-900 dark:text-stone-100 group-hover:text-silvex-600 dark:group-hover:text-silvex-400 transition-colors">
                            {space.name}
                          </h5>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                            {space.headline}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Collections */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('collections')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/collections/solara-estate"
                  className="flex items-center gap-1 text-sm tracking-wider uppercase font-medium text-stone-800 dark:text-stone-200 hover:text-silvex-600 dark:hover:text-silvex-400 transition-colors py-2"
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {activeDropdown === 'collections' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white dark:bg-stone-900 shadow-2xl rounded-lg p-4 border border-stone-200 dark:border-stone-800 space-y-1 animate-fade-in z-50">
                    {COLLECTIONS.map((col) => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.slug}`}
                        className="block p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-silvex-600 dark:group-hover:text-silvex-400">
                            {col.name}
                          </span>
                          {col.isFeatured && (
                            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                          {col.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/hospitality"
                className="text-sm tracking-wider uppercase font-medium text-stone-800 dark:text-stone-200 hover:text-silvex-600 dark:hover:text-silvex-400 transition-colors py-2"
              >
                Hospitality & Trade
              </Link>

              <Link
                href="/about"
                className="text-sm tracking-wider uppercase font-medium text-stone-800 dark:text-stone-200 hover:text-silvex-600 dark:hover:text-silvex-400 transition-colors py-2"
              >
                About SILVEX
              </Link>
            </nav>

            {/* Right Action Icons (Search, Wishlist, Account, Cart, Theme) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search outdoor catalog"
                className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
                title="Search furniture, materials & spaces"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors relative"
                title="Saved Items"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-fade-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account / Admin Portal */}
              <Link
                href={isAdmin ? '/admin' : '/account'}
                aria-label="Account"
                className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
                title={isAdmin ? 'Admin Dashboard' : 'Customer Account'}
              >
                <UserIcon className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Button */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                aria-label="View shopping bag"
                className="p-2 text-stone-900 dark:text-white hover:text-silvex-600 dark:hover:text-silvex-400 rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-silvex-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-fade-in">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 pt-4 pb-6 space-y-4 animate-slide-up">
            <Link
              href="/shop"
              className="block text-base font-medium text-stone-900 dark:text-white py-2"
            >
              Shop All Outdoor Furniture
            </Link>
            <div className="border-t border-stone-200/60 dark:border-stone-800/60 pt-3">
              <span className="text-xs uppercase tracking-widest text-silvex-600 font-semibold block mb-2">
                Outdoor Spaces
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {OUTDOOR_SPACES.map((s) => (
                  <Link
                    key={s.id}
                    href={`/spaces/${s.slug}`}
                    className="text-stone-600 dark:text-stone-300 py-1 hover:text-silvex-600"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-stone-200/60 dark:border-stone-800/60 pt-3">
              <span className="text-xs uppercase tracking-widest text-silvex-600 font-semibold block mb-2">
                Collections
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {COLLECTIONS.map((c) => (
                  <Link
                    key={c.id}
                    href={`/collections/${c.slug}`}
                    className="text-stone-600 dark:text-stone-300 py-1 hover:text-silvex-600"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-stone-200/60 dark:border-stone-800/60 pt-3 flex flex-col space-y-2">
              <Link href="/hospitality" className="text-sm text-stone-800 dark:text-stone-200 py-1">
                Hospitality & B2B Solutions
              </Link>
              <Link href="/about" className="text-sm text-stone-800 dark:text-stone-200 py-1">
                About Silvex & Materials
              </Link>
              <Link href="/order-tracking" className="text-sm text-stone-800 dark:text-stone-200 py-1">
                Order Tracking
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm font-semibold text-silvex-600 dark:text-silvex-400 py-1"
                >
                  Admin Management Portal
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
