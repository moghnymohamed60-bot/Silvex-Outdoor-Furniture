import {
  Product,
  Category,
  OutdoorSpace,
  Collection,
  Order,
  Review,
  Discount,
  User,
  InventoryMovement,
  FilterState,
  AdminDashboardKPIs,
  Cart,
  CartItem
} from '@/types';
import { PRODUCTS } from './products';
import { CATEGORIES } from './categories';
import { OUTDOOR_SPACES } from './outdoor-spaces';
import { COLLECTIONS } from './collections';

// Initial Mock Seed Data
let productsStore: Product[] = [...PRODUCTS];
let categoriesStore: Category[] = [...CATEGORIES];
let spacesStore: OutdoorSpace[] = [...OUTDOOR_SPACES];
let collectionsStore: Collection[] = [...COLLECTIONS];

let usersStore: User[] = [
  {
    id: 'usr-admin-1',
    email: 'admin@silvex-outdoor.com',
    firstName: 'Alexander',
    lastName: 'Vance',
    phone: '+1 (555) 234-5678',
    role: 'SUPER_ADMIN',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-client-1',
    email: 'sophia.laurent@villa-azure.com',
    firstName: 'Sophia',
    lastName: 'Laurent',
    phone: '+1 (555) 890-1234',
    role: 'CUSTOMER',
    isActive: true,
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'usr-client-2',
    email: 'marcus.sterling@resortgroup.com',
    firstName: 'Marcus',
    lastName: 'Sterling',
    phone: '+1 (555) 432-8765',
    role: 'CUSTOMER',
    isActive: true,
    createdAt: '2026-02-01T12:00:00Z'
  }
];

let discountsStore: Discount[] = [
  {
    id: 'dsc-welcome10',
    code: 'SILVEX10',
    description: '10% off your inaugural luxury outdoor living order',
    type: 'PERCENTAGE',
    value: 10,
    minimumOrder: 1000,
    maxDiscount: 500,
    usageLimit: 500,
    usedCount: 42,
    isActive: true,
    expiresAt: '2026-12-31T23:59:59Z'
  },
  {
    id: 'dsc-estate300',
    code: 'ESTATE300',
    description: '$300 savings on orders above $3,500',
    type: 'FIXED_AMOUNT',
    value: 300,
    minimumOrder: 3500,
    maxDiscount: 300,
    usageLimit: 100,
    usedCount: 18,
    isActive: true,
    expiresAt: '2026-12-31T23:59:59Z'
  },
  {
    id: 'dsc-terrace15',
    code: 'TERRACE15',
    description: '15% off complete outdoor dining and lounge suites',
    type: 'PERCENTAGE',
    value: 15,
    minimumOrder: 2500,
    maxDiscount: 800,
    usageLimit: 200,
    usedCount: 64,
    isActive: true,
    expiresAt: '2026-12-31T23:59:59Z'
  }
];

let reviewsStore: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-solara-sectional',
    userId: 'usr-client-1',
    userName: 'Sophia Laurent',
    userLocation: 'Malibu, California',
    rating: 5,
    title: 'Transformative luxury for our oceanfront deck',
    comment: 'The Grade-A teak has weathered two severe coastal rainstorms without a drop penetrating the inner foam. Within 20 minutes of sun, the cushions were completely dry and comfortable. The craftsmanship is worthy of an architectural cover story.',
    isVerifiedPurchase: true,
    status: 'APPROVED',
    outdoorContext: 'Oceanfront Terrace & Pool Deck',
    createdAt: '2026-02-14T15:30:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-solara-sectional',
    userId: 'usr-client-2',
    userName: 'Marcus Sterling',
    userLocation: 'Aspen, Colorado',
    rating: 5,
    title: 'Solid timber joinery and unbelievable comfort',
    comment: 'We installed this on our mountain veranda. The scale is generous and the wood has a warm natural glow. White glove delivery crew assembled everything seamlessly in 15 minutes.',
    isVerifiedPurchase: true,
    status: 'APPROVED',
    outdoorContext: 'Mountain Veranda',
    createdAt: '2026-02-20T11:00:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-terra-dining-set',
    userId: 'usr-client-1',
    userName: 'Elena Rostova',
    userLocation: 'Miami Beach, Florida',
    rating: 5,
    title: 'The rope work is soft yet indestructible',
    comment: 'Hosting 8 guests around this table under our pergola has become our weekend ritual. Red wine spills wipe off instantly with a damp sponge.',
    isVerifiedPurchase: true,
    status: 'APPROVED',
    outdoorContext: 'Garden Pergola Dining',
    createdAt: '2026-02-26T18:45:00Z'
  },
  {
    id: 'rev-4',
    productId: 'prod-marina-lounger',
    userId: 'usr-client-2',
    userName: 'David H.',
    userLocation: 'Scottsdale, Arizona',
    rating: 5,
    title: 'Resort quality in every detail',
    comment: 'The Batyline sling stays cool even in 100-degree desert sun. Wheels glide silently across travertine pavers without leaving scuff marks.',
    isVerifiedPurchase: true,
    status: 'APPROVED',
    outdoorContext: 'Poolside Travertine Deck',
    createdAt: '2026-03-01T13:20:00Z'
  }
];

