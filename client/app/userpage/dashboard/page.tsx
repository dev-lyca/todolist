"use client";
import CompletedToday from "@/components/completed-today";
import OverdueTasks from "@/components/overdue-tasks";
import PendingToday from "@/components/pending-today";
import ProgressCards from "@/components/progress-cards";
import UrgentTasks from "@/components/urgent-tasks";
import { useUser } from "@/context/userContext";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";

interface TaskCounts {
  completed: number;
  pending: number;
  "in-progress": number;
}

const Dashboard = () => {
  const { user } = useUser();
  const firstName = user?.displayName?.split(" ")[0];
  const [activeSection, setActiveSection] = useState<"pending" | "completed">(
    "pending"
  );
  const [counts, setCounts] = useState<TaskCounts>({
    completed: 0,
    pending: 0,
    "in-progress": 0,
  });

  const total = counts.completed + counts.pending + counts["in-progress"];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/count`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch counts");
        const data: TaskCounts = await res.json();
        setCounts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="mt-14 mb-14 overflow-x-hidden">
      <div className="px-4 bg-gradient-br from-amber-200 to-orange-500">
        <h1 className="text-xl lg:text-lg font-semibold text-gray-800">
          Hi, {firstName}!
        </h1>
        <p
          className="text-2xl lg:text-5xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-orange-400 to-red-500 mt-2"
        >
          Make your day productive!
        </p>
        <p className="text-md lg:textlg text-gray-700 mt-2">
          Stay focused and accomplish your goals today
        </p>
      </div>

      <div className="hidden lg:block">
        <ProgressCards />
      </div>

      <Card
        shadow="md"
        className="block lg:hidden rounded-t-full px-6 mt-5 mx-2"
      >
        <ProgressCards />
      </Card>

      <Card shadow="md" className="rounded-4xl py-2 mt-5 mx-2 p-2">
        <div className="py-5 p-4">
          <UrgentTasks />
          <PendingToday />
          <CompletedToday />
          <OverdueTasks />
        </div>
      </Card>
    </section>
  );
};

export default Dashboard;
