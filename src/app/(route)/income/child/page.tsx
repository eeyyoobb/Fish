import Announcements from "../components/Components/Announcements";
 import BigCalendarContainer from "../components/Components/BigCalendarContainer";
 import BigCalendar from "../components/Components/BigCalender";
import EventCalendar from "../components/Components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  const { userId } = auth();

  // const classItem = await prisma.tribe.findMany({
  //   where: {
  //     children: { some: { id: userId! } },
  //   },
  // });

  //console.log(classItem);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full  p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
           {/* <BigCalendarContainer type="classId" id={classItem[0].id}  */}
           {/* />  */}
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
