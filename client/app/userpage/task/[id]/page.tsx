"use client";
import CalendarModal from "@/components/calendar-modal";
import ThemeModal from "@/components/theme-modal";
import { Task } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import { IoColorPalette } from "react-icons/io5";

const Tasks = () => {
  const { id } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/task/${id}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch task");
        }

        const data: Task = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching task", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();

    const interval = setInterval(fetchTask, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id]);

  const {
    isOpen: isThemeOpen,
    onOpen: onOpenTheme,
    onOpenChange: onThemeOpenChange,
  } = useDisclosure();
  const {
    isOpen: isReminderOpen,
    onOpen: onOpenReminder,
    onOpenChange: onReminderOpenChange,
  } = useDisclosure();

  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const editableRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (tasks?.description) {
      setParagraphs(tasks.description.split("\n"));
    }
  }, [tasks]);

  const focusToEnd = (element: HTMLDivElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const updateTask = async (updatedFields: Partial<Task>) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedFields),
        }
      );

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask: Task = await res.json();
      setTasks(updatedTask);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newParagraphs = [...paragraphs];
      newParagraphs.splice(index + 1, 0, "");
      setParagraphs(newParagraphs);
      setTimeout(() => {
        editableRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleSave = () => {
    const updates: Partial<Task> = {};

    const titleDiv = editableRefs.current[-1];
    if (titleDiv) {
      updates.title = titleDiv.textContent || "";
    }

    const newParagraphs = editableRefs.current
      .map((div) => div?.textContent || "")
      .filter((text) => text.trim() !== "");

    setParagraphs(newParagraphs);
    updates.description = newParagraphs.join("\n\n");
    updateTask(updates);

    setEditingIndex(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress aria-label="Loading tasks..." color="primary" />
      </div>
    );
  }

  if (!tasks) return <p>Task not found</p>;

  return (
    <div className="mt-14 sm:mt-12">
      <Card
        className="p-6 max-h-40 sm:max-h-60 md:max-h-80 lg:max-h-[32rem]"
        style={{ backgroundColor: tasks.color || "#FFFFFF" }}
      >
        {paragraphs.map((text, i) => (
          <div key={i}>
            <CardHeader>
              <div className="flex justify-between items-start w-full">
                <div>
                  {tasks.status === "Completed" ? (
                    <Chip
                      size="sm"
                      color="success"
                      className="mb-2 cursor-default"
                    >
                      {tasks.status}
                    </Chip>
                  ) : (
                    <Dropdown size="sm" className="mb-2 items-center">
                      <DropdownTrigger>
                        <Chip
                          size="sm"
                          color={
                            tasks.status === "In-progress"
                              ? "primary"
                              : "default"
                          }
                          className="mb-2 cursor-pointer"
                        >
                          {tasks.status}
                        </Chip>
                      </DropdownTrigger>

                      <DropdownMenu
                        aria-label="Task Status"
                        onAction={(key) =>
                          updateTask({ status: key as Task["status"] })
                        }
                      >
                        {tasks.status === "Pending"
                          ? [
                              <DropdownItem key="In-progress">
                                <Chip
                                  size="sm"
                                  color="primary"
                                  className="mb-2"
                                >
                                  In-progress
                                </Chip>
                              </DropdownItem>,
                              <DropdownItem key="Completed">
                                <Chip
                                  size="sm"
                                  color="success"
                                  className="mb-2"
                                >
                                  Completed
                                </Chip>
                              </DropdownItem>,
                            ]
                          : tasks.status === "In-progress"
                            ? [
                                <DropdownItem key="Completed">
                                  <Chip
                                    size="sm"
                                    color="success"
                                    className="mb-2"
                                  >
                                    Completed
                                  </Chip>
                                </DropdownItem>,
                              ]
                            : null}
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  <h1
                    ref={(el) => {
                      if (el && editingIndex === -1) {
                        editableRefs.current[-1] = el;
                      }
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    className="text-2xl font-bold text-[#1A4A96] cursor-text outline-none"
                    onFocus={(e) => {
                      setEditingIndex(-1);
                      focusToEnd(e.currentTarget);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, -1)}
                  >
                    {tasks.title}
                  </h1>
                  <small>
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(tasks.createdAt ?? ""))}
                    {" | "}
                    {paragraphs.join(" ").length} characters
                  </small>
                </div>

                <div className="flex gap-4 text-right text-xs items-center">
                  <div className="flex items-center gap-1">
                    <FaRegCalendarAlt className="text-gray-500" size={16} />
                    <span>
                      {tasks.deadline
                        ? new Date(tasks.deadline).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No deadline"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <IoIosAlarm className="text-gray-500" size={16} />
                    <span>
                      {tasks.reminderAt
                        ? new Date(tasks.reminderAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "No reminder"}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              <div className="relative">
                <div
                  ref={(el) => {
                    editableRefs.current[i] = el;
                  }}
                  contentEditable
                  suppressContentEditableWarning
                  className="mt-2 text-base text-gray-700 outline-none cursor-text"
                  onFocus={(e) => {
                    setEditingIndex(i);
                    focusToEnd(e.currentTarget);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                >
                  {text}
                </div>
              </div>
            </CardBody>
          </div>
        ))}
        {editingIndex !== null && (
          <CardFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Tooltip content="Select theme" showArrow={true}>
                  <IoColorPalette
                    size={30}
                    className="text-[#124170] font-bold cursor-pointer"
                    onClick={onOpenTheme}
                  />
                </Tooltip>
                <Tooltip content="Change reminder" showArrow={true}>
                  <IoIosAlarm
                    size={30}
                    className="text-[#0b2c4e] font-bold cursor-pointer"
                    onClick={onOpenReminder}
                  />
                </Tooltip>
              </div>

              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <ThemeModal
        isOpen={isThemeOpen}
        onOpenChange={onThemeOpenChange}
        id={id}
      />
      <CalendarModal
        isOpen={isReminderOpen}
        onOpenChange={onReminderOpenChange}
        id={id}
      />
    </div>
  );
};

export default Tasks;
