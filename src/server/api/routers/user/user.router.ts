import {
  protectedProcedure,
  publicProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";
import { getUserInput, signUpUserInput } from "./user.input";
import { getCurrentUser, getUser, signUpUser } from "./user.service";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(getUserInput)
    .query(({ input }) => getUser(input)),
  getCurrentUser: protectedProcedure.query(({ ctx: { session } }) =>
    getCurrentUser(session),
  ),
  signUpUser: publicProcedure
    .input(signUpUserInput)
    .mutation(({ input }) => signUpUser(input)),
});
