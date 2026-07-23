import { api } from "@core/api";
import { unwrapApiResponse } from "@core/api/response";
import type { ApiResponse } from "@core/api/types";
import type {
  GetTasksParams,
  PaginatedTasksResponse,
  Task,
  TaskMeta,
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
