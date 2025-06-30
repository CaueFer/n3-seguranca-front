"use client";

import SpinnerSvg from "@/components/svg/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  });
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen">
      <SpinnerSvg className="size-7" />
    </div>
  );
}
