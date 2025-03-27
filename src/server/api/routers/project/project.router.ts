import {
  protectedProcedure,
  publicProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";
import { createProject, getProjects } from "./project.service";
import { createProjectInput } from "./project.input";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(createProjectInput)
    .mutation(({ input, ctx: { session } }) => createProject(input, session)),
  getProjects: protectedProcedure.query(({ ctx: { session } }) =>
    getProjects(session),
  ),
});
