# SILVEX OUTDOOR FURNITURE — FULL-STACK E-COMMERCE PLATFORM

> **"Outdoor Living, Elevated."**
> A production-grade, architectural outdoor furniture e-commerce platform engineered specifically for gardens, terraces, poolside retreats, verandas, high-altitude rooftops, alfresco dining, and luxury hospitality destinations.

---

## 1. Product & Architectural Vision

**SILVEX** is exclusively an **OUTDOOR FURNITURE** and **OUTDOOR LIVING** company. The entire digital experience reflects this identity through:
- **Shop by Outdoor Space**: Dedicated curated environments for *Garden*, *Terrace*, *Poolside*, *Balcony*, *Rooftop*, *Alfresco Dining*, and *Hospitality*.
- **Four-Season Outdoor Engineering**: Real specifications including Grade-A FSC® Indonesian Teak, marine-grade T6 aluminum chassis, solution-dyed Sunbrella® acrylics, open-cell QuickDry® reticulated foam, and UV-50+ certifications.
- **Architectural Aesthetic**: Minimalist, warm stone/sand/charcoal earth palette with high-resolution lifestyle photography.
- **Contract & Hospitality B2B**: Dedicated trade concierge, BIFMA/EN 581 compliance, and 3D CAD modeling.

---

## 2. Technology Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Zustand (Cart & Wishlist persistence), Recharts.
- **Backend**: Next.js App Router Route Handlers & RESTful API endpoints.
- **Database & ORM**: PostgreSQL with Prisma ORM (`prisma/schema.prisma`).
- **Payments**: Stripe Payment Processing (Payment Intents, Webhooks, client elements).
- **Testing**: Vitest unit test suite (`npm test`).
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD.

---

## 3. Key Platform Features

### Customer Storefront
- **Editorial Homepage**: Full-screen cinematic lifestyle hero, "Shop by Outdoor Space" interactive cards, signature collections, best sellers, "The Art of Weatherproof Luxury" material dossier, and verified client testimonials.
- **Advanced Outdoor Catalog & Filters**:
  - Filter by Outdoor Space, Category, Collection, Material, Frame Material, Weather Resistance, UV Rating, Price Range, and In-Stock status.
  - Fast sorting (Featured, Best Selling, New Arrivals, Price Low/High, Rating).
- **Rich Product Detail Pages**:
  - High-res lifestyle gallery with thumbnail switcher.
  - Durability badges (UV 50+, QuickDry foam, 10-year timber warranty, 100% rust-proof).
  - Dynamic variant & finish swatches (adjusting SKU and pricing).
  - Tabbed dossier: Technical Specifications, Weather & Winter Care Guide, White-Glove Installation Details, and Verified Owner Reviews.
- **Interactive Shopping Bag & Drawer**:
  - Slide-over drawer with real-time White-Glove free shipping threshold tracker ($2,500 threshold).
  - Promo code validator (`SILVEX10`, `ESTATE300`, `TERRACE15`).
- **Multi-Step Checkout**:
  - Step 1: Customer Contact Info.
  - Step 2: Shipping Address & White-Glove Installation preferences.
  - Step 3: Secure Stripe Card payment simulation.
  - Instant Order Confirmation & printable receipt.
- **Customer Portal**:
  - Real-time interactive shipment tracking timeline (`Confirmed` → `Processing` → `Shipped` → `Out for Delivery` → `Delivered`).
  - Saved addresses & wishlist manager with 1-click move to cart.
  - Public order tracker (`/order-tracking`).

### Executive Business Suite (`/admin`)
- **Executive KPI Dashboard**: Gross revenue, net sales, orders, average order value, units sold, and low-stock alert counters.
- **Outdoor Analytics**: Sales share by Outdoor Space (Terrace vs. Poolside vs. Dining vs. Garden), sales by Material, and monthly revenue trajectory.
- **Product Management**: Create, edit, and archive outdoor furniture with full specifications.
- **Inventory & Movement Audit**: Live variant stock counts, low-stock threshold alerts, batch restock recording modal, and immutable movement history.
- **Order Fulfillment**: Filter by fulfillment stage, update carrier tracking numbers, and manage status transitions.
- **Customer CRM**: Client profiles, lifetime value, and order history.
- **Review Moderation**: Approve or reject customer reviews.
- **Promotions Engine**: Create percentage or fixed discount rules with minimum order thresholds.

---

## 4. Getting Started & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm 9+
- (Optional) Docker for local PostgreSQL

### Installation Steps

1. **Clone the repository and install dependencies:**
   ```bash
   git clone https://github.com/moghnymohamed60-bot/Silvex-Outdoor-Furniture.git
   cd Silvex-Outdoor-Furniture
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local` or `.env`:
   ```bash
   cp .env.example .env.local
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Running Tests

Execute the automated test suite powered by Vitest:
```bash
npm test
```

To run type checking:
```bash
npm run type-check
```

---

## 6. Docker Deployment

Launch both the PostgreSQL database and the SILVEX Next.js application using Docker Compose:
```bash
docker-compose up -d --build
```
The platform will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 7. Default Credentials & Test Data

- **Admin Portal**: Accessible at `/admin`
- **Default Admin Email**: `admin@silvex-outdoor.com`
- **Sample Order Numbers for Tracking**: `SLX-9842-88`, `SLX-9850-12`, `SLX-9861-44`
- **Active Promotional Codes**:
  - `SILVEX10` (10% off orders over $1,000)
  - `ESTATE300` ($300 off orders over $3,500)
  - `TERRACE15` (15% off orders over $2,500)

---

## 8. License

© 2026 SILVEX Outdoor Furniture Inc. All rights reserved.
