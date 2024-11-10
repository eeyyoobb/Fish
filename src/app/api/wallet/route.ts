
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { userId,sessionClaims} = auth(); // Extract userId from auth
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    //@ts-ignore
    const child = await prisma[role].findUnique({
      where: { clerkId: userId }, // Use clerkId to find the child
      select: {
        balance: true,
        account: true,
      },
    });

    if (!child) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }

    return NextResponse.json(child, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
