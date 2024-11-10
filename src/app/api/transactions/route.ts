// pages/api/transactions/index.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust path as necessary

export async function GET(req: Request) {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}