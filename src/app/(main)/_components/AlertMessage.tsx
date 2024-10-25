'use client'

import { USER_TOKEN } from "@/utils/Instances";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlertMessage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Disable scrolling when the modal is open
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isModalOpen]);

  const Accept = () => {
    localStorage.removeItem(USER_TOKEN);
    router.push(`/signin`);
  };

  return (
    <div className="">
      <dialog id="my_modal_1" className={` modal ${isModalOpen ? 'hidden' : 'block'} sidebar`}>
        <div className="modal-box">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Hey Stellarian !</h3>
            <p>Are you sure want to Logout ?</p>
          </div>
          <div className="modal-action">
            <form className="w-full flex gap-2 justify-end items-center" method="dialog">
                <button className="btn bg-blue-500">No</button>
                <button onClick={Accept} className="btn bg-error text-white">
                  Yes
                </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
