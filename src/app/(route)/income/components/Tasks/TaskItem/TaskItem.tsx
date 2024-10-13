"use client";
import { useGlobalState } from "@/context/globalProvider";
import { edit, trash } from "@/utils/Icons";
import Image from "next/image";
import React, { useState } from "react";
import { Toaster, toast } from 'sonner';

interface Props {
  title: string;
  description: string;
  isCompleted: boolean;
  id: string;
  link: string;
  reward: number;
  taskId: string;
  onVerify: (taskId: string, code: string) => void;
  isOwner: boolean;
}

function TaskItem({
  title,
  description,
  isCompleted,
  link,
  reward,
  taskId,
  onVerify,
  id,
  isOwner,
}: Props) {
  const { deleteTask } = useGlobalState();
  const [completed, setCompleted] = useState(isCompleted); // Track completion state

  const handleEarnClick = async () => {
    try {
      const res = await fetch("/api/tasks/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }), // Send taskId to the backend
      });
  
      const result = await res.json(); // Parse the response
  
      if (!res.ok) {
        throw new Error(result.error || "Failed to mark task as completed");
      }
  
      setCompleted(true); // Mark task as completed in the frontend
      toast.success(`${title} has been completed!`); // Show success notification
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete task"); // Show error notification
    }
  };
  

  return (
    <div className="p-4 rounded-lg glass shadow-lg border-2 border-gray-300 h-64 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">{title}</h1>
        <div className="flex items-center text-orange-500">
          <Image src="/coin.png" alt="" width={50} height={50} />
          <span className="ml-1">{reward} BT</span>
        </div>
      </div>
      <p className="">{description}</p>
      <button 
        className={`py-2 px-4 font-bold uppercase rounded-full text-white transition-all duration-300 shadow-md ${
          completed ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
        }`}
        onClick={completed ? undefined : handleEarnClick} // Disable click if already completed
      >
        {completed ? 'Completed' : 'Earn'}
      </button>
      {isOwner && (
        <div className="flex items-center gap-5 mt-auto">
          <button className="ml-auto text-blue-500 hover:text-blue-700">{edit}</button>
          <button 
            className="bg-red-600 rounded-lg py-1 px-3 text-white transition-colors duration-200 hover:bg-red-700" 
            onClick={() => deleteTask(id)}
          >
            {trash}
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
