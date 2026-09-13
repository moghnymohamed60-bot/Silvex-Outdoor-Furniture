'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Droplets,
  Sun,
  Award,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-200 border-t border-stone-800 pt-16 pb-12">
      {/* Brand Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center flex-shrink-0 text-silvex-400">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">All-Weather Certified</h4>
              <p className="text-xs text-stone-400 mt-1">
                Sunbrella® UV50+ performance acrylics and marine-grade corrosion-proof frameworks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center flex-shrink-0 text-silvex-400">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">QuickDry® Reticulated Foam</h4>
              <p className="text-xs text-stone-400 mt-1">
                Open-pore architectural drainage dries completely in minutes after rainfall.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center flex-shrink-0 text-silvex-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">White-Glove Installation</h4>
              <p className="text-xs text-stone-400 mt-1">
                Complimentary room-of-choice placement, assembly, and packaging removal on all suites.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center flex-shrink-0 text-silvex-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">10-Year Timber Warranty</h4>
              <p className="text-xs text-stone-400 mt-1">
                Grade-A FSC® Teak harvested sustainably and guaranteed against structural decay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Newsletter Column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex flex-col inline-block">
            <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-white uppercase">
              SILVEX
            </span>
            <span className="text-[9px] tracking-[0.38em] uppercase text-stone-400 -mt-1 font-medium">
              Outdoor Furniture
            </span>
          </Link>
          <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
            Silvex curates architectural outdoor living systems for distinguished residences, coastal villas, and five-star resorts worldwide.
          </p>

          <div className="pt-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-300 block mb-2">
              Join The Silvex Outdoor Living Journal
            </span>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Silvex Outdoor Living.'); }} className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email for private collection previews..."
                className="flex-1 px-4 py-2.5 rounded-l-lg bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-silvex-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-silvex-500 hover:bg-silvex-600 text-white rounded-r-lg text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
              >
                Join <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Shop by Outdoor Space */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-silvex-400 mb-4">
            Outdoor Spaces
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            {OUTDOOR_SPACES.map((space) => (
              <li key={space.id}>
                <Link
                  href={`/spaces/${space.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {space.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Catalog Categories */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-silvex-400 mb-4">
            Outdoor Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li>
              <Link href="/shop?category=outdoor-sofas" className="hover:text-white transition-colors">
                Outdoor Sofas & Sectionals
              </Link>
            </li>
            <li>
              <Link href="/shop?category=outdoor-lounge-sets" className="hover:text-white transition-colors">
                Lounge & Conversation Suites
              </Link>
            </li>
            <li>
              <Link href="/shop?category=outdoor-dining-tables" className="hover:text-white transition-colors">
                Alfresco Dining Tables
              </Link>
            </li>
            <li>
              <Link href="/shop?category=sun-loungers" className="hover:text-white transition-colors">
                Poolside Sun Loungers
              </Link>
            </li>
            <li>
              <Link href="/shop?category=umbrellas-shade" className="hover:text-white transition-colors">
                Cantilever Shade & Pergolas
              </Link>
            </li>
            <li>
              <Link href="/shop?category=outdoor-accessories" className="hover:text-white transition-colors">
                Volcanic Stone Fire Tables
              </Link>
            </li>
          </ul>
        </div>

        {/* Showrooms & Concierge */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-silvex-400 mb-4">
            Concierge & Flagships
          </h4>
          <div className="space-y-3 text-xs text-stone-400">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
              <span>Flagship Showrooms in Malibu, Aspen, Miami & St. Tropez</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-stone-500 flex-shrink-0" />
              <span>+1 (800) 582-SILVEX</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-500 flex-shrink-0" />
              <span>concierge@silvex-outdoor.com</span>
            </p>
            <div className="pt-2">
              <Link
                href="/hospitality"
                className="inline-block text-xs font-semibold text-silvex-400 hover:text-silvex-300 underline"
              >
                Trade & Contract Concierge Portal →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p>© {new Date().getFullYear()} SILVEX OUTDOOR FURNITURE. All rights reserved. Registered trademark of Luxury Outdoor Living Inc.</p>
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-stone-300">Privacy Policy</Link>
          <Link href="/about" className="hover:text-stone-300">Terms of Service</Link>
          <Link href="/order-tracking" className="hover:text-stone-300">Order Tracking</Link>
          <Link href="/admin" className="hover:text-stone-300 text-stone-400">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
}
