import { api } from "@core/api";
import { unwrapApiResponse } from "@core/api/response";
import type { ApiResponse } from "@core/api/types";
import type {
  GetTasksParams,
  PaginatedTasksResponse,
  Task,
  TaskMeta,
  TaskStats,
  CreateTaskDto,
  UpdateTaskDto,
} from "../types";

type TasksEnvelope = { tasks: Task[]; meta: TaskMeta };

export const getTasksApi = async (
  params: GetTasksParams = {},
): Promise<PaginatedTasksResponse> => {
  const response = await api.get<ApiResponse<TasksEnvelope>>("/tasks", {
    params,
  });
  const { tasks, meta } = unwrapApiResponse(response);
  return { tasks, meta };
};

export const getTaskStatsApi = async (): Promise<TaskStats> => {
  const response = await api.get<ApiResponse<TaskStats>>("/tasks/stats");
  return unwrapApiResponse(response);
};

export const createTaskApi = async (dto: CreateTaskDto): Promise<Task> => {
  const response = await api.post<ApiResponse<Task>>("/tasks", dto);
  return unwrapApiResponse(response);
};

export const updateTaskApi = async (
  id: string,
  dto: UpdateTaskDto,
): Promise<Task> => {
  const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, dto);
  return unwrapApiResponse(response);
};



