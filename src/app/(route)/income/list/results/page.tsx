import FormContainer from "../../components/FormContainer";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";

import { auth } from "@clerk/nextjs/server";
import { Filter, Sort } from "@/components/Icons";

type ResultList = {
  id: number;
  title: string;
  childName: string;
  childSurname: string;
  creatorName: string;
  creatorSurname: string;
  score: number;
  className: string;
  startTime: Date;
};


const ResultListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

const { userId, sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
const currentUserId = userId;


const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Child",
    accessor: "child",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Creator",
    accessor: "creator",
    className: "hidden md:table-cell",
  },
  {
    header: "Tribe",
    accessor: "tribe",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "creator"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:glass text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.childName + " " + item.childName}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">
      {item.creatorName + " " + item.creatorSurname}
    </td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "creator") && ( 
          <>
            <FormContainer table="result" type="update" data={item} />
            <FormContainer table="result" type="delete" id={item.id} />
          </>
         )} 
      </div>
    </td>
  </tr>
);

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "childId":
            query.childId = value;
            break;
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { child: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }


  switch (role) {
    case "admin":
      break;
    // case "creator":
    //   query.OR = [
    //     { exam: { task: { creatorId: currentUserId! } } },
    //     { assignment: { task: { creatorId: currentUserId! } } },
    //   ];
    //   break;

    case "child":
      query.childId = currentUserId!;
      break;

    case "parent":
      query.child = {
        parentId: currentUserId!,
      };
      break;
    default:
      break;
  }

  // const [dataRes, count] = await prisma.$transaction([
  //   prisma.result.findMany({
  //     where: query,
  //     include: {
  //       child: { select: { name: true, surname: true } },
  //       exam: {
  //         include: {
  //           task: {
  //             select: {
  //               tribe: { select: { name: true } },
  //               creator: { select: { name: true, surname: true } },
  //             },
  //           },
  //         },
  //       },
  //       assignment: {
  //         include: {
  //           task: {
  //             select: {
  //               tribe: { select: { name: true } },
  //               creator: { select: { name: true, surname: true } },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     take: ITEM_PER_PAGE,
  //     skip: ITEM_PER_PAGE * (p - 1),
  //   }),
  //   prisma.result.count({ where: query }),
  // ]);

  // const data = dataRes.map((item) => {
  //   const assessment = item.exam || item.assignment;

  //   if (!assessment) return null;

  //   const isExam = "startTime" in assessment;

  //   return {
  //     id: item.id,
  //     title: assessment.title,
  //     childName: item.child.name,
  //     childSurname: item.child.surname,
  //     creatorName: assessment.task.creator.name,
  //     creatorSurname: assessment.task.creator.surname,
  //     score: item.score,
  //     className: assessment.task.tribe.name,
  //     startTime: isExam ? assessment.startTime : assessment.startDate,
  //   };
  // });

  return (
    <div className="glass p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mayacard">
              <Filter/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mayacard">
              <Sort/>
            </button>
             {(role === "school/admin" || role === "school/creator") && ( 
              <FormContainer table="result" type="create" />
            )} 
          </div>
        </div>
      </div>
      {/* LIST */}
      {/* <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} /> */}
    </div>
  );
};

export default ResultListPage;
