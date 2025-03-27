import type { z } from "zod";
import type { createProjectInput } from "./project.input";
import { type Session } from "next-auth";
import { db } from "@/server/db";
import { generateInviteCode } from "@/lib/utils";

export function createProject(
  input: z.infer<typeof createProjectInput>,
  session: Session,
) {
  return db.project.create({
    data: {
      name: input.name,
      userId: session.user.id,
      inviteCode: generateInviteCode(6),
    },
  });
}

export function getProjects(session: Session) {
  return db.project.findMany({
    where: {
      userId: session.user.id,
    },
  });
}
