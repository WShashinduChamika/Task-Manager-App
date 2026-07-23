import { useQuery } from "@tanstack/react-query";
import { getTasksApi, getTaskStatsApi } from "../api/tasks.api";
import type { GetTasksParams } from "../types";

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