let ordersStore: Order[] = [
  {
    id: 'ord-slx-9842',
    orderNumber: 'SLX-9842-88',
    userId: 'usr-client-1',
    email: 'sophia.laurent@villa-azure.com',
    phone: '+1 (555) 890-1234',
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    currency: 'USD',
    subtotal: 4850,
    discountAmount: 485,
    shippingAmount: 0,
    taxAmount: 349.20,
    totalAmount: 4714.20,
    shippingMethod: 'Complimentary White Glove Delivery & Installation',
    trackingNumber: 'SLX-LOG-7729104',
    carrier: 'Silvex White Glove Logistics',
    estimatedArrival: '2026-02-18T14:00:00Z',
    customerNotes: 'Please call 30 minutes prior to arrival. Gate code #4829.',
    shippingAddress: {
      id: 'addr-1',
      firstName: 'Sophia',
      lastName: 'Laurent',
      street: '28400 Pacific Coast Highway',
      apartment: 'Villa Azure',
      city: 'Malibu',
      state: 'CA',
      postalCode: '90265',
      country: 'US',
      phone: '+1 (555) 890-1234'
    },
    items: [
      {
        id: 'ord-item-1',
        productId: 'prod-solara-sectional',
        productTitle: 'Solara Teak Grand 5-Piece Outdoor Sectional',
        variantTitle: 'Natural Golden Teak / Sandstone Sunbrella®',
        sku: 'SLX-SOL-SEC-01-SND',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
        price: 4850,
        quantity: 1,
        totalPrice: 4850
      }
    ],
    createdAt: '2026-02-10T14:20:00Z',
    updatedAt: '2026-02-18T16:00:00Z'
  },
  {
    id: 'ord-slx-9850',
    orderNumber: 'SLX-9850-12',
    userId: 'usr-client-2',
    email: 'marcus.sterling@resortgroup.com',
    phone: '+1 (555) 432-8765',
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    currency: 'USD',
    subtotal: 7040,
    discountAmount: 300,
    shippingAmount: 0,
    taxAmount: 539.20,
    totalAmount: 7279.20,
    shippingMethod: 'Dedicated Resort Logistics',
    trackingNumber: 'SLX-LOG-8839011',
    carrier: 'Silvex Freight Express',
    estimatedArrival: '2026-03-18T10:00:00Z',
    customerNotes: 'Deliver to rear clubhouse receiving bay.',
    shippingAddress: {
      id: 'addr-2',
      firstName: 'Marcus',
      lastName: 'Sterling',
      company: 'Highland Ridge Estate',
      street: '450 Red Mountain Road',
      city: 'Aspen',
      state: 'CO',
      postalCode: '81611',
      country: 'US',
      phone: '+1 (555) 432-8765'
    },
    items: [
      {
        id: 'ord-item-2',
        productId: 'prod-terra-dining-set',
        productTitle: 'Terra Mediterranean 8-Seater Dining Set',
        variantTitle: 'Matte Sand White / Terracotta Rope & Cushions',
        sku: 'SLX-TER-DIN-08-TER',
        imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop',
        price: 3890,
        quantity: 1,
        totalPrice: 3890
      },
      {
        id: 'prod-aur-fir-01',
        productId: 'prod-aura-fire-table',
        productTitle: 'Aura Volcanic Stone Composite Outdoor Fire Table',
        variantTitle: 'Limestone Bone / Bronze Glass / Teak Inset Lid',
        sku: 'SLX-AUR-FIR-01-BON',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
        price: 2850,
        quantity: 1,
        totalPrice: 2850
      },
      {
        id: 'ord-item-4',
        productId: 'prod-valencia-cushion-suite',
        productTitle: 'Valencia All-Weather Outdoor Throw Cushion Set',
        variantTitle: 'Earth Tones Palette',
        sku: 'SLX-VAL-CUS-04-ETH',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
        price: 380,
        quantity: 1,
        totalPrice: 380
      }
    ],
    createdAt: '2026-03-08T09:15:00Z',
    updatedAt: '2026-03-10T11:00:00Z'
  },
  {
    id: 'ord-slx-9861',
    orderNumber: 'SLX-9861-44',
    userId: 'usr-client-1',
    email: 'sophia.laurent@villa-azure.com',
    phone: '+1 (555) 890-1234',
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    currency: 'USD',
    subtotal: 4400,
    discountAmount: 0,
    shippingAmount: 0,
    taxAmount: 352.00,
    totalAmount: 4752.00,
    shippingMethod: 'Complimentary White Glove Delivery & Installation',
    trackingNumber: 'SLX-LOG-9912048',
    carrier: 'Silvex White Glove Logistics',
    estimatedArrival: '2026-03-22T12:00:00Z',
    shippingAddress: {
      id: 'addr-1',
      firstName: 'Sophia',
      lastName: 'Laurent',
      street: '28400 Pacific Coast Highway',
      apartment: 'Villa Azure',
      city: 'Malibu',
      state: 'CA',
      postalCode: '90265',
      country: 'US',
      phone: '+1 (555) 890-1234'
    },
    items: [
      {
        id: 'ord-item-5',
        productId: 'prod-marina-lounger',
        productTitle: 'Marina Resort Poolside Sun Lounger (Set of 2)',
        variantTitle: 'Arctic White Frame / Crisp Glacier Batyline® Mesh',
        sku: 'SLX-MAR-LOU-02-WHT',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
        price: 2200,
        quantity: 2,
        totalPrice: 4400
      }
    ],
    createdAt: '2026-03-12T16:40:00Z',
    updatedAt: '2026-03-12T16:45:00Z'
  }
];

