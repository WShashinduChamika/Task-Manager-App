import type { TaskModel } from "../../../generated/prisma/models/Task";
import { notFound } from "../../core/exceptions";
import type { CreateTaskDto } from "./dto";
import * as repository from "./task.repository";

export const createTask = async (
  userId: string,
  dto: CreateTaskDto,
): Promise<TaskModel> => {
  return repository.createTask({
    title: dto.title,
    description: dto.description,
    priority: dto.priority,
    status: dto.status ?? "PENDING",
    dueDate: dto.dueDate,
    userId,
  });
};

export const getTaskById = async (
  userId: string,
  id: string,
): Promise<TaskModel> => {
  const task = await repository.findTaskById(id, userId);
  if (!task) {
    throw notFound("Task not found");
  }
  return task;
};
