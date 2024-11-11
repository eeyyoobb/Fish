"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { UserPlus, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { isClerkAPIResponseError } from "@/types/clerk";
import { useSearchParams } from "next/navigation";
import {useRouter} from "next/navigation";


const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Invalid email address").or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  img: z.string().optional(),
  fatherId: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  // const { isChecking, validateField } = useFieldValidation();
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const searchParams = useSearchParams();
  const referralId = searchParams.get("referral");

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: "",
      img: "",
      fatherId: referralId || "",
    },
  });

  const username = form.watch("username");
  const email = form.watch("email");

  // useEffect(() => {
  //   if (username.length >= 3) {
  //     validateField("username", username).then(setIsUsernameValid);
  //   }
  // }, [username, validateField]);

  // useEffect(() => {
  //   if (email) {
  //     validateField("email", email).then(setIsEmailValid);
  //   } else {
  //     setIsEmailValid(true);
  //   }
  // }, [email, validateField]);

  async function onSubmit(data: FormValues) {
    if (!isUsernameValid || !isEmailValid) {
      toast.error("Please fix validation errors before submitting");
      return;
    }

    if (!referralId) {
      toast.error("Parent referral ID is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/register?referral=${referralId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fatherId: referralId }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (isClerkAPIResponseError(result)) {
          const errorDetails = {
            message: result.errors[0]?.longMessage || result.errors[0]?.message,
            status: result.status,
            traceId: result.clerkTraceId,
            code: result.errors[0]?.code
          };
          
          console.error("Clerk API Error:", {
            ...errorDetails,
            fullError: result
          });
          
          throw new Error(
            `${errorDetails.message}\nStatus: ${errorDetails.status}\nTrace ID: ${errorDetails.traceId}\nCode: ${errorDetails.code}`
          );
        }
        throw new Error(result.message || "Registration failed");
      }

      if (result.success) {
        toast.success("Registration successful! Your child account has been created.");
        form.reset();
        router.push("/sign-in");
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (!referralId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Invalid Registration Link</h1>
          <p className="text-muted-foreground">
            The registration link is invalid or expired. Please ensure &apos using a valid parent referral link.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 space-y-8 shadow-lg">
        <div className="space-y-2 text-center">
          <UserPlus className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Register Child Account</h1>
          <p className="text-muted-foreground">Create a new account for your child</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                  <>
                    <Input 
                      placeholder="johndoe" 
                      {...field} 
                      className={!isUsernameValid ? "border-red-500" : ""}
                    />
                    <div className="hover-messages">
                      <p>Username can only contain letters, numbers, and `&apos;_&apos;` or `&apos;-&apos;`.</p>
                      <p>Username may be taken, so try another username</p>
                    </div>
                    </>
                  </FormControl>
                {!isUsernameValid && (
                    <p className="text-sm text-red-500">Username is already taken</p>
                  )} 
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      {...field}
                      className={!isEmailValid ? "border-red-500" : ""}
                    />
                  </FormControl>
                  {!isEmailValid && (
                    <p className="text-sm text-red-500">Email is already registered</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading /*|| isChecking */|| !isUsernameValid || !isEmailValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Child Account"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}