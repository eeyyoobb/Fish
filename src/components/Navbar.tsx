
import { Message,Announce } from "@/utils/Icons";
import Link from "next/link";
import { brandname } from "./brand";
import { ModeToggle } from "./theme";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NavbarFlag} from '@/components/flag';


const Navbar = async () => {


  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;


   const roleConditions: Record<string, any> = {
    creator: { creator: { clerkId: userId! } },
    child: { tribe: { children: { some: { clerkId: userId! } } } },
    parent: { tribe: { children: { some: { fatherId: userId! } } } },
  };

  const count = await prisma.announcement.count({
    where: {
      ...(role !== "admin" && {
        OR: [
          { tribeId: null },
          roleConditions[role as keyof typeof roleConditions] || {},
        ],
      }),
    },
  });

  // Fetch wallet data based on the role
  let wallet = null;
  let balance = null;
  if (role) {
  //@ts-ignore
    const userData = await prisma[role]?.findFirst({
      where: { clerkId: userId},
    });
    
    wallet = userData?.wallet || 0;
    balance = userData?.balance || 0; 
  }

  return (
    <div className="flex items-center justify-between p-0.5 ">
      {/* Brand Logo */}
      <div className="flex justify-start">
        <Link href={`/${role}`} className="flex items-center gap-2 mb-4">
        <Image
            src="/brandlogo.png" // Your image source
            alt="Brand Logo" // Alternative text for accessibility
            width={70} // Set the appropriate width
            height={70} // Set the appropriate height
            priority // This is the key property to improve LCP
          />
          <span className="hidden lg:block font-bold brand-name">{brandname}</span>
        </Link>
      </div>

      {/* Icons and User Info */}
      <div className="flex items-center gap-6 justify-end w-full">
        {!role ? (
          <div className="lg:flex lg:items-center  lg:space-x-6">
            <Link href="/sign-in" className="text-sm ">Sign in</Link>
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            {/* <Link href="/sign-up" className="text-sm">Create account</Link> */}
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              {/* <span className="text-xs leading-3 font-medium">{user?.firstName}</span>
              <span className="text-[10px] text-gray-500 text-right">{role}</span> */}
            </div>

            {/* Display Wallet if available */}
            {wallet !== null && (  
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              {/* Desktop View */}
              <div className="hidden md:flex items-center space-x-2">
                <h1 className="text-lg font-bold text-green-700">{balance} MBT</h1>
                <Image src="/coin.png" alt="Coin" width={25} height={25} className="coin" />
                <span className="text-lg font-bold text-brand">{wallet} MBT</span>
              </div>
            
              {/* Mobile View */}
              <div className="flex md:hidden  items-center space-y-1">
                <Image src="/coin.png" alt="Coin" width={40} height={40} className="coin mb-1" />
                <div className="text-center">
                  <h1 className="text-sm font-bold text-green-700 flex">{balance } MBT</h1>
                  <h1 className="text-sm font-bold text-brand">{wallet} MBT</h1>
                </div>
              </div>
            </div>
        
              )}
          
      
          <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <NavbarFlag/>
        </div>
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
