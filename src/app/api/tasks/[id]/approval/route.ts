import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { clerkClient } from '@clerk/nextjs/server'
import { toast } from "sonner";


export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    const { status } = await request.json();
    const { id } = params;

    if (!["APPROVED", "DECLINED"].includes(status)) {
      console.log("Invalid status provided");
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Verify task completion exists
    const existingTaskCompletion = await prisma.taskCompletion.findUnique({
      where: { id },
      include: { task: true },
    });
    
    if (!existingTaskCompletion) {
      console.log("Task completion not found");
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update task completion's approvalStatus
    const updatedTaskCompletion = await prisma.taskCompletion.update({
      where: { id },
      data: { approvalStatus: status },
    });

    // If status is "APPROVED", add task reward to user's balance
    if (status === "APPROVED") {
      const euserId = existingTaskCompletion.userId;
      const user = await clerkClient.users.getUser(euserId);
      const eRole = (user?.publicMetadata as { role?: string })?.role?.toLowerCase();
      
      console.log("role:", eRole);

      if (!eRole) {
        console.log("User role not found");
        return NextResponse.json({ error: "User role not found" }, { status: 400 });
      }

      try {
        let balanceUpdate;
        const reward = existingTaskCompletion.task.reward;
        
        // First, get current balance
        const currentUser = eRole === 'admin' 
          ? await prisma.admin.findUnique({ where: { clerkId: euserId } })
          : await prisma.child.findUnique({ where: { clerkId: euserId } });

        if (!currentUser) {
          console.log("User not found in database");
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const currentBalance = currentUser.balance || 0;
        const newBalance = currentBalance + reward;

        try {
          //@ts-ignore
          const balanceUpdate = await prisma[eRole].update({
            where: { clerkId: euserId },
            data: {
              balance: newBalance,
              wallet: {
                decrement: reward,
              },
            },
          });
          console.log(`Balance updated successfully for role: ${eRole}`);
        } catch (error) {
          // Handle the case where the role is invalid or the update fails
          console.error("Error updating balance:", error);
          console.error(`Invalid role for balance update: ${eRole}`);
          
          return NextResponse.json(
            { error: "Invalid role for balance update" },
            { status: 400 }
          );
        }

        console.log("Previous balance:", currentBalance);
        console.log("Reward amount:", reward);
        console.log("New balance:", newBalance);
        console.log("Balance updated successfully:", balanceUpdate);
        
        return NextResponse.json({ 
          success: true, 
          task: updatedTaskCompletion,
          balanceUpdate,
          previousBalance: currentBalance,
          reward,
          newBalance
        });

      } catch (updateError) {
        console.error("Error updating balance:", updateError);
        return NextResponse.json(
          { error: "Failed to update balance", details: updateError },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, task: updatedTaskCompletion });

  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}