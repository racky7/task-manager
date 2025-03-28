"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "./_hooks/use-create-task-modal";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/data-table-columns";
import { api } from "@/trpc/react";
import { useProjectId } from "../../_hooks/use-project-id";

export default function ProjectTasksClient() {
  const { open } = useCreateTaskModal();
  const projectId = useProjectId();
  const { data: tasks, isLoading: isTasksLoading } = api.task.getTasks.useQuery(
    { projectId },
  );

  return (
    <div className="flex flex-col">
      <div className="w-full flex-1 rounded-lg border">
        <div className="flex h-full flex-col overflow-auto p-4">
          <div className="flex justify-end">
            <Button onClick={open} className="w-full lg:w-auto">
              <PlusIcon size="size-4 mr-2" />
              New Task
            </Button>
          </div>
          <Separator className="my-4" />
          {isTasksLoading ? (
            <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
              <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="mt-0">
                <DataTable columns={columns} data={tasks!} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
