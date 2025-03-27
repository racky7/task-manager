import { z } from "zod";
import { cuid } from "@/lib/validation";

export const createProjectInput = z.object({
  name: z.string(),
});
