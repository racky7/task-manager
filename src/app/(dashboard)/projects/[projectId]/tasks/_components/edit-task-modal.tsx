"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useEditTaskModal from "../_hooks/use-edit-task-modal";
import { EditTaskForm } from "./edit-task-form";
import EditTaskFormWrapper from "./edit-task-form-wrapper";

export default function EditTaskModal() {
  const { taskId, close } = useEditTaskModal();

  return (
    <Dialog open={!!taskId} onOpenChange={close}>
      <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
        <EditTaskFormWrapper id={taskId!} onCancel={close} />
      </DialogContent>
    </Dialog>
  );
}
