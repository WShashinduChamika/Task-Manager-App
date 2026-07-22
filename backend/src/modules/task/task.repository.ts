import type { TaskPriority, TaskStatus } from "../../../generated/prisma/enums";
import type { TaskModel } from "../../../generated/prisma/models/Task";
import { getPrisma } from "../../core/database/prisma";

export const create = async (data: {
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
