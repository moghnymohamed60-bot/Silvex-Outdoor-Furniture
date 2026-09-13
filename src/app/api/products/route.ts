import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';
import { FilterState, Product } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filter: Partial<FilterState> = {
      category: searchParams.get('category') || undefined,
      space: searchParams.get('space') || undefined,
      collection: searchParams.get('collection') || undefined,
      material: searchParams.get('material') || undefined,
      frameMaterial: searchParams.get('frameMaterial') || undefined,
      weatherResistance: searchParams.get('weatherResistance') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      inStockOnly: searchParams.get('inStockOnly') === 'true',
      sortBy: (searchParams.get('sortBy') as FilterState['sortBy']) || 'featured',
      searchQuery: searchParams.get('q') || undefined,
    };

    const products = db.products.findMany(filter);

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProduct = db.products.create(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create product' },
      { status: 400 }
    );
  }
}
