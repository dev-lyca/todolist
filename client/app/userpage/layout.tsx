"use client";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { UserProvider } from "@/context/userContext";
import "@/styles/globals.css";
import { ToastProvider } from "@heroui/react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen text-[#4a3f35]">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#f5ebe0] shadow-md hidden lg:block">
        <Sidebar />
      </aside>

      <UserProvider>
        <ToastProvider />
        <div className="flex-1 ml-0 lg:ml-64">
          <div className="fixed top-0 left-0 lg:left-64 right-0 z-50 mb-4">
            <Navbar />
          </div>

          <main className="flex-1 overflow-y-auto px-6 py-6 container mx-auto max-w-7xl flex flex-col gap-6">
            <div>{children}</div>
          </main>
        </div>
      </UserProvider>
    </div>
  );
}
