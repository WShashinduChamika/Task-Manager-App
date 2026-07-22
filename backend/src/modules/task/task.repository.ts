import type { TaskPriority, TaskStatus } from "../../../generated/prisma/enums";
import type { TaskModel } from "../../../generated/prisma/models/Task";
import { getPrisma } from "../../core/database/prisma";

export const createTask = async (data: {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  userId: string;
}): Promise<TaskModel> => {
  const prisma = getPrisma();
  return prisma.task.create({ data });
};

export const findTaskById = async (
  id: string,
  userId: string,
): Promise<TaskModel | null> => {
  const prisma = getPrisma();
  return prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  });
};

export const updateTask = async (
  id: string,
  userId: string,
  data: Partial<{
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: Date;
  }>,
): Promise<TaskModel> => {
  const prisma = getPrisma();
  return prisma.task.update({
    where: {
      id,
      userId,
    },
    data,
  });
};
