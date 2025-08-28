"use client";

import { Button, Card, Checkbox, Input } from "@heroui/react";
import { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Card className="">
      <div className="flex">
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl text-[#124170] font-bold mb-6">
              {isRegister ? "Create a New Account" : "Log in to your Account"}
            </h1>

            <div className="flex flex-row justify-center gap-3 mb-4">
              <Button color="danger" size="md" className="p-2" radius="sm">
                <FaGoogle className="text-4xl" />
              </Button>
              <Button color="primary" size="md" className="p-2" radius="sm">
                <FaFacebookF className="text-4xl" />
              </Button>
            </div>

            <form className="flex flex-col gap-4">
              {isRegister && (
                <Input
                  label="Name"
                  placeholder="Enter your full name"
                  type="text"
                  className="mb-4"
                />
              )}

              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                className="mb-4"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                className="mb-4"
              />

              {isRegister && (
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  className="mb-4"
                />
              )}

              {!isRegister && (
                <div className="flex justify-between items-center text-sm">
                  <label>
                    <Checkbox>Remember me</Checkbox>
                  </label>
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button
                color="primary"
                variant="shadow"
                className="text-white py-2 rounded-lg"
              >
                {isRegister ? "Register" : "Log In"}
              </Button>

              <p className="text-center text-sm">
                {isRegister
                  ? "Already have an account?"
                  : "Don’t have an account?"}{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Log in" : "Create an account"}
                </button>
              </p>
            </form>
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
