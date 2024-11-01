import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "creatorId" | "tribeId";
  id: string;
}) => {
  const dataRes = await prisma.task.findMany({
    // where: {
    //   ...(type === "creatorId"
    //     ? { creatorId: id }
    //     : { tribeId: id }),
        
    // },
  });

  // Assuming the tasks have fields like 'name', 'startTime', and 'endTime'
  const data = dataRes.map((task) => ({
    // title: task.title,
    // start: task.startTime,
    // end: task.endTime,
  }));

  // const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div>
      <BigCalendar /*data={schedule} *//>
    </div>
  );
};

export default BigCalendarContainer;
