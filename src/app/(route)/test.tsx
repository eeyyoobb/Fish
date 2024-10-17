"use client";

import { useForm } from "react-hook-form";
import InputField from "../components/Components/InputField";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChildSchema } from "@/lib/formValidationSchemas";
import { createChild } from "@/lib/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";

const ChildForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChildSchema>();

  const [img, setImg] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleParentId = () => {
    const referral = searchParams.get('referral');
    if (referral) {
      setParentId(referral);
    }
  };

  useEffect(() => {
    handleParentId();
  }, [searchParams]);

  const onSubmit = async (formData: ChildSchema) => {
    const finalFormData = { ...formData, img, parentId };

    try {
      await createChild(finalFormData);
      toast("Child has been created!");
      router.refresh();
    } catch (error) {
      toast("Something went wrong!", { type: "error" });
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Create a new child</h1>

      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          register={register}
          error={errors.username}
        />
        <InputField
          label="Email"
          name="email"
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <CldUploadWidget
        uploadPreset="income"
        onSuccess={(result, { widget }) => {
          setImg(result.info.secure_url);
          widget.close();
        }}
      >
        {({ open }) => (
          <div className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" onClick={open}>
            <Image src="/upload.png" alt="Upload icon" width={28} height={28} />
            <span>Upload a photo</span>
          </div>
        )}
      </CldUploadWidget>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="name"
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          register={register}
          error={errors.address}
        />
        <InputField
          label="Parent ID"
          name="parentId"
          defaultValue={parentId || ''}
          register={register}
          error={errors.parentId}
          disabled
        />
      </div>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        Create
      </button>
    </form>
  );
};

export default ChildForm;
