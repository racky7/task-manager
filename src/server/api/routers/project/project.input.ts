import { z } from "zod";
import { cuid } from "@/lib/validation";

export const createProjectInput = z.object({
  name: z.string(),
});

export const getProjectInput = z.object({
  projectId: cuid,
});

export const joinProjectInput = z.object({
  projectId: cuid,
  code: z.string(),
});
