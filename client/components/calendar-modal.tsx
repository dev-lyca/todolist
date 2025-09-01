"use client";
import {
  Button,
  Calendar,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import React, { useState } from "react";

interface CalendarModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onOpenChange,
  id,
}) => {
  console.log(id);
  const [value, setValue] = useState(parseDate("2024-03-07") as any);

  const handleSave = async () => {
    if (!value) return;

    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reminderAt: value.toISOString() }),
      });

      if (!res.ok) throw new Error("Failed to update theme");

      const data = await res.json();
      console.log("Theme updated:", data);

      onOpenChange(false);
    } catch (err) {
      console.error("Error updating theme:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      hideCloseButton
      size="xl"
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
      classNames={{
        base: "m-0 fixed bottom-0 rounded-t-2xl shadow-lg",
        wrapper: "items-end justify-center",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Set Reminder
            </ModalHeader>
            <ModalBody className="space-y-4 items-center">
              <Calendar
                aria-label="Date (Controlled)"
                value={value as any}
                onChange={(v: any) => setValue(v)}
                visibleMonths={2}
              />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleSave();
                  onClose();
                }}
              >
                Select
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CalendarModal;
