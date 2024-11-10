import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import { TransactionType } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { amount } = await req.json();
   
    const transaction = await prisma.$transaction(async (tx) => {
      const txn = await tx.transaction.create({
        data: {
          amount,
          type: TransactionType.TOPUP,
          toUserId: userId,
          description: 'Top up from bank account',
          status: 'PENDING',
        },
      });

      await tx.child.update({
        where: { clerkId: userId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      return txn;
    });

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process top-up' },
      { status: 500 }
    );
  }
}