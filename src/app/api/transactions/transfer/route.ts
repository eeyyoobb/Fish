import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toUsername, amount } = await req.json();
    const serviceFeePercentage = 0.05;
    const serviceFee = amount * serviceFeePercentage;
    const totalDeduction = amount + serviceFee;

    const fromUser = await prisma.child.findUnique({
      where: { clerkId: userId },
    });

    const toUser = await prisma.admin.findUnique({
      where: { username: toUsername },
    });

     console.log(toUsername)
     
    if (!fromUser  || !toUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (fromUser.wallet < totalDeduction) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const txn = await tx.transaction.create({
        data: {
          amount,
          type: TransactionType.TRANSFER,
          fromUserId: fromUser.id,
          toUserId: toUser.id,
          serviceFee,
          description: `Transfer to ${toUser.username}`,
          status: "COMPLETED",
        },
      });

      await tx.child.update({
        where: { clerkId: fromUser.clerkId },
        data: {
          wallet: {
            decrement: totalDeduction,
          },
        },
      });

      await tx.admin.update({
        where: { clerkId: toUser.clerkId },
        data: {
          wallet: {
            increment: amount,
          },
        },
      });

      return txn;
    });

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process transfer" },
      { status: 500 }
    );
  }
}
