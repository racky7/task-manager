import { type z } from "zod";
import { type getProjectMembersInput } from "./member.input";
import { type Session } from "next-auth";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";

export async function getProjectMembers(
  input: z.infer<typeof getProjectMembersInput>,
  session: Session,
) {
  const member = await db.member.findFirst({
    where: {
      projectId: input.projectId,
      userId: session.user.id,
    },
  });

  if (!member) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User already exists",
    });
  }

  return db.member.findMany({
    where: {
      projectId: input.projectId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
