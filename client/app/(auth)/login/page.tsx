"use client";

import { Button, Card } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <Card className="">
      <div className="flex">
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl text-[#124170] font-bold mb-6">
              Log in to your Account
            </h1>

            <div className="flex flex-row justify-center gap-3 mb-4">
              <Button
                color="danger"
                size="md"
                className="p-2"
                radius="sm"
                onPress={handleGoogleLogin}
              >
                <FaGoogle className="text-4xl" />
                Login using Google
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#124170] text-white hidden lg:flex items-center justify-center p-8">
          <div className="text-center">
            <img
              src="/images/auth.png"
              alt="Illustration"
              className="mx-auto mb-6 max-h-[60vh]"
            />
            <h2 className="text-2xl font-bold mb-2">
              Stay Organized with Your To-Do List
            </h2>
            <p>
              Manage tasks, set priorities, and track your progress all in one
              simple dashboard.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
