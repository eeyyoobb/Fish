import prisma from "@/lib/prisma";


 const UserCard = async ({
  type,
}: {
   type: "admin" | "creator" | "child" | "parent";
 }) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    creator: prisma.creator,
    child: prisma.child,
    parent: prisma.parent,
  };

   const data = await modelMap[type].count();

  return (
    <div className=" rounded-2xl glass p-4 flex-1 min-w-[130px]">
      <div className=" glass flex justify-between items-center">
        <span className="text-[10px]  px-2 py-1 rounded-full ">
          2024/25
        </span>
        {/* <Image src="/more.png" alt="" width={20} height={20} /> */}
       </div>
       <h1 className="text-2xl font-semibold my-4">
         {data}</h1>
      <h2 className="capitalize text-sm font-medium ">
        {type}s</h2> 
    </div>
  );
};

 export default UserCard;