let inventoryMovementsStore: InventoryMovement[] = [
  {
    id: 'mov-1',
    variantId: 'var-sol-sand',
    productTitle: 'Solara Teak Grand 5-Piece Outdoor Sectional',
    variantTitle: 'Natural Golden Teak / Sandstone Sunbrella®',
    type: 'ORDER_FULFILLMENT',
    quantity: -1,
    reason: 'Fulfillment for Order #SLX-9842-88',
    referenceId: 'ord-slx-9842',
    actorEmail: 'system@silvex-outdoor.com',
    createdAt: '2026-02-10T14:25:00Z'
  },
  {
    id: 'mov-2',
    variantId: 'var-ter-sand',
    productTitle: 'Terra Mediterranean 8-Seater Dining Set',
    variantTitle: 'Matte Sand White / Terracotta Rope',
    type: 'ORDER_FULFILLMENT',
    quantity: -1,
    reason: 'Fulfillment for Order #SLX-9850-12',
    referenceId: 'ord-slx-9850',
    actorEmail: 'system@silvex-outdoor.com',
    createdAt: '2026-03-08T09:20:00Z'
  },
  {
    id: 'mov-3',
    variantId: 'var-mar-white',
    productTitle: 'Marina Resort Poolside Sun Lounger (Set of 2)',
    variantTitle: 'Arctic White / Crisp Glacier Batyline®',
    type: 'RESTOCK',
    quantity: 15,
    reason: 'Spring 2026 Factory Batch Restock from Java Atelier',
    referenceId: 'PO-2026-081',
    actorEmail: 'alexander@silvex-outdoor.com',
    createdAt: '2026-03-01T10:00:00Z'
  }
];

