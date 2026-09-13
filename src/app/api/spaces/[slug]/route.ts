import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const space = db.spaces.findBySlug(slug);

  if (!space) {
    return NextResponse.json({ success: false, error: 'Outdoor space not found' }, { status: 404 });
  }

  const products = db.products.findMany({ space: space.slug });

  return NextResponse.json({
    success: true,
    data: {
      ...space,
      products,
    },
  });
}
