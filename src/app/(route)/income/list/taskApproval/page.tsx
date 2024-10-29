import FormContainer from "../../components/Components/FormContainer";
import Pagination from "../../components/Components/Pagination";
import Table from "../../components/Components/Table";
import TableSearch from "../../components/Components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { TaskCompletion, Prisma, Task,Category } from "@prisma/client";
import { Filter, Sort } from "@/components/Icons";
import { auth } from "@clerk/nextjs/server";
import TaskRowActions from "../../components/Components/approval"; // Adjust the import path if necessary

type TaskCompletionWithTask = TaskCompletion & { task: Task  &{ category: Category } };

const TaskCompletionListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Define columns based on user role
  const columns = [
    { header: "PlatformId", accessor: "info" },
    { header: "Tasks", accessor: "tasks", className: "hidden md:table-cell" },
    { header: "Progress", accessor: "phone", className: "hidden lg:table-cell" },
    { header: "Status", accessor: "address", className: "hidden lg:table-cell" },
    ...(role === "admin"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: TaskCompletionWithTask) => (
    <tr
      key={item.id}
      className="border-b border-gray-200  text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.platformUserId}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.task?.category?.name || "N/A"}</td>
      <td className="hidden md:table-cell">{item.task?.completionCount}</td>
      <td className="hidden md:table-cell">
        {item.approvalStatus === "PENDING" && "Pending"}
        {item.approvalStatus === "APPROVED" && "Approved"}
        {item.approvalStatus === "DECLINED" && "Declined"}
      </td>
      <td className="hidden md:table-cell">
        <TaskRowActions 
              id={item.id} 
              initialStatus={item.approvalStatus} 
            />
          </td>
      {role === "admin" && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="parent" type="update" data={item} />
            <FormContainer table="parent" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.TaskCompletionWhereInput = {
    ...(role === "admin"
      ? {}
      : {
          approvalStatus: "PENDING", 
          task: {
            ownerId: sessionClaims?.sub,
          },
        }),
  };
  console.log( "hii",sessionClaims?.sub)
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        if (key === "search") {
          query.task = {
            category: {
              name: {
                contains: value,
                mode: "insensitive",
              },
            },
          };
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.taskCompletion.findMany({
      where: query,
      include: { task: {include :{category:true }}},
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.taskCompletion.count({ where: query }),
  ]);

  return (
    <div className="glass p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Task Completions</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Sort />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Filter />
            </button>
            {/* {role === "admin" && <FormContainer table="parent" type="create" />} */}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TaskCompletionListPage;
