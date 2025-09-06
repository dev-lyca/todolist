"use client";

import { Task } from "@/types";
import { formatDate } from "@/utils/date";
import { Card, CircularProgress } from "@heroui/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
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

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2.2,
          spacing: 16,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 3.2,
          spacing: 20,
        },
      },
    },
  });

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pending`,
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
    <div className="w-full max-w-sm mx-auto overflow-hidden py-5">
      <div className="flex justify-between items-center mb-2">
        <div>
          {" "}
          <h1 className="text-xl font-bold text-gray-700">Pending Tasks</h1>
        </div>
        <div className="flex items-center text-gray-600">
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
          shadow="sm"
          className="rounded-md mb-4 p-6 flex flex-col items-center justify-center text-center gap-3"
        >
          <div className="p-3 rounded-full bg-gray-100">
            <BsFillClockFill className="text-gray-500 text-4xl" />
          </div>
          <h3 className="text-gray-700 font-semibold text-lg">
            No Pending Tasks Today
          </h3>
          <p className="text-gray-500 text-sm">
            Great job staying on track — nothing’s waiting for you right now!
          </p>
        </Card>
      ) : (
        <div ref={sliderRef} className="keen-slider">
          {pending.map((task) => (
            <div key={task._id} className="keen-slider__slide p-2">
              <Card
                className="p-4 rounded-xl shadow-sm bg-gray-50 border-l-4 border-gray-500 flex flex-col gap-2 transition hover:shadow-md"
                as={Link}
                href={`/userpage/task/${task._id}`}
              >
                <div className="flex items-center gap-2">
                  <BsHourglassSplit className="text-gray-600 text-lg" />
                  <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                    {task.title}
                  </h2>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {task.description}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full font-medium ${
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
                    {task.createdAt ? formatDate(task.createdAt) : "N/A"}
                  </span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingToday;
