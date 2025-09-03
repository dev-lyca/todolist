"use client";

import { Button, Card, Image } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-10">
      <Card className="w-full max-w-lg sm:max-w-sm p-8 shadow-xl rounded-2xl bg-black">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={250}
              height={150}
              className="object-contain"
            />
          </div>

          <p className="text-gray-200 text-sm mb-8">
            Manage your tasks easily and stay organized every day.
          </p>

          <Button
            size="md"
            className="flex items-center gap-3 px-6 py-3 rounded-xl shadow-md bg-white"
            radius="md"
            onPress={handleGoogleLogin}
          >
            <FaGoogle className="text-xl" />
            <span className="font-medium text-black">Sign in with Google</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
