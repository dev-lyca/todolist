"use client";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-screen bg-[#fdfaf6] text-[#4a3f35] overflow-hidden">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#000000] p-6 shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <FaTasks className="text-3xl text-[#ffffff]" />
          <h1 className="text-3xl font-bold text-[#ffffff]">ToDo List</h1>
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
