import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims ,userId} = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
  
  

    // if (role !== "admin" ) {
    //   return NextResponse.json(
    //     { error: "Unauthorized access" },
    //     { status: 403 }
    //   );
    // }
    

    const { status } = await request.json();
    const { id } = params;

    if (!["APPROVED", "DECLINED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Verify task exists
    const existingTask = await prisma.taskCompletion.findUnique({
      where: { id },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    // Update task's approvalStatus based on the received status
    const updatedTask = await prisma.taskCompletion.update({
      where: { id },
      data: {
        approvalStatus: status,
      },
    });

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
