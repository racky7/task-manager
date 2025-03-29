"use client";

import { api } from "@/trpc/react";
import { useProjectId } from "../../_hooks/use-project-id";
import EditProjectForm from "./_components/edit-project-form";
import { Loader } from "lucide-react";
import InviteMembers from "./_components/invite-members";
import DeleteProject from "./_components/delete-project";

export default function ProjectSettingsClient() {
  const projectId = useProjectId();
  const { data: initialValues, isLoading } = api.project.getProject.useQuery({
    projectId,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <EditProjectForm initialValues={initialValues!} />
      <InviteMembers initialValues={initialValues!} />
      <DeleteProject initialValues={initialValues!} />
    </div>
  );
}
