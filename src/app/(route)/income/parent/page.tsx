import Announcements from "../components/Dashboard/Announcements";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Become from "../components/Dashboard/Become";

const ParentPage = async () => {
   const { userId } = auth();
  
  const children = await prisma.child.findMany({
    where: {
      fatherId: userId!,
    },
  });

  return (
    <div>
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="">
          <Become/>
            <div className="h-full p-4 rounded-md">
              <h1 className="text-xl font-semibold">
               
              </h1>
             
            </div>
          </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
