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
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("personal");
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
        status,
        priority,
        category,
        deadline,
        reminderAt,
      };

      const response = await fetch("http://localhost:8080/api/create-tasks", {
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
      console.log("Task created:", createdTask);
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
              {/* <Select
                label="Status"
                className="mb-4"
                selectedKeys={[status]}
                onChange={(e) => setStatus(e.target.value)}
              >
                <SelectItem key="pending">Pending</SelectItem>
                <SelectItem key="in-progress">In Progress</SelectItem>
                <SelectItem key="completed">Completed</SelectItem>
              </Select> */}

              <div className="flex justify-between gap-2">
                <Select
                  label="Priority"
                  className="mb-4"
                  selectedKeys={[priority]}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <SelectItem key="low">Low</SelectItem>
                  <SelectItem key="moderate">Moderate</SelectItem>
                  <SelectItem key="urgent">Urgent</SelectItem>
                </Select>

                {/* Category (optional) */}
                <Select
                  label="Category"
                  className="mb-4"
                  selectedKeys={[category]}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <SelectItem key="personal">Personal</SelectItem>
                  <SelectItem key="school">School</SelectItem>
                  <SelectItem key="work">Work</SelectItem>
                </Select>
              </div>

              <div className="flex justify-between gap-2">
                {/* Deadline (optional, must be future date) */}
                <Input
                  label="Deadline"
                  placeholder="Select deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mb-4"
                />

                {/* ReminderAt (optional, must be before deadline if set) */}
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
