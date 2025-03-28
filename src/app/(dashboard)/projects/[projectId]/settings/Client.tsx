"use client";

import { Button } from "@/components/ui/button";
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
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="animate size-6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <EditProjectForm initialValues={initialValues!} />
      <InviteMembers initialValues={initialValues!} />
      <DeleteProject initialValues={initialValues!} />
      {/* <div className="w-full max-w-xl flex-1 rounded-lg border bg-red-50 p-4">
        <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
        <p className="text-sm text-gray-600">
          This action is irreversible. Proceed with caution.
        </p>
        <div className="flex justify-end">
          <Button className="mt-2 bg-red-600 text-white hover:bg-red-700">
            Delete Project
          </Button>
        </div>
      </div> */}
    </div>
  );
}
