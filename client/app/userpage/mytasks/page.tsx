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
import { TbMoodEmptyFilled } from "react-icons/tb";

const MyTasks = () => {
  // const { user } = useUser();
  // useAuth(user);
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
          `${process.env.NEXT_PUBLIC_API_URL}/all-tasks`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/delete/tasks`,
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="flex flex-col items-center justify-center min-h-82 w-full text-gray-500">
            <TbMoodEmptyFilled size={80} className="mb-4 text-gray-400" />
            <p className="text-xl font-medium">No data</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task._id}
              className="mb-4"
              style={{ backgroundColor: task.color || "#FFFFFF" }}
            >
              <CardBody className="w-full">
                <div className="flex flex-row gap-10 items-center">
                  {checked && (
                    <div>
                      <Checkbox
                        isSelected={selectedTasks.includes(task._id!)}
                        onChange={() => toggleSelection(task._id!)}
                      />
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
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No deadline"}
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
                          onPress={() => {
                            setSelectedId(task._id ?? null);
                            onOpenDel();
                          }}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
      <TaskModal isOpen={isAddOpenn} onClose={onAddOpenChange} />
      <DeleteModal
        isOpen={isDelOpen}
        onOpenChange={onDelOpenChange}
        id={selectedId}
      />
    </section>
  );
};

export default MyTasks;
