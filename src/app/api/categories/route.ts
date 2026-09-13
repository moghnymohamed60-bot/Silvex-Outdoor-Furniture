import { NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function GET() {
  const categories = db.categories.findMany();
  return NextResponse.json({ success: true, data: categories });
}
