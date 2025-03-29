"use client";

import { api } from "@/trpc/react";
import { useProjectId } from "../_hooks/use-project-id";
import { Loader } from "lucide-react";
import ProjectAnalytics from "../_components/project-analytics";
import { ProjectTaskList } from "../_components/project-tasks-list";
import { ProjectMembersList } from "../_components/project-members-list";

export default function ProjectIdClientPage() {
  const projectId = useProjectId();
  const { data: projectAnalytics, isLoading: projectAnalyticsLoading } =
    api.project.getProjectAnalytics.useQuery({ projectId });
  const { data: projectTasks, isLoading: projectTasksLoading } =
    api.task.getTasks.useQuery({ projectId });
  const { data: projectMembers, isLoading: projectMembersLoading } =
    api.member.getMembers.useQuery({ projectId });

  const isLoading =
    projectAnalyticsLoading || projectTasksLoading || projectMembersLoading;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-ful flex flex-col space-y-4">
      <ProjectAnalytics data={projectAnalytics!} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProjectTaskList
          data={projectTasks ?? []}
          total={projectTasks?.length ?? 0}
        />
        <ProjectMembersList
          data={projectMembers!}
          total={projectMembers?.length ?? 0}
        />
      </div>
    </div>
  );
}
