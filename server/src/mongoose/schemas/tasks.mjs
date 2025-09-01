import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GoogleUser",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "In-progress", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Moderate", "Urgent"],
      default: "Moderate",
    },
    category: {
      type: String,
      enum: ["Personal", "School", "Work"],
      default: "Personal",
    },
    deadline: {
      type: Date,
    },
    reminderAt: {
      type: Date,
    },
    color: {
      type: String,
      default: "#FFFFFF",
    },
  },

  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);
