"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IoIosWoman,IoIosMan } from "react-icons/io";


const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys+girls,
      fill: "#ea580c",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#db2777",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#0891b2",
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
  
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" // Added flex for centering icons
      >
        <IoIosMan style={{ width:50, height:50, color:"orange"}} />
        <IoIosWoman style={{ width:50, height:50, color:"orange"}} />
      </div>
     </div>
  );
};

export default CountChart;
