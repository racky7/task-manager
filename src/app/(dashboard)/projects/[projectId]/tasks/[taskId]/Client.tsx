"use client";

import { Separator } from "@/components/ui/separator";
import TaskBreadcrumbs from "../_components/task-breadcrumbs";
import { useTaskId } from "../_hooks/use-task-id";
import { api } from "@/trpc/react";
import { Loader } from "lucide-react";
import TaskOverview from "../_components/task-overview";

export default function TaskIdClientPage() {
  const taskId = useTaskId();
  const { data: task, isLoading } = api.task.getTask.useQuery({ taskId });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs task={task!} />
      <Separator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <TaskOverview task={task!} />
      </div>
    </div>
  );
}
