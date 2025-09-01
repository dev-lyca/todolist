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
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "moderate", "urgent"],
      default: "moderate",
    },
    category: {
      type: String,
      enum: ["personal", "school", "work"],
      default: "personal",
    },
    deadline: {
      type: Date,
    },
    reminderAt: {
      type: Date,
    },

    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: false,
    },
  },

  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);
