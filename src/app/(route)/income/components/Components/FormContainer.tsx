import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "creator"
    | "child"
    | "parent"
    | "category"
    | "tribe"
    | "task"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete"|"view";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "category":
        const categoryTeachers = await prisma.creator.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { creators: categoryTeachers };
        break;
      case "tribe":
        const tribeGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const tribeTeachers = await prisma.creator.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { creators: tribeTeachers, grades: tribeGrades };
        break;
      case "creator":
        const creatorSubjects = await prisma.category.findMany({
          select: { id: true, name: true },
        });
        relatedData = { categorys: creatorSubjects };
        break;
      case "child":
        const childGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const childTribes = await prisma.tribe.findMany({
          include: { _count: { select: { children: true } } },
        });
        relatedData = { tribes: childTribes, grades: childGrades };
        break;
      // case "exam":
      //   const examTasks = await prisma.task.findMany({
      //     where: {
      //       ...(role === "creator" ? { creatorId: currentUserId! } : {}),
      //     },
      //     select: { id: true, name: true },
      //   });
      //   relatedData = { tasks: examTasks };
      //   break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
