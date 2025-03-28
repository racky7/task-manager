import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import {
  createProject,
  getProject,
  getProjectInfo,
  getProjects,
  joinProject,
  updateProject,
} from "./project.service";
import {
  createProjectInput,
  getProjectInput,
  joinProjectInput,
  updateProjectInput,
} from "./project.input";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(createProjectInput)
    .mutation(({ input, ctx: { session } }) => createProject(input, session)),
  getProjects: protectedProcedure.query(({ ctx: { session } }) =>
    getProjects(session),
  ),
  getProject: protectedProcedure
    .input(getProjectInput)
    .query(({ input, ctx: { session } }) => getProject(input, session)),
  getProjectInfo: protectedProcedure
    .input(getProjectInput)
    .query(({ input }) => getProjectInfo(input)),
  joinProject: protectedProcedure
    .input(joinProjectInput)
    .mutation(({ input, ctx: { session } }) => joinProject(input, session)),
  updateProject: protectedProcedure
    .input(updateProjectInput)
    .mutation(({ input, ctx: { session } }) => updateProject(input, session)),
});
