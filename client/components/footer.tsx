"use client";

import Link from "next/link";
import { FaCalendarAlt, FaHome, FaList, FaTasks } from "react-icons/fa";

export default function MobileFooterNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-400 shadow-md sm:hidden z-50 h-20">
      <div className="flex justify-around items-center py-2">
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

        <Link
          href="/userpage/calendar"
          className="flex flex-col items-center text-gray-600 hover:text-orange-600"
        >
          <FaCalendarAlt className="text-xl" />
          <span className="text-xs mt-1">Calendar</span>
        </Link>

        <Link
          href="/userpage/category"
          className="flex flex-col items-center text-gray-600 hover:text-orange-600"
        >
          <FaList className="text-xl" />
          <span className="text-xs mt-1">Category</span>
        </Link>
      </div>
    </nav>
  );
}
