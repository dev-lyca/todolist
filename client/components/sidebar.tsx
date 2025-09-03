"use client";
import { siteConfig } from "@/config/site";
import { Image } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-screen bg-[#fdfaf6] text-[#4a3f35] overflow-hidden">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#1a1717] p-6 shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>

        <nav className="space-y-4 text-white">
          {siteConfig.sideBarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors
              ${
                isActive
                  ? "bg-white text-[#000000] font-semibold"
                  : "hover:bg-white hover:text-[#020709]"
              }`}
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
