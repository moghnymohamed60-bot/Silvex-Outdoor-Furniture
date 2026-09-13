import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SILVEX Outdoor Furniture — Outdoor Living, Elevated',
    template: '%s | SILVEX Outdoor Furniture',
  },
  description:
    'Discover handcrafted luxury outdoor furniture, Grade-A teak lounge suites, Sunbrella® sectionals, resort poolside daybeds, and architectural dining tables built for 4-season outdoor living.',
  keywords: [
    'luxury outdoor furniture',
    'teak outdoor sofa',
    'poolside sun loungers',
    'weatherproof outdoor dining',
    'sunbrella cushions',
    'terrace furniture',
    'garden lounge set',
    'hospitality outdoor furniture',
    'silvex outdoor',
  ],
  authors: [{ name: 'SILVEX Luxury Outdoor Living' }],
  creator: 'SILVEX',
  publisher: 'SILVEX Outdoor Furniture',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://silvex-outdoor.com',
    title: 'SILVEX Outdoor Furniture — Outdoor Living, Elevated',
    description:
      'Curated architectural outdoor furniture designed for terraces, poolside retreats, gardens, and luxury resorts.',
    siteName: 'SILVEX Outdoor Furniture',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Silvex Outdoor Furniture — Luxury Living',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SILVEX Outdoor Furniture',
    description: 'Outdoor Living, Elevated.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (Schema.org Organization & Store)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'SILVEX Outdoor Furniture',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    description: 'Manufacturer and retailer of luxury outdoor living furniture, teak sectionals, and poolside loungers.',
    url: 'https://silvex-outdoor.com',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '28400 Pacific Coast Highway',
      addressLocality: 'Malibu',
      addressRegion: 'CA',
      postalCode: '90265',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0259,
      longitude: -118.7798,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
