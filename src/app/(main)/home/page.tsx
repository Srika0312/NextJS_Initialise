"use client";

import AddFriend from "../_components/AddFriend";
import Table from "../_components/Table";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1>Friends</h1>
      <button
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_2"
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}
        className="btn btn-sm hover:bg-error hover:text-slate-800"
      >
        Invite Friends
      </button>
      <Table />
      <AddFriend />
    </div>
  );
}
