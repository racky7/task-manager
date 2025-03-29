import { cuid } from "@/lib/validation";
import { z } from "zod";

export const getProjectMembersInput = z.object({
  projectId: cuid,
});

export const deleteProjectMemberInput = z.object({
  memberId: cuid,
});
