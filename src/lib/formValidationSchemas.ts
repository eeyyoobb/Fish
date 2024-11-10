import { z } from "zod";
import { Category } from '@prisma/client';

export const categorySchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Category name is required!" }),
  creators: z.array(z.string()), 
});

export type CategorySchema = z.infer<typeof categorySchema>;

export const tribeSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Category name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.string().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type TribeSchema = z.infer<typeof tribeSchema>;

export const creatorSchema = z.object({
  id: z.string().optional(),
  clerkUserId: z.string().optional().or(z.literal("")),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  Categorys: z.array(z.string()).optional(), // Category ids
});

export type CreatorSchema = z.infer<typeof creatorSchema>;


export const childSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." })
    .optional()
    .or(z.literal("")),
  name: z.string().min(2, { message: "First name is required!" }),
  surname: z.string().min(2, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  img: z.string().optional(),
  fatherId: z.string().min(12, { message: "you must be invited to be registered OR click here Or you shold confirm" }),
});

export type ChildSchema = z.infer<typeof childSchema>;

export const examSchema = z.object({
  id: z.coerce.string().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.string({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
