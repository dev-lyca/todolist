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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, isLoading] = useState(false);
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

  const handleSave = async () => {
    if (!selectedColor) return;

    isLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ color: selectedColor }),
        }
      );

      if (!res.ok) throw new Error("Failed to update theme");

      const data = await res.json();
      console.log("Theme updated:", data);

      onOpenChange(false);
    } catch (err) {
      console.error("Error updating theme:", err);
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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Select Theme Color
            </ModalHeader>
            <ModalBody className="space-y-6">
              {colorGroups.map((group, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
                >
                  <span className="w-full sm:w-32 font-medium text-gray-700 text-sm sm:text-base">
                    {group.title}
                  </span>

                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {group.colors.map((color, j) => {
                      const isSelected = selectedColor === color;
                      return (
                        <div
                          key={j}
                          className="relative cursor-pointer group"
                          onClick={() => setSelectedColor(color)}
                        >
                          <MdRectangle
                            size={45}
                            className="sm:size-12"
                            style={{ color }}
                          />

                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-sm transition" />

                          {isSelected && (
                            <MdCheck className="absolute inset-0 m-auto text-white text-2xl sm:text-3xl" />
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
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg"
                onPress={handleSave}
                disabled={!selectedColor}
                isLoading={loading}
                radius="full"
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
