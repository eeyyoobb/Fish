"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  childSchema,
  ChildSchema,
  creatorSchema,
  CreatorSchema,
} from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import {
  createChild,
  createCreator,
  updateChild,
  updateCreator,
} from "@/lib/actions";
import { useRouter } from "next/navigation";

import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";


const ChildForm = ({
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
  } = useForm<ChildSchema>({
    // resolver: zodResolver(childSchema),
  });

  const [img, setImg] = useState<any>();

  const [state, formAction] = useFormState(
    type === "create" ? createChild : updateChild,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log("hello");
    console.log(data);
    formAction({ ...data, img: img?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
       toast(`Child has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { grades, tribes} = relatedData;

  return (
    <form className=" relative flex flex-col gap-8 " onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new child" : "Update the child"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <CldUploadWidget
        uploadPreset="income"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div
              className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
              onClick={() => open()}
            >
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload a photo</span>
            </div>
          );
        }}
      </CldUploadWidget>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />

        <InputField
          label="Parent Id"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors.parentId}
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
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: number; level: number }) => (
              <option value={grade.id} key={grade.id}>
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Tribe</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("tribeId")}
              defaultValue={data?.tribeId}
            >
              {tribes && tribes.length > 0 ? (
                tribes.map(
                  (tribeItem: {
                    id: number;
                    name: string;
                    capacity: number;
                    _count: { childs: number };
                  }) => (
                    <option value={tribeItem.id} key={tribeItem.id}>
                      ({tribeItem.name} -{" "}
                      {tribeItem._count.childs + "/" + tribeItem.capacity}{" "}
                      Capacity)
                    </option>
                  )
                )
              ) : (
                <option value="" disabled>No tribes available</option>
              )}
            </select>
            {errors.tribeId?.message && (
              <p className="text-xs text-red-400">
                {errors.tribeId.message.toString()}
              </p>
            )}
          </div>

      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ChildForm;
