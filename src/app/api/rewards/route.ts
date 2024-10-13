import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { taskId, code, childId } = await req.json();

    // Fetch the task based on the provided taskId
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.code !== code) {
      return NextResponse.json(
        { error: 'Invalid task or verification code' },
        { status: 400 }
      );
    }

    // Check if the child has already completed the task
    const taskCompletion = await prisma.taskCompletion.findUnique({
      where: {
        taskId_childId: { // unique constraint based on taskId and childId
          taskId,
          childId,
        },
      },
    });

    if (taskCompletion?.isCompleted) {
      return NextResponse.json(
        { error: 'Task has already been completed by this child.' },
        { status: 400 }
      );
    }

    // Update the wallet of the child who is assigned the task
    await prisma.child.update({
      where: { id: childId }, // Use childId to update the child's wallet
      data: {
        wallet: {
          increment: task.reward || 0, // Increment the wallet with the reward value
        },
      },
    });

    // Mark task as completed for the specific child
    await prisma.taskCompletion.upsert({
      where: {
        taskId_childId: {
          taskId,
          childId,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        taskId,
        childId,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Task completed and wallet updated!' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error completing task.' },
      { status: 500 }
    );
  }
}
