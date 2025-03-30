import { cuid } from "@/lib/validation";
import { z } from "zod";

export const getProjectMembersInput = z.object({
  projectId: cuid,
});

export const deleteProjectMemberInput = z.object({
  memberId: cuid,
});

export const updateMemberInput = z.object({
  memberId: cuid,
  role: z.enum(["ADMIN", "MEMBER"]),
});
