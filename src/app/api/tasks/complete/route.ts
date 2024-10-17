import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// API route to handle task completion
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Get userId from Clerk

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { taskId, reward ,isCompleted} = await req.json(); // Parse request body

    // Create task completion entry and store the userId
    const taskCompletion = await prisma.taskCompletion.create({
      data: {
        taskId, // Associate the task being completed
        userId, // Save the userId directly
        isCompleted,
        completedAt: new Date(), // Track when the task was completed
      },
    });

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

    // Update user wallet based on role
    await addRewardToUserWallet(userId, reward); // Call to update the user's wallet

    return NextResponse.json({ message: "Task completed and reward claimed!", taskCompletion });
  } catch (error) {
    console.error("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
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
