import { cuid } from "@/lib/validation";
import { z } from "zod";

export const getProjectMembersInput = z.object({
  projectId: cuid,
});
