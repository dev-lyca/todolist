"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useState } from "react";
import { MdCheck, MdRectangle } from "react-icons/md";

interface ThemeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
}

const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onOpenChange,
  id,
}) => {
  console.log("This is theme modal", id);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const colorGroups = [
    {
      title: "Blues & Greens",
      colors: [
        "#1A4A96",
        "#2D68C4",
        "#3E80D3",
        "#0BDA8F",
        "#0BDA47",
        "#0AAA40",
        "#2E6F40",
        "#CFFFDC",
      ],
    },
    {
      title: "Earthy Tones",
      colors: [
        "#68BA7F",
        "#253D2C",
        "#D4DE95",
        "#3D4127",
        "#50300F",
        "#7F5933",
        "#704214",
        "#CD1C18",
      ],
    },
    {
      title: "Coral Pink Tones",
      colors: [
        "#F88379",
        "#E26F66",
        "#F8A58E",
        "#F8DCD4",
        "#8BE3D5",
        "#62BAAC",
        "#9BE089",
        "#74BA6C",
      ],
    },
    {
      title: "Pumpkin",
      colors: [
        "#FF7518",
        "#CC5E13",
        "#FFD1B3",
        "#FFF0E1",
        "#FFC985",
        "#803600",
      ],
    },
  ];

  const handleSave = async () => {
    if (!selectedColor) return;

    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ color: selectedColor }),
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
              Select Theme Color
            </ModalHeader>
            <ModalBody className="space-y-4">
              {colorGroups.map((group, i) => (
                <div key={i} className="flex flex-row items-center gap-4">
                  <span className="w-32 font-medium text-gray-700">
                    {group.title}
                  </span>

                  <div className="flex flex-row gap-4">
                    {group.colors.map((color, j) => {
                      const isSelected = selectedColor === color;
                      return (
                        <div
                          key={j}
                          className="relative cursor-pointer group"
                          onClick={() => setSelectedColor(color)}
                        >
                          <MdRectangle size={50} style={{ color }} />

                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-sm transition" />

                          {isSelected && (
                            <MdCheck className="absolute inset-0 m-auto text-white text-3xl" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
                disabled={!selectedColor}
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

export default ThemeModal;
