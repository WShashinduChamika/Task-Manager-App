import type { NextFunction, Response } from "express";
import { unauthorized } from "../../core/exceptions";
import type { AuthenticatedRequest } from "../../core/middleware/auth.middleware";
import { createTaskSchema, updateTaskSchema } from "./schemas/task.schema";
import * as service from "./task.service";

export const createTask = async (
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

export const getTaskById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw unauthorized("User not authenticated");
    }
    const id = String(req.params.id);
    const task = await service.getTaskById(req.user.userId, id);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw unauthorized("User not authenticated");
    }
    const id = String(req.params.id);
    const dto = updateTaskSchema.parse(req.body);
    const result = await service.updateTask(req.user.userId, id, dto);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw unauthorized("User not authenticated");
    }
    const id = String(req.params.id);
    await service.deleteTask(req.user.userId, id);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
