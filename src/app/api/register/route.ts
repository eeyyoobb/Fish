import { NextResponse } from "next/server";
import { createChild } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import  prisma  from "@/lib/prisma";
import { clerkClient } from '@clerk/express';

export async function POST(req: Request) {
  try {
    const { userId,sessionClaims } = auth();
    
    if (userId) {
      return NextResponse.json(
        { 
          success: false, 
          message: "You can't have multiple accounts" 
        },
        { status: 400 }
      );
    }
    const data = await req.json();
    
    // Extract referral ID from the request URL
    const url = new URL(req.url);
    const referralPath = url.pathname.split('/');
    const referralId = url.searchParams.get("referral") || data.fatherId;

    if (!referralId) {
      return NextResponse.json(
        { success: false, message: "Parent referral ID is required" },
        { status: 400 }
      );
    }


    // Merge the referral ID with the form data
    const childData = {
      ...data,
      fatherId: referralId
    };
  const fatherUser = await clerkClient.users.getUser(referralId);
  const fatherRole = (fatherUser?.publicMetadata as { role?: string })?.role;


  console.log(fatherUser,fatherRole)
  //@ts-ignore
    const parent = await prisma[fatherRole].findFirst({
      where: { clerkId: referralId },  // Find parent where the fatherId is the same as the userId (Clerk ID)
    });

    if (parent) {
      //@ts-ignore
      await prisma[fatherRole].update({
        where: { clerkId: referralId},
        data: {
          balance: {
            increment: 30,
          },
        },
      });
    }
 
  
    const tribeExists = await prisma.tribe.count({
      where: {
        supervisorId: referralId,
      },
    });

    const tribeName = {referralId}

    if (tribeExists === 0) {
      // If no child with this referralId, create a Tribe for the fatherId
      const newTribe = await prisma.tribe.create({
        data: {
          name: "tribeName",
          capacity: 20,  
          supervisorId: referralId ,  // The referralId becomes the supervisor
        },
      });
    }

    const result = await createChild(childData);

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: "Child account created successfully",
          data: result.success
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: result.message || "Failed to create child account/check username",
        error: result.error 
      },
      { status: 400 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "An error occurred during registration",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}