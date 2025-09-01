import { Router } from "express";
import AuthRouter from "./auth.mjs";
import TaskRouter from "./tasks.mjs";

const router = Router();

router.use(AuthRouter);
router.use(TaskRouter);

export default router;
