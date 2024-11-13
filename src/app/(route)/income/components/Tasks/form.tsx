"use client";

import { useState } from "react";
import { Question } from "@/types/task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuestionFormProps {
  selectedQuestions: Question[];
  userAnswers: Record<string, string>;
  setUserAnswers: (answers: Record<string, string>) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export function QuestionForm({
  selectedQuestions,
  setUserAnswers,
  onSubmit
}: QuestionFormProps) {
  const [formattedCode, setFormattedCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCodeChange = (input: string) => {
    // Remove any non-numeric characters and existing commas
    const numbersOnly = input.replace(/[^0-9]/g, "").slice(0, 6);
    

    // Format with commas
    let formatted = numbersOnly;
    if (numbersOnly.length > 2) {
      formatted = formatted.slice(0, 2) + "," + formatted.slice(2);
    }
    if (numbersOnly.length > 4) {
      formatted = formatted.slice(0, 5) + "," + formatted.slice(5);
    }
    setFormattedCode(formatted);

    // Update answers if we have a complete code
    if (numbersOnly.length === 6) {
      const answers: Record<string, string> = {};
      selectedQuestions.forEach((question, index) => {
        const start = index * 2;
        const answer = numbersOnly.slice(start, start + 2);
        answers[question.key] = answer;
      });
      setUserAnswers(answers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbersOnly = formattedCode.replace(/[^0-9]/g, "");
    if (numbersOnly.length !== 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }
    setIsSubmitted(true);
    onSubmit();
  };

  if (isSubmitted) return null;

  return (
    <form onSubmit={handleSubmit} className="relative bg-gray-800 bg-opacity-60  ">
      <div className="glass">
      <div className="space-y-2  rounded">
        {/* <label
          htmlFor="verificationCode"
          className="block text-sm font-medium text-gray-300 brand"
        >
          Enter 6-digit verification code
        </label> */}
        <Input
          id="verificationCode"
          type="text"
          inputMode="numeric"
          placeholder="01,23,00"
          value={formattedCode}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="w-full text-center text-2xl tracking-widest font-mono "
          required
        />
        {/* <p className="text-xs text-muted-foreground mt-1">
          Format: First two digits for Q1, next two for Q2, last two for Q3
        </p> */}
      </div>

      {/* <div className="space-y-2 glass">
        {selectedQuestions.map((question, index) => (
          <div key={question.key} className="text-sm text-muted-foreground text-black glass">
            <span className="font-medium text-black">Q{index + 1}:</span> {question.prompt} -{" "}
            <span className="font-mono text-black">
              {userAnswers[question.key]?.padStart(2, "0") || "??"}
            </span>
          </div>
        ))}
      </div> */}

      {/* <Button
        type="submit"
        disabled={isLoading || formattedCode.replace(/[^0-9]/g, "").length !== 6}
        className="w-full"
      >
        {isLoading ? "Verifying..." : "Submit Code"}
      </Button> */}
      </div>
    </form>
  );
}