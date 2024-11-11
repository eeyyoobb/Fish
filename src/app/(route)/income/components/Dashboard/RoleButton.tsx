"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoleButtonProps {
  title: string;
  Icon: LucideIcon;
  isEligible: boolean;
  requirement: string;
  readyMessage: string;
  onClick?: () => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({
  title,
  Icon,
  isEligible,
  requirement,
  readyMessage,
  onClick
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            disabled={!isEligible}
            className={`w-full h-full min-h-[120px] flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300 hover:scale-105 ${
              isEligible
                ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-lg hover:shadow-indigo-500/25'
                : 'bg-gray-700/50 cursor-not-allowed'
            }`}
          >
            <Icon className={`w-8 h-8 ${isEligible ? 'text-indigo-200' : 'text-gray-400'}`} />
            <span className={`font-semibold ${isEligible ? 'text-white' : 'text-gray-300'}`}>
              {title}
            </span>
            <span className={` glass text-sm ${isEligible ? 'text-indigo-200' : 'text-gray-400'} `}>
              {isEligible ? readyMessage : requirement}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isEligible ? readyMessage : requirement}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoleButton;