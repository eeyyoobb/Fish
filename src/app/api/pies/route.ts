import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Ensure the API route is not statically optimized by Next.js
export const dynamic = "force-dynamic";

// Role type for enhanced type safety
type Role = "admin" | "user" | "moderator";

export async function GET() {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);
    lastMonday.setHours(0, 0, 0, 0);

    const { userId, sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: Role })?.role;

    // Retrieve user's tribeId based on their role
    if (!role) {
      return NextResponse.json({ tribeName: '', chartData: [] });
    }

    //@ts-ignore
    const userRole = await prisma[role].findFirst({
      where: { clerkId: userId },
      select: { tribeId: true },
    });

    if (!userRole || !userRole.tribeId) {
      return NextResponse.json({ tribeName: '', chartData: [] });
    }

    const tribeId = userRole.tribeId;

    // Fetch tribe name
    const tribe = await prisma.tribe.findUnique({
      where: { id: tribeId },
      select: { name: true },
    });

    // Fetch IDs of users in the tribe once
    const childIds = await prisma.child.findMany({
      where: { tribeId },
      select: { id: true },
    });
    const childIdList = childIds.map((user) => user.id);

    // Find task completions for users within the same tribeId
    const completedTasks = await prisma.taskCompletion.findMany({
      where: {
        isCompleted: true,
        createdAt: {
          gte: lastMonday,
          lte: new Date(),
        },
        userId: {
          in: childIdList,
        },
        ...(role !== "admin" && userId ? { userId } : {}),
      },
      select: {
        createdAt: true,
      },
    });

    // Initialize counts for each day
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dailyCounts = daysOfWeek.reduce((acc, day) => {
      acc[day] = 0;
      return acc;
    }, {} as Record<string, number>);

    completedTasks.forEach((task) => {
      const date = new Date(task.createdAt);
      const dayIndex = date.getDay();
      const dayName = daysOfWeek[dayIndex === 0 ? 6 : dayIndex - 1];
      dailyCounts[dayName]++;
    });

    const chartData = daysOfWeek.map((day) => ({
      name: day,
      completed: dailyCounts[day],
    }));

    return NextResponse.json({
      tribeName: tribe?.name || "Unknown Tribe",
      chartData,
    });
  } catch (error) {
    console.error("Error fetching task completions:", error);
    return NextResponse.json(
      { error: "Failed to fetch task completions" },
      { status: 500 }
    );
  }
}
