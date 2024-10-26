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

    // Create the task completion record
    const taskCompletion = await prisma.taskCompletion.create({
      data: {
        taskId,
        userId,
        isCompleted,
        platformUserId,
      },
    });

    // Find the task and update completion count
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (task) {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          completionCount: {
            increment: 1, 
          },
          isCompleted: task.completionCount + 1 >= task.threshold,
        },
      });

      // If the task is completed, check the count and possibly add reward
      if (updatedTask.isCompleted) {
        const completionCount = await prisma.taskCompletion.count({
          where: {
            taskId,
            isCompleted: true,
          },
        });
        
        if (completionCount >= task.threshold) {
          // Only add reward if the threshold is reached
          await addRewardToUserWallet(userId, reward);
        }
      }

      return NextResponse.json({ 
        message: updatedTask.isCompleted ? "Task completed and reward claimed!" : "Task marked as failed", 
        taskCompletion 
      });
    }

    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  } catch (error) {
    console.error("ERROR PROCESSING TASK: ", error);
    return NextResponse.json({ error: "Error processing task" }, { status: 500 });
  }
}

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
