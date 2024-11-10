import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TransactionType } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const user = await prisma.child.findUnique({
      where: { clerkId: userId },
    });

    if (!user || user.balance < parsedAmount) {
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const txn = await tx.transaction.create({
        data: {
          amount: parsedAmount,
          type: TransactionType.WITHDRAWAL,
          fromUserId: user.id,  
          description: 'Withdrawal to pending',
          status: 'PENDING',
        },
      });

      await tx.child.update({
        where: { id: user.id },
        data: {
          balance: {
            decrement: parsedAmount,
          },
        },
      });

      return txn;
    });

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    console.error("Withdrawal error:", error);
    return NextResponse.json({ error: "Failed to process withdrawal" }, { status: 500 });
  }
}