import type { TaskModel } from "../../../generated/prisma/models/Task";
import { notFound } from "../../core/exceptions";
import type { CreateTaskDto, UpdateTaskDto } from "./dto";
import type { GetTasksQuerySchemaType } from "./schemas/task.schema";
import * as repository from "./task.repository";

export interface PaginatedTasksResponse {
  tasks: TaskModel[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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

export const getTasks = async (
  userId: string,
  query: GetTasksQuerySchemaType,
): Promise<PaginatedTasksResponse> => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const { tasks, total } = await repository.findTasks(userId, query);
  const totalPages = Math.ceil(total / limit);

  return {
    tasks,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
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

export const updateTask = async (
  userId: string,
  id: string,
  dto: UpdateTaskDto,
): Promise<TaskModel> => {
  const existingTask = await repository.findTaskById(id, userId);
  if (!existingTask) {
    throw notFound("Task not found");
  }
  return repository.updateTask(id, userId, dto);
};

export const deleteTask = async (
  userId: string,
  id: string,
): Promise<TaskModel> => {
  const existingTask = await repository.findTaskById(id, userId);
  if (!existingTask) {
    throw notFound("Task not found");
  }
  return repository.deleteTask(id, userId);
};
