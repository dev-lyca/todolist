"use client";

import { useHandleRedirect } from "@/hooks/useHandleRedirect";
import { Task } from "@/types";
import { formatDate } from "@/utils/date";
import { Card, CardFooter, CircularProgress } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BsFillCalendar2Fill,
  BsFillClockFill,
  BsHourglassSplit,
} from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";

const PendingToday = () => {
  const [pending, setPending] = useState<Task[] | null>(null);
  const handleRedirect = useHandleRedirect();

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pending-today`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch pending tasks");
        const data: Task[] = await res.json();
        setPending(data.length ? data : []);
      } catch (err) {
        console.error("Error fetching pending tasks", err);
        setPending([]);
      }
    };

    fetchPending();
  }, []);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          {" "}
          <h1 className="text-xl font-bold text-gray-100">Pending Tasks</h1>
        </div>
        <div
          className="flex items-center text-blue-300 cursor-pointer"
          onClick={() => {
            handleRedirect("pending");
          }}
        >
          <span className="text-sm">View all</span>
          <span>
            <GoArrowUpRight />
          </span>
        </div>
      </div>

      {pending === null ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress size="lg" color="default" aria-label="Loading..." />
        </div>
      ) : pending.length === 0 ? (
        <Card
          shadow="lg"
          className="rounded-xl border-none mb-4 p-6 flex 
          flex-col items-center justify-center text-center gap-3 bg-gradient-to-tr
                  from-gray-500 via-gray-300 to-gray-600"
        >
          <div className="p-3 rounded-full bg-gray-100">
            <BsFillClockFill className="text-gray-500 text-4xl" />
          </div>
          <h3 className="text-gray-900 font-semibold text-lg">
            No Pending Tasks Today
          </h3>
          <p className="text-gray-800 text-sm">
            Great job staying on track — nothing’s waiting for you right now!
          </p>
        </Card>
      ) : (
        <>
          <div className="hidden lg:block ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {pending.slice(0, 3).map((task) => (
                <Card
                  key={task._id}
                  className="rounded-xl shadow-sm bg-gradient-to-bl 
                  from-gray-400 via-gray-200 to-gray-100
                   border-l-8 border-gray-500
                   transition hover:shadow-md p-4"
                  as={Link}
                  href={`/userpage/task/${task._id}`}
                >
                  <div className="flex items-center gap-2">
                    <BsHourglassSplit className="text-gray-600 text-lg" />
                    <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                      {task.title}
                    </h2>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 truncate">
                    {task.description}
                  </p>

                  <CardFooter className="flex items-center justify-between text-xs">
                    <span
                      className={`px-2 rounded-full font-medium ${
                        task.priority === "Urgent"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "Moderate"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span className="flex items-center gap-1 text-gray-500">
                      <BsFillCalendar2Fill className="text-emerald-600 text-sm" />
                      {task.deadline ? formatDate(task.deadline) : "N/A"}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          <div className="block lg:hidden mb-4">
            <div className="h-[150px] overflow-y-auto space-y-4 scrollbar-hide">
              {pending.map((task) => (
                <div
                  key={task._id}
                  className="rounded-xl shadow-sm bg-gradient-to-bl 
                  from-gray-400 via-gray-200 to-gray-100
                   border-l-5 border-gray-500
                   transition hover:shadow-md p-4"
                >
                  <div className="grid grid-cols-[auto,1fr] items-center gap-2">
                    <BsHourglassSplit className="text-gray-600 text-lg" />
                    <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                      {task.title}
                    </h2>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 truncate">
                    {task.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PendingToday;
