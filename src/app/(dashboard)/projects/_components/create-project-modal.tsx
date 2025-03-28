"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCreateProjecteModal } from "../_hooks/use-create-project-modal";
import CreateProjectForm from "./create-project-form";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjecteModal();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
        <CreateProjectForm onCancel={close} />
      </DialogContent>
    </Dialog>
  );
};
