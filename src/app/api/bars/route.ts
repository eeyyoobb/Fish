import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Prevent static optimization for the route
export const dynamic = "force-dynamic";

// Role type definition for better type safety
type Role = "admin" | "user" | "moderator";

export async function GET() {
  try {
    // Calculate last Monday's date
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);
    lastMonday.setHours(0, 0, 0, 0);

    // Get user details and role
    const { userId, sessionClaims } = auth();
    const role = (sessionClaims?.metadata as { role?: Role })?.role;

    // Fetch completed tasks for the week, filtered by user if not an admin
    const completedTasks = await prisma.taskCompletion.findMany({
      where: {
        isCompleted: true,
        createdAt: {
          gte: lastMonday,
          lte: new Date(),
        },
        ...(role !== "admin" && userId ? { userId } : {}),
      },
      select: {
        createdAt: true,
      },
    });

    // Define days of the week
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dailyCounts = daysOfWeek.reduce((acc, day) => {
      acc[day] = 0;
      return acc;
    }, {} as Record<string, number>);

    // Count task completions per day
    completedTasks.forEach((task) => {
      const date = new Date(task.createdAt);
      const dayIndex = date.getDay();
      const dayName = daysOfWeek[dayIndex === 0 ? 6 : dayIndex - 1];
      dailyCounts[dayName]++;
    });

    // Format the chart data
    const chartData = daysOfWeek.map((day) => ({
      name: day,
      completed: dailyCounts[day],
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching task completions:", error);
    return NextResponse.json(
      { error: "Failed to fetch task completions" },
      { status: 500 }
    );
  }
}
