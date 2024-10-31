import Announcements from "../components/Announcements";
import Withdraw from "../components/withdraw";
import Transaction from "../components/account/Transaction";
import EventCalendar from "../components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Card from "../components/card";

const ChildPage = async () => {
  const { userId } = auth();


  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full  p-4 rounded-md">
        <h1 className="text-2xl font-bold relative mb-8">
         Analytics
        <span className="absolute bottom-[-0.6rem] left-0 w-12 h-1 bg-brand rounded"></span>
      </h1>
          <div className="flex gap-4 justify-between flex-wrap">
           {/* <Card type="admin" /> */}
           <Card type="wallet"/>
           <Card type="child" />
           <Card type="parent" /> 
        </div>
        <div className="flex gap-4 flex-col lg:flex-row mt-3">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px] ">
             <Withdraw/>
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <Transaction/>
          </div>
        </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ChildPage;
