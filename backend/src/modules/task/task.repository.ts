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

export interface FindTasksFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  sortBy?: "createdAt" | "dueDate";
  sortOrder?: "asc" | "desc";
}

export interface FindTasksResult {
  tasks: TaskModel[];
  total: number;
}

export const findTasks = async (
  userId: string,
  filters: FindTasksFilters,
): Promise<FindTasksResult> => {
  const prisma = getPrisma();
  const where: {
    userId: string;
    deletedAt: null;
    status?: TaskStatus;
    priority?: TaskPriority;
    title?: {
      contains: string;
      mode: "insensitive";
    };
  } = {
    userId,
    deletedAt: null,
  };

  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.priority) {
    where.priority = filters.priority;
  }
  if (filters.search) {
    where.title = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  const orderBy = {
    [filters.sortBy || "createdAt"]: filters.sortOrder || "desc",
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total };
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
      deletedAt: null,
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

export const deleteTask = async (
  id: string,
  userId: string,
): Promise<TaskModel> => {
  const prisma = getPrisma();
  return prisma.task.update({
    where: {
      id,
      userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export interface TaskStatsResult {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

export const getTaskStats = async (
  userId: string,
): Promise<TaskStatsResult> => {
  const prisma = getPrisma();
  const now = new Date();
  const baseWhere = {
    userId,
    deletedAt: null,
  };

  const [total, pending, inProgress, completed, overdue] = await Promise.all([
    prisma.task.count({ where: baseWhere }),
    prisma.task.count({ where: { ...baseWhere, status: "PENDING" } }),
    prisma.task.count({ where: { ...baseWhere, status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { ...baseWhere, status: "COMPLETED" } }),
    prisma.task.count({
      where: {
        ...baseWhere,
        status: { not: "COMPLETED" },
        dueDate: { lt: now },
      },
    }),
  ]);

  return {
    total,
    pending,
    inProgress,
    completed,
    overdue,
  };
};

