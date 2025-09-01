import mongoose from "mongoose";

export const TaskValidationSchema = {
  user: {
    in: ["body"], // check if the request is in the body
    notEmpty: {
      errorMessage: "User cannot be empty",
    },
    custom: {
      options: (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid User ID");
        }
        return true;
      },
    },
  },

  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Title is required",
    },
    trim: true,
    isLength: {
      options: { max: 200 },
      errorMessage: "Title cannot exceed 200 characters",
    },
  },

  description: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Description must be a string",
    },
    isLength: {
      options: { max: 1000 },
      errorMessage: "Description cannot exceed 1000 characters",
    },
  },

  status: {
    in: ["body"],
    optional: true,
    isIn: {
      options: [["pending", "in-progress", "completed"]],
      errorMessage: "Status must be pending, in-progress, or completed",
    },
  },

  priority: {
    in: ["body"],
    optional: true,
    isIn: {
      options: [["low", "moderate", "urgent"]],
      errorMessage: "Priority must be low, moderate, or urgent",
    },
  },

  category: {
    in: ["body"],
    optional: true,
    isIn: {
      options: [["personal", "school", "work"]],
      errorMessage: "Category must be personal, school, or work",
    },
  },

  deadline: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "Deadline must be a valid date",
    },
    custom: {
      options: (value) => {
        if (new Date(value) < new Date()) {
          throw new Error("Deadline must be a future date");
        }
        return true;
      },
    },
  },

  reminderAt: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "Reminder must be a valid date",
    },
    custom: {
      options: (value, { req }) => {
        if (
          req.body.deadline &&
          new Date(value) > new Date(req.body.deadline)
        ) {
          throw new Error("Reminder must be before the deadline");
        }
        return true;
      },
    },
  },
};
