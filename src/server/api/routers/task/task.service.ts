import type { z } from "zod";
import { type Session } from "next-auth";
import { db } from "@/server/db";
import {
  type deleteTaskInput,
  type getTasksInput,
  type updateTaskInput,
  type createTaskInput,
} from "./task.input";
import { TRPCError } from "@trpc/server";

export async function createTask(
  input: z.infer<typeof createTaskInput>,
  session: Session,
) {
  const member = await db.member.findFirst({
    where: {
      userId: session.user.id,
      projectId: input.projectId,
    },
  });

  if (!member) {
    return [];
  }

  if (input.assigneeId) {
    const existingUser = await db.user.findUnique({
      where: { id: input.assigneeId },
    });

    if (!existingUser) {
      throw new Error("Assignee does not exist");
    }
  }

  return db.task.create({
    data: {
      ...input,
      assigneeId: input.assigneeId ?? null,
    },
  });
}

export async function getTasks(
  input: z.infer<typeof getTasksInput>,
  session: Session,
) {
  const member = await db.member.findFirst({
    where: {
      userId: session.user.id,
      projectId: input.projectId,
    },
  });

  if (!member) {
    return [];
  }

  return db.task.findMany({
    where: {
      projectId: input.projectId,
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function deleteTask(
  input: z.infer<typeof deleteTaskInput>,
  session: Session,
) {
  const task = await db.task.findUnique({
    where: {
      id: input.taskId,
    },
  });

  if (!task) {
    throw new Error("Task does not exist");
  }

  const member = await db.member.findFirst({
    where: {
      userId: session.user.id,
      projectId: task.projectId,
    },
  });

  if (!member) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Member does not belog to project",
    });
  }

  await db.task.delete({
    where: {
      id: task.id,
    },
  });

  return task;
}

export async function updateTask(
  { id, ...rest }: z.infer<typeof updateTaskInput>,
  session: Session,
) {
  const task = await db.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new Error("Task does not exist");
  }

  const member = await db.member.findFirst({
    where: {
      userId: session.user.id,
      projectId: task.projectId,
    },
  });

  if (!member) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Member does not belong to project",
    });
  }

  if (rest.assigneeId) {
    const existingUser = await db.user.findUnique({
      where: { id: rest.assigneeId },
    });

    if (!existingUser) {
      throw new Error("Assignee does not exist");
    }
  }

  return db.task.update({
    where: { id },
    data: { ...rest },
  });
}
