import Link from 'next/link';
import {
  TreePine,
  ShieldCheck,
  Droplets,
  Sun,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[440px] flex items-end overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1800&auto=format&fit=crop"
          alt="Silvex Outdoor Furniture Teak Craftsmanship"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-silvex-300">
            <Sparkles className="w-3.5 h-3.5" /> The Silvex Heritage
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Outdoor Living, Elevated.
          </h1>
          <p className="text-base sm:text-lg text-stone-200 max-w-2xl font-light">
            Founded with a singular mission: to engineer architectural outdoor furniture that bridges luxury interior design with indestructible exterior durability.
          </p>
        </div>
      </section>

      {/* Brand Story Narrative */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base font-light">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 dark:text-white">
          Why Outdoor Living Demands a Dedicated Atelier
        </h2>
        <p>
          General furniture brands frequently adapt indoor silhouettes by applying topical clear coats. At SILVEX, we believe this is fundamentally flawed. An outdoor piece lives at the mercy of equatorial UV rays, torrential storms, freezing winter frost, and abrasive coastal sea air.
        </p>
        <p>
          Every table leg, cushion stitch, and concealed bracket is engineered from the ground up to survive four full seasons in the open air. We utilize exclusively FSC-certified Grade-A Indonesian Teak aged over 40 years, marine-grade T6 aluminum chassis, and solution-dyed Sunbrella® acrylics with hydrophobic QuickDry® reticulated foam.
        </p>
      </section>

      {/* The 4 Material Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <TreePine className="w-7 h-7 text-silvex-500 mb-1" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Grade-A Indonesian Teak
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Harvested strictly from heartwood timbers with highest natural resin and silica saturation for impervious rot and insect defense.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <Sun className="w-7 h-7 text-amber-500 mb-1" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Sunbrella® Marine Acrylics
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Pigments saturated deep within the molten polymer fibers, guaranteeing 100% colorfastness against years of intense desert and seaside sun.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <Droplets className="w-7 h-7 text-sky-500 mb-1" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              QuickDry® Reticulated Foam
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Open-cell honeycomb internal structures that permit rainwater to gravity-drain instantly, completely eliminating moisture buildup and odor.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <ShieldCheck className="w-7 h-7 text-emerald-500 mb-1" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Marine Aluminum & 316 Steel
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Heavy-gauge structural framing with electrostatic powder-coating guaranteed 100% rust-proof in saltwater beachfront climates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Begin Your Outdoor Transformation
        </h2>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all"
        >
          Explore Outdoor Collection <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
