"use client";

import React, { useState } from "react";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { add, plus } from "@/utils/Icons";
import Modal from "../Modals/Modal";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface Task {
  id: string;
  day: Day;
  startTime: Date;
  endTime: Date;
  categoryId: string;
  //tribeId: string;
  creatorId: string;
  //exams: any; // replace with actual type
  //assignments: any; // replace with actual type
  //attendances: any; // replace with actual type
  title: string | null;
  description: string | null; // Allow null here
  //isImportant: boolean;
  link: string | null;
  reward: number;
  code: string | null;
  createdAt: Date;
  updatedAt: Date;
  //childId: string;
  completions:  TaskCompletion[];
  isCompleted: boolean;
  
}

type TaskCompletion = {
  userId: string; // ID of the user who completed the task
  id: string; // Unique ID of the completion record
  createdAt: Date; // Date when the completion record was created
  updatedAt: Date; // Date when the completion record was last updated
  taskId: string; // ID of the task that was completed
  completedAt: Date | null; // Date when the task was completed, null if not completed
  isCompleted: boolean;
};

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';


interface Props {
  title: string;
  tasks: Task[]; // Use the Task type instead of any[]
}

const handleVerify = async (taskId: string, code: string,) => {
  try {
    const response = await axios.post('/api/rewards', {
      taskId,
      code,
    });

    const data = response.data;

    if (response.status === 200) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        alert(error.response.data.error || 'An error occurred');
      } else {
        alert('No response from the server');
      }
    } else {
      alert('An unexpected error occurred');
    }
  }
};

function Tasks({ title, tasks, }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { user } = useUser();
  const role = user?.publicMetadata.role as string;

  return (
    <main className="p-8 w-full bg-gray-500 bg-opacity-10 border-2 border-gray-400 rounded-lg h-full overflow-y-auto">
      {isModalOpen && (
        <Modal content={<CreateContent closeModal={closeModal} />} closeModal={closeModal} />
      )}
      <h1 className="text-2xl font-bold relative mb-8">
        {title}
        <span className="absolute bottom-[-0.6rem] left-0 w-12 h-1 bg-brand rounded"></span>
      </h1>

      {(role === "creator" || role === "admin") && (
        <button className="fixed top-20 right-20 w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 shadow-lg text-white text-xl flex items-center justify-center" onClick={openModal}>
          {plus}
        </button>
      )}

      <div className="grid tasks gap-4 mt-8">
        {tasks.map((task) => (
          <TaskItem
            id={task.id} 
            key={task.id}
            title={task.title || ''}
            description={task.description || ''} 
            link={task.link || ''}
            reward={task.reward || 0}
            taskId={task.id}
            onVerify={handleVerify} 
            code={task.code || ''} 
            completions={ task.completions}
            isCompleted= {task.isCompleted}
          />
        ))}
        {(role === "creator" || role === "admin") && (
          <button className="flex items-center justify-center gap-2 h-70 bg-gray-800 bg-opacity-30 text-white font-semibold cursor-pointer border-3 border-dashed border-gray-400 rounded-lg transition hover:bg-gray-600 hover:text-white" onClick={openModal}>
            {add}
            Add New Task
          </button>
        )}
      </div>
    </main>
  );
}

export default Tasks;
