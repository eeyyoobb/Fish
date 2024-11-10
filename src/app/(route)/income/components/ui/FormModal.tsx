"use client";

import {
   deleteTribe,
   deleteExam,
   deleteChild,
   deleteCategory,
   deleteCreator,
} from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FormContainerProps } from "../FormContainer";
import {Delete,PlusIcon,View} from "@/components/Icons"
import {Close} from "@/components/Icons"
import { toast } from 'sonner'

const deleteActionMap = {
  subject: deleteCategory,
  class: deleteTribe,
  teacher: deleteCreator,
  child: deleteChild,
  exam: deleteExam,
// TODO: OTHER DELETE ACTIONS
  parent: deleteCategory,
  lesson: deleteCategory,
  assignment: deleteCategory,
  result: deleteCategory,
  attendance: deleteCategory,
  event: deleteCategory,
  announcement: deleteCategory,
};

// USE LAZY LOADING

// import CreatorForm from "./forms/CreatorForm";
// import ChildForm from "./forms/ChildForm";

const CreatorForm = dynamic(() => import("../../forms/CreatorForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ChildForm = dynamic(() => import("../../forms/ChildForm"), {
  loading: () => <h1>Loading...</h1>,
});
const CategoryForm = dynamic(() => import("../../forms/CategoryForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("../../forms/TribeForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("../../forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
// TODO: OTHER FORMS

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  category: (setOpen, type, data, relatedData) => (
    <CategoryForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  tribe: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  creator: (setOpen, type, data, relatedData) => (
    <CreatorForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  // child: (setOpen, type, data, relatedData) => (
  //   <ChildForm
  //     type={type}
  //     data={data}
  //     setOpen={setOpen}
  //     relatedData={relatedData}
  //   />
  // ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />

  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-mayacard"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    //@ts-ignore
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
         toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form  action={formAction} className="p-4 flex flex-col gap-4"
      >
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  const iconMapping = {
    delete: Delete,
    create: PlusIcon,
    view:View,
  };

    //@ts-ignore
  const IconButton = ({ type, size, bgColor, setOpen }) => {
    //@ts-ignore
    const IconComponent = iconMapping[type];
    return (
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {IconComponent && <IconComponent />}
      </button>
    );
  };
  

  return (
    <>
       <IconButton type={type} size={size} bgColor={bgColor} setOpen={setOpen} />
        {open && (
          <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="glass p-4 rounded-md relative w-full h-full z-500 flex flex-col">
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <Close/>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <Form />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default FormModal;
