import FormContainer from "../../components/FormContainer";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";
import { Tribe, Prisma, Category, Creator } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Avatar, View ,Filter,Sort} from "@/components/Icons";
import { auth } from "@clerk/nextjs/server";

type CreatorList = Creator & { categories: Category[] } & { tribes: Tribe[] };

const CreatorListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Creator ID", accessor: "creatorId", className: "hidden md:table-cell" },
  { header: "Categories", accessor: "categories", className: "hidden md:table-cell" },
  { header: "Tribes", accessor: "tribes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
];

const renderRow = (item: CreatorList) => (
  <tr key={item.id} className="border-b border-gray-200 even:glass text-sm hover:bg-mayacard z-10">
    <td className="flex items-center gap-4 p-4">
      {item.img ? (
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <Avatar />
      )}
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">
      {item.categories.map((category) => category.name).join(", ")}
    </td>
    {/* <td className="hidden md:table-cell">
      {item.tribes.map((tribes) => tribes.name).join(", ")}
    </td> */}
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/income/list/creator/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <View />
          </button>
        </Link>
        {role === "admin" && ( 
          <>
            <FormContainer table="creator" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);


  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.CreatorWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          // case "tribeId":
          //   query.tasks = {
          //     some: {
          //       tribeId: `${parseInt(value)}`,
          //     },
          //   };
          //   break;
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
    prisma.creator.findMany({
      where: query,
      include: {
        categories: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.creator.count({ where: query }),
  ]);

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Creators</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <Filter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <Sort />
            </button>
            <FormContainer table="creator" type="create" />
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default CreatorListPage;
