import { NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function GET() {
  try {
    const kpis = db.analytics.getDashboardKPIs();
    return NextResponse.json({ success: true, data: kpis });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
