import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import { createTaskInput, getTasksInput } from "./task.input";
import { createTask, getTasks } from "./task.service";

export const taksRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(createTaskInput)
    .mutation(({ input, ctx: { session } }) => createTask(input, session)),
  getTasks: protectedProcedure
    .input(getTasksInput)
    .query(({ input, ctx: { session } }) => getTasks(input, session)),
});
