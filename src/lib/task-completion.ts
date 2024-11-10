import prisma from "@/lib/prisma";
import { TaskCompletion, ApprovalStatus } from "@/types/task";

export async function getTaskCompletion(id: string): Promise<TaskCompletion | null> {
  try {
    const completion = await prisma.taskCompletion.findUnique({
      where: { id },
    });
    return completion;
  } catch (error) {
    console.error("Error fetching task completion:", error);
    return null;
  }
}

export async function updateTaskCompletionStatus(
  id: string,
  status: ApprovalStatus
): Promise<TaskCompletion | null> {
  try {
    return await prisma.taskCompletion.update({
      where: { id },
      data: { approvalStatus: status },
    });
  } catch (error) {
    console.error("Error updating task completion:", error);
    return null;
  }
}