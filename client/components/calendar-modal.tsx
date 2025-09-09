"use client";
import {
  Button,
  Calendar,
  DateValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import React, { useEffect, useState } from "react";

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
  const [value, setValue] = useState<DateValue | null>(null);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/task/${id}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch task");

        const task = await res.json();

        if (task.reminderAt) {
          const dateOnly = new Date(task.reminderAt)
            .toISOString()
            .split("T")[0];
          setValue(parseDate(dateOnly));
        } else {
          const today = new Date().toISOString().split("T")[0];
          setValue(parseDate(today));
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    if (isOpen) {
      fetchTask();
    }
  }, [id, isOpen]);

  const handleSave = async () => {
    if (!value) return;
    isLoading(true);
    try {
      const jsDate = new Date(value.year, value.month - 1, value.day);
      const isoDate = jsDate.toISOString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ reminderAt: isoDate }),
        }
      );

      if (!res.ok) throw new Error("Failed to update reminder");

      const data = await res.json();
      console.log("Reminder updated:", data);

      onOpenChange(false);
    } catch (err) {
      console.error("Error updating reminder:", err);
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
              <div className="block lg:hidden">
                <Calendar
                  aria-label="Date (Controlled)"
                  value={value ?? undefined}
                  onChange={setValue}
                  visibleMonths={1}
                />
              </div>
              <div className="hidden lg:block">
                <Calendar
                  aria-label="Date (Controlled)"
                  value={value ?? undefined}
                  onChange={setValue}
                  visibleMonths={2}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSave} isLoading={loading}>
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
