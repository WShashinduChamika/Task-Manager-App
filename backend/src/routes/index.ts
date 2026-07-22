import { Router } from "express";
import authRouter from "../modules/auth";
import taskRouter from "../modules/task";

const router = Router();

router.use("/auth", authRouter);
router.use("/tasks", taskRouter);

export default router;
