"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCreateTaskModal } from "../_hooks/use-create-task-modal";
import { CreateTaskForm } from "./create-task-form";

export default function CreateTaskModal() {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <CreateTaskForm onCancel={close} />
      </DialogContent>
    </Dialog>
  );
}
