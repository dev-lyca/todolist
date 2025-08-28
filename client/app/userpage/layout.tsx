import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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

      <div className="flex flex-col flex-1 lg:ml-64">
        <Navbar />

        <main
          className="flex-1 overflow-y-auto container 
              mx-auto max-w-7xl px-6 py-6 flex flex-col items-center"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
