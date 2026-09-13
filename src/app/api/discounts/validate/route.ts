import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();

    if (!code) {
      return NextResponse.json({ success: false, error: 'Code is required' }, { status: 400 });
    }

    const discount = db.discounts.findByCode(code);

    if (!discount) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired promotion code' },
        { status: 404 }
      );
    }

    if (subtotal && subtotal < discount.minimumOrder) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order of $${discount.minimumOrder.toLocaleString()} required for this promo`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        code: discount.code,
        type: discount.type,
        value: discount.value,
        description: discount.description,
        maxDiscount: discount.maxDiscount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
