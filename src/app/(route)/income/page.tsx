import Announcements from "./components/Components/Announcements";
import EventCalendar from "./components/Components/EventCalendar";
import prisma from "@/lib/prisma";
import Tasks from "./components/Tasks/Tasks/Tasks";
import { auth } from "@clerk/nextjs/server";


const HomePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>User not authenticated</div>;
  }
  
  let tasks = [];
  
  try {
    tasks = await prisma.task.findMany({
      where: {
        completions: {
          none: {
            userId: userId, 
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
          <Tasks title="All Tasks" tasks={tasks} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        {/* <EventCalendar /> */}
        <Announcements />
      </div>
    </div>
  );
};

export default HomePage;
