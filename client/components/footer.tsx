"use client";

import { useDisclosure } from "@heroui/react";
import Link from "next/link";
import { FaCalendarAlt, FaHome, FaList, FaPlus, FaTasks } from "react-icons/fa";
import TaskModal from "./modal";

export default function MobileFooterNav() {
  const {
    isOpen: isAddOpenn,
    onOpen: onOpenAdd,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-400 shadow-md sm:hidden z-50 h-20">
        <div className="flex justify-around items-center relative h-full">
          <Link
            href="/userpage/dashboard"
            className="flex flex-col items-center text-gray-600 hover:text-orange-600"
          >
            <FaHome className="text-xl" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>

          <Link
            href="/userpage/mytasks"
            className="flex flex-col items-center text-gray-600 hover:text-orange-600"
          >
            <FaTasks className="text-xl" />
            <span className="text-xs mt-1">My Tasks</span>
          </Link>

          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-lg hover:scale-110 transition-transform duration-200">
              <FaPlus className="text-white text-2xl" onClick={onOpenAdd} />
            </div>
          </div>

          <Link
            href="/userpage/calendar"
            className="flex flex-col items-center text-gray-600 hover:text-orange-600"
          >
            <FaCalendarAlt className="text-xl" />
            <span className="text-xs mt-1">Calendar</span>
          </Link>

          {/* Category */}
          <Link
            href="/userpage/category"
            className="flex flex-col items-center text-gray-600 hover:text-orange-600"
          >
            <FaList className="text-xl" />
            <span className="text-xs mt-1">Category</span>
          </Link>
        </div>
      </nav>
      <TaskModal isOpen={isAddOpenn} onClose={onAddOpenChange} />
    </>
  );
}
