"use client";

import { useHandleRedirect } from "@/hooks/useHandleRedirect";
import { Task } from "@/types";
import { Card, CircularProgress } from "@heroui/react";
import { useEffect, useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { RiFileWarningFill } from "react-icons/ri";

const UrgentTasks = () => {
  const [tasks, settasks] = useState<Task[] | null>(null);

  useEffect(() => {
    const fetchtasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/urgent-today`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data: Task[] = await res.json();
        settasks(data.length ? data : []);
      } catch (err) {
        console.error("Error fetching tasks tasks", err);
        settasks([]);
      }
    };

    fetchtasks();
  }, []);

  const handleRedirect = useHandleRedirect();

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          {" "}
          <h1
            className="text-xl font-bold bg-gradient-to-r 
          from-orange-300 via-orange-400 to-amber-500 bg-clip-text text-transparent"
          >
            Urgent Tasks
          </h1>
        </div>
        <div
          className="flex items-center text-blue-300 cursor-pointer "
          onClick={() => {
            handleRedirect("urgent");
          }}
        >
          <span className="text-sm">View all</span>
          <span>
            <GoArrowUpRight />
          </span>
        </div>
      </div>

      {tasks === null ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress size="lg" color="default" aria-label="Loading..." />
        </div>
      ) : tasks.length === 0 ? (
        <Card
          shadow="lg"
          className="rounded-xl border-none mb-4 p-6 flex 
          flex-col items-center justify-center text-center gap-3 bg-gradient-to-tr
                  from-gray-700 via-gray-800 to-gray-600"
        >
          <div className="p-3 rounded-full bg-amber-100">
            <BsFillExclamationCircleFill className="text-amber-600 text-3xl" />
          </div>
          <h3 className="text-gray-900 font-semibold text-lg">
            No Urgent Tasks Today
          </h3>
          <p className="text-gray-800 text-sm">
            You’re all caught up — nothing needs your immediate attention right
            now!
          </p>
        </Card>
      ) : (
        <>
          <div className="hidden lg:block ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {tasks.slice(0, 3).map((task) => (
                <div key={task._id}>
                  <div
                    className="rounded-xl shadow-sm bg-gradient-to-bl 
                  from-orange-400 via-orange-200 to-gray-100
                   border-l-8 border-orange-500
                   transition hover:shadow-md p-4"
                  >
                    {/* Title */}
                    <div className="grid grid-cols-[auto,1fr] items-center gap-2">
                      <RiFileWarningFill className="text-orange-600 text-lg" />
                      <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                        {task.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Footer (status + button) */}
                    <div className="grid grid-cols-2 items-center">
                      <span
                        className={`text-xs font-medium ${
                          task.status === "Pending"
                            ? "text-default-600"
                            : task.status === "In-progress"
                              ? "text-primary-600"
                              : "text-green-600"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="block lg:hidden mb-4">
            <div className="h-[150px] overflow-y-auto space-y-4 scrollbar-hide">
              {tasks.map((task) => (
                <div key={task._id}>
                  <div
                    className="rounded-xl shadow-sm bg-gradient-to-bl 
                  from-orange-400 via-orange-200 to-gray-100
                   border-l-5 border-orange-500
                   transition hover:shadow-md p-4"
                  >
                    {/* Title */}
                    <div className="grid grid-cols-[auto,1fr] items-center gap-2">
                      <RiFileWarningFill className="text-orange-600 text-lg" />
                      <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                        {task.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Footer (status + button) */}
                    <div className="grid grid-cols-2 items-center">
                      <span
                        className={`text-xs font-medium ${
                          task.status === "Pending"
                            ? "text-default-600"
                            : task.status === "In-progress"
                              ? "text-primary-600"
                              : "text-green-600"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UrgentTasks;
