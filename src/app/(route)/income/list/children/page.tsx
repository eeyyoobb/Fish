import { MdFilterList, MdOutlineSort, MdOutlineAddCircleOutline } from "react-icons/md";
import FormContainer from "../../components/Components/FormContainer";
import Pagination from "../../components/Components/Pagination";
import Table from "../../components/Components/Table";
import TableSearch from "../../components/Components/TableSearch";
import { Avatar, Delete, View } from "@/components/Icons";
import { AvatarImg } from "@/components/image";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Tribe, Prisma, Child } from "@prisma/client";
import Link from "next/link";

import { auth } from "@clerk/nextjs/server";

// Role fetched from session claims
const { sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role || "";

type ChildList = Child & { tribe: Tribe };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "child ID",
    accessor: "childId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
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

const renderRow = (item: ChildList) => (
  <tr key={item.id} className="border-b even:glass text-sm">
    <td className="flex items-center gap-4 p-4">
      {item.img ? (
        <AvatarImg src={item.img || "/noAvatar.png"} />
      ) : (
        <Avatar />
      )}
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs">{item.tribe.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">
      {Array.isArray(item.tribe.name) ? item.tribe.name[0] : item.tribe.name}
    </td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/income/list/children/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <View />
          </button>
        </Link>
        {role === "admin" && (
          <>
            {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <Delete />
             </button> */}
            <FormContainer table="creator" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ChildListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role || "";

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.ChildWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "creatorId":
            query.tribe = {
              tasks: {
                some: {
                  creatorId: value,
                },
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.child.findMany({
      where: query,
      include: {
        tribe: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.child.count({ where: query }),
  ]);

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Children</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <MdFilterList />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <MdOutlineSort />
            </button>
            {role === "admin" && (
              <FormContainer table="child" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ChildListPage;