// In-memory active carts
const activeCarts: Map<string, CartItem[]> = new Map();

// Attach Category, Space, and Collection relationships
function hydrateProduct(p: Product): Product {
  const category = categoriesStore.find((c) => c.id === p.categoryId);
  const space = spacesStore.find((s) => s.id === p.outdoorSpaceId);
  const collection = collectionsStore.find((col) => col.id === p.collectionId);
  return {
    ...p,
    category,
    outdoorSpace: space,
    collection
  };
}

export const db = {
  // PRODUCTS
  products: {
    findMany: (filter?: Partial<FilterState>): Product[] => {
      let results = productsStore.map(hydrateProduct);

      if (!filter) return results;

      if (filter.category) {
        results = results.filter((p) => p.category?.slug === filter.category || p.categoryId === filter.category);
      }

      if (filter.space) {
        results = results.filter((p) => p.outdoorSpace?.slug === filter.space || p.outdoorSpaceId === filter.space);
      }

      if (filter.collection) {
        results = results.filter((p) => p.collection?.slug === filter.collection || p.collectionId === filter.collection);
      }

      if (filter.material) {
        const matLower = filter.material.toLowerCase();
        results = results.filter((p) =>
          p.specification.material.toLowerCase().includes(matLower)
        );
      }

      if (filter.frameMaterial) {
        const frameLower = filter.frameMaterial.toLowerCase();
        results = results.filter((p) =>
          p.specification.frameMaterial.toLowerCase().includes(frameLower)
        );
      }

      if (filter.weatherResistance) {
        const wrLower = filter.weatherResistance.toLowerCase();
        results = results.filter((p) =>
          p.specification.weatherResistance.toLowerCase().includes(wrLower)
        );
      }

      if (filter.minPrice !== undefined) {
        results = results.filter((p) => p.basePrice >= (filter.minPrice || 0));
      }

      if (filter.maxPrice !== undefined) {
        results = results.filter((p) => p.basePrice <= (filter.maxPrice || Infinity));
      }

      if (filter.inStockOnly) {
        results = results.filter((p) =>
          p.variants.some((v) => v.inventoryCount - v.reservedCount > 0)
        );
      }

      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase().trim();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category?.name.toLowerCase().includes(q) ||
            p.outdoorSpace?.name.toLowerCase().includes(q) ||
            p.collection?.name.toLowerCase().includes(q) ||
            p.specification.material.toLowerCase().includes(q)
        );
      }

      // Sorting
      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'price-asc':
            results.sort((a, b) => a.basePrice - b.basePrice);
            break;
          case 'price-desc':
            results.sort((a, b) => b.basePrice - a.basePrice);
            break;
          case 'rating':
            results.sort((a, b) => b.ratingAverage - a.ratingAverage);
            break;
          case 'newest':
            results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'bestseller':
            results.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
            break;
          case 'featured':
          default:
            results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
            break;
        }
      }

      return results;
    },

    findBySlug: (slug: string): Product | null => {
      const p = productsStore.find((item) => item.slug === slug);
      return p ? hydrateProduct(p) : null;
    },

    findById: (id: string): Product | null => {
      const p = productsStore.find((item) => item.id === id);
      return p ? hydrateProduct(p) : null;
    },

    create: (product: Product): Product => {
      productsStore.unshift(product);
      return hydrateProduct(product);
    },

    update: (id: string, updates: Partial<Product>): Product | null => {
      const index = productsStore.findIndex((p) => p.id === id);
      if (index === -1) return null;
      productsStore[index] = { ...productsStore[index], ...updates, updatedAt: new Date().toISOString() };
      return hydrateProduct(productsStore[index]);
    },

    delete: (id: string): boolean => {
      const initialLen = productsStore.length;
      productsStore = productsStore.filter((p) => p.id !== id);
      return productsStore.length < initialLen;
    }
  },

  // SPACES
  spaces: {
    findMany: (): OutdoorSpace[] => spacesStore,
    findBySlug: (slug: string): OutdoorSpace | null => {
      return spacesStore.find((s) => s.slug === slug) || null;
    }
  },

  // CATEGORIES
  categories: {
    findMany: (): Category[] => categoriesStore,
    findBySlug: (slug: string): Category | null => {
      return categoriesStore.find((c) => c.slug === slug) || null;
    }
  },

  // COLLECTIONS
  collections: {
    findMany: (): Collection[] => collectionsStore,
    findBySlug: (slug: string): Collection | null => {
      return collectionsStore.find((c) => c.slug === slug) || null;
    }
  },

  // REVIEWS
  reviews: {
    findByProductId: (productId: string): Review[] => {
      return reviewsStore.filter((r) => r.productId === productId && r.status === 'APPROVED');
    },
    findAll: (): Review[] => reviewsStore,
    create: (reviewData: Omit<Review, 'id' | 'createdAt'>): Review => {
      const newReview: Review = {
        ...reviewData,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      reviewsStore.unshift(newReview);
      return newReview;
    },
    updateStatus: (id: string, status: 'APPROVED' | 'REJECTED'): Review | null => {
      const rev = reviewsStore.find((r) => r.id === id);
      if (!rev) return null;
      rev.status = status;
      return rev;
    }
  },

  // DISCOUNTS
  discounts: {
    findByCode: (code: string): Discount | null => {
      return (
        discountsStore.find(
          (d) => d.code.toUpperCase() === code.trim().toUpperCase() && d.isActive
        ) || null
      );
    },
    findAll: (): Discount[] => discountsStore,
    create: (discount: Discount): Discount => {
      discountsStore.push(discount);
      return discount;
    }
  },

  // ORDERS
  orders: {
    findAll: (): Order[] => [...ordersStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    findById: (id: string): Order | null => {
      return ordersStore.find((o) => o.id === id || o.orderNumber === id) || null;
    },
    findByUserId: (userId: string): Order[] => {
      return ordersStore.filter((o) => o.userId === userId);
    },
    create: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const newOrder: Order = {
        ...orderData,
        id: `ord-slx-${Date.now()}`,
        orderNumber: `SLX-${randomDigits}-${new Date().getFullYear() % 100}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      ordersStore.unshift(newOrder);

      // Record inventory deduction
      orderData.items.forEach((item) => {
        const prod = productsStore.find((p) => p.id === item.productId);
        if (prod) {
          const variant = prod.variants.find((v) => v.sku === item.sku || v.id === item.variantTitle);
          if (variant) {
            variant.inventoryCount = Math.max(0, variant.inventoryCount - item.quantity);
            inventoryMovementsStore.unshift({
              id: `mov-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              variantId: variant.id,
              productTitle: item.productTitle,
              variantTitle: item.variantTitle,
              type: 'ORDER_FULFILLMENT',
              quantity: -item.quantity,
              reason: `Fulfillment for Order #${newOrder.orderNumber}`,
              referenceId: newOrder.id,
              actorEmail: newOrder.email,
              createdAt: new Date().toISOString()
            });
          }
        }
      });

      return newOrder;
    },
    updateStatus: (orderId: string, status: Order['status'], trackingNumber?: string): Order | null => {
      const order = ordersStore.find((o) => o.id === orderId || o.orderNumber === orderId);
      if (!order) return null;
      order.status = status;
      if (trackingNumber) order.trackingNumber = trackingNumber;
      order.updatedAt = new Date().toISOString();
      return order;
    }
  },

  // INVENTORY MOVEMENTS
  inventory: {
    getAllMovements: (): InventoryMovement[] => inventoryMovementsStore,
    addStock: (variantId: string, quantity: number, reason: string, actorEmail: string): boolean => {
      let found = false;
      productsStore.forEach((p) => {
        const v = p.variants.find((variant) => variant.id === variantId);
        if (v) {
          v.inventoryCount += quantity;
          found = true;
          inventoryMovementsStore.unshift({
            id: `mov-${Date.now()}`,
            variantId,
            productTitle: p.title,
            variantTitle: v.title,
            type: 'RESTOCK',
            quantity,
            reason,
            actorEmail,
            createdAt: new Date().toISOString()
          });
        }
      });
      return found;
    }
  },

  // USERS / CUSTOMERS
  users: {
    findAll: (): User[] => usersStore,
    findByEmail: (email: string): User | null => {
      return usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
    },
    create: (userData: Omit<User, 'id' | 'createdAt'>): User => {
      const newUser: User = {
        ...userData,
        id: `usr-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      usersStore.push(newUser);
      return newUser;
    }
  },

  // ADMIN ANALYTICS
  analytics: {
    getDashboardKPIs: (): AdminDashboardKPIs => {
      const totalOrders = ordersStore.length;
      const grossRevenue = ordersStore.reduce((sum, o) => sum + o.totalAmount, 0);
      const discountTotal = ordersStore.reduce((sum, o) => sum + o.discountAmount, 0);
      const netRevenue = grossRevenue - discountTotal;
      const averageOrderValue = totalOrders > 0 ? grossRevenue / totalOrders : 0;
      const unitsSold = ordersStore.reduce(
        (sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0),
        0
      );
      const pendingOrders = ordersStore.filter(
        (o) => o.status === 'PENDING' || o.status === 'CONFIRMED' || o.status === 'PROCESSING'
      ).length;

      let lowStockCount = 0;
      productsStore.forEach((p) => {
        p.variants.forEach((v) => {
          if (v.inventoryCount <= v.lowStockAlert) {
            lowStockCount++;
          }
        });
      });

      return {
        grossRevenue,
        netRevenue,
        totalOrders,
        pendingOrders,
        averageOrderValue,
        unitsSold,
        totalCustomers: usersStore.length,
        lowStockCount,
        revenueByMonth: [
          { month: 'Oct 2025', revenue: 28400, orders: 7 },
          { month: 'Nov 2025', revenue: 36200, orders: 9 },
          { month: 'Dec 2025', revenue: 49800, orders: 12 },
          { month: 'Jan 2026', revenue: 42100, orders: 10 },
          { month: 'Feb 2026', revenue: 58900, orders: 14 },
          { month: 'Mar 2026 (MTD)', revenue: grossRevenue, orders: totalOrders }
        ],
        salesByOutdoorSpace: [
          { space: 'Terrace & Veranda', percentage: 38, revenue: grossRevenue * 0.38 },
          { space: 'Poolside & Deck', percentage: 26, revenue: grossRevenue * 0.26 },
          { space: 'Outdoor Dining', percentage: 20, revenue: grossRevenue * 0.20 },
          { space: 'Garden Sanctuary', percentage: 11, revenue: grossRevenue * 0.11 },
          { space: 'Rooftop & Balcony', percentage: 5, revenue: grossRevenue * 0.05 }
        ],
        salesByMaterial: [
          { material: 'Grade-A Indonesian Teak', count: 18, revenue: grossRevenue * 0.44 },
          { material: 'Marine-Grade Aluminum', count: 14, revenue: grossRevenue * 0.28 },
          { material: 'Italian Olefin Nautical Rope', count: 12, revenue: grossRevenue * 0.18 },
          { material: 'GFRC Stone & Volcanic Composite', count: 6, revenue: grossRevenue * 0.10 }
        ],
        salesByCategory: [
          { category: 'Outdoor Sofas & Lounge', count: 16, revenue: grossRevenue * 0.42 },
          { category: 'Outdoor Dining Suites', count: 11, revenue: grossRevenue * 0.29 },
          { category: 'Sun Loungers & Daybeds', count: 9, revenue: grossRevenue * 0.19 },
          { category: 'Umbrellas & Fire Tables', count: 6, revenue: grossRevenue * 0.10 }
        ]
      };
    }
  }
};
