import { NextResponse } from "next/server";
import { createChild } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    
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