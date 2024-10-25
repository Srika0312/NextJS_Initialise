"use client";

import { USER_TOKEN } from "@/utils/Instances";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage";

export default function NavBar() {
  const router = useRouter();

  const Routes = [
    {
      name: "Home",
      ActiveLink: "/home",
    },
    {
      name: "Requests",
      ActiveLink: "/requests",
    },
    {
      name: "Pendings",
      ActiveLink: "/pendings",
    },
    {
      name: "Blocked",
      ActiveLink: "/blocked",
    },
  ];

  return (
    <div className="navbar w-full bg-base-100 grid grid-cols-12">
      <div className="flex-1 col-span-3">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="w-full col-span-6">
        {Routes?.map((item: any, index: any) => (
          <div key={index} className="w-full flex flex-row mx-2">
            <button
              onClick={() => router.push(item?.ActiveLink)}
              className="btn w-full"
            >
              {item?.name}
            </button>
          </div>
        ))}
      </div>
      <div className="w-full flex-none flex justify-end col-span-3">
        <div className="w-fit dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li onClick={() => router.push(`/profile`)}>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Theme</a>
            </li>
            <li>
              <button
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_1"
                  ) as HTMLDialogElement;
                  if (modal) {
                    modal.showModal();
                  }
                }}
                className="btn btn-sm hover:bg-error hover:text-slate-800"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <AlertMessage />
      </div>
    </div>
  );
}
