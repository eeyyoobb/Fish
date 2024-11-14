"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import crypto from "crypto";
import { TaskHeader } from "../Tasks/taskHeader";
import { QuestionForm } from "./form";
import { useCountryCode } from "@/components/flag";
import { useTaskVerification } from "@/hooks/taskVerify";
import { TaskItemProps, Question } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const getCountryCodeFromName = (countryName: string): string => {
  const countryCodeMap: { [key: string]: string } = {
    "United States": "us",
    "United Kingdom": "gb",
  };
  return countryCodeMap[countryName] || countryName.slice(0, 2).toLowerCase();
};

function TaskItem({
  description,
  link,
  reward,
  taskId,
  id,
  ownerId,
  ad1,
  ad2,
  ad3,
  isCompleted,
  categoryName,
  track,
  trackmin,
  trackmin2,
  track2,
  duration,
  country,
}: TaskItemProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [platform, setPlatform] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [taskFailed, setTaskFailed] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false); // State to manage content visibility
  const router = useRouter();
  const { user } = useUser();
  const role = user?.publicMetadata.role as string;

  const countryCode = useCountryCode();
  const taskCountryCode = country ? getCountryCodeFromName(country) : null;
  const adjustedReward = countryCode === "et" ? reward / 5 : reward;

  const getDeterministicQuestions = useCallback(
    (username: string, userId: string): Question[] => {
      const hash = crypto.createHash("md5").update(username + userId).digest("hex");
      const index = parseInt(hash.slice(0, 2), 16) % 5;

      const questions: Question[] = [
        { key: "ad1", value: String(ad1), prompt: "the first ad?" },
        { key: "duration", value: String(duration), prompt: "the duration of the video?" },
        { key: "ad2", value: String(ad2), prompt: "the second ad?" },
        { key: "ad3", value: String(ad3), prompt: "the third ad?" },
        { key: "track", value: trackmin, prompt: `you see the ${track}?` },
        { key: "track2", value: trackmin2, prompt: `you see the ${track2}?` },
      ];

      return [
        questions[(index + 0) % questions.length],
        questions[(index + 1) % questions.length],
        questions[(index + 2) % questions.length],
      ];
    },
    [ad1, ad2, ad3, duration, track, trackmin, trackmin2, track2]
  );

  useEffect(() => {
    if (user && user.username) {
      const questions = getDeterministicQuestions(user.username, user.id);
      setSelectedQuestions(questions);
    }
  }, [user, getDeterministicQuestions]);

  const { buttonState, isLoading, isClaiming, handleVerification } = useTaskVerification({
    taskId,
    reward: adjustedReward,
    onComplete: () => {
      setCompleted(true);
      router.refresh();
    },
  });

  if (taskCountryCode && taskCountryCode !== countryCode) return null;

  const handleButtonClick = async () => {
    if (taskFailed) return;

    if (!startTime) {
      window.open(link, "_blank");
      setStartTime(Date.now());
      return;
    }

    const elapsedTime = (Date.now() - startTime) / 1000 / 60;
    const durationInMinutes = Number(duration);

    if (elapsedTime < durationInMinutes / 2) {
      toast.error("You're cheating! Task failed.");
      setTaskFailed(true);
      return;
    }

    if (categoryName === "youtube") {
      if (Object.keys(userAnswers).length !== selectedQuestions.length) {
        toast.error("Please answer all questions");
        return;
      }
      await handleVerification(userAnswers, selectedQuestions);
    } else {
      if (!platform.trim()) {
        toast.error("Please enter your user ID");
        return;
      }
      await handleVerification({}, [], platform.trim());
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      if (res.status === 200) {
        toast.success("Task deleted");
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/tasks`);
      if (res.status === 200) {
        toast.success("Task updated");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const getButtonText = () => {
    if (taskFailed) return "Failed";
    if (isClaiming) return "Processing...";
    if (completed) return "Completed";
    if (buttonState === "failed") return "Failed";
    if (!startTime) return "Start Task";
    return "Verify Task";
  };

  const getButtonStyle = () => {
    if (taskFailed) return "bg-red-500 cursor-not-allowed";
    if (completed) return "bg-gray-500 cursor-not-allowed";
    if (buttonState === "failed") return "bg-red-500 cursor-not-allowed";
    if (startTime) return "bg-green-500 hover:bg-green-600";
    return "bg-brand hover:bg-orange-600";
  };

  return (
    <div className="h-0.5px md:relative md:h-auto p-3 sm:p-4 md:p-5 rounded-lg bg-gray-500 bg-opacity-10 shadow-lg border-2 border-gray-00 flex flex-col gap-1 w-full max-w-[95vw] sm:max-w-[540px] md:max-w-[640px] mx-auto">
      {/* Task Header and Start Button (Visible on small screens) */}
      <TaskHeader categoryName={categoryName} reward={adjustedReward} link={link} />
      
      <Button
        onClick={() => setIsContentVisible(true)}
        className="w-full sm:w-auto bg-brand hover:bg-orange-600 mt-4"
      >
        Start Task
      </Button>

      {/* Content that shows after Start Task */}
      {isContentVisible && (
        <div className="mt-4 sm:mt-6 flex flex-col gap-3">
          {categoryName === "youtube" ? (
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              To get your reward, write the minute of{" "}
              {selectedQuestions.map((question, index) => (
                <span key={question.key}>
                  <span className="text-brand">{question.prompt} </span>
                  {index < selectedQuestions.length - 1 ? ", " : ""}
                </span>
              ))}{" "}
              .. if the info is not provided, put 00.
            </p>
          ) : (
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              To complete this task, please enter your user ID
            </p>
          )}

          <p className="text-sm md:text-base my-2">{description}</p>

          <div className="flex-grow flex flex-col gap-1 w-full md:flex-row md:items-center md:justify-between">
            <div className="relative flex-grow mt-2 sm:mt-3 md:mt-0">
              {platform && platform.length < 2 && (
                <Input
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="Enter your user ID"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              )}
            </div>
            <div className="flex gap-3 mt-3">
              <Button
                onClick={handleButtonClick}
                disabled={isLoading || taskFailed}
                className={`w-full sm:w-auto ${getButtonStyle()}`}
              >
                {getButtonText()}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
