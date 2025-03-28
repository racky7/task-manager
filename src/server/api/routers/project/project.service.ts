import type { z } from "zod";
import type {
  createProjectInput,
  getProjectInput,
  joinProjectInput,
  updateProjectInput,
} from "./project.input";
import { type Session } from "next-auth";
import { db } from "@/server/db";
import { generateInviteCode } from "@/lib/utils";
import { TRPCError } from "@trpc/server";

export async function createProject(
  input: z.infer<typeof createProjectInput>,
  session: Session,
) {
  const project = await db.project.create({
    data: {
      name: input.name,
      userId: session.user.id,
      inviteCode: generateInviteCode(6),
    },
  });

  await db.member.create({
    data: {
      projectId: project.id,
      userId: session.user.id,
      role: "ADMIN",
    },
  });

  return project;
}

export async function getProjects(session: Session) {
  const members = await db.member.findMany({
    where: {
      userId: session.user.id,
    },
  });

  if (!members) {
    return [];
  }

  const projectIds = members.map((member) => member.projectId);

  return db.project.findMany({
    where: {
      id: { in: projectIds },
    },
  });
}

export async function getProject(
  input: z.infer<typeof getProjectInput>,
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
      message: "Member does not belong to project",
    });
  }

  return db.project.findUnique({
    where: { id: input.projectId },
  });
}

export async function getProjectInfo(input: z.infer<typeof getProjectInput>) {
  return db.project.findUnique({
    where: { id: input.projectId },
    select: {
      id: true,
      name: true,
    },
  });
}

export async function joinProject(
  input: z.infer<typeof joinProjectInput>,
  session: Session,
) {
  const member = await db.member.findFirst({
    where: {
      projectId: input.projectId,
      userId: session.user.id,
    },
  });

  if (member) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Already a member",
    });
  }

  const project = await db.project.findUnique({
    where: { id: input.projectId },
  });

  if (project?.inviteCode !== input.code) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalide invite code",
    });
  }

  return db.member.create({
    data: {
      projectId: input.projectId,
      userId: session.user.id,
      role: "MEMBER",
    },
  });
}

export async function updateProject(
  input: z.infer<typeof updateProjectInput>,
  session: Session,
) {
  const project = await db.project.findUnique({
    where: { id: input.projectId },
  });

  if (!project) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
  }

  const member = await db.member.findFirst({
    where: { projectId: input.projectId, userId: session.user.id },
  });

  if (!member || member.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Not authorized. Only for Admin.",
    });
  }

  return db.project.update({
    where: { id: input.projectId },
    data: { name: input.name, inviteCode: input.inviteCode },
  });
}
