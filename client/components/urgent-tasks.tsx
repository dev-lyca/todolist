"use client";

import { Task } from "@/types";
import { Card, CircularProgress } from "@heroui/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";

export default function UrgentTasksSlider() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.5,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 1.2,
          spacing: 8,
        },
      },
    },
  });

  useEffect(() => {
    const fetchUrgent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/urgent`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch urgent tasks");
        const data: Task[] = await res.json();
        setTasks(data.length ? data : []);
      } catch (err) {
        console.error("Error fetching urgent tasks", err);
        setTasks([]);
      }
    };

    fetchUrgent();
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden py-5 mt-3">
      {" "}
      <div className="flex justify-between items-center mb-2">
        <div>
          {" "}
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 via-orange-400 to-amber-600 bg-clip-text text-transparent">
            Urgent Tasks
          </h1>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="text-sm">View all</span>
          <span>
            <GoArrowUpRight />
          </span>
        </div>
      </div>
      {tasks === null ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress size="lg" color="warning" aria-label="Loading..." />
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
        <div ref={sliderRef} className="keen-slider">
          {tasks.map((task) => (
            <div className="keen-slider__slide p-2">
              <Card
                key={task._id}
                className="p-4 rounded-xl shadow-md bg-amber-50 border-l-4 border-amber-500 flex flex-col gap-3"
              >
                <h2 className="text-base font-semibold text-gray-800">
                  {task.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {task.description}
                </p>

                <div className="flex justify-between items-center mt-2">
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
                  <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-amber-600 transition-colors">
                    View
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
