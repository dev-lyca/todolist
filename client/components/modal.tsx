"use client";
import { useUser } from "@/context/userContext";
import {
  Accordion,
  AccordionItem,
  addToast,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { PiXCircle } from "react-icons/pi";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Personal");
  const [deadline, setDeadline] = useState("");
  const [reminderAt, setReminderAt] = useState("");
  const [loading, isLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("blue-500");

  const handleSave = async () => {
    if (!user) {
      addToast({
        title: "Login Required",
        description: "You must be logged in to create a task.",
        color: "warning",
        variant: "solid",
        timeout: 4000,
      });
      return;
    }

    isLoading(true);
    try {
      const newTask = {
        user: user._id,
        title,
        description,
        priority,
        category,
        deadline,
        reminderAt,
        color: selectedColor,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed: ${response.statusText}`);
      }

      const createdTask = await response.json();
      addToast({
        title: "Task Created",
        description: "Your task was added successfully.",
        color: "success",
        variant: "solid",
        icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
        timeout: 4000,
      });

      onClose();
    } catch (error) {
      console.error(error);
      addToast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        color: "danger",
        variant: "solid",
        icon: <PiXCircle className="w-5 h-5 text-red-500" />,
      });
    } finally {
      isLoading(false);
    }
  };

  const colorGroups = [
    {
      title: "Warm Neutrals",
      colors: [
        "#F5E6DA", // soft nude beige
        "#EAD9C6", // light sand
        "#D6BFAF", // muted taupe
        "#C8A78A", // warm tan
        "#A98467", // earthy mocha
        "#8B5E3C", // deep caramel
      ],
    },
    {
      title: "Soft Earth Tones",
      colors: [
        "#FDF6EC", // cream white
        "#F4E1D2", // pale peach beige
        "#EAD1C2", // clay nude
        "#D9BBA9", // warm clay
        "#C7A499", // muted rose beige
        "#A68A79", // dusty cocoa
      ],
    },
    {
      title: "Minimal Accents",
      colors: [
        "#FFF7ED", // warm ivory
        "#FEF3C7", // soft amber cream
        "#FDE68A", // muted pastel amber
        "#FBCFE8", // nude pink
        "#E5E7EB", // soft gray
        "#D1D5DB", // cool neutral gray
      ],
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      className="h-full lg:h-[500px] sticky"
      placement="top"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b pb-3">
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Add New Task
              </h2>
              <p className="text-sm text-gray-500">
                Fill in the details to create your task
              </p>
            </ModalHeader>

            <ModalBody className="space-y-4 py-4 overflow-auto">
              <div className="space-y-3">
                <Input
                  label="Title"
                  placeholder="e.g. Finish project report"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="bordered"
                  radius="lg"
                />
                <Textarea
                  label="Description"
                  placeholder="Add more details about your task"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="bordered"
                  radius="lg"
                  minRows={4}
                  maxRows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Priority"
                  selectedKeys={[priority]}
                  onChange={(e) => setPriority(e.target.value)}
                  variant="bordered"
                  radius="lg"
                >
                  <SelectItem key="Low">Low</SelectItem>
                  <SelectItem key="Moderate">Moderate</SelectItem>
                  <SelectItem key="Urgent">Urgent</SelectItem>
                </Select>

                <Select
                  label="Category"
                  selectedKeys={[category]}
                  onChange={(e) => setCategory(e.target.value)}
                  variant="bordered"
                  radius="lg"
                >
                  <SelectItem key="Personal">Personal</SelectItem>
                  <SelectItem key="School">School</SelectItem>
                  <SelectItem key="Work">Work</SelectItem>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  variant="bordered"
                  radius="lg"
                />
                <Input
                  label="Reminder"
                  type="date"
                  value={reminderAt}
                  onChange={(e) => setReminderAt(e.target.value)}
                  variant="bordered"
                  radius="lg"
                />
              </div>
              <Divider />
              <h3>Choose Theme</h3>
              <Accordion isCompact variant="light" className="mt-0">
                {colorGroups.map((group, i) => (
                  <AccordionItem
                    key={i}
                    aria-label={group.title}
                    title={group.title}
                    className="text-sm font-semibold text-gray-600"
                  >
                    <div className="flex flex-row gap-3 mb-2">
                      {group.colors.map((color, j) => {
                        const isSelected = selectedColor === color;
                        return (
                          <div
                            key={j}
                            className={`relative w-10 h-10 rounded-md cursor-pointer shadow-md transition 
                ${isSelected ? "ring-2 ring-offset-2 ring-gray-800 scale-110" : "hover:scale-105"}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          >
                            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 rounded-md transition" />

                            {isSelected && (
                              <MdCheck className="absolute inset-0 m-auto text-white text-2xl drop-shadow-lg" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </ModalBody>

            <ModalFooter className="border-t">
              <Button
                variant="light"
                color="danger"
                onPress={onClose}
                radius="full"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg"
                onPress={handleSave}
                isLoading={loading}
                radius="full"
              >
                Save Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
