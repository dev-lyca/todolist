"use client";
import { useUser } from "@/context/userContext";
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
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
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-tasks`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

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

  return (
    <Modal isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Task
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-between gap-2">
                <Input
                  label="Title"
                  placeholder="Enter task title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4"
                />

                <Input
                  label="Description"
                  placeholder="Enter task description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4"
                />
              </div>
              <div className="flex justify-between gap-2">
                <Select
                  label="Priority"
                  className="mb-4"
                  selectedKeys={[priority]}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <SelectItem key="Low">Low</SelectItem>
                  <SelectItem key="Moderate">Moderate</SelectItem>
                  <SelectItem key="Urgent">Urgent</SelectItem>
                </Select>

                <Select
                  label="Category"
                  className="mb-4"
                  selectedKeys={[category]}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <SelectItem key="Personal">Personal</SelectItem>
                  <SelectItem key="School">School</SelectItem>
                  <SelectItem key="work">Work</SelectItem>
                </Select>
              </div>

              <div className="flex justify-between gap-2">
                <Input
                  label="Deadline"
                  placeholder="Select deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mb-4"
                />

                <Input
                  label="Reminder"
                  placeholder="Select reminder date"
                  type="date"
                  value={reminderAt}
                  onChange={(e) => setReminderAt(e.target.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSave} isLoading={loading}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
