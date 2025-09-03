"use client";
import { useUser } from "@/context/userContext";
import { Task } from "@/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  Skeleton,
} from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegClipboard } from "react-icons/fa";
import { IoBarChart, IoCheckmarkCircleOutline } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import { TbMoodEmptyFilled } from "react-icons/tb";

interface TaskCounts {
  completed: number;
  pending: number;
  "in-progress": number;
}

const Dashboard = () => {
  const { user } = useUser();
  const firstName = user?.displayName?.split(" ")[0];

  const [pending, setPending] = useState<Task[] | null>(null);
  const [completed, setCompleted] = useState<Task[] | null>(null);
  const [loading, isLoading] = useState(false);
  const [cloading, isCLoading] = useState(false);
  const [counts, setCounts] = useState<TaskCounts>({
    completed: 0,
    pending: 0,
    "in-progress": 0,
  });

  const total = counts.completed + counts.pending + counts["in-progress"];

  const completedPercent = total ? (counts.completed / total) * 100 : 0;
  const inProgressPercent = total ? (counts["in-progress"] / total) * 100 : 0;
  const pendingPercent = total ? (counts.pending / total) * 100 : 0;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/count`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch counts");
        const data: TaskCounts = await res.json();
        setCounts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchPending = async () => {
      isLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pending`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch pending tasks");
        const data: Task[] = await res.json();
        setPending(data.length ? data : []);
      } catch (err) {
        console.error("Error fetching pending tasks", err);
        setPending([]);
      } finally {
        isLoading(false);
      }
    };

    const fetchCompleted = async () => {
      isCLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/completed`,
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
      } finally {
        isLoading(false);
      }
    };

    fetchPending();
    fetchCompleted();
  }, []);

  if (pending === null) return <p>No data</p>;
  if (completed === null) return <p>No data</p>;

  return (
    <section className="mt-14 overflow-x-hidden">
      <h1 className="text-2xl mb-2 text-[#000000f6] font-bold">
        Welcome back, {firstName}!
      </h1>
      <div className="flex justify-center items-center mt-10 px-4">
        <Card className="w-full p-4 shadow-lg rounded-lg">
          <CardHeader className="flex items-center gap-3">
            <IoBarChart className="text-xl text-[#000000]" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Task Chart</p>
              <small className="text-small text-default-500">
                Overall progress
              </small>
            </div>
          </CardHeader>

          <CardBody className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">✅ Completed</span>
              <span className="font-semibold text-success">
                {counts.completed}
              </span>
            </div>
            <Progress
              value={completedPercent}
              color="success"
              className="h-3 rounded-lg"
            />

            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">⏳ In Progress</span>
              <span className="font-semibold text-warning">
                {counts["in-progress"]}
              </span>
            </div>
            <Progress
              value={inProgressPercent}
              color="warning"
              className="h-3 rounded-lg"
            />

            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">📝 Pending</span>
              <span className="font-semibold text-danger">
                {counts.pending}
              </span>
            </div>
            <Progress
              value={pendingPercent}
              color="danger"
              className="h-3 rounded-lg"
            />
          </CardBody>
          <CardFooter className="flex justify-end text-xs text-default-400">
            Updated: 08/28/2025
          </CardFooter>
        </Card>
      </div>
      <div className="flex items-center justify-center py-8 md:py-7 px-4">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 
      w-full max-w-7xl"
        >
          <Card className="w-full">
            <CardHeader className="flex-col items-start">
              <div className="flex items-center gap-1 pb-5 text-medium text-[#000000] font-bold">
                <div>
                  <FaRegClipboard />
                </div>
                <div>
                  <h1>To-Do</h1>
                </div>
              </div>
              <div className="flex justify-between gap-1">
                <p className="text-sm font-semibold mr-1">
                  {new Date().toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
                <p className="text-small text-default-500 before:content-['•'] before:mr-1">
                  Today
                </p>
              </div>
            </CardHeader>

            <CardBody className="flex flex-col gap-2 px-5">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <Card
                    key={idx}
                    className="border border-gray-500 rounded-md mb-4 animate-pulse"
                  >
                    <CardHeader className="flex-col items-start">
                      <div className="flex items-center gap-1 pb-5 text-medium text-[#000000] font-semibold">
                        <Skeleton className="h-5 w-5 rounded-full" />{" "}
                        <Skeleton className="h-6 w-40 rounded" />{" "}
                      </div>

                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-12 rounded" />
                        <Skeleton className="h-4 w-16 rounded" />
                      </div>
                    </CardHeader>

                    <CardBody className="flex flex-row justify-between sm:gap-2">
                      <Skeleton className="flex-1 h-10 rounded" />
                    </CardBody>

                    <CardFooter className="flex flex-row justify-between text-sm gap-4">
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </CardFooter>
                  </Card>
                ))
              ) : pending.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-82 w-full text-gray-500">
                  <TbMoodEmptyFilled size={80} className="mb-4 text-gray-400" />
                  <p className="text-xl font-medium">No data</p>
                </div>
              ) : (
                pending.map((task) => (
                  <Card
                    key={task._id}
                    className="border border-gray-500 rounded-md"
                    as={Link}
                    href={`/userpage/task/${task._id}`}
                  >
                    <CardHeader className="flex justify-between gap-3">
                      <h5 className="font-semibold text-wrap">{task.title}</h5>
                    </CardHeader>
                    <CardBody className="flex flex-row justify-between sm:gap-2">
                      <div className="flex-1 line-clamp-2">
                        {" "}
                        {task.description}
                      </div>
                    </CardBody>
                    <CardFooter className="flex-col-3 gap-4 text-sm">
                      <div>
                        <p>
                          Priority:{" "}
                          <span className="text-blue-500">{task.priority}</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          Status:{" "}
                          <span className="text-orange-800">{task.status}</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          Created at:{" "}
                          <span className="text-[#1f5d3c]">
                            {task.deadline
                              ? new Date(task.deadline).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )
                              : "No deadline"}
                          </span>
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </CardBody>
          </Card>

          {/* Completed */}
          {cloading ? (
            <Card className="w-full">
              <CardHeader className="flex-col items-start">
                <div className="flex items-center gap-1 pb-5 text-medium text-[#000000] font-semibold">
                  <Skeleton className="h-5 w-5 rounded-full" />{" "}
                  <Skeleton className="h-6 w-40 rounded" />{" "}
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-12 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </CardHeader>

              {/* Card Body */}
              <CardBody className="flex flex-col gap-2 px-7">
                {[1, 2].map((i) => (
                  <Card
                    key={i}
                    className="border border-gray-500 rounded-md animate-pulse"
                  >
                    <CardHeader className="flex justify-between gap-3">
                      <Skeleton className="h-5 w-2/3 rounded" />{" "}
                      <Skeleton className="h-5 w-5 rounded-full" />{" "}
                    </CardHeader>

                    <CardBody className="flex flex-row justify-between sm:gap-2">
                      <Skeleton className="flex-1 h-16 rounded" />{" "}
                      <Skeleton className="h-20 w-24 rounded" />{" "}
                    </CardBody>

                    <CardFooter className="flex justify-between items-start gap-0 text-sm">
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-4 w-24 rounded" />{" "}
                    </CardFooter>
                  </Card>
                ))}
              </CardBody>
            </Card>
          ) : completed.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-82 w-full text-gray-500">
              <TbMoodEmptyFilled size={80} className="mb-4 text-gray-400" />
              <p className="text-xl font-medium">No completed tasks</p>
            </div>
          ) : (
            <Card className="w-full">
              <CardHeader className="flex-col items-start">
                <div className="flex items-center gap-1 pb-5 text-medium text-[#000000] font-semibold">
                  <FaCheckCircle className="text-lg" />
                  <h1>Completed Tasks</h1>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold mr-1">
                    {new Date().toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                  <p className="text-small text-default-500 before:content-['•'] before:mr-1">
                    Today
                  </p>
                </div>
              </CardHeader>

              <CardBody className="flex flex-col gap-2 px-7">
                {completed.map((task) => (
                  <Card
                    key={task._id}
                    className="border border-gray-500 rounded-md"
                  >
                    <CardHeader className="flex justify-between gap-3">
                      <h5 className="font-semibold text-wrap">{task.title}</h5>
                      <Dropdown>
                        <DropdownTrigger>
                          <PiDotsThreeBold className="font-bold text-lg" />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="completed" className="px-2 py-1">
                            <div className="flex items-center gap-2 text-success">
                              <IoCheckmarkCircleOutline className="text-lg" />
                              <span>Mark as Completed</span>
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </CardHeader>

                    <CardBody className="flex flex-row justify-between sm:gap-2">
                      <div className="flex-1">{task.description}</div>
                    </CardBody>

                    <CardFooter className="flex justify-between gap-0 text-sm">
                      <div>
                        <p>
                          Status:{" "}
                          <span className="text-success font-semibold">
                            {task.status}
                          </span>
                        </p>
                      </div>
                      {/* <div>
                        <small>
                          Completed{" "}
                          {new Date(task.completedAt).toLocaleDateString(
                            "en-US"
                          )}
                        </small>
                      </div> */}
                    </CardFooter>
                  </Card>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
