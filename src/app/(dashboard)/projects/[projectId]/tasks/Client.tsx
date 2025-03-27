"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "./_hooks/use-create-task-modal";

export default function ProjectTasksClient() {
  const { open } = useCreateTaskModal();
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
          {false ? (
            <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
              <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="mt-0">Data Table</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
