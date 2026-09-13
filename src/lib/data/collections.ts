import { Collection } from '@/types';

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-solara',
    name: 'Solara Estate Collection',
    slug: 'solara-estate',
    tagline: 'Timeless Teak & Deep Sculptural Solitude',
    description: 'Constructed from sustainably aged Indonesian Grade-A teak, the Solara Estate collection embodies monumental warmth, oversized proportions, and seamless weatherproof upholstery.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
    isFeatured: true,
    materialsUsed: ['Grade-A Plantation Teak', 'Sunbrella Canvas', '316 Marine Stainless Steel'],
    sortOrder: 1
  },
  {
    id: 'col-terra',
    name: 'Terra Mediterranean Collection',
    slug: 'terra-mediterranean',
    tagline: 'Organic Textures & Sun-Kissed Earth Tones',
    description: 'Drawing inspiration from the cliffside villas of Amalfi and Mallorca, Terra blends hand-woven all-weather Olefin rope with warm terracotta undertones and lightweight aluminum.',
    heroImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1400&auto=format&fit=crop',
    isFeatured: true,
    materialsUsed: ['Italian All-Weather Olefin Rope', 'Volcanic Stone Composite', 'Matte Sand Aluminum'],
    sortOrder: 2
  },
  {
    id: 'col-marina',
    name: 'Marina Resort Collection',
    slug: 'marina-resort',
    tagline: 'Sleek Coastal Minimal & Hydrophobic Performance',
    description: 'Engineered specifically for waterfront environments, infinity pool decks, and yacht clubs with non-corrosive marine coatings and aerodynamic lounge silhouettes.',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1400&auto=format&fit=crop',
    isFeatured: true,
    materialsUsed: ['Marine-Grade T6 Aluminum', 'Batyline® Serge Ferrari Mesh', 'QuickDry Reticulated Foam'],
    sortOrder: 3
  },
  {
    id: 'col-verde',
    name: 'Verde Minimalist Collection',
    slug: 'verde-minimalist',
    tagline: 'Linear Precision & Deep Forest Contrasts',
    description: 'Sharp architectural lines softened by tactile charcoal cushions and brushed bronze accents. Built for modern penthouses and curated architectural gardens.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
    isFeatured: false,
    materialsUsed: ['Powder-Coated Electro-Galvanized Steel', 'Graphite Sunbrella', 'Smoked Glass'],
    sortOrder: 4
  },
  {
    id: 'col-kyoto',
    name: 'Kyoto Zen Outdoor Collection',
    slug: 'kyoto-zen',
    tagline: 'Tranquil Proportions & Low-Profile Harmony',
    description: 'Inspired by Japanese garden architecture and ryokan aesthetics, Kyoto elevates low-slung platform seating, slat-line daybeds, and monolithic stone tables.',
    heroImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1400&auto=format&fit=crop',
    isFeatured: false,
    materialsUsed: ['Charcoal Weathered Teak', 'Lava Rock Tabletops', 'Natural Flax Weatherproof Woven Fiber'],
    sortOrder: 5
  },
  {
    id: 'col-hospitality',
    name: 'Silvex Hospitality Signature',
    slug: 'hospitality-signature',
    tagline: 'Contract-Grade Durability for 5-Star Destinations',
    description: 'Heavyweight, stackable, and abrasion-resistant outdoor solutions curated for luxury hotel chains, Michelin-starred outdoor dining, and private beach clubs.',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop',
    isFeatured: true,
    materialsUsed: ['Commercial Reinforced Aluminum', 'High-Traffic Sunbrella Marine', '316 Anti-Seize Hardware'],
    sortOrder: 6
  }
];
