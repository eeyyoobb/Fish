"use client";

import React, { useEffect, useState } from "react";
import CreateContent from "../Tasks/CreateContent";
import AdjustContent from "../Tasks/AdjustContent";
import TaskItem from "../Tasks/TaskItem";
import { add, plus } from "@/utils/Icons";
import Modal from "../ui/Modal";
import { useUser } from "@clerk/nextjs";
import { Task } from "@/types/task";



interface Props {
  title: string;
  tasks: Task[]; 
}


function Tasks({ title, tasks, }: Props) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('create');



  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { user } = useUser();
  const role = user?.publicMetadata.role as string;


  return (
    <main className="p-2 w-full bg-gray-500 bg-opacity-10 border-2 border-gray-400 rounded-lg h-full overflow-y-auto">
      <div>
    {isModalOpen && modalType === 'create' && (
      <Modal content={<CreateContent closeModal={closeModal} />} closeModal={closeModal} />
    )}
    {isModalOpen && modalType === 'adjust' && (
      <Modal content={<AdjustContent closeModal={closeModal} />} closeModal={closeModal} />
    )}
  </div>

  <h1 className="text-2xl font-bold relative mb-8">
    {title}
    <span className="absolute bottom-[-0.6rem] left-0 w-12 h-1 bg-brand rounded"></span>
  </h1>

  {(role === "creator" || role === "admin") && (
    <>
      <button
        className="fixed top-5 right-20 w-12 h-12 rounded-full bg-gray-600 border-2 border-gray-600 shadow-lg text-white text-xl flex items-center justify-center"
        onClick={() => openModal('create')}
      >
        {plus}
      </button>
      {role === "admin" && (
        <button
          className="fixed top-5 right-0 w-16 h-12 rounded-md bg-brand border-2 border-gray-600 shadow-lg text-white text-xl flex items-center justify-center"
          onClick={() => openModal('adjust')}
        >
          {plus}
        </button>
      )}
    </>
      )}

      <div className="grid tasks gap-3 mt-8">
      {tasks.map((task) => (
          <TaskItem
            id={task.id} 
            key={task.id}
            description={task.description || ''} 
            link={task.link || ''} 
            reward={task.reward || 0} 
            taskId={task.id} 
            completions={ task.completions} 
            isCompleted={task.isCompleted} 
            //@ts-ignore
            categoryName={task.category?.name || 'Unknown'}
            ad1={task.ad1} 
            ad2={task.ad2} 
            ad3={task.ad3} 
            track={task.track || ''} 
            trackmin={task.trackmin } 
            track2={task.track2 || ''} 
            trackmin2={task.trackmin2 } 
            duration={task.duration}
            ownerId={task.ownerId}
          />
        ))}

        {(role === "creator" || role === "admin") && (
          <button className="flex items-center justify-center gap-2 h-70 bg-gray-800 bg-opacity-30 text-white font-semibold cursor-pointer border-3 border-dashed border-gray-400 rounded-lg transition hover:bg-gray-600 hover:text-white" onClick={() => openModal('create')}>
            {add}
            Add New Task
          </button>
        )}
      </div>
    </main>
  );
}

export default Tasks;
