// src/app/api/child/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clerkId = searchParams.get('clerkId');

  if (!clerkId) {
    return NextResponse.json({ error: 'Missing clerkId' }, { status: 400 });
  }

  try {
    // Use findUnique to find a child by clerkId
    const child = await prisma.child.findUnique({
      where: {
        clerkId: clerkId, // Adjust according to your schema
      },
    });

    if (!child) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }

    return NextResponse.json(child);
  } catch (error) {
    console.error('Error fetching child data:', error);
    return NextResponse.json({ error: 'Failed to fetch child data' }, { status: 500 });
  }
}
