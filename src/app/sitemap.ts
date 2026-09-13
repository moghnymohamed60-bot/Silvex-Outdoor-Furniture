import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data/products';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';
import { COLLECTIONS } from '@/lib/data/collections';
import { CATEGORIES } from '@/lib/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://silvex-outdoor.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/hospitality`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/order-tracking`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const spaceRoutes: MetadataRoute.Sitemap = OUTDOOR_SPACES.map((space) => ({
    url: `${baseUrl}/spaces/${space.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = COLLECTIONS.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: new Date(prod.updatedAt),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticRoutes, ...spaceRoutes, ...collectionRoutes, ...productRoutes];
}
