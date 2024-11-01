// src/app/api/invite/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  // Ensure the user is authenticated
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Parse the request body
   // const { invitorUserId }: { invitorUserId: string } = await req.json();

    // Save the invitation in the database
    // const invitation = await prisma.invitation.create({
    //   data: {
    //     invitorUserId, // The Clerk ID from the referral code
    //     invitedUserId: userId, // The Clerk ID of the logged-in user
    //   },
    // });
    //return NextResponse.json(invitation, { status: 200 });
  } catch (error) {
    console.error("Error saving invitation:", error);
    return NextResponse.json({ message: 'Error saving invitation' }, { status: 500 });
  }
}
