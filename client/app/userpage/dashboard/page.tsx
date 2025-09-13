"use client";
import CompletedToday from "@/components/completed-today";
import OverdueTasks from "@/components/overdue-tasks";
import PendingToday from "@/components/pending-today";
import ProgressCards from "@/components/progress-cards";
import UrgentTasks from "@/components/urgent-tasks";
import { useUser } from "@/context/userContext";
import { Card, Divider } from "@heroui/react";

const Dashboard = () => {
  const { user } = useUser();
  const firstName = user?.displayName?.split(" ")[0];

  return (
    <section className="mt-14 overflow-x-hidden">
      <div className="px-4 bg-gradient-br from-amber-200 to-orange-500">
        <h1 className="text-lg lg:text-xl font-semibold text-gray-50">
          Hi, {firstName}!
        </h1>
        <p
          className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-orange-400 to-red-500 mt-2"
        >
          Make your day productive!
        </p>
        <p className="text-sm lg:textlg text-gray-100 mt-2">
          Stay focused and accomplish your goals today
        </p>
      </div>

      <div className="hidden lg:block">
        <ProgressCards />
      </div>

      <Card
        shadow="md"
        className="block lg:hidden rounded-t-full px-6 mt-5 mx-2 
        bg-gradient-to-b from-gray-700 to-gray-900"
      >
        <ProgressCards />
      </Card>

      <div
        className="rounded-t-xl rounded-b-md pb-30 py-2 mt-5 mx-2 p-2
       bg-gradient-to-b from-gray-900 via-gray-800 to-gray-800"
      >
        <div className="py-5 p-4">
          <UrgentTasks />
          <Divider />
          <PendingToday />
          <Divider />
          <CompletedToday />
          <Divider />
          <OverdueTasks />
          <Divider />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
