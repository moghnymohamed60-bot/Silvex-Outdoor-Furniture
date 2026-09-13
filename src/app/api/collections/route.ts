import { NextResponse } from 'next/server';
import { db } from '@/lib/data/mock-db';

export async function GET() {
  const collections = db.collections.findMany();
  return NextResponse.json({ success: true, data: collections });
}
