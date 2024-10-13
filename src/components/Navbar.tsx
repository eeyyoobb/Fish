
import { Message,Announce } from "@/utils/Icons";
import Link from "next/link";
import { AvatarImg } from "./image";
import { brandname } from "./brand";
import { ModeToggle } from "./theme";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


const Navbar = async () => {


  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;


   const roleConditions: Record<string, any> = {
    creator: { tasks: { some: { creatorId: userId! } } },
    child: { children: { some: { clerkId: userId! } } },  
    parent: { childs: { some: { parentId: userId! } } }, 
  };

  const count = await prisma.announcement.count({
    where: {
      ...(role !== "admin" && {
        OR: [
          { tribeId: null },
          { tribe: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  // Fetch wallet data based on the role
  let wallet = null; // Initialize wallet variable
  if (role) {
  //@ts-ignore
    const userData = await prisma[role].findFirst({
      where: {
        wallet: {gt: 0,}
      },
    });
    wallet = userData?.wallet || null; // Assuming wallet is a field in your model
  }

  return (
    <div className="flex items-center justify-between p-4">
      {/* Brand Logo */}
      <div className="flex justify-start">
        <Link href={`/${role}`} className="flex items-center gap-2 mb-4">
          <AvatarImg src="/brandlogo.png" />
          <span className="hidden lg:block font-bold">{brandname}</span>
        </Link>
      </div>

      {/* Icons and User Info */}
      <div className="flex items-center gap-6 justify-end w-full">
        {!role ? (
          <div className="lg:flex lg:items-center lg:space-x-6">
            <Link href="/sign-in" className="text-sm">Sign in</Link>
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <Link href="/sign-up" className="text-sm">Create account</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              {/* <span className="text-xs leading-3 font-medium">{user?.firstName}</span>
              <span className="text-[10px] text-gray-500 text-right">{role}</span> */}
            </div>

            {/* Display Wallet if available */}
            {/* {wallet !== null && (  */}
              <div className="flex items-center bold ">
                <Image src="/coin.png" alt="Coin" width={25} height={25} />
                <span className="text-lg font-bold text-brand">{wallet} Bt</span>
              </div>
            {/* )} */}
         
      

        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          {Message}
        </div>

         <Link href="/income/list/announcements" className="relative">
           <div className="relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
              {Announce}
              <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full text-xs">
              {count}
              </div>
           </div>
           </Link>
        <ModeToggle />
        </>
      )}
      </div>
    </div>
  );
};

export default Navbar;
