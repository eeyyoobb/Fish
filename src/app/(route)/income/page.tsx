import Announcements from "./components/Announcements";
import EventCalendar from "./components/EventCalendar";
import prisma from "@/lib/prisma";
import Tasks from "./components/Tasks/Tasks";
import { auth } from "@clerk/nextjs/server";


const HomePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>User not authenticated</div>;
  }
  
  let tasks = [];

  try {
    // Fetch 3 tasks from the "YouTube" category
    const youtubeTasks = await prisma.task.findMany({
      where: {
        completions: {
          none: {
            userId: userId, 
          },
        },
        category: {
          name: "youtube",
        },
      },
      include: {
        completions: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      take: 3,
    });
  
    // Fetch 2 tasks from other categories
    const otherCategoryTasks = await prisma.task.findMany({
      where: {
        completions: {
          none: {
            userId: userId, 
          },
        },
        category: {
          name: {
            not: "youtube",
          },
        },
      },
      include: {
        completions: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      take: 2,
    });
  
    // Combine the two arrays of tasks
    tasks = [...youtubeTasks, ...otherCategoryTasks];
    
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
          <Tasks title="All Tasks" tasks={tasks} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8 -z-10">
        {/* <EventCalendar /> */}
        <Announcements />
        <div className="pool-ball">
          <div className="pool-number" id="poolNumber">9</div>
       </div>
      </div>
    </div>
  );
};

export default HomePage;
