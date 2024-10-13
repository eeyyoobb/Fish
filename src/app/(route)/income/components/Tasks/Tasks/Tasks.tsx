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
  title: string;
  description?: string;
  link?: string;
  reward?: number;
  isCompleted?: boolean;
  isOwner?: boolean;
  code?: string;
}

interface Props {
  title: string;
  tasks: Task[]; // Use the Task type instead of any[]
}

const handleVerify = async (taskId: string, code: string) => {
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

function Tasks({ title, tasks }: Props) {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const { user } = useUser();
  const role = user?.publicMetadata.role as string;

  return (
    <main className="relative p-8 w-full bg-gray-500 bg-opacity-10 border-2 border-gray-400 rounded-lg h-full overflow-y-auto">
      {modal && <Modal content={<CreateContent closeModal={closeModal} />} />} 
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
            title={task.title}
            description={task.description || ''} 
            link={task.link || ''}
            reward={task.reward || 0}
            taskId={task.id}
            onVerify={handleVerify} // Pass the handleVerify function
            isCompleted={task.isCompleted || false}
            isOwner={task.isOwner || false }
            code={task.code || ''} // Ensure task code is passed for verification
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
