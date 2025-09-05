"use client";

import { Task } from "@/types";
import { Card } from "@heroui/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCheckCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

const CompletedToday = () => {
  const [completed, setCompleted] = useState<Task[] | null>(null);
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
    const fetchCompleted = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/completed`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch completed tasks");
        const data: Task[] = await res.json();
        setCompleted(data.length ? data : []);
      } catch (err) {
        console.error("Error fetching completed tasks", err);
        setCompleted([]);
      }
    };

    fetchCompleted();
  }, []);

  if (completed === null) return <>No completed tasks</>;

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden py-5">
      <h1 className="text-xl font-bold mb-4 text-green-600">Completed Tasks</h1>
      {completed.length === 0 ? (
        <Card
          shadow="sm"
          className="rounded-md mb-4 p-6 flex flex-col items-center justify-center text-center gap-3"
        >
          <BsFillCheckCircleFill className="text-green-500 text-4xl" />
          <h3 className="text-gray-700 font-semibold text-lg">
            No Completed Tasks
          </h3>
          <p className="text-gray-500 text-sm">
            Keep pushing! Your completed tasks will show up here once you finish
            them.
          </p>
        </Card>
      ) : (
        <div ref={sliderRef} className="keen-slider">
          {completed.map((task) => (
            <div key={task._id} className="keen-slider__slide p-2">
              <Card
                className="p-4 rounded-xl shadow-sm bg-green-50 border-l-4 border-green-500 
             flex flex-col gap-2 transition hover:shadow-md"
                as={Link}
                href={`/userpage/task/${task._id}`}
              >
                <div className="flex items-center gap-2">
                  <BsCheckCircleFill className="text-green-600 text-lg" />
                  <h2 className="text-base font-semibold text-green-800 line-clamp-1">
                    {task.title}
                  </h2>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {task.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedToday;
