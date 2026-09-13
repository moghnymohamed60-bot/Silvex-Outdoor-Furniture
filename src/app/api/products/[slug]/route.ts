import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const product = db.products.findBySlug(slug) || db.products.findById(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Outdoor product not found' },
        { status: 404 }
      );
    }

    // Also fetch reviews and related products
    const reviews = db.reviews.findByProductId(product.id);
    const related = db.products
      .findMany({ category: product.categoryId })
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        reviews,
        related,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching product' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const updated = db.products.update(slug, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating product' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const deleted = db.products.delete(slug);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error deleting product' },
      { status: 500 }
    );
  }
}
