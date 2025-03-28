import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "lucide-react";
import useConfirm from "@/hooks/use-confirm";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useEditTaskModal from "../_hooks/use-edit-task-modal";

interface Props {
  id: string;
  children: React.ReactNode;
}

const TaskActions = ({ id, children }: Props) => {
  const utils = api.useUtils();
  const { open } = useEditTaskModal();
  const { mutate, isPending } = api.task.deleteTask.useMutation();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive",
  );

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate(
      { taskId: id },
      {
        onSuccess: () => {
          void utils.task.getTasks.invalidate();
          toast.success("Task delete successfully");
        },
        onError: () => {
          toast.error("Error deleting task!");
        },
      },
    );
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => open(id)}
            className="p-[10px] font-medium"
          >
            <PencilIcon className="stroke mr-2 size-4" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="p-[10px] font-medium text-amber-700 focus:text-amber-700"
          >
            <TrashIcon className="stroke mr-2 size-4" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
