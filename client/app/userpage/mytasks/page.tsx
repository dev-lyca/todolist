"use client";
import DataTable from "@/components/datatable";
import TaskModal from "@/components/modal";
import { Column } from "@/types/index";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { FaClipboard, FaPlus } from "react-icons/fa";

type Task = {
  id: number;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  deadline: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed";
};

const columns: Column<Task>[] = [
  { name: "Task", uid: "title" },
  { name: "Category", uid: "category" },
  { name: "Priority", uid: "priority" },
  { name: "Deadline", uid: "deadline" },
  { name: "Description", uid: "description" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const tasks: Task[] = [
  {
    id: 1,
    title: "Finish project report",
    category: "Work",
    priority: "High",
    deadline: "2025-08-30",
    description: "Finish the project...",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Buy groceries",
    category: "Personal",
    priority: "Medium",
    deadline: "2025-08-28",
    description: "Finish the project...",
    status: "Not Started",
  },
];

const MyTasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <section className="mt-14">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-2">
          <Button onPress={onOpen} className="bg-[#124170] text-white">
            <FaPlus />
            Add New Task
          </Button>
        </div>
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <FaClipboard className="text-xl text-[#124170]" />
              <div className="flex flex-col">
                <p className="text-md font-semibold">Tasks Table</p>
                <small className="text-sm text-default-500">
                  Overview of all tasks
                </small>
              </div>
            </div>
          </CardHeader>

          <CardBody className="w-full overflow-x-auto">
            <div className="w-full">
              <DataTable
                columns={columns}
                data={tasks}
                options={{
                  statusColorMap: {
                    "Not Started": "default",
                    "In Progress": "warning",
                    Completed: "success",
                  },
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <TaskModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
};

export default MyTasks;
