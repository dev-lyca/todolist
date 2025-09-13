"use client";

import { siteConfig } from "@/config/site";
import { useDisclosure } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import TaskModal from "./modal";

export default function MobileFooterNav() {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-400 shadow-md sm:hidden z-50 h-20">
        <div className="flex justify-around items-center relative h-full px-4">
          {siteConfig.sideBarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center ${
                  pathname === item.href
                    ? "text-amber-500"
                    : "text-gray-50 hover:text-amber-600"
                }`}
              >
                <Icon className="text-xl" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}

          {/* Floating Add Button - absolute on right */}
          <div className="absolute -top-20 right-5">
            <button
              onClick={onOpen}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <FaPlus className="text-white text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      <TaskModal isOpen={isOpen} onClose={onOpenChange} />
    </>
  );
}
