"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Question } from "@/types/task";

interface UseTaskVerificationProps {
  taskId: string;
  reward: number;
  onComplete: () => void;
}

export function useTaskVerification({ taskId, reward, onComplete }: UseTaskVerificationProps) {
  const [buttonState, setButtonState] = useState<"initial" | "verifying" | "claim" | "failed" | "completed">("initial");
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const handleVerification = async (
    userAnswers: Record<string, string>, 
    selectedQuestions: Question[],
    platformUserId?: string
  ) => {
    if (isClaiming) 
      return false;

    try {
      if (buttonState === "initial") {
        setButtonState("verifying");
        return false;
      }

      if (buttonState === "verifying") {
        // For YouTube tasks
        if (selectedQuestions.length > 0) {
          const isCorrect = selectedQuestions.every(
            (q) => userAnswers[q.key]?.trim().toLowerCase() === q.value.toLowerCase()
          );

          if (isCorrect) {
            setButtonState("claim");
            toast.success("Verification successful! You can now claim your reward.");
            return true;
          } else {
            setAttempts((prev) => prev + 1);
            if (attempts < 1) {
              toast.error("Incorrect answers. Please try again.");
            } else {
              await handleTaskFailure();
            }
            return false;
          }
        } 
        // For platform tasks
        else if (platformUserId) {
          setButtonState("claim");
          return true;
        }
      }

      if (buttonState === "claim") {
        setIsClaiming(true);
        try {
          await handleClaimReward(platformUserId);
          onComplete();
          return true;
        } finally {
          setIsClaiming(false);
        }
      }

      return false;
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification");
      return false;
    }
  };

  const handleTaskFailure = async () => {
    setButtonState("failed");
    try {
      await axios.post("/api/tasks/complete", {
        taskId,
        reward: 0,
        isCompleted: false
      });
      toast.error("Task failed. Please try again later.");
    } catch (error) {
      console.error("Error recording task failure:", error);
      toast.error("Failed to record task attempt");
    }
  };

  const handleClaimReward = async (platformUserId?: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/tasks/complete", {
        taskId,
        reward,
        isCompleted: true,
        platformUserId
      });

      if (response.status === 200) {
        setButtonState("completed");
        toast.success(`Congratulations! You've earned ${reward} BT!`);
      } else {
        throw new Error("Failed to claim reward");
      }
    } catch (error: any) {
      console.error("Error claiming reward:", error);
      toast.error(error.response?.data?.error || "Failed to claim reward");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    buttonState,
    isLoading,
    isClaiming,
    handleVerification,
  };
}