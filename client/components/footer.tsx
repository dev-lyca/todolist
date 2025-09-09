"use client";

import { useDisclosure } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ import hook
import { FaCalendarAlt, FaHome, FaList, FaPlus, FaTasks } from "react-icons/fa";
import TaskModal from "./modal";

export default function MobileFooterNav() {
  const {
    isOpen: isAddOpenn,
    onOpen: onOpenAdd,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const pathname = usePathname(); 

  const navItems = [
    {
      href: "/userpage/dashboard",
      label: "Dashboard",
      icon: <FaHome className="text-xl" />,
    },
    {
      href: "/userpage/mytasks",
      label: "My Tasks",
      icon: <FaTasks className="text-xl" />,
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-400 shadow-md sm:hidden z-50 h-20">
        <div className="flex justify-around items-center relative h-full">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center transition-colors ${
                pathname === item.href
                  ? "text-amber-500"
                  : "text-gray-50 hover:text-amber-600"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}

          {/* Add button */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-lg hover:scale-110 transition-transform duration-200">
              <FaPlus className="text-white text-2xl" onClick={onOpenAdd} />
            </div>
          </div>

          {navItems.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center transition-colors ${
                pathname === item.href
                  ? "text-amber-500"
                  : "text-gray-50 hover:text-amber-600"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <TaskModal isOpen={isAddOpenn} onClose={onAddOpenChange} />
    </>
  );
}
