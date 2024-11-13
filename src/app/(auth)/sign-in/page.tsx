"use client";
import React, { useEffect, useState } from 'react';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { AvatarImg } from '../../../components/image';
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {brandname } from "@/components/brand"

export default function SignInPage() {
    const { user } = useUser();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const role = user?.publicMetadata?.role;
      
        if (role) {
          // If role is 'admin', redirect to '/admin', otherwise to '/income/[role]'
          const path = role === "admin" ? "/admin" : `/income`;
          router.push(path);
        }
      }, [user, router]);

    const handleClose = () => {
        setIsModalOpen(false); 
    };

    if (!isModalOpen) {
        return null; 
    }
   
    

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };


    return (
         <div className="grid w-full flex-grow items-center px-4 sm:justify-center">
            <SignIn.Root>
                <SignIn.Step
                    name="start"
                    className="w-full space-y-6 rounded-2xl glass px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
                >  
                    <header className="text-center flex flex-col items-center ">
                        <AvatarImg src={"/brandlogo.png"} />
                        <h1 className="mt-4 text-xl font-medium tracking-tight">
                            Sign in {brandname} 
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-red-400" />
                    <div className="space-y-4">
                        <Clerk.Field name="identifier" className="space-y-2">
                            <Clerk.Label className="text-sm font-medium ">Username</Clerk.Label>
                            <Clerk.Input
                                type="text"
                                required
                                className="w-full rounded-md glass px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                            <Clerk.FieldError className="block text-sm text-red-400" />
                        </Clerk.Field>
                        <Clerk.Field name="password" className="space-y-2">
                            <Clerk.Label className="text-sm font-medium">Password</Clerk.Label>
                                <div className="relative">
                                    <Clerk.Input
                                    type={isPasswordVisible ? "text" : "password"}
                                    required
                                    className="w-full rounded-md glass px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                                    />
                                    <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                    >
                                    {isPasswordVisible ? (
                                        <EyeOffIcon className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                    </div>
                                </div>
                                <Clerk.FieldError className="block text-sm text-red-400" />
                            </Clerk.Field>
                    </div>
                    <SignIn.Action
                        submit
                        className="w-full rounded-md bg-mayacard px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                    >
                        Sign In
                    </SignIn.Action>
                    <div className="space-y-2">
                        <Clerk.Connection
                            name="google"
                            className="flex w-full items-center justify-center gap-x-3 rounded-md bg-neutral-700 px-3.5 py-1.5 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/2%)_inset] outline-none hover:bg-gradient-to-b hover:from-white/5 hover:to-white/5 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-b active:from-black/20 active:to-black/20 active:text-white/70"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 16"
                                className="w-4"
                                aria-hidden
                            >
                                <path
                                    fill="currentColor"
                                    d="M8.82 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.998.96 11.256 0 8.82 0 4.41 0 .705 3.591.705 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.82Z"
                                />
                            </svg>
                            Login with Google
                        </Clerk.Connection>
                    </div>
                    {/* <SignIn.Action 
                        navigate="forgot-password" 
                        className="font-medium decoration-zinc-950/20 underline-offset-4 outline-none hover:text-orange-500 hover:underline focus-visible:underline"
                    >
                        Forgot password?
                    </SignIn.Action> */}
                    {/* <p className="text-center text-sm ">
                        No account?{' '}
                        <a
                            href="sign-up"
                            className="font-medium decoration-zinc-950/20 underline-offset-4 outline-none hover:text-orange-700 hover:underline focus-visible:underline"
                        >
                            Create an account
                        </a>
                    </p> */}
                </SignIn.Step>
                
                {/* Correcting forgot password step */}
                <SignIn.Step name="forgot-password">
                    <Clerk.Field name="identifier">
                        <Clerk.Label>Email</Clerk.Label>
                        <Clerk.Input />
                        <Clerk.FieldError />
                    </Clerk.Field>
                    <SignIn.Action submit>Send Reset Link</SignIn.Action>
                    <SignIn.Action navigate="start" className="font-medium decoration-zinc-950/20 underline-offset-4 outline-none hover:text-orange-500 hover:underline focus-visible:underline">
                        Back to Sign In
                    </SignIn.Action>
                </SignIn.Step>
                
                {/* Reset Password Step */}
                <SignIn.Step name="reset-password">
                    <Clerk.Field name="password">
                        <Clerk.Label>New password</Clerk.Label>
                        <Clerk.Input />
                        <Clerk.FieldError />
                    </Clerk.Field>
                    <Clerk.Field name="confirmPassword">
                        <Clerk.Label>Confirm password</Clerk.Label>
                        <Clerk.Input />
                        <Clerk.FieldError />
                    </Clerk.Field>
                    <SignIn.Action submit>Update password</SignIn.Action>
                </SignIn.Step>
                
                {/* Verification Step for Email Code */}
                <SignIn.Strategy name="email_code">
                    <Clerk.Field name="code">
                        <Clerk.Label>Code</Clerk.Label>
                        <Clerk.Input />
                        <Clerk.FieldError />
                    </Clerk.Field>
                    <SignIn.Action submit>Verify</SignIn.Action>
                    <SignIn.Action
                        resend
                        fallback={({ resendableAfter }) => <p>Resend code in {resendableAfter} second(s)</p>}
                    >
                        Resend code
                    </SignIn.Action>
                </SignIn.Strategy>
            </SignIn.Root>
     </div>
    );
}
