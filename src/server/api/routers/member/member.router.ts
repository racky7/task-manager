import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import {
  deleteProjectMember,
  getProjectMembers,
  updateMember,
} from "./member.service";
import {
  deleteProjectMemberInput,
  getProjectMembersInput,
  updateMemberInput,
} from "./member.input";

export const memberRouter = createTRPCRouter({
  getMembers: protectedProcedure
    .input(getProjectMembersInput)
    .query(({ input, ctx: { session } }) => getProjectMembers(input, session)),
  deleteMember: protectedProcedure
    .input(deleteProjectMemberInput)
    .mutation(({ input, ctx: { session } }) =>
      deleteProjectMember(input, session),
    ),
  updateMember: protectedProcedure
    .input(updateMemberInput)
    .mutation(({ input, ctx: { session } }) => updateMember(input, session)),
});
