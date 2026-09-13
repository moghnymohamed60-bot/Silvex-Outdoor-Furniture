import { describe, it, expect } from 'vitest';
import { db } from '../src/lib/data/mock-db';

describe('SILVEX Outdoor Catalog & Filters', () => {
  it('should retrieve all products when no filters are applied', () => {
    const products = db.products.findMany();
    expect(products.length).toBeGreaterThan(10);
  });

  it('should filter products by outdoor space (e.g. poolside)', () => {
    const poolsideProducts = db.products.findMany({ space: 'poolside' });
    expect(poolsideProducts.length).toBeGreaterThan(0);
    expect(poolsideProducts.every((p) => p.outdoorSpace?.slug === 'poolside')).toBe(true);
  });

  it('should filter products by outdoor material (e.g. Teak)', () => {
    const teakProducts = db.products.findMany({ material: 'Teak' });
    expect(teakProducts.length).toBeGreaterThan(0);
    expect(
      teakProducts.every((p) => p.specification.material.toLowerCase().includes('teak'))
    ).toBe(true);
  });

  it('should find products by text search query', () => {
    const searchResults = db.products.findMany({ searchQuery: 'lounger' });
    expect(searchResults.length).toBeGreaterThan(0);
  });
});
