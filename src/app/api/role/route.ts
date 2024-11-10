import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import  prisma from "@/lib/prisma"; 

export async function PUT(request: Request) {
  try {
    const { userId,sessionClaims } = auth();
    const { role } = await request.json();

    const prevRole = (sessionClaims?.metadata as { role?: string })?.role;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update role in Clerk's metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    // Check if role is changing from "child" to "creator"
    if (role) {
       //@ts-ignore
      const prevUser = await prisma[prevRole].findUnique({
        where: { clerkId: userId },
      });

      if (!prevUser) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
      }

      // Transfer relevant fields to create a new Creator entry
      const creatorData = {
        clerkId: prevUser.clerkId,
        username: prevUser.username,
        name: prevUser.name,
        surname: prevUser.surname,
        email: prevUser.email,
        phone: prevUser.phone || '',
        address: prevUser.address || '',
        img: prevUser.img || '',
        wallet: prevUser.wallet,
        balance: prevUser.balance,
        monetization: prevUser.monetization,
        account: prevUser.account,
        //announcements: [], 
      };
      //@ts-ignore
      const newCreator = await prisma[role].create({
        data: creatorData,
      });

     //@ts-ignore
      await prisma[prevRole].delete({
        where: { id: prevUser?.id },
      });

    

      return NextResponse.json({ success: true, creatorId: newCreator.id });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
