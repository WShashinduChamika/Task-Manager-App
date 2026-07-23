import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTasksApi,
  getTaskStatsApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../api/tasks.api";
import type { CreateTaskDto, GetTasksParams, UpdateTaskDto } from "../types";

export const useTasks = (params: GetTasksParams = {}) => {
  const query = useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getTasksApi({ limit: 100, ...params }),
  });

  const tasks = query.data?.tasks ?? [];
  const meta = query?.data?.meta;

  return { ...query, tasks, meta };
};

export const useTaskStats = () => {
  const query = useQuery({
    queryKey: ["tasks", "stats"],
    queryFn: () => getTaskStatsApi(),
  });

  return {
    ...query,
    stats: query.data,
  };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTaskDto) => createTaskApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      updateTaskApi(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTaskApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};




