// /pages/api/upgradeRole.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  try {
    let updateData = {};

    if (role === "creator") {
      updateData = { role: "creator" };
    } else if (role === "parent") {
      updateData = { role: "parent" };
    } else if (role === "monetize") {
      updateData = { monetizationEnabled: true };
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    await prisma.child.update({
      where: { clerkId: userId },
      data: updateData,
    });

    return NextResponse.json({ message: `${role} role updated successfully` });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update role" });
  }
}
