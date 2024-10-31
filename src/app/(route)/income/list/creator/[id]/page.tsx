import prisma from "@/lib/prisma";
import Announcements from "../../../components/Announcements";
import BigCalendarContainer from "../../../components/BigCalendarContainer";
import BigCalendar from "../../../components/BigCalender";
import FormContainer from "../../../components/FormContainer";
import Performance from "../../../components/Performance";
import { auth } from "@clerk/nextjs/server";
import { Creator } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, View } from "@/components/Icons";
import { MdBloodtype, MdDateRange } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const SingleCreatorPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
   const { sessionClaims } = auth();
   const role = (sessionClaims?.metadata as { role?: string })?.role;
  //@ts-ignore
  const creator:
   |(Creator & {
        _count: { categories: number; tasks: number; tribes: number };
      })
   | null = await prisma.creator.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          categories: true,
          tasks: true,
          // tribes: true,
        },
      },
    },
  });

  if (!creator) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className=" flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="glass py-3 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 flex justify-center items-center">
              {creator.img ? (
                <Image
                    src={creator.img || "/noAvatar.png"}
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
            <div className="w-2/3 flex flex-col justify-between gap-4 z-50">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {creator.name + " " + creator.surname}
                </h1>
                 {role === "income/admin" && (
                  <> 
                  <FormContainer  table="creator" type="update" data={creator} />
                  </> 
               )} 
              </div>
              <p className="text-sm ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdBloodtype />
                  <span>{creator.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdDateRange/>
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(creator.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <IoIosMail />
                  <span>{creator.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FaPhoneAlt />
                  <span>{creator.phone || "-"}</span>
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
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="glass p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] z-100">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {creator._count.categories}
                </h1>
                <span className="text-sm text-gray-400">Branches</span>
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
                  {creator._count.tasks}
                </h1>
                <span className="text-sm text-gray-400">Tasks</span>
              </div>
            </div>
            {/* CARD */}
            <div className="glass p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                   {creator._count.tribes} 
                </h1>
                <span className="text-sm ">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="glass mt-4 rounded-md p-4 h-[800px]">
          <h1>Creator&apos;s Schedule</h1>
          <BigCalendarContainer type="creatorId" id={creator.id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="glass p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs ">
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/income/list/tribes?supervisorId=${creator.id}`}
            >
              Creator&apos;s Tribe
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/income/list/children?creatorId=${creator.id}`}
            >
              Creator&apos;s Children
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/income/list/tasks?creatorId=${creator.id}`}
            >
              Creator&apos;s tasks
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/income/list/exams?creatorId=${creator.id}`}
            >
              Creator&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/income/list/assignments?creatorId=${creator.id}`}
            >
              Creator&apos;s Assignments
            </Link> 
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleCreatorPage;
