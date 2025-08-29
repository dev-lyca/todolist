import { Router } from "express";
import AuthRouter from "./auth.mjs";

const router = Router();

router.use(AuthRouter);

export default router;