// components/Card.tsx
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { UsersIcon, Parent, WalletIcon} from "@/components/Icons";
import { clerkClient } from "@clerk/nextjs/server"; // Import clerkClient for server-side

const Card = async ({ type }: { type: "child" | "parent" | "wallet" }) => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  let data: string | number = "No data found";

  try {
    if (type === "child" && role) {
      // Count children associated with the current user (fatherId)
      data = await prisma.child.count({
        where: {
          //@ts-ignore
          fatherId: userId,
        },
      });
    } else if (type === "wallet" && role) {
      //@ts-ignore
      const userRecord = await prisma[role].findUnique({
        where: {
          clerkId: userId,
        },
        select: {
          wallet: true,
          balance: true,

        },
      });

      data = userRecord?.balance ?? "No wallet found";
    } else if (type === "parent" && role) {
      //@ts-ignore
      const userRecord = await prisma[role].findUnique({
        where: {
          clerkId: userId,
        },
        select: {
          fatherId: true,
          tribeId:true,
        },
      });

      let father = "No father found";
      let tribeName = "No tribe found";
  
      const fatherId = userRecord?.fatherId;
      const tribeId = userRecord?.tribeId;
  
      // Fetch father's first name if fatherId exists
      if (fatherId) {
        const fatherUser = await clerkClient().users.getUser(fatherId);
        father = fatherUser?.firstName ?? "No father found";
      }
  
      // Fetch tribe name if tribeId exists
      if (tribeId) {
        const tribeRecord = await prisma.tribe.findUnique({
          where: { id: tribeId },
          select: { name: true },
        });
        tribeName = tribeRecord?.name ?? "No tribe found";
      }
  
      // Concatenate father name and tribe name
      data = `${father}, ${tribeName}`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    data = "Error loading data";
  }

  const iconMap = {
    child: <UsersIcon />,
    parent: <Parent />,
    wallet: <WalletIcon />,
  };

  return (
    <div className="rounded-2xl glass p-4 flex-1 min-w-[130px]">
      <div className="glass flex justify-between items-center">
        <span className="text-[10px] px-2 py-1 rounded-full">
          {new Date().toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center space-x-2 my-4">
        {iconMap[type]}
        <h1 className="text-2xl font-semibold">{data}</h1>
      </div>
      <h2 className="capitalize text-sm font-medium ">
        {type === "wallet" ? "Balance" : `${type}s`}
      </h2>
    </div>
  );
};

export default Card;
