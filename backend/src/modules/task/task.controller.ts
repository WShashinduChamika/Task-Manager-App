import type { NextFunction, Response } from "express";
import { unauthorized } from "../../core/exceptions";
import type { AuthenticatedRequest } from "../../core/middleware/auth.middleware";
import { createTaskSchema } from "./schemas/task.schema";
import * as service from "./task.service";

export const create = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw unauthorized("User not authenticated");
    }
    const dto = createTaskSchema.parse(req.body);
    const result = await service.createTask(req.user.userId, dto);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
