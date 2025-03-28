import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";
import {
  createTaskInput,
  deleteTaskInput,
  getTaskInput,
  getTasksInput,
  updateTaskInput,
} from "./task.input";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./task.service";

export const taksRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(createTaskInput)
    .mutation(({ input, ctx: { session } }) => createTask(input, session)),
  getTasks: protectedProcedure
    .input(getTasksInput)
    .query(({ input, ctx: { session } }) => getTasks(input, session)),
  deleteTask: protectedProcedure
    .input(deleteTaskInput)
    .mutation(({ input, ctx: { session } }) => deleteTask(input, session)),
  updateTask: protectedProcedure
    .input(updateTaskInput)
    .mutation(({ input, ctx: { session } }) => updateTask(input, session)),
  getTask: protectedProcedure
    .input(getTaskInput)
    .query(({ input, ctx: { session } }) => getTask(input, session)),
});
