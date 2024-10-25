"use client";

import { AxiosInstance, USER_TOKEN } from "@/utils/Instances";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(4, { message: "Name must contain atleast 4 characters" })
    .max(50),
  email: z.string().nonempty({ message: "Email is required" }).email(),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" })
    .transform((val) => Number(val)),
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

export default function SignUp() {
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
            const response = await AxiosInstance.post("/api/auth/signup", 
              {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
              }
            );
            console.log(response?.data);
            toast.success(response?.data?.message);
            localStorage.setItem(USER_TOKEN,response?.data?.token);
            router.push(`/home`)
          } catch (error: any) {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
          }
        })}
      >
        <div className="w-full flex flex-col gap-4">
          <input
            {...register("name")}
            className="input input-accent"
            placeholder="Enter your name"
          />
          <p className="text-red-500 text-md">{errors.name?.message}</p>

          <input
            {...register("email")}
            className="input input-accent"
            placeholder="Enter your Email"
          />
          <p className="text-red-500 text-md">{errors.email?.message}</p>

          <input
            {...register("password")}
            className="input input-accent"
            placeholder="Enter your password"
          />
          <p className="text-red-500 text-md">{errors.password?.message}</p>

          <input
            {...register("phone")}
            className="input input-accent"
            placeholder="Enter your phone"
          />
          <p className="text-red-500 text-md">{errors.phone?.message}</p>
        </div>

        <div>
          <button className="btn btn-wide">Sign Up</button>
        </div>
        <div className="w-fit flex items-center justify-center">
          <p>Already has account ?</p>
          {/* <button className="btn btn-link">Sign In</button> */}
          <Link href="/signin" className="btn btn-link">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
