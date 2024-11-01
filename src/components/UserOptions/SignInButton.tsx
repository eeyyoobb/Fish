"use client";

import { signIn } from "next-auth/react";
import { CircleUserRound } from 'lucide-react';

const SignInButton = () => {
  return (
    <button
      className="flex flex-row gap-1 items-center border-[1px] border-slate-700 rounded-full overflow-hidden px-3 py-1.5 text-blue-400 cursor-pointer"
      onClick={() => signIn("google")}
    >
      <CircleUserRound className="h-6 w-6" />
      Sign In
    </button>
  );
};

export default SignInButton;
