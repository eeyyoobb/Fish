// pages/api/wallet.ts

import prisma from '@/lib/prisma'; // Adjust the import according to your prisma setup
import { auth } from '@clerk/nextjs/server';
import { NextResponse,NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Ensure userId and role are defined
  if (!userId || !role) {
    return NextResponse.json({ message: 'Unauthorized: Missing user information' });
  }

  try {
    //@ts-ignore
    const walletData = await prisma[role].findUnique({
      where: { clerkId: userId },
    });

    if (!walletData) {
      return NextResponse.json({ message: 'Wallet not found' });
    }

    return NextResponse.json(walletData);
  } catch (error) {
    console.error('Error fetching wallet data:', error); // Log the error for debugging
    return NextResponse.json({ message: 'Internal server error' });
  }
}
