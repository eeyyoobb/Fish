"use client";
import { useGlobalState } from "@/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { add, plus } from "@/utils/Icons";
import Modal from "../Modals/Modal";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface Props {
  title: string;
  tasks: any[];
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
  const { theme,openModal, modal } = useGlobalState();
  
  const { user } = useUser();
  const username = user?.username; 
  const role = user?.publicMetadata.role as string;

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />} 
      <h1>{title}</h1>

      {role === "creator" || "admin"? (
      <button className="btn-rounded" onClick={openModal}>
        {plus}
      </button>
        ) : null}

      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
          link={task.link}
          reward={task.reward}
          taskId={task.id}
          onVerify={handleVerify}
          isCompleted ={task.isCompleted}
          id={task.id}
          isOwner={task.isOwner}
          />
        ))}
     {role === "creator" || "admin" ? (
          <button className="create-task" onClick={openModal}>
            {add}
            Add New Task
          </button>
        ) : null}
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
