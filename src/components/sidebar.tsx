"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "./MenuItem";
import { useAuth, useClerk, useUser } from "@clerk/nextjs"; 
import { useRouter, usePathname } from "next/navigation"; 
import { logout } from "@/utils/Icons";
import { useState, useEffect } from "react";
import { PencilIcon } from "lucide-react";
import GenerateLinkButton from './Refer';
import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';
import FishLoader from "@/components/FishLoader";

const Menu = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const role = user?.publicMetadata.role as string;
  const { signOut, openUserProfile } = useClerk(); 
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0) || user?.firstName?.charAt(1) || ''}${user?.lastName ? '' : user?.firstName?.charAt(2) || ''}`;

  const referralId = userId;

  const handleClick = () => {
    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push(`/income/${role}`); 
    }
  };

  // Local loading state
  const [loading, setLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return <FishLoader />; 
  }

  return (
    <div className="absolute sm:w-full flex md:flex-col  items-center md:p-4 glass bottom-0 md:top-0 md:static sm:mr-2 ">

      <div className="flex flex-col">
        <div className="flex md:flex-col items-center mb-4 relative md:w-full ">
         <div className="profile w-full flex flex-col items-center ">
          <div className="profile-overlay absolute inset-0 backdrop-blur-lg bg-black/20 rounded-lg"></div>
          {isSignedIn ? (
            <div className="flex  md:flex-col items-center">

              <div className="w-10 h-10 md:w-16 md:h-16 overflow-hidden rounded-full relative mb-2">
                <Image
                  width={70}
                  height={70}
                  src={user.imageUrl}
                  alt="profile"
                  className="transition-transform duration-500 rounded-full"
                />
              </div>


              {!user.firstName ? (
                <h1 className="mt-1 text-lg capitalize z-10">
                  <span className="cursor-pointer rounded-md border border-red-600 flex items-center justify-center p-2" onClick={() => openUserProfile()}>
                    <PencilIcon className="h-5 w-5 text-red-600 block lg:hidden" />
                    <span className="text-red-500 hidden lg:inline ml-2">Add Profile</span>
                  </span>
                </h1>
              ) : (
                <>
                  <h1 className="mt-1 text-lg capitalize z-10 hidden lg:block">
                    {user.firstName}
                  </h1>
                  <span className="mt-1 text-lg capitalize z-10 block lg:hidden">
                    {initials || "User"}
                  </span>
                </>
              )}

              <h1 className="mt-1 text-sm bg-brand rounded p-1 z-10 text-gray-900">{role}</h1>
            </div>
          ) : null}
        </div> 
      
      


      <div className="flex md:flex-col">
      
      <motion.button
        onClick={handleClick}
        className="border-brand px-6 py-2 rounded-md relative radial-gradient"
        initial={{ "--x": "100%" }}
        animate={{ "--x": "-100%" }}
        whileTap={{ scale: 0.97 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 3,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
        }}
      >
        <div className="flex flex-row items-center justify-center text-brand-100 brand tracking-wide font-light">
            <h1 className="flex items-center justify-center text-brand" style={{maxWidth: 50, maxHeight: 50 }}>
              <Gauge aria-hidden="true" />
            </h1>
            <h2 className="text-sm hidden md:block">Dashboard</h2>
          </div>
        <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
      </motion.button>
      </div>
      </div>

      <nav className="mt -1 md:mt-4 text-sm w-full">
        {menuItems.map((section) => (
          <div className="flex flex-row md:flex-col gap-3 flex-wrap" key={section.title}>
            <span className="hidden lg:block font-light my-4">{section.title}</span>
            {section.items.map((item) => {
              if (item.visible.includes(role)) {
                const isActive = pathname === item.href;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`group relative flex items-center justify-center lg:justify-start gap-3 py-2 md:px-2 rounded-md overflow-hidden transition-colors duration-300 ease-in-out ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}
                    style={{
                      borderRight: isActive ? '4px solid #ec8027' : 'none',
                      background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    }}
                  >

                    <span
                      className={`absolute left-0 bottom-0 h-full w-0 bg-gray-500 opacity-20 transition-all duration-500 ease-in-out group-hover:w-full`}
                    />
                    {item.icon}
                    <span className="relative z-10 hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        ))}
      </nav>
      </div>


      <div className="relative flex flex-col m-2 right-0 sm:left-0 just">
         <button
          className="flex items-center justify-center w-full py-2 rounded-md md-border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
          onClick={() => {
            signOut(() => {
              window.location.href = "/"; 
            });
          }}
        >
          <span className="mr-2">{logout}</span>
          <p className="hidden lg:block">Sign Out</p>
        </button>

        <GenerateLinkButton referralId={referralId ?? ''} /> 
      </div>
    </div>
   
  );
};

export default Menu;
