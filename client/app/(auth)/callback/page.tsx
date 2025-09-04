"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectResponse {
  redirectUrl?: string;
}

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const completeOAuth = async () => {
      try {
        const res = await fetch(
          "https://todolist-pysz.onrender.com/api/auth/google/redirect",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data: RedirectResponse = await res.json();

        if (data.redirectUrl) {
          router.replace(data.redirectUrl);
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
      }
    };

    completeOAuth();
  }, [router]);

  return <p>Logging in...</p>;
}
