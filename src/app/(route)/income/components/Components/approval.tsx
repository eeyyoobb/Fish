"use client";

import { useState } from "react";

interface TaskRowActionsProps {
  id: string;
  initialStatus: "PENDING" | "APPROVED" | "DECLINED";
}

const TaskRowActions = ({ id, initialStatus }: TaskRowActionsProps) => {
  const [status, setStatus] = useState(initialStatus);

  const updateTaskStatus = async (approved: boolean) => {
    const newStatus = approved ? "APPROVED" : "DECLINED";

    try {
      const response = await fetch(`/api/tasks/${id}/approval`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }), // Ensure the body key matches your API expectations
      });

      if (response.ok) {
        setStatus(newStatus);
        alert(`Task marked as ${newStatus.toLowerCase()}`);
      } else {
        alert("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("An error occurred while updating the task status");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => updateTaskStatus(true)}
        className={`px-4 py-2 rounded ${
          status === "APPROVED" ? "bg-green-500 text-white" : "bg-green-200 text-green-700"
        } hover:bg-green-600`}
        disabled={status === "APPROVED"}
      >
        {status === "APPROVED" ? "Approved" : "Approve"}
      </button>
      <button
        onClick={() => updateTaskStatus(false)}
        className={`px-4 py-2 rounded ${
          status === "DECLINED" ? "bg-red-500 text-white" : "bg-red-200 text-red-700"
        } hover:bg-red-600`}
        disabled={status === "DECLINED"}
      >
        {status === "DECLINED" ? "Declined" : "Decline"}
      </button>
    </div>
  );
};

export default TaskRowActions;
