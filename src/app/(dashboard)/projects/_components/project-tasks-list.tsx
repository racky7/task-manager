import { Task } from "@prisma/client";
import { useCreateTaskModal } from "../[projectId]/tasks/_hooks/use-create-task-modal";
import { useProjectId } from "../_hooks/use-project-id";
import { Button } from "@/components/ui/button";
import { Calendar1Icon, PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export const ProjectTaskList = ({
  data,
  total,
}: {
  data: Task[];
  total: number;
}) => {
  const { open: createTask } = useCreateTaskModal();
  const projectId = useProjectId();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button onClick={createTask} variant="outline" size="icon">
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <Separator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {data.slice(0, 4).map((task) => (
            <li key={task.id}>
              <Link href={`/projects/${projectId}/tasks/${task.id}`}>
                <Card className="rounded-lg shadow-none transition hover:opacity-75">
                  <CardContent className="p-4">
                    <p className="truncate text-lg font-medium">{task.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar1Icon className="mr-1 size-3" />
                      <span className="truncate">
                        {format(task.dueDate, "EEE, MMM d, yyyy")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
            No tasks found
          </li>
        </ul>

        <Button variant="outline" className="mt-4 w-full" asChild>
          <Link href={`/projects/${projectId}/tasks`}>Show All</Link>
        </Button>
      </div>
    </div>
  );
};
