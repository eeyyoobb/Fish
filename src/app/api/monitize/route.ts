import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ count: 0 }, { status: 401 });
    }

    const { account } = await req.json();
    if (!account || account.trim() === '') {
      return NextResponse.json({ message: "Wallet address is required" }, { status: 400 });
    }

    // Update monetization to true for all children with the matching userId
    const updateResult = await prisma.child.updateMany({
      where: { clerkId: userId },
      data: { monetization: true,
              account: account
       }
    });

    // Count the number of records updated
    const count = updateResult.count;

    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
