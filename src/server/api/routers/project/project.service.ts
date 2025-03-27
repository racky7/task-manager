import type { z } from "zod";
import type { createProjectInput } from "./project.input";
import { type Session } from "next-auth";
import { db } from "@/server/db";
import { generateInviteCode } from "@/lib/utils";

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
