import {
  protectedProcedure,
  publicProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";
import { getUserInput, logInUserInput, signUpUserInput } from "./user.input";
import { getUser, logInUser, signUpUser } from "./user.service";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(getUserInput)
    .query(({ input }) => getUser(input)),
  logInUser: publicProcedure
    .input(logInUserInput)
    .mutation(({ input }) => logInUser(input)),
  signUpUser: publicProcedure
    .input(signUpUserInput)
    .mutation(({ input }) => signUpUser(input)),
});
