"use client";
import DeleteModal from "@/components/delete-modal";
import { SearchIcon } from "@/components/icons";
import TaskModal from "@/components/modal";
import { Task } from "@/types";
import { Input } from "@heroui/input";
import {
  Card,
  CardBody,
  Checkbox,
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
import { MdOutlineChecklistRtl } from "react-icons/md";

const MyTasks = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isOpen: isAddOpenn,
    onOpen: onOpenAdd,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDelOpen,
    onOpen: onOpenDel,
    onOpenChange: onDelOpenChange,
  } = useDisclosure();

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/all-tasks`,
          {
            credentials: "include",
          }
        );

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

    const interval = setInterval(fetchTasks, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) return;

    const remaining = tasks.filter((t) => !selectedTasks.includes(t._id!));
    const backup = tasks;
    setTasks(remaining);
    setSelectedTasks([]);
    setChecked(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/delete/tasks`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ids: selectedTasks }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete tasks");
      }

      console.log("Deleted:", data);
    } catch (err) {
      console.error("Error deleting tasks:", err);

      setTasks(backup);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.priority?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress aria-label="Loading tasks..." color="primary" />
      </div>
    );
  }

  return (
    <section className="mt-14 mx-auto mb-14 w-full">
      <div className="flex items-center justify-between max-w-full gap-4">
        <div className="w-2/3 lg:w-1/2">
          {" "}
          <Input
            aria-label="Search"
            classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
            className="bg-gray-200 rounded-xl"
            labelPlacement="outside"
            placeholder="Search tasks..."
            startContent={
              <SearchIcon
                className="text-default-400 
              pointer-events-none flex-shrink-0"
              />
            }
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-shrink-0">
          <div className="flex gap-2">
            {!checked && (
              // <FaPlus
              //   size={30}
              //   className="hidden sm:block text-blue-700 cursor-pointer text-xl pr-3"
              //   onClick={onOpenAdd}
              // />
              <div className="hidden lg:block items-center justify-center w-8 h-8 rounded-full ">
                <FaPlus
                  size={30}
                  className="text-amber-600 hover:scale-110 
                  transition-transform duration-200 cursor-pointer"
                  onClick={onOpenAdd}
                />
              </div>
            )}
            {!checked ? (
              <div className="flex items-center gap-2">
                <Checkbox
                  size="lg"
                  isSelected={checked}
                  onValueChange={setChecked}
                  className="text-gray-400"
                />
              </div>
            ) : (
              <FaTrash
                size={30}
                className="text-red-500 cursor-pointer text-xl pr-3"
                onClick={() => {
                  setChecked(false);
                  handleBulkDelete();
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-80">
            <div className="p-6 rounded-full bg-red-50">
              <MdOutlineChecklistRtl
                size={72}
                className="text-amber-600 drop-shadow-sm"
              />
            </div>

            <p className="mt-2 text-lg font-semibold text-gray-700">
              No tasks yet
            </p>
            <p className="text-sm text-gray-400">Start by adding a new task</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task._id}
              shadow="sm"
              radius="lg"
              className="mb-3 border-l-4 border-orange-500 bg-orange-50 overflow-hidden text-white"
            >
              <CardBody className="flex flex-row items-center justify-between p-4">
                {checked && (
                  <Checkbox
                    isSelected={selectedTasks.includes(task._id!)}
                    onChange={() => toggleSelection(task._id!)}
                    className="mr-3"
                  />
                )}

                <div className="flex-1 break-words">
                  <div>
                    <h1 className="text-md font-semibold text-gray-800 truncate">
                      {task.title}
                    </h1>
                    <span className="text-sm font-light line-clamp-1">
                      {task.description}
                    </span>
                  </div>
                  <small className="text-xs text-gray-700">
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "No deadline"}
                  </small>
                </div>

                {/* Options menu */}
                <Dropdown>
                  <DropdownTrigger>
                    <BsThreeDotsVertical
                      size={18}
                      className="cursor-pointer text-gray-500 hover:text-amber-600"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Task Actions">
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
                      onPress={() => {
                        setSelectedId(task._id ?? null);
                        onOpenDel();
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardBody>
            </Card>
          ))
        )}
      </div>
      <div className="hidden sm:block">
        <TaskModal isOpen={isAddOpenn} onClose={onAddOpenChange} />
      </div>
      <DeleteModal
        isOpen={isDelOpen}
        onOpenChange={onDelOpenChange}
        id={selectedId}
      />
    </section>
  );
};

export default MyTasks;
