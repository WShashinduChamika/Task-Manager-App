import { useQuery } from "@tanstack/react-query";
import { getTasksApi } from "../api/tasks.api";
import type { GetTasksParams } from "../types";

export const useTasks = (params: GetTasksParams = {}) => {
  const query = useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getTasksApi({ limit: 100, ...params }),
  });

  console.log(query.data);

  const tasks = query.data?.tasks ?? [];
  const meta = query?.data?.meta;

  return { ...query, tasks, meta };
};
