import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useConfirm from "@/hooks/use-confirm";
import { generateInviteCode } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Project } from "@prisma/client";
import { toast } from "sonner";

const DeleteProject = ({ initialValues }: { initialValues: Project }) => {
  const utils = api.useUtils();
  const { mutate, isPending } = api.project.updateProject.useMutation();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete project",
    "This action cannot be undone.",
    "destructive",
  );

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    mutate(
      { inviteCode: generateInviteCode(6), projectId: initialValues.id },
      {
        onSuccess: () => {
          toast.success("Project invite code updated!");
          void utils.project.getProject.invalidate({
            projectId: initialValues.id,
          });
          void utils.project.getProjects.invalidate();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <div className="w-full max-w-xl">
      <DeleteDialog />
      <Card className="shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversable and will remove all
              associated data.
            </p>
            <div className="py-7">
              <Separator />
            </div>
            <Button
              variant="destructive"
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="ml-auto mt-6 w-fit"
            >
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteProject;
