import { Avatar, Calendar } from "@/components/Icons";
import Announcements from "../../../components/Components/Announcements";
import BigCalendarContainer from "../../../components/Components/BigCalendarContainer";
import FormContainer from "../../../components/Components/FormContainer";
import Performance from "../../../components/Components/Performance";
import ChildAttendanceCard from "../../../components/Components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Tribe, Child } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MdBloodtype, MdMail } from "react-icons/md";
import { Phone } from "lucide-react";

const SingleChildPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const child:
    | (Child & {
        tribe: Tribe & { _count: { tasks: number } };
      })
    | null = await prisma.child.findUnique({
    where: { id },
    include: {
      tribe: { include: { _count: { select: { tasks: true } } } },
    },
  });

  if (!child) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="glass py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 flex justify-center items-center">
            {child.img ? (
              <Image
                src={child.img ||"/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            ):(
              <div style={{ transform: 'scale(3)', display: 'inline-block' }}>
                 <Avatar/>
              </div>
              )}
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {child.name + " " + child.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="child" type="update" data={child} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdBloodtype/>
                  <span>{child.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Calendar/>
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(child.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  < MdMail/>
                  <span>{child.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Phone/>
                  <span>{child.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="glass p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <Suspense fallback="loading...">
                <ChildAttendanceCard id={child.id} />
              </Suspense>
            </div>
            {/* CARD */}
            <div className="glass p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {child.tribe.name.charAt(0)}th
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* CARD */}
            <div className="glass p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {child.tribe._count.tasks}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="glass p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleTribe.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{child.tribe.name}</h1>
                <span className="text-sm text-gray-400">Tribe</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 glass rounded-md p-4 h-[800px]">
          <h1>Child&apos;s Schedule</h1>
          {/* <BigCalendarContainer type="tribeId" id={child.tribe.id} /> */}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="glass p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/school/list/tasks?tribeId=${child.tribe.id}`}
            >
              Child&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/school/list/teachers?tribeId=${child.tribe.id}`}
            >
              Child&apos;s Teachers
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/school/list/exams?tribeId=${child.tribe.id}`}
            >
              Child&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/school/list/assignments?tribeId=${child.tribe.id}`}
            >
              Child&apos;s Assignments
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/school/list/results?childId=${child.id}`}
            >
              Child&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleChildPage;
