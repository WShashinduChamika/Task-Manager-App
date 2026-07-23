export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedTasksResponse {
  tasks: Task[];
  meta: TaskMeta;
}

export interface GetTasksParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  sortBy?: "createdAt" | "dueDate";
  sortOrder?: "asc" | "desc";
}
export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}
