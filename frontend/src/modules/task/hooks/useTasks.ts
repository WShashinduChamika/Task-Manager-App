import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasksApi, getTaskStatsApi, createTaskApi } from "../api/tasks.api";
import type { CreateTaskDto, GetTasksParams } from "../types";

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


