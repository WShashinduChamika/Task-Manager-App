import { z } from "zod";

export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
export const TaskStatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters long"),
  description: z.string().trim().optional(),
  priority: TaskPriorityEnum,
  status: TaskStatusEnum.optional().default("PENDING"),
  dueDate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    { message: "Due date cannot be earlier than today" },
  ),
});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;
