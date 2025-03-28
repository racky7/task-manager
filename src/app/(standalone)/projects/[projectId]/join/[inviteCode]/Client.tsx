"use client";

import { useProjectId } from "@/app/(dashboard)/projects/_hooks/use-project-id";
import { api } from "@/trpc/react";
import { JoinProjectForm } from "../../../_components/join-project-form";

export default function ProjectJoinPageClient() {
  const projectId = useProjectId();
  const { data: project, isLoading } = api.project.getProjectInfo.useQuery({
    projectId,
  });
  if (!isLoading) {
    <div className="w-full lg:max-w-xl">Loading...</div>;
  }

  if (!project) {
    <div className="w-full lg:max-w-xl">Project not found!</div>;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinProjectForm initialValues={project!} />
    </div>
  );
}
