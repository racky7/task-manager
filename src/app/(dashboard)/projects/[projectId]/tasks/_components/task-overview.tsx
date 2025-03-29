import { MemberAvatar } from "@/components/member-avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Task } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { TASK_PRIORITY_MAP, TASK_STATUS_MAP } from "../_lib/constants";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import useEditTaskModal from "../_hooks/use-edit-task-modal";

const TaskProperty = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="min-w-[100px]">
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
};

const TaskOverview = ({
  task,
}: {
  task: Task & { assignee: { name: string | null; id: string } | null };
}) => {
  const { open } = useEditTaskModal();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="item-center flex justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void open(task.id);
            }}
          >
            <PencilIcon className="mr-1" />
            Edit
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4">
          <TaskProperty label="Assignee">
            {task.assignee ? (
              <>
                <MemberAvatar
                  name={task.assignee?.name ?? "U"}
                  className="size-6"
                />
                <p className="text-sm font-medium">{task.assignee?.name}</p>
              </>
            ) : (
              <p>-</p>
            )}
          </TaskProperty>
          <TaskProperty label="Status">
            <Badge
              style={{
                backgroundColor: TASK_STATUS_MAP[task.status].color,
              }}
            >
              {TASK_STATUS_MAP[task.status].label}
            </Badge>
          </TaskProperty>
          <TaskProperty label="Priority">
            <p className="text-sm font-medium">
              {TASK_PRIORITY_MAP[task.priority].label}
            </p>
          </TaskProperty>
          <TaskProperty label="Due Date">
            <div>
              <span className="truncate text-sm">
                {format(task.dueDate, "EEE, MMM d, yyyy")}
              </span>
            </div>
          </TaskProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
