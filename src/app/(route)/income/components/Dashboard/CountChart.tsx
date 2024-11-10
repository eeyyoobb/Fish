"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import {Woman, Man } from "@/components/Icons";

const CountChart = ({ child, parent, creator }: { child: number; parent: number; creator: number }) => {
  const data = [
    {
      name: "Total",
      count: child + parent + creator,
      fill: "#5A2A27", // Updated fill color
    },
    {
      name: "Parent",
      count: parent,
      fill: "#8D5B4C", // Updated fill color
    },
    {
      name: "Children",
      count: child,
      fill: "#5C4742", // Updated fill color
    },
    {
      name: "Creators",
      count: creator,
      fill: "#A5978B", // Updated fill color for creator
    },
  ];

  return (
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="100%"
          barSize={32}
          data={data}
          // style={{ backgroundColor: 'transparent' }}
          
        >
          <RadialBar dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <Man/>
        <Woman />
      </div>
    </div>
  );
};

export default CountChart;
