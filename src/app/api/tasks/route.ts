import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    
    const {
      description,
      ad1,
      ad2,
      ad3,
      track,
      trackmin,
      track2,
      trackmin2,
      isUnderstand,
      link,
      reward,
      duration,
      threshold,
      categoryId,
      country,

    } = await req.json();
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const role = (sessionClaims?.metadata as { role?: string })?.role;
      if (!role) {
        return NextResponse.json({ error: "Role not found in session claims" });
      }
      //@ts-ignore
      const creator = await prisma[role].findUnique({
        where: { clerkId: userId },
      });
    
      if (!creator) {
        return NextResponse.json({ error: "Creator not found" });
      } else if (creator.balance < reward) {
        return NextResponse.json({ error: "Insufficient  balance" });
      }
      //@ts-ignore
      await prisma[role].update({
        where: { clerkId: userId },
        data: { balance: creator.balance - reward },
      });


    // Validate required fields
    if (!description || !categoryId || threshold < 10) {
      return NextResponse.json({ error: "Missing required fields or invalid data", status: 400 });
    }

    // Create a new Task in the database
    const task = await prisma.task.create({
      data: {
        description,
        ad1,
        ad2,
        ad3,
        track,
        trackmin,
        track2,
        trackmin2,
        isUnderstand,
        link,
        reward,
        duration: String(duration),
        threshold,
        categoryId,
        ownerId: userId, // Set ownerId to the authenticated user's ID
        completionCount: 0,
        isCompleted: false,
        country,
      },
    });

    return NextResponse.json(task, { status: 201 }); // Return the created task with a 201 status
  } catch (error) {
    console.error("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Get the task ID from the request parameters
    const taskId = params.id;

    // Parse the JSON body of the request
    const {
      description,
      ad1,
      ad2,
      ad3,
      track,
      trackmin,
      track2,
      trackmin2,
      isUnderstand,
      link,
      reward,
      duration,
      threshold,
      categoryId,
    } = await req.json();

    // Authenticate the user
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const role = (sessionClaims?.metadata as { role?: string })?.role;
    if (!role) {
      return NextResponse.json({ error: "Role not found in session claims" });
    }

    //@ts-ignore
    const creator = await prisma[role].findUnique({
      where: { clerkId: userId },
    });

    if (!creator) {
      return NextResponse.json({ error: "Creator not found", status: 404 });
    }

    // Validate required fields
    if (!description || !categoryId || threshold < 10) {
      return NextResponse.json({ error: "Missing required fields or invalid data", status: 400 });
    }

    // Update the Task in the database
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        description,
        ad1,
        ad2,
        ad3,
        track,
        trackmin,
        track2,
        trackmin2,
        isUnderstand,
        link,
        reward,
        duration,
        threshold,
        categoryId,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 }); // Return the updated task with a 200 status
  } catch (error) {
    console.error("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
