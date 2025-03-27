import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import { getProjectMembers } from "./member.service";
import { getProjectMembersInput } from "./member.input";

export const memberRouter = createTRPCRouter({
  getMembers: protectedProcedure
    .input(getProjectMembersInput)
    .query(({ input, ctx: { session } }) => getProjectMembers(input, session)),
});
