"use client";
import { SearchIcon } from "@/components/icons";
import { Input } from "@heroui/input";
import {
  Card,
  CardBody,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

const MyTasks = () => {
  const [checked, setChecked] = useState(false);

  const tasks = [
    {
      id: 1,
      title: "Finish the Science Project",
      description: "Complete the volcano eruption model before the due date.",
      status: "Pending",
      dueDate: "August 31, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Grocery Shopping",
      description: "Buy milk, eggs, and vegetables for the week.",
      status: "Completed",
      dueDate: "August 25, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Team Meeting",
      description: "Prepare slides for the Monday morning meeting.",
      status: "In-Progress",
      dueDate: "September 2, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Workout Session",
      description: "Go for a 5km run in the evening.",
      status: "Pending",
      dueDate: "September 1, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Read a Book",
      description: "Finish at least 3 chapters of 'Atomic Habits'.",
      status: "In-Progress",
      dueDate: "September 5, 2025",
      imageUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
    },
  ];

  return (
    <section className="mt-14 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
        <div className="flex-1 min-w-0">
          <Input
            aria-label="Search"
            classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
            labelPlacement="outside"
            placeholder="Search tasks..."
            startContent={
              <SearchIcon
                className="text-base text-default-400 pointer-events-none 
              flex-shrink-0"
              />
            }
            type="search"
          />
        </div>

        <div className="flex-shrink-0">
          {!checked ? (
            <Checkbox isSelected={checked} onValueChange={setChecked}>
              <span className="text-sm text-default-400">Select Task/s</span>
            </Checkbox>
          ) : (
            <FaTrash
              size={30}
              className="text-red-500 cursor-pointer text-xl pr-3"
              onClick={() => setChecked(false)}
            />
          )}
        </div>
      </div>

      <div className="mt-6">
        {tasks.map((task) => (
          <Card key={task.id} className="mb-4">
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
                      task.status === "Completed"
                        ? "success"
                        : task.status === "In-Progress"
                          ? "primary"
                          : "default"
                    }
                  >
                    {task.status}
                  </Chip>
                  <h1 className="text-lg font-bold">{task.title}</h1>
                  <p className="text-sm text-gray-700">{task.description}</p>
                  <small className="text-gray-500 italic">{task.dueDate}</small>
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
                      <DropdownItem key="edit">Edit</DropdownItem>
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
    </section>
  );
};

export default MyTasks;
