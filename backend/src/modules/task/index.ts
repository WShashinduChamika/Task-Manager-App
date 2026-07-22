import { Router } from "express";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import * as controller from "./task.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", controller.createTask);
router.get("/:id", controller.getTaskById);
router.put("/:id", controller.updateTask);

export default router;
