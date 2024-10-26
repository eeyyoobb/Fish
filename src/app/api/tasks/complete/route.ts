import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { taskId, reward, isCompleted, platformUserId } = await req.json();
    
    if (!taskId || reward === undefined || isCompleted === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const taskCompletion = await prisma.taskCompletion.create({
      data: {
        taskId,
        userId,
        isCompleted,
        platformUserId,
      },
    });

    if (isCompleted) {
      const completionCount = await prisma.taskCompletion.count({
        where: {
          taskId,
          isCompleted: true,
        },
      });

      const task = await prisma.task.findUnique({
        where: { id: taskId },
        select: { threshold: true },
      });
      
      if (completionCount >= (task?.threshold || 10)) {
        await prisma.task.update({
          where: { id: taskId },
          data: { isCompleted: true },
        });
      }

      // Only add reward if task was completed successfully
      await addRewardToUserWallet(userId, reward);
    }

    return NextResponse.json({ 
      message: isCompleted ? "Task completed and reward claimed!" : "Task marked as failed", 
      taskCompletion 
    });
  } catch (error) {
    console.error("ERROR PROCESSING TASK: ", error);
    return NextResponse.json({ error: "Error processing task" }, { status: 500 });
  }
}

// Function to add reward to the user's wallet based on their role
async function addRewardToUserWallet(userId: string, reward: number) {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    if (!role) {
      throw new Error("User role not found");
    }

    // Update the wallet based on the user role
    //@ts-ignore
    await prisma[role].update({
      where: { clerkId: userId }, // Match by Clerk ID or relevant identifier
      data: {
        wallet: {
          increment: reward, // Increment wallet balance by the reward amount
        },
      },
    });
  } catch (error) {
    console.error("ERROR UPDATING WALLET: ", error);
    throw new Error("Error updating wallet");
  }
}
