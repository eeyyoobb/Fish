"use client";


import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import {  CategorySchema } from "@/lib/formValidationSchemas";
import { createCategory, updateCategory } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import  {toast} from "sonner";
import { useRouter } from "next/navigation";

 const CategoryForm = ({
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
    } = useForm<CategorySchema>({
     // resolver: zodResolver(categorySchema),
    });

   // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createCategory : updateCategory,
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

   const { creators } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new category" : "Update the category"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Category name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
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
          <label className="text-xs text-gray-300">Creators</label>
           <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("creators")}
            defaultValue={data?.creators}
          >
            {creators.map(
              (creator: { id: string; name: string; surname: string }) => (
                <option value={creator.id} key={creator.id}>
                  {creator.name + " " + creator.surname}
                </option>
              )
            )}
          </select>
          {errors.creators?.message && (
            <p className="text-xs text-red-400">
              {errors.creators.message.toString()}
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

 export default CategoryForm;
