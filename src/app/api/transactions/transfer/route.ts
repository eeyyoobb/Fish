import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server"; 

export async function POST(req: Request) {
  try {
    const { userId ,sessionClaims} = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toUsername, amount } = await req.json();
    const serviceFeePercentage = 0.05;
    const serviceFee = amount * serviceFeePercentage;
    const totalDeduction = amount + serviceFee;

    const role = (sessionClaims?.metadata as { role?: string })?.role;
    //@ts-ignore
    const fromUser = await prisma[role].findUnique({
      where: { clerkId: userId },
    });

    if (!fromUser) {
      return NextResponse.json({ error: "Sender not found" }, { status: 404 });
    }

    // Search for recipient across all user types
    const [adminUser, parentUser, childUser,creatorUser] = await Promise.all([
      prisma.admin.findUnique({
        where: { username: toUsername },
      }),
      prisma.parent.findUnique({
        where: { username: toUsername },
      }),
      prisma.child.findUnique({
        where: { username: toUsername },
      }),
      prisma.creator.findUnique({
        where: { username: toUsername },
      }),
    ]);

    // Find which type of user it is and get their details
    const toUser = adminUser || parentUser || childUser || creatorUser;
    const recieverId = toUser?.clerkId;
      
    if (!toUser) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 });
    }

    if (fromUser.balance < totalDeduction) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }

    // Determine the update operation based on recipient type
    const getUpdateOperation = () => {
      if (adminUser) {
        return prisma.admin.update({
          where: { clerkId: recieverId },
          data: { wallet: { increment: amount } },
        });
      } else if (parentUser) {
        return prisma.parent.update({
          where: { clerkId: recieverId },
          data: { wallet: { increment: amount } },
        });
      } else if (creatorUser) {
        return prisma.parent.update({
          where: { clerkId: recieverId },
          data: { wallet: { increment: amount } },
        });

      } else {
        return prisma.child.update({
          where: { clerkId: recieverId },
          data: { wallet: { increment: amount } },
        });
      }
    };

    const transaction = await prisma.$transaction([
      // Create transaction record
      prisma.transaction.create({
        data: {
          amount,
          type: TransactionType.TRANSFER,
          fromUserId: userId,
          toUserId: recieverId,
          serviceFee,
          description: `Transfer from ${fromUser.username} to ${toUser.username}`,
          status: "COMPLETED",
        },
      }),
      //@ts-ignore
      prisma[role].update({
        where: { id: fromUser.id },
        data: {
          balance: {
            decrement: totalDeduction,
          },
        },
      }),
      getUpdateOperation(),
    ]);

    return NextResponse.json({ 
      success: true, 
      transaction: transaction[0], // The first item is the transaction record
      message: `Successfully transferred ${amount} to ${toUsername}`
    });
  } catch (error) {
    console.error('Transfer error:', error);
    return NextResponse.json(
      { error: "Failed to process transfer" },
      { status: 500 }
    );
  }
}