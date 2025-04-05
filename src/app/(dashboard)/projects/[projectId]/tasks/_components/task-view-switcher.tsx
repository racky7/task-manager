"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../_hooks/use-create-task-modal";
import { DataTable } from "./data-table";
import { columns } from "./data-table-columns";
import { api } from "@/trpc/react";
import DataFilters from "./data-filters";
import { useTaskFilters } from "../_hooks/use-task-filters";
import { useProjectId } from "../../../_hooks/use-project-id";
import { useQueryState } from "nuqs";
import DataKanban from "./data-kanban";

const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const { open } = useCreateTaskModal();
  const [{ status, priority, assigneeId }] = useTaskFilters();
  const projectId = useProjectId();
  const { data: tasks, isLoading: isTasksLoading } = api.task.getTasks.useQuery(
    { projectId, status, priority, assigneeId },
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} className="w-full lg:w-auto">
            <PlusIcon size="size-4 mr-2" />
            New Task
          </Button>
        </div>
        {view === "table" ? (
          <>
            <Separator className="my-4" />
            <DataFilters />
          </>
        ) : null}
        <Separator className="my-4" />

        {isTasksLoading ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table">
              <DataTable columns={columns} data={tasks!} />
            </TabsContent>
            <TabsContent value="kanban">
              <DataKanban data={tasks!} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
