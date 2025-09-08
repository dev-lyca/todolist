"use client";

import { Task } from "@/types";
import { Card, CircularProgress } from "@heroui/react";
import { useEffect, useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import Slider from "./slider";

const UrgentTasks = () => {
  const [tasks, settasks] = useState<Task[] | null>(null);

  useEffect(() => {
    const fetchtasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/urgent`,
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

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          {" "}
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 via-orange-400 to-amber-600 bg-clip-text text-transparent">
            Urgent Tasks
          </h1>
        </div>
        <div className="flex items-center text-blue-600 cursor-pointer">
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
          shadow="sm"
          className="rounded-md mb-4 p-6 flex flex-col items-center justify-center text-center gap-3"
        >
          <div className="p-3 rounded-full bg-amber-100">
            <BsFillExclamationCircleFill className="text-amber-600 text-3xl" />
          </div>
          <h3 className="text-gray-800 font-semibold text-lg">
            No Urgent Tasks
          </h3>
          <p className="text-gray-500 text-sm">
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
                    className="rounded-xl shadow-sm bg-amber-50 
                   border-l-4 border-amber-500
                   transition hover:shadow-md p-4"
                  >
                    {/* Title */}
                    <h2 className="text-base font-semibold text-gray-800">
                      {task.title}
                    </h2>

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
            <Slider>
              {tasks.map((task) => (
                <div key={task._id}>
                  <div
                    className="rounded-xl shadow-sm bg-amber-50 
                   border-l-4 border-amber-500
                   transition hover:shadow-md p-4"
                  >
                    {/* Title */}
                    <h2 className="text-base font-semibold text-gray-800">
                      {task.title}
                    </h2>

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
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default UrgentTasks;
