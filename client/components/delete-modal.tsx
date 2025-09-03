"use client";
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { PiXCircle } from "react-icons/pi";

interface DeleteModal {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string | null;
}

const DeleteModal: React.FC<DeleteModal> = ({ isOpen, onOpenChange, id }) => {
  const [loading, isLoading] = useState(false);
  const handleDelete = async () => {
    if (!id) return;

    isLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete/task/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // ✅ log exact server error
        throw new Error(data.error || "Failed to delete task");
      }

      console.log("Task deleted:", data);

      addToast({
        title: "Task Deleted",
        description: "Your task was deleted successfully.",
        color: "success",
        variant: "solid",
        icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
        timeout: 4000,
      });

      onOpenChange(false);
    } catch (err) {
      console.error("Error deleting task:", err);
      addToast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        color: "danger",
        variant: "solid",
        icon: <PiXCircle className="w-5 h-5 text-red-500" />,
      });
    } finally {
      isLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      hideCloseButton
      size="2xl"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" },
          },
          exit: {
            y: 100,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeIn" },
          },
        },
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Task
            </ModalHeader>
            <ModalBody className="space-y-4">
              Are you sure you want to delete this?
            </ModalBody>

            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" onPress={handleDelete} isLoading={loading}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
