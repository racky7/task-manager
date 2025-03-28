import { z } from "zod";
import { cuid } from "@/lib/validation";

export const createTaskInput = z.object({
  title: z.string().max(150),
  description: z.string().max(1000).optional(),
  projectId: cuid,
  status: z.enum(["TODO", "INPROGRESS", "INREVIEW", "DONE"]).default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("LOW"),
  dueDate: z.coerce.date(),
  assigneeId: cuid.nullable().optional(),
});

export const getTasksInput = z.object({
  projectId: cuid,
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
