import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import mongoose from "mongoose";
import { Task } from "../mongoose/schemas/tasks.mjs";
import { authMiddleware } from "../utils/middleware.mjs";
import { TaskValidationSchema } from "../utils/validationSchema.mjs";

const router = Router();

router.get("/api/all-tasks", authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not logged in" });
  }

  console.log("Logged-in user:", req.user);

  Task.find({ user: req.user._id })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json({ error: "Server error" }));
});

router.post(
  "/api/create-tasks",
  authMiddleware,
  checkSchema(TaskValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);

    try {
      const newTask = new Task(data);
      const savedTask = await newTask.save();
      res.status(200).json(savedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.get("/api/task/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching task with ID:", id);

    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/api/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    console.log("userId", userId);

    const allowedUpdates = [
      "title",
      "description",
      "status",
      "priority",
      "category",
      "deadline",
      "reminderAt",
      "color",
    ];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      return res.status(400).json({ error: "Invalid updates!" });

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) return res.status(404).json({ error: "Task not found" });

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/api/delete/task/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    console.log("this is the userId", userId);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

///delete multiple
router.delete("/api/delete/tasks", async (req, res) => {
  try {
    const { ids } = req.body; // expect array of ids
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "No task ids provided" });
    }

    // validate all ids
    const invalidId = ids.find((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
      return res.status(400).json({ error: `Invalid task id: ${invalidId}` });
    }

    const result = await Task.deleteMany({ _id: { $in: ids }, user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No tasks deleted" });
    }

    res.status(200).json({
      message: `${result.deletedCount} task(s) deleted successfully`,
    });
  } catch (error) {
    console.error("Delete multiple tasks error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//fetch tasks depends on Pending status and createdAt === date today
router.get("/api/pending-today", authMiddleware, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      status: "Pending",
      $or: [
        {
          deadline: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
        {
          reminderAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      ],
      user: req.user._id,
    });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching pending tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/completed-today", authMiddleware, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      status: "Completed",
      updatedAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      user: req.user._id,
    });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching completed tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//urgent tasks logic fetch
router.get("/api/urgent-today", authMiddleware, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      priority: "Urgent",
      status: { $ne: "Completed" },
      user: req.user._id,
      $or: [
        {
          deadline: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
        {
          reminderAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      ],
    });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching completed tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//overdue tasks
router.get("/api/overdue-today", authMiddleware, async (req, res) => {
  try {
    const now = new Date();

    const tasks = await Task.find({
      deadline: { $lt: now },
      status: { $ne: "Completed" },
      user: req.user._id,
    });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching overdue tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//pending tasks
router.get("/api/tasks/:status", authMiddleware, async (req, res) => {
  try {
    let { status } = req.params;
    const now = new Date();

    if (status === "in-progress") {
      status = "In-progress";
    } else {
      status = status.charAt(0).toUpperCase() + status.slice(1);
    }

    let filter = { user: req.user._id };

    if (status === "Overdue") {
      filter.deadline = { $lte: now };
      filter.status = { $ne: "Completed" };
    } else {
      filter.status = status;
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching pending tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/count", authMiddleware, async (req, res) => {
  try {
    const result = {
      completed: 0,
      pending: 0,
      "in-progress": 0,
    };

    const tasks = await Task.find({ user: req.user._id });

    console.log(tasks);
    tasks.forEach((task) => {
      const status = task.status?.toLowerCase();
      if (status === "completed") result.completed += 1;
      else if (status === "pending") result.pending += 1;
      else if (status === "in-progress") result["in-progress"] += 1;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
