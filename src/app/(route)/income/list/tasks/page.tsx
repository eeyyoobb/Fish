import FormContainer from "../../components/FormContainer";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Tribe, Task, Prisma, Category, Creator } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { Filter, Sort } from "@/components/Icons";

type TaskList = Task & { category: Category } & { tribe: Tribe } & {
  creator: Creator;
};


const TaskListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

const { sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;


const columns = [
  {
    header: "Category Name",
    accessor: "name",
  },
  {
    header: "Tribe",
    accessor: "tribe",
  },
  {
    header: "Creator",
    accessor: "creator",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const renderRow = (item: TaskList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.category.name}</td>
    <td>{item.tribe.name}</td>
    <td className="hidden md:table-cell">
      {item.creator.name + " " + item.creator.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer table="task" type="update" data={item} />
            <FormContainer table="task" type="delete" id={item.id} />
          </>
         )} 
      </div>
    </td>
  </tr>
);

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.TaskWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "tribeId":
            query.tribeId = value;
            break;
          case "creatorId":
            query.creatorId = value;
            break;
          case "search":
            query.OR = [
              { category: { name: { contains: value, mode: "insensitive" } } },
              { creator: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  // const [data, count] = await prisma.$transaction([
  //   prisma.task.findMany({
  //     where: query,
  //     include: {
  //       category: { select: { name: true } },
  //       tribe: { select: { name: true } },
  //       creator: { select: { name: true, surname: true } },
  //     },
  //     take: ITEM_PER_PAGE,
  //     skip: ITEM_PER_PAGE * (p - 1)
  //   }),
  //   prisma.task.count({ where: query }),
  // ]);

  return (
    <div className="glass p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Tasks</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Filter/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Sort/>
            </button>
             {role === "admin" &&  
            <FormContainer table="task" type="create" />
           } 
          </div>
        </div>
      </div>
      {/* <Table columns={columns} renderRow={renderRow} data={data} /> */}
      {/* <Pagination page={p} count={count} /> */}
    </div>
  );
};

export default TaskListPage;
