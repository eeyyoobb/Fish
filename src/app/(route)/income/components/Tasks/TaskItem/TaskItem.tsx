"use client";
import React, { useEffect, useState } from "react";
import { edit, trash } from "@/utils/Icons";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Props {
  title: string;
  description: string;
  id: string;
  link: string;
  reward: number;
  taskId: string;
  onVerify: (taskId: string, code: string) => void;
  code: string;
  completions: TaskCompletion[];
  isCompleted: boolean;
  categoryName: string;
}

interface TaskCompletion {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  userId: string;
  taskId: string;
  completedAt: Date | null;
}

function TaskItem({
  title,
  description,
  link,
  reward,
  taskId,
  onVerify,
  id,
  code,
  completions,
  isCompleted,
  categoryName,
}: Props) {
  const [completed, setCompleted] = useState(isCompleted);
  const [inputCode, setInputCode] = useState("");
  const [buttonState, setButtonState] = useState("initial");
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const [isClaiming, setIsClaiming] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null); // Store the country code
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();
        setCountry(data.country);
        setCountryCode(data.countryCode); // Set country code
        setLoading(false);
      } catch (err) {
        //@ts-ignore
        setError("Unable to fetch country");
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  // Adjust reward if the user is in Ethiopia
  const adjustedReward = countryCode === "ET" ? reward / 5 : reward;

  const handleEarnClick = async () => {
    if (isClaiming) return; // Prevent multiple clicks during the claim process

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
      setIsClaiming(true); // Set loading state

      try {
        await handleClaimReward(); // Wait for the claim process to finish
        router.refresh(); // Refresh the page after claiming
      } finally {
        setIsClaiming(false); // Reset loading state once the claim is done
      }
    }
  };

  const handleTaskFailure = async () => {
    setButtonState("failed");
    setCompleted(true);
    try {
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
        body: JSON.stringify({ taskId, reward: adjustedReward, isCompleted: true }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to claim reward");
      }

      const result = await res.json();
      setCompleted(true); // Mark task as completed after claiming reward
      setButtonState("completed");
      toast.success(`${title} reward claimed! You have earned ${adjustedReward} BT!`);
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

  const getLogo = (category: string) => {
    switch (category.toLowerCase()) {
      case 'youtube':
        return <Image width="40" height="40" src="https://img.icons8.com/nolan/64/youtube-play.png" alt="youtube-play" />;
      case 'telegram':
        return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=63306&format=png&color=000000" alt="telegram" />;
      case 'instagram':
        return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" alt="instagram" />;
      case 'facebook':
        return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="facebook" />;
      case 'linkedin':
        return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=MR3dZdlA53te&format=png&color=000000" alt="linkedin" />;
      case 'x':
        return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=000000" alt="x" />;
      case 'tiktok':
        return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=lTkH3THtr7SL&format=png&color=000000" alt="tiktok" />;
      case 'custom':
        return <Image width="40" height="40" src="/brandlogo.png" alt="custom" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative p-4 rounded-lg bg-gray-500 bg-opacity-10 shadow-lg border-2 border-gray-00 h-64 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        {getLogo(categoryName)}
        <span>
          <h1 className="text-xl font-bold text-brand uppercase">{categoryName}</h1>
        </span>
        <div className="flex items-center text-brand">
          <Image src="/coin.png" alt="" width={40} height={40} />
          <span className="ml-1">{adjustedReward} BT</span>
        </div>
      </div>
      <p>{description}</p>
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
          buttonState === "claim"
            ? 'bg-green-500 hover:bg-green-600'
            : buttonState === "verifying"
            ? 'bg-orange-500 hover:bg-orange-600'
            : buttonState === "failed"
            ? 'bg-red-500 cursor-not-allowed'
            : completed
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        }`}
        onClick={handleEarnClick}
        disabled={completed || buttonState === "failed" || isClaiming}
      >
        {isClaiming
          ? "Loading..."
          : buttonState === "claim"
          ? "Claim"
          : buttonState === "verifying"
          ? "Verify Code"
          : completed
          ? "Completed"
          : buttonState === "failed"
          ? "Failed"
          : "Earn"}
      </button>
      <button onClick={handleDelete}>
        {trash}
      </button>
      <Toaster />
    </div>
  );
}

export default TaskItem;
