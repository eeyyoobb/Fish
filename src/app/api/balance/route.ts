
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ balance: 0, monetization: false }, { status: 401 });
    }

    const user = await prisma.child.findUnique({
      where: { clerkId: userId },
      select: { balance: true, monetization: true }
    });

    if (!user) {
      return NextResponse.json({ balance: 0, monetization: false }, { status: 404 });
    }

    return NextResponse.json({ balance: user.balance ?? 0, monetization: user.monetization ?? false });
  } catch (error) {
    return NextResponse.json({ balance: 0, monetization: false }, { status: 500 });
  }
}
