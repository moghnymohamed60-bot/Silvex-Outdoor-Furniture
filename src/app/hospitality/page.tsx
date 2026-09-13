'use client';

import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Sun,
  Layers,
  Award,
} from 'lucide-react';

export default function HospitalityPage() {
  return (
    <div className="space-y-20 pb-24">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop"
          alt="Silvex Hospitality Resort Deck"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-silvex-300">
            <Building2 className="w-3.5 h-3.5" /> Contract & Trade Solutions
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Hospitality & Commercial Design
          </h1>
          <p className="text-base sm:text-lg text-stone-200 max-w-2xl font-light">
            Architectural outdoor furniture engineered for high-traffic luxury resorts, beach clubs, rooftop lounges, and Michelin-starred alfresco dining.
          </p>
        </div>
      </section>

      {/* Contract Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <Award className="w-8 h-8 text-silvex-500 mb-2" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              BIFMA & EN 581 Certified
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Every contract piece undergoes rigorous structural cycle testing, heavy salt-spray corrosion tests, and Martindale abrasion resistance (100,000+ rubs).
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <Layers className="w-8 h-8 text-silvex-500 mb-2" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Bespoke Customization & 3D CAD
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Tailor dimensions, teak finishes, and custom Sunbrella® marine colorways with dedicated 3D Revit, SketchUp, and CAD asset files.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-silvex-500 mb-2" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Dedicated Trade Logistics
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Direct container-load fulfillment, multi-phase site staging, and white-glove assembly teams available across North America and Europe.
            </p>
          </div>
        </div>
      </section>

      {/* Trade Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-silvex-600">
              Direct Inquiries
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Apply for Silvex Trade & Contract Program
            </h2>
            <p className="text-xs text-stone-500">
              Receive trade volume pricing, physical material swatches, and dedicated project management.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your trade inquiry. A Silvex Hospitality Director will contact you within 24 hours.'); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Contact Name</label>
              <input type="text" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950" required />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Design Firm / Hotel Group</label>
              <input type="text" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950" required />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Professional Email</label>
              <input type="email" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950" required />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Project Type</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950">
                <option>Luxury Hotel / Resort</option>
                <option>Private Beach Club</option>
                <option>Michelin Restaurant Terrace</option>
                <option>Residential Estate Architecture</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Project Location & Estimated Volume</label>
              <textarea rows={3} className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950" placeholder="e.g. 24 cabana daybeds and 80 dining chairs for terrace opening in June 2026..." />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all"
              >
                Submit Trade Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
