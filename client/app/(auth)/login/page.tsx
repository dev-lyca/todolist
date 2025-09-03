"use client";

import { Button, Card, Image } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Card className="w-full max-w-lg p-8 shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>

          <p className="text-gray-600 text-sm mb-8">
            Manage your tasks easily and stay organized every day.
          </p>

          <Button
            color="danger"
            size="lg"
            className="flex items-center gap-3 px-6 py-3 rounded-xl shadow-md"
            radius="md"
            onPress={handleGoogleLogin}
          >
            <FaGoogle className="text-xl" />
            <span className="font-medium">Sign in with Google</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
