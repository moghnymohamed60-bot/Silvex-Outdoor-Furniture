import { OutdoorSpace } from '@/types';

export const OUTDOOR_SPACES: OutdoorSpace[] = [
  {
    id: 'space-garden',
    name: 'Garden Sanctuary',
    slug: 'garden',
    headline: 'Immersive Green Living & Botanical Lounging',
    description: 'Harmonize with nature through sculpted Grade-A Indonesian Teak and organic weatherproof rope silhouettes designed to age gracefully amongst lush flora.',
    heroImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1600&auto=format&fit=crop',
    inspirationStory: 'Our garden collection embraces the organic rhythm of the outdoors. Solid teak frameworks with natural honey tones pair with all-weather cushions that breathe through sudden summer showers.',
    features: [
      'Sustainably Harvested FSC® Certified Grade-A Teak',
      'Hydrophobic QuickDry® Foam Core with Mildew Defense',
      'Naturally Ageing Patina (Silver-Grey Transition or Rich Golden Teak)'
    ],
    recommendedCategories: ['Outdoor Lounge Sets', 'Sun Loungers', 'Outdoor Dining Tables', 'Outdoor Benches'],
    sortOrder: 1
  },
  {
    id: 'space-terrace',
    name: 'Terrace & Veranda',
    slug: 'terrace',
    headline: 'Architectural Elegance for Elevated Open-Air Living',
    description: 'Transform expansive verandas and private terraces into open-air living salons with modular configurations and low-profile silhouettes.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    inspirationStory: 'Designed for fluid indoor-outdoor transitions, our terrace systems offer expansive sectional versatility, marble-finish weatherproof tabletops, and UV-resistant tactile weaves.',
    features: [
      'Modular Deep-Seating Sectionals with Infinite Layouts',
      'Marine-Grade Powder-Coated Aluminum Chassis',
      'Sunbrella® Cast Sand Fabric with 5-Year Colorfast Guarantee'
    ],
    recommendedCategories: ['Outdoor Sofas', 'Outdoor Coffee Tables', 'Outdoor Lounge Sets', 'Outdoor Cushions'],
    sortOrder: 2
  },
  {
    id: 'space-poolside',
    name: 'Poolside & Deck',
    slug: 'poolside',
    headline: 'Sun-Drenched Luxury & Hydrophobic Innovation',
    description: 'Resort-grade sun loungers, cabanas, and daybeds engineered to withstand chlorine, saltwater mist, and continuous UV exposure.',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
    inspirationStory: 'Channeling the serene glamour of Mediterranean coastal retreats, our poolside line combines lightweight aerodynamic aluminum frames with instant-dry permeable fabrics.',
    features: [
      'Instant-Drainage Aerated Reticulated Foam',
      'Chlorine & Salt-Air Non-Corrosive T6 Aluminum',
      'Multi-Position Ergonomic Reclining Mechanisms'
    ],
    recommendedCategories: ['Sun Loungers', 'Daybeds', 'Outdoor Side Tables', 'Umbrellas & Shade'],
    sortOrder: 3
  },
  {
    id: 'space-balcony',
    name: 'Balcony & Compact Spaces',
    slug: 'balcony',
    headline: 'Intimate Urban Sanctuaries & Curated Bistro Living',
    description: 'Space-conscious elegance tailored for high-rise balconies, penthouse nooks, and curated urban vistas without compromising comfort.',
    heroImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1600&auto=format&fit=crop',
    inspirationStory: 'City living demands thoughtful proportions. Our compact collection features slender structural profiles, stackable dining chairs, and dual-purpose storage tables.',
    features: [
      'Slim Architectural Profiles with Maximum Seating Comfort',
      'Stackable & Nested Storage Engineering',
      'Wind-Weighted Bases for High-Altitude Balconies'
    ],
    recommendedCategories: ['Outdoor Dining Chairs', 'Outdoor Side Tables', 'Outdoor Chairs', 'Outdoor Accessories'],
    sortOrder: 4
  },
  {
    id: 'space-rooftop',
    name: 'Rooftop & Sky Lounge',
    slug: 'rooftop',
    headline: 'High-Altitude Drama & Panoramic Socialization',
    description: 'Engineered for wind-resilience, evening ambiance, and unforgettable skyline entertaining with built-in fire table accents.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
    inspirationStory: 'Rooftops require heavy-gauge stability and elevated evening hospitality. Silvex rooftop pieces feature wind-tested ballast weighting, integrated gas fire pits, and ambient ledges.',
    features: [
      'Tested Stability in High Winds up to 60 mph',
      'Integrated Smokeless Clean-Burning Fire Tables',
      'Stain-Proof Ceramic & Dekton Composite Surfaces'
    ],
    recommendedCategories: ['Outdoor Sofas', 'Outdoor Coffee Tables', 'Outdoor Bar Furniture', 'Outdoor Accessories'],
    sortOrder: 5
  },
  {
    id: 'space-outdoor-dining',
    name: 'Alfresco Dining',
    slug: 'outdoor-dining',
    headline: 'Feasts Under the Sky & Artful Gatherings',
    description: 'Handcrafted expandable dining tables, contoured dining chairs, and weatherproof servers made for lingering under the stars.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    inspirationStory: 'The dinner table is the heartbeat of outdoor entertaining. Our outdoor dining systems comfortably seat 6 to 14 guests around slatted teak or thermal stone slabs.',
    features: [
      'Extendable Smooth-Glide Precision Table Mechanisms',
      'Ergonomically Contoured Rope & Teak Dining Chairs',
      'Heat & Red Wine Spill-Resistant Surfaces'
    ],
    recommendedCategories: ['Outdoor Dining Tables', 'Outdoor Dining Chairs', 'Outdoor Benches', 'Umbrellas & Shade'],
    sortOrder: 6
  },
  {
    id: 'space-hospitality',
    name: 'Hospitality & Commercial',
    slug: 'hospitality',
    headline: 'Turnkey Luxury for 5-Star Resorts, Beach Clubs & Villas',
    description: 'Contract-grade durability with bespoke customization for world-class hotels, Michelin-starred terraces, private member clubs, and luxury estates.',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop',
    inspirationStory: 'Trusted by world-renowned hospitality developers. Every contract item meets rigorous commercial abrasion standards (100,000+ Martindale rubs) with rapid fulfillment.',
    features: [
      'Commercial Contract Certification (BIFMA & EN 581)',
      'High-Density Sunbrella Marine Grade Heavy Weave',
      'Dedicated Trade Concierge, 3D CAD & Custom Sizing'
    ],
    recommendedCategories: ['Outdoor Sofas', 'Sun Loungers', 'Outdoor Bar Furniture', 'Outdoor Dining Tables'],
    sortOrder: 7
  }
];
