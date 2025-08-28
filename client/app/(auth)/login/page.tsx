"use client";

import { Card, Checkbox, Input } from "@heroui/react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <Card className="">
      <div className="flex">
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl text-[#124170] font-bold mb-6">
              Log in to your Account
            </h1>

            <div className="flex flex-col gap-3 mb-4">
              <button
                className="flex items-center justify-center gap-2 
              border rounded-lg py-2 px-4 bg-red-700 text-white hover:text-red-500 hover:bg-white"
              >
                <FaGoogle />
                Continue with Google
              </button>
              <button
                className="flex items-center justify-center gap-2 
              border rounded-lg py-2 px-4 bg-blue-500 text-white hover:bg-white hover:text-blue-500"
              >
                <FaFacebookF className="text-blue-500" />
                Continue with Facebook
              </button>
            </div>

            <form className="flex flex-col gap-4">
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

              <div className="flex justify-between items-center text-sm">
                <label>
                  <Checkbox>Remember me</Checkbox>
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Log In
              </button>
              <p className="text-center text-sm">
                Don’t have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Create an account
                </a>
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
