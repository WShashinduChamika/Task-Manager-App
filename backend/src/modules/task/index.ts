import { Router } from "express";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import * as controller from "./task.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", controller.create);

export default router;
