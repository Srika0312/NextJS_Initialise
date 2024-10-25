"use client";

import { useContext } from "react";
import { UserContext } from "../_contexts/UserContextProvider";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { Data } = useContext(UserContext);
  // console.log(Data?.name)
  //   const [StoreData,SetStoreData] = useContext(UserContext)

  const router = useRouter();

  return (
    <div className="w-full h-4/6 flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center">Profile</h1>
        <div className="flex items-end gap-3">
          <div className="flex flex-col text-md">
            <h1>Name</h1>
            <h1>Email</h1>
            <h1>Phone</h1>
          </div>
          {Data?.map((item: any, index: any) => (
            <div key={index} className="flex flex-col">
              <h1 className="text-red-500">{item?.name}</h1>
              <h1 className="text-red-500">{item?.email}</h1>
              <h1 className="text-red-500">{item?.phone}</h1>
            </div>
          ))}
        </div>
        {/* <div className="flex gap-3 w-full">
          <button onClick={() => router.push(`/edit-profile`)}>
            Edit
          </button>
          <button onClick={() => router.push(`/change-password`)}>
            Change Password
          </button>
        </div> */}
      </div>
    </div>
  );
}
