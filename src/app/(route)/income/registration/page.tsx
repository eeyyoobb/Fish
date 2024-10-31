"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  childSchema,
  ChildSchema,
} from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createChild } from "@/lib/actions";
import { useRouter, useSearchParams } from "next/navigation";

import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";

// Define the RegistrationData type explicitly
interface RegistrationData {
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  phone?: string;
  address?: string;
  id?: string;
}

const Registration = ({ data = {} as RegistrationData }: { data?: RegistrationData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChildSchema>({
    //resolver: zodResolver(childSchema),
  });

  const [img, setImg] = useState<any>();
  const [fatherId, setFatherId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, formAction] = useFormState(createChild, {
    success: false,
    error: false,
  });

  const handleParentId = () => {
    const referral = searchParams.get('referral');
    if (referral) {
      setFatherId(referral);
    }
  };

  useEffect(() => {
    handleParentId();
  }, [searchParams]);

  const onSubmit = handleSubmit((data) => {
    formAction({ ...data, img: img?.secure_url });
  });

  useEffect(() => {
    if (state.success) {
      toast(`Child has been created!`);
      router.push("/");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        Create a new child
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data.password}
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
        {({ open }) => (
          <div
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            onClick={() => open()}
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </div>
        )}
      </CldUploadWidget>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="name"
          defaultValue={data.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label='"Please confirm your invitation by clicking the field below."'
          name="fatherId"
          defaultValue={fatherId || ''}
          register={register}
          error={errors.fatherId}
          readOnly
        />
        {data.id && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>
      {state.error && (
        <span className="text-red-500">Username or Account already exist</span>
      )}
      <button type="submit" className="bg-brand text-white p-2 rounded-md">
        Register
      </button>
    </form>
  );
};

export default Registration;
