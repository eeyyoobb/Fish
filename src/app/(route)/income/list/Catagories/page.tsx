
import FormContainer from "../../components/Components/FormContainer";
import Pagination from "../../components/Components/Pagination";
import Table from "../../components/Components/Table";
import TableSearch from "../../components/Components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Category, Creator ,CategoryCreator} from "@prisma/client";
import Image from "next/image";
import {Filter,Sort } from "@/components/Icons";
import { auth } from "@clerk/nextjs/server";

type CategoryList = Category & {
  creators: (CategoryCreator & {
    creator: Creator; 
  })[];
};

const CategoryListPage = async ({
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
      header: "Creators",
      accessor: "creators",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: CategoryList) => (
    <tr
      key={item.id}
      className="border-b  even:bg-glass text-sm hover:bg-maya"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
      {item.creators?.length > 0 ? (
            item.creators.map((categoryCreator) => categoryCreator.creator.name).join(", ")
          ) : (
            <span>No creators</span>
         )}
      </td>
      <td>
        <div className="flex items-center gap-2">
           {role === "admin" && (
            <> 
              <FormContainer table="category" type="update" data={item} />
              <FormContainer table="category" type="delete" id={item.id} />
            </>
           )} 
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.CategoryWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
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
    prisma.category.findMany({
      where: query, // Ensure this is defined properly
      include: {
        Creators: {
          include: {
            Creator: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.category.count({ where: query }),
  ]);

  return (
    <div className="glass p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Categorys</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Filter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Sort/>
            </button>
            {role === "admin" && ( 
              <FormContainer table="category" type="create" />
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

export default CategoryListPage;
