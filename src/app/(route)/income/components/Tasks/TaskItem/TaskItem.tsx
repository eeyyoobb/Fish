"use client";
import React, { useEffect, useState } from "react";
import { edit, trash } from "@/utils/Icons";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import crypto from 'crypto';
import { TaskHeader } from "../Tasks/taskHeader";
import { QuestionForm } from "../form";
import { useCountry } from "@/hooks/location";
import { useTaskVerification } from "@/hooks/taskVerify";
import { TaskItemProps, Question } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TaskItem({
  description,
  link,
  reward,
  taskId,
  onVerify,
  id,
  ownerId, 
  ad1,
  ad2,
  ad3,
  completions,
  isCompleted,
  categoryName,
  track,
  trackmin,
  trackmin2,
  track2,
  duration
}: TaskItemProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [platform, setPlatform] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const { countryCode } = useCountry();

  const role = user?.publicMetadata.role as string;
  const userId = user?.id;

  const adjustedReward = countryCode === "ET" ? reward / 5 : reward;

  const { buttonState, isLoading, isClaiming, handleVerification } = useTaskVerification({
    taskId,
    reward: adjustedReward,
    onComplete: () => {
      setCompleted(true);
      router.refresh();
    }
  });

  const getDeterministicQuestions = (username: string, userId: string): Question[] => {
    const hash = crypto.createHash('md5').update(username + userId).digest('hex');
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
  };

  useEffect(() => {
    if (user && user.username) {
      const questions = getDeterministicQuestions(user.username, user.id);
      setSelectedQuestions(questions);
    }
  }, [user]);

  const handleEarnClick = async () => {
    if (categoryName === "youtube") {
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
      const res = await axios.put(`/api/tasks/${id}`);
      if (res.status === 200) {
        toast.success("Task updated");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="relative p-4 rounded-lg bg-gray-500 bg-opacity-10 shadow-lg border-2 border-gray-00 h-auto min-h-[16rem] flex flex-col gap-2">
      <Toaster />
      <TaskHeader categoryName={categoryName} reward={adjustedReward} />
      
      {categoryName === "youtube" ? (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          To get your reward, write the minute of{" "}
          {selectedQuestions.map((question, index) => (
            <span key={question.key} className="text-brand">
              {question.prompt} {question.value}
              {index < selectedQuestions.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      ) : (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          To complete this task, please enter your user ID
        </p>
      )}

      <p className="text-sm">{description}</p>

      <div className="flex-grow">
        {categoryName === "youtube" ? (
          buttonState === "verifying" && (
            <QuestionForm
              selectedQuestions={selectedQuestions}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              isLoading={isLoading}
              onSubmit={handleEarnClick}
            />
          )
        ) : (
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Enter your user ID"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full"
              disabled={completed || isLoading}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between gap-5 mt-4">
        <Button
          className={`py-1 px-4 font-bold uppercase rounded-full text-white transition-all duration-300 shadow-md w-3/4 ${
            buttonState === "claim"
              ? 'bg-green-500 hover:bg-green-600'
              : buttonState === "verifying"
              ? 'bg-orange-500 hover:bg-orange-600'
              : buttonState === "failed"
              ? 'bg-red-500 cursor-not-allowed'
              : completed
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={handleEarnClick}
          disabled={completed || buttonState === "failed" || isClaiming}
        >
          {isClaiming
            ? "Processing..."
            : buttonState === "claim"
            ? "Claim"
            : buttonState === "verifying"
            ? "Verify"
            : completed
            ? "Completed"
            : buttonState === "failed"
            ? "Failed"
            : categoryName === "youtube"
            ? "Earn"
            : "Complete Task"}
        </Button>

        {(role === "admin" || ownerId === userId) && (
          <div className="flex justify-center w-1/4 gap-1">
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              disabled={completed || isLoading}
            >
              {trash}
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handleUpdate}
              disabled={completed || isLoading}
            >
              {edit}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;