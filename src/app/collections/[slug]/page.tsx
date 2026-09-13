import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COLLECTIONS } from '@/lib/data/collections';
import { PRODUCTS } from '@/lib/data/products';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return COLLECTIONS.map((col) => ({
    slug: col.slug,
  }));
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = PRODUCTS.filter((p) => p.collectionId === collection.id);

  return (
    <div className="space-y-16 pb-24">
      {/* Collection Hero */}
      <section className="relative h-[60vh] min-h-[440px] flex items-end overflow-hidden bg-stone-900">
        <img
          src={collection.heroImage}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full text-white space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-silvex-400">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:underline">Collections</Link>
            <span>/</span>
            <span>{collection.name}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold">
            {collection.name}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 font-light">
            {collection.tagline}
          </p>
        </div>
      </section>

      {/* Collection Dossier */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-silvex-600 dark:text-silvex-400">
              Collection Narrative
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              The Essence of {collection.name}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              {collection.description}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-stone-500 mr-2">Materials Curated:</span>
            {collection.materialsUsed.map((m, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            Pieces in the {collection.name}
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {collectionProducts.length} pieces
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionProducts.map((product) => (
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
    </div>
  );
}
