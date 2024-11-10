import { addDays } from "date-fns";
import prisma from "./prisma";
import { auth } from "@clerk/nextjs/server";

export async function setupCronJobs() {

  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  // Run every hour to check for tasks that need auto-approval
  setInterval(async () => {
    try {
      const twoDaysAgo = addDays(new Date(), -2);
      
      const pendingCompletions = await prisma.taskCompletion.findMany({
        where: {
          approvalStatus: "PENDING",
          createdAt: {
            lte: twoDaysAgo,
          },
        },
        include: {
          task: true,
        },
      });

      for (const completion of pendingCompletions) {
        await prisma.$transaction(async (tx) => {
          // Update task completion status
          await tx.taskCompletion.update({
            where: { id: completion.id },
            data: { approvalStatus: "APPROVED" },
          });

          //@ts-ignore
          await tx[role].update({
            where: { clerkId: completion.platformUserId },
            data: {
              balance: {
                increment: completion.task.reward,
              },
            },
          });
        });
      }
    } catch (error) {
      console.error("Error in auto-approval cron job:", error);
    }
  }, 60 * 60 * 1000); // Run every hour
}