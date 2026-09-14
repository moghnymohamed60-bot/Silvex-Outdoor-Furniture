import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';
import { sendOrderConfirmationEmail } from '@/lib/email/service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let orders = [];
    if (userId) {
      orders = db.orders.findByUserId(userId);
    } else {
      orders = db.orders.findAll();
    }

    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Email and items are required' },
        { status: 400 }
      );
    }

    const order = db.orders.create({
      userId: body.userId || undefined,
      email: body.email,
      phone: body.phone,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      currency: body.currency || 'USD',
      subtotal: body.subtotal,
      discountAmount: body.discountAmount || 0,
      shippingAmount: body.shippingAmount || 0,
      taxAmount: body.taxAmount || 0,
      totalAmount: body.totalAmount,
      shippingMethod: body.shippingMethod || 'White Glove Delivery & Installation',
      customerNotes: body.customerNotes,
      shippingAddress: body.shippingAddress,
      items: body.items,
    });

    // Send confirmation email asynchronously
    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailErr) {
      console.error('[EmailService] Order confirmation email error:', emailErr);
    }

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

