import useConfirm from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { useProjectId } from "../../../_hooks/use-project-id";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/trpc/react";
import { Task } from "@prisma/client";

const TaskBreadcrumbs = ({ task }: { task: Task }) => {
  const utils = api.useUtils();
  const projectId = useProjectId();
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive",
  );

  const { mutate, isPending } = api.task.deleteTask.useMutation();

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { taskId: task.id },
      {
        onSuccess: () => {
          void utils.task.getTasks.invalidate();
          router.push(`/projects/${projectId}/tasks`);
        },
      },
    );
  };

  return (
    <div className="flex items-center">
      <ConfirmDialog />
      <Link href={`/projects/${projectId}/tasks`}>
        <p className="text-sm font-medium text-muted-foreground transition hover:opacity-75 lg:text-lg">
          All Tasks
        </p>
      </Link>
      <ChevronRightIcon className="size-4 text-muted-foreground lg:size-5" />
      <p className="text-sm font-semibold lg:text-lg">{task.title}</p>
      <Button
        className="ml-auto"
        disabled={isPending}
        variant="destructive"
        onClick={handleDeleteTask}
      >
        Delete Task
      </Button>
    </div>
  );
};

export default TaskBreadcrumbs;
