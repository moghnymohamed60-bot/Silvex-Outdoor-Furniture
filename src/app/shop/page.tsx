import { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopClient } from '@/components/shop/ShopClient';

export const metadata: Metadata = {
  title: 'Outdoor Furniture Catalog | SILVEX',
  description: 'Explore Grade-A Teak sectionals, marine aluminum dining sets, poolside sun loungers, and cantilever shade systems.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-stone-500 font-serif text-lg animate-pulse">
          Curating Architectural Outdoor Living...
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
