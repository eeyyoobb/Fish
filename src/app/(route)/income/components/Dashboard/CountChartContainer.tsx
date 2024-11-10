import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";
import { More } from "@/components/Icons";
import { Separator } from "@radix-ui/react-dropdown-menu";

const CountChartContainer = async () => {
  const child = await prisma.child.count();
  const creator = await prisma.creator.count();
  const parent = await prisma.parent.count();

  return (
    <div className="glass rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Amount of user</h1>
        
        <More />
      </div>
      <Separator />
      {/* CHART */}
      <CountChart child={child} creator={creator} parent={parent} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{child}</h1>
          <h2 className="text-xs ">
            Childern ({Math.round((child / (child + parent)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{parent}</h1>
          <h2 className="text-xs ">
            Parents ({Math.round((parent / (child + parent)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
