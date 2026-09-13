import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';
import { PRODUCTS } from '@/lib/data/products';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  ShieldCheck,
  Droplets,
  Sun,
  Star,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export function generateStaticParams() {
  return OUTDOOR_SPACES.map((space) => ({
    slug: space.slug,
  }));
}

export default function SpaceDetailPage({ params }: { params: { slug: string } }) {
  const space = OUTDOOR_SPACES.find((s) => s.slug === params.slug);

  if (!space) {
    notFound();
  }

  const spaceProducts = PRODUCTS.filter((p) => p.outdoorSpaceId === space.id);

  return (
    <div className="space-y-16 pb-24">
      {/* Space Hero Section */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden bg-stone-900">
        <img
          src={space.heroImage}
          alt={space.name}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full text-white space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-silvex-400">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:underline">Outdoor Spaces</Link>
            <span>/</span>
            <span>{space.name}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {space.name}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 max-w-2xl font-light">
            {space.headline}
          </p>
        </div>
      </section>

      {/* Architectural Guidance & Engineering Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-200/80 dark:border-stone-800 shadow-luxury grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-silvex-600 dark:text-silvex-400">
              Architectural Inspiration
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Designing for {space.name}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              {space.inspirationStory}
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              {space.description}
            </p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-850 p-6 rounded-2xl border border-stone-200/60 dark:border-stone-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white">
              Key Engineering Features
            </h3>
            <ul className="space-y-3">
              {space.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-silvex-600 dark:text-silvex-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tailored Furniture Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400 block mb-1">
              Curated Furniture
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Recommended Pieces for {space.name}
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {spaceProducts.length} pieces available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaceProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={product.images[0]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                  {product.specification.material.split('&')[0]}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                      {product.ratingAverage}
                    </span>
                    <span className="text-[10px] text-stone-400">({product.ratingCount})</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-silvex-600 dark:group-hover:text-silvex-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-base font-bold text-stone-900 dark:text-white">
                    {formatCurrency(product.basePrice)}
                  </span>
                  <span className="text-xs font-semibold text-silvex-600 dark:text-silvex-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore Other Outdoor Spaces */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-stone-200 dark:border-stone-800 space-y-6">
        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
          Explore Other Outdoor Spaces
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {OUTDOOR_SPACES.filter((s) => s.slug !== space.slug).map((s) => (
            <Link
              key={s.id}
              href={`/spaces/${s.slug}`}
              className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-silvex-500 dark:hover:border-silvex-400 text-center transition-all group"
            >
              <span className="block text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-silvex-600">
                {s.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
