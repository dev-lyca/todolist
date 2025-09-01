"use client";
import { SearchIcon } from "@/components/icons";
import TaskModal from "@/components/modal";
import { useUser } from "@/context/userContext";
import useAuth from "@/hooks/useAuth";
import { Task } from "@/types";
import { Input } from "@heroui/input";
import {
  Card,
  CardBody,
  Checkbox,
  Chip,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa";

const MyTasks = () => {
  const { user } = useUser();
  useAuth(user);
  
  const [checked, setChecked] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    isOpen: isAddOpenn,
    onOpen: onOpenAdd,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  useEffect(() => {
    let isMounted = true;

    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/all-tasks", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data: Task[] = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    const interval = setInterval(fetchTasks, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress aria-label="Loading tasks..." color="primary" />
      </div>
    );
  }

  return (
    <section className="mt-14 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
        <div className="w-full sm:w-1/2">
          {" "}
          <Input
            aria-label="Search"
            classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
            labelPlacement="outside"
            placeholder="Search tasks..."
            startContent={
              <SearchIcon className="text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
          />
        </div>

        <div className="flex-shrink-0">
          <div className="flex gap-2">
            {!checked && (
              <FaPlus
                size={30}
                className="text-blue-700 cursor-pointer text-xl pr-3"
                onClick={onOpenAdd}
              />
            )}
            {!checked ? (
              <div className="flex items-center gap-2">
                <Checkbox isSelected={checked} onValueChange={setChecked} />
              </div>
            ) : (
              <FaTrash
                size={30}
                className="text-red-500 cursor-pointer text-xl pr-3"
                onClick={() => setChecked(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {tasks.map((task) => (
          <Card
            key={task._id}
            className="mb-4"
            style={{ backgroundColor: task.color || "#FFFFFF" }}
          >
            <CardBody className="w-full">
              <div className="flex flex-row gap-10 items-center">
                {checked && (
                  <div>
                    <Checkbox />
                  </div>
                )}
                <div className="flex-1 pr-4">
                  <Chip
                    size="sm"
                    color={
                      task.status === "Pending"
                        ? "default"
                        : task.status === "In-progress"
                          ? "primary"
                          : "success"
                    }
                  >
                    {task.status}
                  </Chip>
                  <h1 className="text-lg font-bold">{task.title}</h1>
                  <p className="text-sm text-gray-700">{task.description}</p>
                  <small className="text-gray-500 italic">
                    {task.deadline}
                  </small>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <BsThreeDotsVertical
                        size={20}
                        className="cursor-pointer"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="edit"
                        as={Link}
                        href={`/userpage/task/${task._id}`}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <TaskModal isOpen={isAddOpenn} onClose={onAddOpenChange} />
    </section>
  );
};

export default MyTasks;
