export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER';

export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'READY_FOR_SHIPMENT'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'AUTHORIZED' | 'PAID' | 'FAILED' | 'REFUNDED';

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  userId?: string;
  title?: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

export interface OutdoorSpace {
  id: string;
  name: string;
  slug: 'garden' | 'terrace' | 'poolside' | 'balcony' | 'rooftop' | 'outdoor-dining' | 'hospitality';
  headline: string;
  description: string;
  heroImage: string;
  inspirationStory: string;
  features: string[];
  recommendedCategories: string[];
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  isFeatured: boolean;
  materialsUsed: string[];
  sortOrder: number;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  isLifestyle: boolean;
  sortOrder: number;
}

export interface ProductSpecification {
  id: string;
  material: string;             // e.g. "Grade-A Indonesian Teak", "Powder-Coated T6 Marine Aluminum"
  frameMaterial: string;        // "100% Rust-Proof Aluminum"
  cushionFabric: string;        // "Sunbrella® Cast Sand All-Weather Fabric"
  cushionFoam: string;          // "QuickDry® Reticulated Hydrophobic Foam"
  weatherResistance: string;    // "All-Weather UV50+, Salt-Air & Rain Proof"
  uvResistanceRating: string;   // "UV 50+ / 2,000+ Lightfast Hours"
  waterResistanceLevel: string; // "Hydrophobic Repellent / Instant Drainage"
  rustResistance: string;       // "Marine-Grade 100% Non-Corrosive"
  dimensions: string;           // "92\"W x 38\"D x 28\"H"
  weight: string;               // "84 lbs (38.1 kg)"
  maxWindResistance?: string;   // "Tested up to 60 mph"
  maintenanceInstructions: string;
  winterCareGuide: string;
  recommendedSpace: string;
  warrantyYears: number;
  assemblyRequired: boolean;
  assemblyTimeMinutes?: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  colorName: string;
  colorHex: string;
  materialOption?: string;
  sizeOption?: string;
  priceAdjustment: number;
  inventoryCount: number;
  reservedCount: number;
  lowStockAlert: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  costPrice?: number;
  status: ProductStatus;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  categoryId: string;
  category?: Category;
  outdoorSpaceId?: string;
  outdoorSpace?: OutdoorSpace;
  collectionId?: string;
  collection?: Collection;
  images: ProductImage[];
  variants: ProductVariant[];
  specification: ProductSpecification;
  ratingAverage: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  variantTitle: string;
  sku: string;
  imageUrl: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  email: string;
  phone?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  currency: string;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  shippingMethod: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedArrival?: string;
  customerNotes?: string;
  shippingAddress: Address;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userLocation?: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: ReviewStatus;
  outdoorContext: string; // e.g. "Poolside Terrace", "Mountain View Garden"
  createdAt: string;
}

export interface Discount {
  id: string;
  code: string;
  description: string;
  type: DiscountType;
  value: number;
  minimumOrder: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string;
}

export interface InventoryMovement {
  id: string;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  type: 'PURCHASE' | 'ORDER_FULFILLMENT' | 'RESTOCK' | 'ADJUSTMENT' | 'RETURN';
  quantity: number;
  reason: string;
  referenceId?: string;
  actorEmail?: string;
  createdAt: string;
}

export interface FilterState {
  category?: string;
  space?: string;
  collection?: string;
  material?: string;
  frameMaterial?: string;
  weatherResistance?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy: 'featured' | 'newest' | 'bestseller' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery?: string;
}

export interface AdminDashboardKPIs {
  grossRevenue: number;
  netRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  averageOrderValue: number;
  unitsSold: number;
  totalCustomers: number;
  lowStockCount: number;
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  salesByOutdoorSpace: { space: string; percentage: number; revenue: number }[];
  salesByMaterial: { material: string; count: number; revenue: number }[];
  salesByCategory: { category: string; count: number; revenue: number }[];
}
