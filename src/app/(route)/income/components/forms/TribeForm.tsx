"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../Components/InputField";
import {
  tribeSchema,
  TribeSchema,
  categorySchema,
  CategorySchema,
} from "@/lib/formValidationSchemas";
import {
  createTribe,
  createCategory,
  updateTribe,
  updateCategory,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const TribeForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TribeSchema>({
     resolver: zodResolver(tribeSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createTribe : updateTribe,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
       toast(`Category has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers, grades } = relatedData;

  return (
    <form className="flex flex-col gap-8"  onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new tribe" : "Update the tribe"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Tribe name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs ">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
             {...register("supervisorId")}
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option
                  value={teacher.id}
                  key={teacher.id}
                  selected={data && teacher.id === data.supervisorId}
                >
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs ">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
             {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: string; level: string}) => (
              <option
                value={grade.id}
                key={grade.id}
                selected={data && grade.id === data.gradeId}
              >
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-mayacard text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TribeForm;
