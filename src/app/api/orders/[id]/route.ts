import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';
import { sendOrderStatusUpdateEmail } from '@/lib/email/service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const order = db.orders.findById(id);

  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: order });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existingOrder = db.orders.findById(id);
    const previousStatus = existingOrder?.status;

    const updated = db.orders.updateStatus(id, body.status, body.trackingNumber);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Trigger status update email if status changed
    if (body.status && body.status !== previousStatus) {
      try {
        await sendOrderStatusUpdateEmail(updated, previousStatus);
      } catch (emailErr) {
        console.error('[EmailService] Order status update email error:', emailErr);
      }
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

