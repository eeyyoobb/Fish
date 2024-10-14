import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// IT APPEARS THAT BIG CALENDAR SHOWS THE LAST WEEK WHEN THE CURRENT DAY IS A WEEKEND.
// FOR THIS REASON WE'LL GET THE LAST WEEK AS THE REFERENCE WEEK.
// IN THE TUTORIAL WE'RE TAKING THE NEXT WEEK AS THE REFERENCE WEEK.

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  tasks: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return tasks.map((task) => {
    const taskDayOfWeek = task.start.getDay();

    const daysFromMonday = taskDayOfWeek === 0 ? 6 : taskDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      task.start.getHours(),
      task.start.getMinutes(),
      task.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      task.end.getHours(),
      task.end.getMinutes(),
      task.end.getSeconds()
    );

    return {
      title: task.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};

