import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function GET() {
  const movements = db.inventory.getAllMovements();
  return NextResponse.json({ success: true, count: movements.length, data: movements });
}

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity, reason, actorEmail } = await request.json();

    if (!variantId || !quantity || !reason) {
      return NextResponse.json(
        { success: false, error: 'Variant, quantity, and reason are required' },
        { status: 400 }
      );
    }

    const success = db.inventory.addStock(
      variantId,
      Number(quantity),
      reason,
      actorEmail || 'admin@silvex-outdoor.com'
    );

    if (!success) {
      return NextResponse.json({ success: false, error: 'Variant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Inventory updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
