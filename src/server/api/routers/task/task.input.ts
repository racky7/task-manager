import { z } from "zod";
import { cuid } from "@/lib/validation";

const TASK_STATUS = ["TODO", "INPROGRESS", "INREVIEW", "DONE"] as const;
const TASK_PRIORITY = ["LOW", "MEDIUM", "HIGH"] as const;

export const createTaskInput = z.object({
  title: z.string().max(150),
  description: z.string().max(1000).optional(),
  projectId: cuid,
  status: z.enum(TASK_STATUS).default("TODO"),
  priority: z.enum(TASK_PRIORITY).default("LOW"),
  dueDate: z.coerce.date(),
  assigneeId: cuid.nullable().optional(),
});

export const getTasksInput = z.object({
  projectId: cuid,
  assigneeId: cuid.nullish(),
  status: z.enum(TASK_STATUS).nullish(),
  priority: z.enum(TASK_PRIORITY).nullish(),
});

export const deleteTaskInput = z.object({
  taskId: cuid,
});

export const updateTaskInput = createTaskInput.partial().extend({
  id: cuid,
});

export const getTaskInput = z.object({
  taskId: cuid,
});
