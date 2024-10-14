"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "./MenuItem";
import { useClerk, UserButton, useUser } from "@clerk/nextjs"; 
import { useRouter, usePathname } from "next/navigation"; 
import { logout } from "@/utils/Icons";
import { useState } from "react";
import { dark } from '@clerk/themes'
import { PencilIcon } from "lucide-react";

const Menu = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const role = user?.publicMetadata.role as string;
  const { signOut, openUserProfile } = useClerk(); 

  const router = useRouter();
  const pathname = usePathname();

  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0) || user?.firstName?.charAt(1) || ''}${user?.lastName ? '' : user?.firstName?.charAt(2) || ''}`;




  if (!isLoaded) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 glass">
      {/* User Profile Section */}
      <div className="flex items-center mb-4 relative w-full">
        <div className="profile w-full flex flex-col items-center">
          <div className="profile-overlay absolute inset-0 backdrop-blur-lg bg-black/20 rounded-lg"></div>
          {isSignedIn ? (
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="w-16 h-16 overflow-hidden rounded-full relative mb-2">
                <Image
                  width={70}
                  height={70}
                  src={user.imageUrl}
                  alt="profile"
                  className="transition-transform duration-500 rounded-full"
                />
              </div>

              {/* Conditional First Name or Complete Profile */}
              {!user.firstName ? (
                <h1 className="mt-1 text-lg capitalize z-10">
                <span className="cursor-pointer rounded-md border border-red-600 flex items-center justify-center p-2" onClick={() => openUserProfile()}>
                  {/* Pencil Icon for Small Screens */}
                  <PencilIcon className="h-5 w-5 text-red-600 block lg:hidden" />
                  
                  {/* Text for Larger Screens */}
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

              {/* Role display */}
              <h1 className="mt-1 text-sm bg-brand rounded p-1 z-10 text-gray-900">{role}</h1>
            </div>
          ) : null}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-4 text-sm w-full">
        {menuItems.map((section) => (
          <div className="flex flex-col gap-3" key={section.title}>
            <span className="hidden lg:block font-light my-4">{section.title}</span>
            {section.items.map((item) => {
              if (item.visible.includes(role)) {
                const isActive = pathname === item.href;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`flex items-center justify-center lg:justify-start gap-3 py-2 md:px-2 rounded-md relative overflow-hidden transition-colors duration-300 ${isActive ? 'text-white' : ''}`}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      borderRight: isActive ? '4px solid #ec8027' : 'none',
                    }}
                  >
                    {item.icon}
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        ))}
      </nav>

      {/* Sign Out Button */}
      <div className="relative m-4">
        <button
          className="flex items-center justify-center w-full py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
          onClick={() => {
            signOut(() => router.push("/"));
          }}
        >
          <span className="mr-2">{logout}</span>
          <p className="hidden lg:block">Sign Out</p>
        </button>
      </div>
    </div>
  );
};

export default Menu;
