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

    const { taskId } = await req.json(); // Parse request body

    // Create task completion entry and store the userId
    const taskCompletion = await prisma.taskCompletion.create({
      data: {
        taskId, // Associate the task being completed
        userId, // Save the userId directly
        completedAt: new Date(), // Track when the task was completed
      },
    });

    return NextResponse.json(taskCompletion);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}
