import type { TaskModel } from "../../../generated/prisma/models/Task";
import type { CreateTaskDto } from "./dto";
import * as repository from "./task.repository";

export const createTask = async (
  userId: string,
  dto: CreateTaskDto,
): Promise<TaskModel> => {
  return repository.create({
    title: dto.title,
    description: dto.description,
    priority: dto.priority,
    status: dto.status ?? "PENDING",
    dueDate: dto.dueDate,
    userId,
  });
};
