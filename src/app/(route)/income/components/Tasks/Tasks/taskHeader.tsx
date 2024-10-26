"use client";

import Image from "next/image";
import { getLogo } from "@/lib/socialmedia";

interface TaskHeaderProps {
  categoryName: string;
  reward: number;
}


export function TaskHeader({ categoryName, reward }: TaskHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      {getLogo(categoryName)}
      <span>
        <h1 className="text-xl font-bold text-brand uppercase">{categoryName}</h1>
      </span>
      <div className="flex items-center text-brand">
        <Image src="/coin.png" alt="Reward coin" width={40} height={40} />
        <span className="ml-1">{reward} BT</span>
      </div>
    </div>
  );
}