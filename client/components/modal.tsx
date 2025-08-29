import {
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
import React from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "urgent", label: "Urgent" },
];
export const categoryOptions = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "school", label: "School" },
];

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} size="sm" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Task
            </ModalHeader>
            <ModalBody>
              <Input
                label="Task Name"
                placeholder="Enter your task name"
                type="text"
                className="mb-4"
              />
              <Input
                label="Due Date"
                placeholder="Select due date"
                type="date"
              />
              <Select label="Category" className="mt-4">
                {categoryOptions.map((categoryOptions) => (
                  <SelectItem key={categoryOptions.value}>
                    {categoryOptions.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Description"
                placeholder="Enter task description"
                type="text"
                className="mt-4"
              />
              <Select label="Priority" className="mt-4">
                {priorityOptions.map((priorityOptions) => (
                  <SelectItem key={priorityOptions.value}>
                    {priorityOptions.label}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
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
