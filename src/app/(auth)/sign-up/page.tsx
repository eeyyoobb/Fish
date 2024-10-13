'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { AvatarImg } from '../../../components/image';

export default function SignUpPage() {


  return (
    <div className="grid w-full flex-grow items px-4 sm:justify-center">
      <SignUp.Root>
        <SignUp.Step
          name="start"
          className="w-full space-y-6 rounded-2xl glass px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="text-center flex flex-col">
          <AvatarImg src={"/brandlogo.png"} />
            <h1 className="mt-4 text-xl font-medium tracking-tight ">
              Create an account
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="emailAddress" className="space-y-2">
              <Clerk.Label className="text-sm font-medium ">Email</Clerk.Label>
              <Clerk.Input
                type="email"
                required
                className="w-full rounded-md glass px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm font-medium ">Password</Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md glass px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignUp.Action
            submit
            className="w-full rounded-md bg-mayacard px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
          >
            Sign Up
          </SignUp.Action>

          <p className="text-center text-sm ">
            Already have an account?{' '}
            <a
              href="sign-in"
              className="font-medium  decoration-zinc-950/20 underline-offset-4 outline-none hover:text-orange-500 hover:underline focus-visible:underline"
            >
              Sign in
            </a>
          </p>
        </SignUp.Step>
        <SignUp.Step
          name="verifications"
          className="w-full space-y-6 rounded-2xl glass px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="text-center">
           
            <h1 className="mt-4 text-xl font-medium tracking-tight ">
              Verify email code
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <SignUp.Strategy name="email_code">
            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="text-sm font-medium ">Email code</Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                className="w-full rounded-md glass px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <SignUp.Action
              submit
              className="w-full rounded-md bg-mayacard px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
            >
              Verify
            </SignUp.Action>
          </SignUp.Strategy>
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <a
              href="#"
              className="font-medium  decoration-zinc-950/20 underline-offset-4 outline-none hover:bg-orange-600 hover:underline focus-visible:underline"
            >
              Sign in
            </a>
          </p>
        </SignUp.Step>
        <SignUp.Step
          name="continue"
          className="w-full space-y-6 rounded-2xl glass px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="text-center">
          <AvatarImg src={"/brandlogo.png"} />
            <h1 className="mt-4 text-xl font-medium tracking-tight ">
              Continue registration
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <Clerk.Field name="username" className="space-y-2">
            <Clerk.Label className="text-sm font-medium ">Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full rounded-md glass px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <SignUp.Action
            submit
            className="w-full rounded-md bg-mayacard px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
          >
            Continue
          </SignUp.Action>
          <p className="text-center text-sm ">
            Already have an account?{' '}
            <a
              href="sign-in"
              className="font-medium  decoration-zinc-950/20 underline-offset-4 outline-none hover:text-orange-700 hover:underline focus-visible:underline"
            >
              Sign in
            </a>
          </p>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  )
}