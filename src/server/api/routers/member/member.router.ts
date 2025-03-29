import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import { deleteProjectMember, getProjectMembers } from "./member.service";
import {
  deleteProjectMemberInput,
  getProjectMembersInput,
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
});
