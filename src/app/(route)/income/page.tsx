import Announcements from "./components/Announcements";
import EventCalendar from "./components/EventCalendar";
import prisma from "@/lib/prisma";
import Tasks from "./components/Tasks/Tasks/Tasks";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const StudentPage = async () => {
  // Fetching user ID on the server-side using Clerk
  const { userId } = auth();

  if (!userId) {
    return <div>User not authenticated</div>;
  }
  
  let tasks = [];
  
  try {
    tasks = await prisma.task.findMany({
      where: {
        // Fetch tasks that don't have a completion record for the current user
        completions: {
          none: {
            userId: userId, // Check if there's no task completion for this user
          },
        },
      },
      include: {
        completions: true, // Include completion records with tasks
      },
    });
  } catch (error) {
    console.error("ERROR GETTING TASKS: ", error);
    return <div>Error fetching tasks</div>;
  }
  

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row min-h-screen">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        <div className="relative flex-grow glass p-4 rounded-md min-h-full">
          <h1 className="text-xl font-semibold">Daily Task (4A)</h1>
          {/* Pass tasks fetched from the server to the Tasks component */}
          <Tasks title="All Tasks" tasks={tasks} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
