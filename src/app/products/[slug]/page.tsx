import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data/products';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug || p.id === params.slug);
  if (!product) {
    return { title: 'Product Not Found | SILVEX Outdoor' };
  }

  return {
    title: `${product.title} | SILVEX Luxury Outdoor Furniture`,
    description: `${product.shortDescription} Handcrafted ${product.specification.material} with ${product.specification.weatherResistance}.`,
    openGraph: {
      title: `${product.title} | SILVEX Outdoor Living`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0]?.url || '',
          alt: product.title,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug || p.id === params.slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient slug={params.slug} />;
}
