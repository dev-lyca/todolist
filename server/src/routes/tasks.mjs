import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { Task } from "../mongoose/schemas/tasks.mjs";
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
      const newTask = new Task({
        ...data,
        user: req.session.user._id,
      });
      const savedTask = await newTask.save();
      res.status(200).json(savedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.patch("/api/tasks/:id", async (req, res) => {
  try {
    console.log("Update request body:", req.body);
    const { id } = req.params;
    console.log("Task ID to update:", id);
    const userId = req.user.id;

    const allowedUpdates = [
      "title",
      "description",
      "status",
      "priority",
      "category",
      "deadline",
      "reminderAt",
    ];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

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

export default router;
