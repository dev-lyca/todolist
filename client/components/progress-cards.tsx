"use client";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Progress,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { IoBarChart } from "react-icons/io5";

interface TaskCounts {
  completed: number;
  pending: number;
  "in-progress": number;
}

const ProgressCards = () => {
  const [counts, setCounts] = useState<TaskCounts>({
    completed: 0,
    pending: 0,
    "in-progress": 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/count`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch counts");
        const data: TaskCounts = await res.json();
        setCounts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const total = counts.completed + counts.pending + counts["in-progress"];
  const completedPercent = total ? (counts.completed / total) * 100 : 0;
  const inProgressPercent = total ? (counts["in-progress"] / total) * 100 : 0;
  const pendingPercent = total ? (counts.pending / total) * 100 : 0;

  return (
    <>
      <div className="hidden lg:flex flex-row justify-center items-center mt-10 px-4 gap-4">
        {/* Completed */}
        <Card className="w-full p-4 shadow-lg rounded-lg">
          <CardHeader className="flex items-center gap-3">
            <IoBarChart className="text-xl text-success" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Completed Tasks</p>
              <small className="text-small text-default-500">
                Overall progress
              </small>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-6">
                <CircularProgress
                  color="success"
                  aria-label="Loading completed tasks"
                />
              </div>
            ) : (
              <>
                <span className="flex justify-end font-semibold text-success">
                  {completedPercent.toFixed(0)} %
                </span>
                <Progress
                  value={completedPercent}
                  color="success"
                  className="h-3 rounded-lg"
                />
              </>
            )}
          </CardBody>
        </Card>

        {/* In-Progress */}
        <Card className="w-full p-4 shadow-lg rounded-lg">
          <CardHeader className="flex items-center gap-3">
            <IoBarChart className="text-xl text-primary" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">In-Progress Tasks</p>
              <small className="text-small text-default-500">
                Overall progress
              </small>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-6">
                <CircularProgress
                  color="primary"
                  aria-label="Loading in-progress tasks"
                />
              </div>
            ) : (
              <>
                <span className="flex justify-end font-semibold text-primary">
                  {inProgressPercent.toFixed(0)} %
                </span>
                <Progress
                  value={inProgressPercent}
                  color="primary"
                  className="h-3 rounded-lg"
                />
              </>
            )}
          </CardBody>
        </Card>

        {/* Pending */}
        <Card className="w-full p-4 shadow-lg rounded-lg">
          <CardHeader className="flex items-center gap-3">
            <IoBarChart className="text-xl text-warning" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Pending Tasks</p>
              <small className="text-small text-default-500">
                Overall progress
              </small>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-6">
                <CircularProgress
                  color="warning"
                  aria-label="Loading pending tasks"
                />
              </div>
            ) : (
              <>
                <span className="flex justify-end font-semibold text-warning">
                  {pendingPercent.toFixed(0)} %
                </span>
                <Progress
                  value={pendingPercent}
                  color="warning"
                  className="h-3 rounded-lg"
                />
              </>
            )}
          </CardBody>
        </Card>
      </div>
      <div className="flex lg:hidden flex-row items-center mt-10 mb-5 gap-6 justify-center p-2">
        <div className="relative flex items-center justify-center">
          <CircularProgress
            aria-label="Completed tasks"
            color="success"
            size="md"
            value={loading ? 0 : completedPercent}
            showValueLabel={true}
            label="Completed"
            className="text-white"
          />
        </div>

        <div className="relative flex items-center justify-center">
          <CircularProgress
            aria-label="Ongoing tasks"
            color="primary"
            size="md"
            value={loading ? 0 : inProgressPercent}
            showValueLabel={true}
            label="Ongoing"
            className="text-white"
          />
        </div>

        <div className="relative flex items-center justify-center">
          <CircularProgress
            aria-label="Pending tasks"
            color="warning"
            size="md"
            value={loading ? 0 : pendingPercent}
            showValueLabel={true}
            label="Pending"
            className="text-white"
          />
        </div>
      </div>
    </>
  );
};

export default ProgressCards;
