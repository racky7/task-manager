// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from "zod";
import { type getUserInput, type signUpUserInput } from "./user.input";
import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export function getUser(input: z.infer<typeof getUserInput>) {
  return db.user.findUnique({
    where: {
      id: input.id,
    },
  });
}

export async function signUpUser({
  name,
  email,
  password,
}: z.infer<typeof signUpUserInput>) {
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}
