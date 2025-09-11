"use client";
import { useRouter } from "next/navigation";

export function useHandleRedirect() {
  const router = useRouter();

  const handleRedirect = (key: string) => {
    router.push(`/userpage/mytask/${key}`);
  };

  return handleRedirect;
}
