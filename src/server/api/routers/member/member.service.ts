import { type z } from "zod";
import {
  deleteProjectMemberInput,
  type getProjectMembersInput,
} from "./member.input";
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

export async function deleteProjectMember(
  input: z.infer<typeof deleteProjectMemberInput>,
  session: Session,
) {
  const memberToDelete = await db.member.findUnique({
    where: { id: input.memberId },
  });

  if (!memberToDelete) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Member not found",
    });
  }

  const member = await db.member.findFirst({
    where: {
      projectId: memberToDelete.projectId,
      userId: session.user.id,
    },
  });

  if (!member) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized. Not a member.",
    });
  }

  if (member.id !== memberToDelete.id && member.role !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Member cannot remove anyone.",
    });
  }

  const allMembersInProject = await db.member.findMany({
    where: {
      projectId: memberToDelete.projectId,
    },
  });

  if (allMembersInProject.length === 1) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Cannot delete the only member",
    });
  }
  const admins = allMembersInProject.filter((m) => m.role === "ADMIN");

  if (memberToDelete.role === "ADMIN" && admins.length === 1) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Cannot delete the only admin",
    });
  }

  await db.$transaction(async (prisma) => {
    // Unassign all tasks
    await prisma.task.updateMany({
      where: {
        projectId: memberToDelete.projectId,
        assigneeId: memberToDelete.userId,
      },
      data: { assigneeId: null },
    });

    // Delete the member
    await prisma.member.delete({
      where: { id: input.memberId },
    });
  });
}
