import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (productId) {
    const reviews = db.reviews.findByProductId(productId);
    return NextResponse.json({ success: true, data: reviews });
  }

  const allReviews = db.reviews.findAll();
  return NextResponse.json({ success: true, data: allReviews });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.productId || !body.rating || !body.title || !body.comment) {
      return NextResponse.json(
        { success: false, error: 'Product, rating, title, and comment are required' },
        { status: 400 }
      );
    }

    const review = db.reviews.create({
      productId: body.productId,
      userId: body.userId || 'usr-anonymous',
      userName: body.userName || 'Verified Outdoor Living Connoisseur',
      userLocation: body.userLocation || 'United States',
      rating: Number(body.rating),
      title: body.title,
      comment: body.comment,
      isVerifiedPurchase: true,
      status: 'APPROVED',
      outdoorContext: body.outdoorContext || 'Private Terrace',
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
