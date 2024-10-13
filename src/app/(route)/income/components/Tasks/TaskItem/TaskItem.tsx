"use client";
import React, { useState } from "react";
import { edit, trash } from "@/utils/Icons";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import axios from "axios";

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
  code: string;
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
  code,
}: Props) {
  const [completed, setCompleted] = useState(isCompleted);
  const [inputCode, setInputCode] = useState("");
  const [buttonState, setButtonState] = useState("initial");
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleEarnClick = () => {
    if (buttonState === "initial") {
      setButtonState("verifying");
    } else if (buttonState === "verifying") {
      if (inputCode === code) {
        setButtonState("claim");
        toast.success("Code verified! You can now claim your reward.");
      } else {
        setAttempts((prev) => prev + 1);
        if (attempts < 1) {
          toast.error("Incorrect code. Please try again.");
        } else {
          handleTaskFailure(); // Mark task as completed without reward
        }
        setInputCode("");
      }
    } else if (buttonState === "claim") {
      handleClaimReward();
    }
  };

  const handleTaskFailure = async () => {
    setButtonState("failed");
    setCompleted(true);
    try {
      // Save the failed task completion state
      await axios.post("/api/tasks/complete", {
        taskId,
        reward: 0, // No reward given on failure
      });
      toast.error("Task failed due to incorrect code.");
    } catch (error) {
      console.error("Error updating task failure:", error);
    }
  };

  const handleClaimReward = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tasks/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, reward }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to claim reward");
      }

      setCompleted(true); // Mark task as completed after claiming reward
      setButtonState("completed");
      toast.success(`${title} reward claimed! You have earned ${reward} BT!`);
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Failed to claim reward.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      if (res.status === 200) {
        toast.success("Task deleted");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="relative p-4 rounded-lg bg-gray-500 bg-opacity-10 shadow-lg border-2 border-gray-00 h-64 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand">{title}</h1>
        <div className="flex items-center text-brand">
          <Image src="/coin.png" alt="" width={50} height={50} />
          <span className="ml-1">{reward} BT</span>
        </div>
      </div>
      <p className="">{description}</p>
      {buttonState === "verifying" && (
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          maxLength={6}
          placeholder="Enter code"
          className="border rounded p-1"
        />
      )}
      <button 
        className={`py-2 px-4 font-bold uppercase rounded-full text-white transition-all duration-300 shadow-md ${
          buttonState === "claim" ? 'bg-green-500 hover:bg-green-600' :
          buttonState === "verifying" ? 'bg-orange-500 hover:bg-orange-600' :
          buttonState === "failed" ? 'bg-red-500 cursor-not-allowed' :
          completed ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
        }`}
        onClick={handleEarnClick}
        disabled={completed || buttonState === "failed"} // Disable if completed or failed
      >
        {buttonState === "completed"
          ? "Completed"
          : buttonState === "failed"
          ? "Fail"
          : buttonState === "claim"
          ? "Claim"
          : buttonState === "verifying"
          ? "Verify"
          : "Earn"}
      </button>
      {isOwner && (
        <div className="flex items-center gap-5 mt-auto">
          <button className="ml-auto text-blue-500 hover:text-blue-700">{edit}</button>
          <button 
            className="bg-red-600 rounded-lg py-1 px-3 text-white transition-colors duration-200 hover:bg-red-700" 
            onClick={handleDelete}
          >
            {trash}
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
