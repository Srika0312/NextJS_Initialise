"use client";

import { AxiosInstance, USER_TOKEN } from "@/utils/Instances";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const schema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(4, { message: "Password must contain at least 4 characters" })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at lbeast one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

type FormFields = z.infer<typeof schema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const router = useRouter();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
      noValidate
        className="w-full min-w-sm max-w-lg flex flex-col gap-4 justify-center items-center"
        action=""
        onSubmit={handleSubmit(async (data: any) => {
          try {
            const response = await AxiosInstance.post("/api/auth/signin", data);
            // localStorage.setItem(USER_TOKEN,response?.data?.token)
            localStorage.setItem(USER_TOKEN,response?.data?.token)
            console.log(response?.data);
            toast.success(response?.data?.message);
            router.push(`/home`)
          } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
          }
        })}
      >
        <div className="w-full flex flex-col gap-4">
          <input
            {...register("email")}
            className="input input-accent"
            placeholder="Enter your mail"
          />
          <p className="text-red-500 text-md">{errors.email?.message}</p>
          <input
            {...register("password")}
            className="input input-accent"
            placeholder="Enter your password"
          />
          <p className="text-red-500 text-md">{errors.password?.message}</p>
        </div>

        <div>
          <button type="submit" className="btn btn-wide">Sign In</button>
        </div>
        <div className="w-fit flex items-center justify-center">
          <p>Dont have account ?</p>
          <Link
            href="/signup"
            className="link link-primary text-sm font-semibold ml-2"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
