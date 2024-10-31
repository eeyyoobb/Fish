import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'sonner';
import { useFormState } from 'react-dom';
import { childSchema, type ChildSchema } from '@/lib/formValidationSchemas';
import { createChild } from '@/lib/actions';
import  InputField  from '../components/InputField';

interface ChildFormProps {
  data?: Partial<ChildSchema>;
}

const ChildForm: FC<ChildFormProps> = ({ data }) => {
  const [img, setImg] = useState<{ secure_url: string } | null>(null);
  const [fatherId, setFatherId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChildSchema>({
    resolver: zodResolver(childSchema),
    defaultValues: data,
  });

  const [state, formAction] = useFormState(createChild, {
    success: false,
    error: false,
  });

  useEffect(() => {
    const referral = searchParams.get('referral');
    if (referral) {
      setFatherId(referral);
    }
  }, [searchParams]);

  useEffect(() => {
    if (state.success) {
      toast('Child has been created successfully!');
      router.push('/');
      router.refresh();
    }
  }, [state, router]);

  const onSubmit = handleSubmit((formData) => {
    formAction({ ...formData, img: img?.secure_url });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new child</h1>

      {/* Authentication Section */}
      <section>
        <h2 className="text-xs text-gray-400 font-medium mb-4">
          Authentication Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Username"
            name="username"
            register={register}
            error={errors?.username}
          />
          <InputField
            label="Email"
            name="email"
            register={register}
            error={errors?.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors?.password}
          />
        </div>
      </section>

      {/* Personal Information Section */}
      <section>
        <h2 className="text-xs text-gray-400 font-medium mb-4">
          Personal Information
        </h2>
        
        {/* Image Upload */}
        <CldUploadWidget
          uploadPreset="income"
          onSuccess={(result: any) => {
            setImg(result.info);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open?.()}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors mb-4"
            >
              <Image src="/upload.png" alt="Upload" width={28} height={28} />
              <span>Upload a photo</span>
            </button>
          )}
        </CldUploadWidget>

        {/* Personal Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            label="Invitation Code"
            name="fatherId"
            defaultValue={fatherId || ''}
            register={register}
            error={errors.fatherId}
            readOnly
          />
          {data?.id && (
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
      </section>

      {/* Error Message */}
      {state.error && (
        <p className="text-red-500 text-sm">
          Username or account already exists
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md transition-colors"
      >
        Register Child
      </button>
    </form>
  );
};

export default ChildForm;