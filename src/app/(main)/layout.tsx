"use client";

import NavBar from "./_components/page";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
      <div className="w-full h-dvh flex flex-col gap-4">
        <div className="w-full">
          <NavBar />
        </div>
        <div className="w-full">{children}</div>
      </div>
  );
}
