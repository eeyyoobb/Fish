import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest) {
  try {
    
    const urlParts = req.nextUrl.pathname.split('/');
    const id = urlParts[urlParts.length - 1]; 

    const existingRecord = await prisma.adjust.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: "Record not found" },
        { status: 404 }
      );
    }

    // Return the found record
    return NextResponse.json(existingRecord);

  } catch (error) {
    console.error("Error fetching record:", error);
    return NextResponse.json(
      { error: "Failed to fetch record" },
      { status: 500 }
    );
  }
}



export async function PUT(req: NextRequest) {
  try {
    const { ywatch, ylike, ysub, join, fee, token, mtask, mchild, mcreate, Account, balance, wallet } = await req.json();

    if (
      ywatch === undefined ||
      ylike === undefined ||
      ysub === undefined ||
      join === undefined ||
      fee === undefined ||
      token === undefined ||
      mtask === undefined ||
      mchild === undefined ||
      mcreate === undefined ||
      Account === undefined ||
      balance === undefined ||
      wallet === undefined
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const urlParts = req.nextUrl.pathname.split('/');
    const id = urlParts[urlParts.length - 1];

    // Update the adjust data in the database
    const updatedAdjust = await prisma.adjust.update({
      where: { id: id as string },
      data: {
        ywatch,
        ylike,
        ysub,
        join,
        fee,
        token,
        mtask,
        mchild,
        mcreate,
        Account,
        balance,
        wallet,
      },
    });

    return NextResponse.json(updatedAdjust, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating adjust data" }, { status: 500 });
  }
}