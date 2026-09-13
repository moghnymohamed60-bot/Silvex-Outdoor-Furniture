'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { db } from '@/lib/data/mock-db';
import { OUTDOOR_SPACES } from '@/lib/data/outdoor-spaces';
import { CATEGORIES } from '@/lib/data/categories';
import { COLLECTIONS } from '@/lib/data/collections';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(db.products.findMany());
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newPrice, setNewPrice] = useState('2400');
  const [newCategory, setNewCategory] = useState('cat-sofas');
  const [newSpace, setNewSpace] = useState('space-terrace');
  const [newCollection, setNewCollection] = useState('col-solara');
  const [newMaterial, setNewMaterial] = useState('Grade-A Indonesian Teak');
  const [newWeather, setNewWeather] = useState('All-Weather UV50+, Rain & Salt Proof');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newImageUrl, setNewImageUrl] = useState(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
  );

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      slug,
      sku: newSku || `SLX-CUSTOM-${Date.now().toString().slice(-4)}`,
      shortDescription: newShortDesc || 'Architectural outdoor furniture piece handcrafted for 4-season longevity.',
      description: 'Handcrafted with premium materials.',
      basePrice: Number(newPrice),
      status: 'ACTIVE',
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: true,
      categoryId: newCategory,
      outdoorSpaceId: newSpace,
      collectionId: newCollection,
      ratingAverage: 5.0,
      ratingCount: 1,
      images: [
        {
          id: `img-${Date.now()}`,
          url: newImageUrl,
          altText: newTitle,
          isPrimary: true,
          isLifestyle: true,
          sortOrder: 1,
        },
      ],
      variants: [
        {
          id: `var-${Date.now()}`,
          sku: `${newSku || 'SLX'}-01`,
          title: 'Standard Luxury Finish',
          colorName: 'Natural Teak & Sand',
          colorHex: '#A37547',
          materialOption: newMaterial,
          priceAdjustment: 0,
          inventoryCount: 10,
          reservedCount: 0,
          lowStockAlert: 2,
        },
      ],
      specification: {
        id: `spec-${Date.now()}`,
        material: newMaterial,
        frameMaterial: 'Solid Kiln-Dried Teak / Marine Aluminum',
        cushionFabric: 'Sunbrella® All-Weather Performance Fabric',
        cushionFoam: 'QuickDry® Reticulated Hydrophobic Foam',
        weatherResistance: newWeather,
        uvResistanceRating: 'UV-50+ Lightfast Rating',
        waterResistanceLevel: 'Instant Gravity Drainage',
        rustResistance: '100% Rust-Proof 316 Marine Joinery',
        dimensions: '84"W x 36"D x 30"H',
        weight: '72 lbs',
        maintenanceInstructions: 'Clean with gentle soap and water.',
        winterCareGuide: 'Breathable protective cover recommended.',
        recommendedSpace: 'Terrace & Pool Deck',
        warrantyYears: 10,
        assemblyRequired: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.products.create(newProd);
    setProducts(db.products.findMany());
    setIsModalOpen(false);
    setNewTitle('');
    setNewSku('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to archive this outdoor product?')) {
      db.products.delete(id);
      setProducts(db.products.findMany());
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-silvex-600 dark:text-silvex-400">
            Catalog Administration
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Outdoor Furniture Catalog ({products.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-wider font-bold shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Outdoor Piece</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm max-w-md">
        <Search className="w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by title, SKU, or material..."
          className="bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none flex-1"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider text-[10px] bg-stone-50 dark:bg-stone-950">
                <th className="py-3 px-6 font-semibold">Product</th>
                <th className="py-3 font-semibold">SKU</th>
                <th className="py-3 font-semibold">Category / Space</th>
                <th className="py-3 font-semibold">Base Price</th>
                <th className="py-3 font-semibold">Inventory</th>
                <th className="py-3 font-semibold">Status</th>
                <th className="py-3 px-6 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((prod) => {
                const totalStock = prod.variants.reduce((s, v) => s + v.inventoryCount, 0);
                return (
                  <tr key={prod.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-950/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                          <img src={prod.images[0]?.url} alt={prod.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-stone-900 dark:text-white block">{prod.title}</span>
                          <span className="text-[10px] text-stone-400">{prod.specification.material}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-[11px] text-stone-600 dark:text-stone-300">
                      {prod.sku}
                    </td>
                    <td className="py-4">
                      <span className="block font-semibold text-stone-800 dark:text-stone-200">{prod.category?.name || 'Outdoor'}</span>
                      <span className="text-[10px] text-silvex-600 block">{prod.outdoorSpace?.name || 'All-Weather'}</span>
                    </td>
                    <td className="py-4 font-bold text-stone-900 dark:text-white">
                      {formatCurrency(prod.basePrice)}
                    </td>
                    <td className="py-4">
                      <span className={`font-semibold ${totalStock <= 3 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {totalStock} in stock
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {prod.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${prod.slug}`}
                          target="_blank"
                          className="p-1 text-stone-400 hover:text-stone-700"
                          title="View Live Product"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-1 text-stone-400 hover:text-rose-600"
                          title="Archive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create New Outdoor Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                Add New Outdoor Furniture Piece
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Product Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Solara Teak 3-Piece Daybed Pavilion"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">SKU Code</label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="SLX-SOL-DAY-01"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 uppercase font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Base Price (USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Outdoor Space</label>
                  <select
                    value={newSpace}
                    onChange={(e) => setNewSpace(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  >
                    {OUTDOOR_SPACES.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Collection</label>
                  <select
                    value={newCollection}
                    onChange={(e) => setNewCollection(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  >
                    {COLLECTIONS.map((col) => (
                      <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Outdoor Material</label>
                  <input
                    type="text"
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="Grade-A Teak & Sunbrella®"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Weather Resistance</label>
                  <input
                    type="text"
                    value={newWeather}
                    onChange={(e) => setNewWeather(e.target.value)}
                    placeholder="UV-50+, Chlorine & Salt Proof"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Lifestyle Image URL</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Short Editorial Description</label>
                <textarea
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all mt-4"
              >
                Publish to Outdoor Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
