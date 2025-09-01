"use client";
import CalendarModal from "@/components/calendar-modal";
import ThemeModal from "@/components/theme-modal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { useRef, useState } from "react";
import { IoIosAlarm, IoIosCheckbox } from "react-icons/io";
import { IoColorPalette } from "react-icons/io5";

const Task = () => {
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
  const [paragraphs, setParagraphs] = useState<string[]>([
    "Buy milk, eggs, and fresh vegetables for the week. Don’t forget to grab bread for breakfasts, rice for dinners, and some fruits for snacks. Check if cooking oil, sugar, and coffee need restocking. Stick to the budget but keep an eye out for discounts and weekly deals.",
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const editableRefs = useRef<(HTMLDivElement | null)[]>([]);

  const focusToEnd = (element: HTMLDivElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
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

  const handleSave = (): void => {
    if (editingIndex !== null) {
      const div = editableRefs.current[editingIndex];
      if (div) {
        const newParagraphs = [...paragraphs];
        newParagraphs[editingIndex] = div.textContent || "";
        setParagraphs(newParagraphs);
      }
      setEditingIndex(null);
    }
  };

  return (
    <div className="mt-14">
      <Card className="p-6">
        <CardHeader>
          <div>
            <Chip size="sm" color="default" className="mb-2">
              Pending
            </Chip>
            <h1 className="text-2xl font-bold text-[#1A4A96]">
              Grocery Shopping
            </h1>
            <small>Monday, September 01, 2025 | 300 characters</small>
          </div>
        </CardHeader>

        <CardBody>
          {paragraphs.map((text, i) => (
            <div key={i} className="relative">
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
          ))}
        </CardBody>

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
                <Tooltip content="Add checkbox" showArrow={true}>
                  <IoIosCheckbox
                    size={30}
                    className="text-[#2D68C4] font-bold cursor-pointer"
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

      <ThemeModal isOpen={isThemeOpen} onOpenChange={onThemeOpenChange} />
      <CalendarModal
        isOpen={isReminderOpen}
        onOpenChange={onReminderOpenChange}
      />
    </div>
  );
};

export default Task;
