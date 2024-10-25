"use client";

import { USER_TOKEN } from "@/utils/Instances";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      router.push(`/home`);
    }
  }, []);

  return <div className="w-full h-dvh">{children}</div>;
}