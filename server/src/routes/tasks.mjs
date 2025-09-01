import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { Task } from "../mongoose/schemas/tasks.mjs";
import { authMiddleware } from "../utils/middleware.mjs";
import { TaskValidationSchema } from "../utils/validationSchema.mjs";

const router = Router();

router.get("/api/all-tasks", (req, res) => {
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

router.get("/api/task/:id", async (req, res) => {
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

    const task = await Task.findOne({ _id: id, user: userId }); // ✅ only update your tasks
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

router.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
