// components/Card.tsx
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ChildIcon, ParentIcon, WalletIcon } from "@/components/Icons";
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
        },
      });
      data = userRecord?.wallet ?? "No wallet found";
    } else if (type === "parent" && role) {
      const userRecord = await prisma[role].findUnique({
        where: {
          clerkId: userId,
        },
        select: {
          fatherId: true,
        },
      });

      const fatherId = userRecord?.fatherId ?? "No father found";

      if (fatherId && fatherId !== "No father found") {
        const fatherUser = await clerkClient().users.getUser(fatherId); // Updated to clerkClient()
        data = fatherUser?.firstName ?? "No father found";
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    data = "Error loading data";
  }

  // Icon mapping based on type
  const iconMap = {
    child: <ChildIcon />,
    parent: <ParentIcon />,
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
        {type === "wallet" ? "Wallet Balance" : `${type}s`}
      </h2>
    </div>
  );
};

export default Card;
