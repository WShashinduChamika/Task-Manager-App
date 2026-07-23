import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@core/api/response";
import { currentUserIdStore } from "@store/auth.store";
import {
  getTasksApi,
  getTaskStatsApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../api/tasks.api";
import type { CreateTaskDto, GetTasksParams, UpdateTaskDto } from "../types";

export const useTasks = (params: GetTasksParams = {}) => {
  const userId = currentUserIdStore.value;

  const query = useQuery({
    queryKey: ["tasks", userId, params],
    queryFn: () => getTasksApi({ limit: 100, ...params }),
    enabled: Boolean(userId),
  });

  const tasks = query.data?.tasks ?? [];
  const meta = query?.data?.meta;

  return { ...query, tasks, meta };
};

export const useTaskStats = () => {
  const userId = currentUserIdStore.value;

  const query = useQuery({
    queryKey: ["tasks", userId, "stats"],
    queryFn: () => getTaskStatsApi(),
    enabled: Boolean(userId),
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
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Failed to create task"));
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      updateTaskApi(id, dto),
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Failed to update task"));
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTaskApi(id),
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Failed to delete task"));
    },
  });
};





