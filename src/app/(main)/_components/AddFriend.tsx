"use client";

import { AxiosInstance } from "@/utils/Instances";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  to: z.string().nonempty({ message: "Email is required" }).email(),
  // subject: z.string().nonempty({ message: "Subject is required" }),
  // text: z.string().nonempty({ message: "Content is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function AddFriend() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <form
          className="modal-box"
          method="dialog"
          onSubmit={handleSubmit(async (data: any) => {
            try {
              const response = await AxiosInstance.post(
                "/api/mail/mailsender",
                {
                  name: data.name,
                  to: data.to,
                  // subject: data.subject,
                  // text: data.text,
                }
              );
              console.log(response?.data);
              toast.success(response?.data?.message);
            } catch (error: any) {
              console.log(error?.response?.data?.message);
              toast.error(error?.response?.data?.message);
            }
          })}
        >
          <div className="w-full flex items-center justify-between gap-2">
            <h3 className="text-lg">Invite a Stellarian</h3>
            <p className="font-semibold">Esc to Close</p>
          </div>
          <div className="modal-action">
            <div className="w-full flex flex-col gap-2 items-end">
              <input
                {...register("name")}
                type="text"
                placeholder="Your friend name"
                className="input input-bordered w-full"
              />
              <p className="text-red-500 text-md">{errors.name?.message}</p>
              <input
                {...register("to")}
                type="text"
                placeholder="example@outlook.com"
                className="input input-bordered w-full"
              />
              <p className="text-red-500 text-md">{errors.to?.message}</p>
              {/* <input
                {...register("subject")}
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full"
              />
              <p className="text-red-500 text-md">{errors.subject?.message}</p>
              <textarea
                {...register("text")}
                className="w-full textarea textarea-bordered"
                placeholder="Write your message ..."
              ></textarea>
              <p className="text-red-500 text-md">{errors.text?.message}</p> */}
              <button
                type="submit"
                className="btn justify-end bg-blue-500 text-white font-normal"
              >
                Invite
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
}
