"use client";

import MobileFooterNav from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { UserProvider } from "@/context/userContext";
import "@/styles/globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="flex h-screen text-[#4a3f35] bg-gray-900">
        <aside className="fixed top-0 left-0 h-screen w-64 bg-[#f5ebe0] shadow-md hidden lg:block">
          <Sidebar />
        </aside>

        <div className="flex-1 ml-0 lg:ml-64">
          <div className="fixed top-0 left-0 lg:left-64 right-0 z-50 mb-4">
            <Navbar />
          </div>

          <main className="flex-1 overflow-y-hidden px-4 py-6 w-full ">
            <div className="">{children}</div>
          </main>
        </div>

        <MobileFooterNav />
      </div>
    </UserProvider>
  );
}
