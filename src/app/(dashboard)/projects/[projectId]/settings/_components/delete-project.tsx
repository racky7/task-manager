import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useConfirm from "@/hooks/use-confirm";
import { api } from "@/trpc/react";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteProject = ({ initialValues }: { initialValues: Project }) => {
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate, isPending } = api.project.deleteProject.useMutation();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete project",
    "This action cannot be undone.",
    "destructive",
  );

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    mutate(
      { projectId: initialValues.id },
      {
        onSuccess: () => {
          toast.success("Project deleted successfully");
          void utils.project.getProjects.invalidate();
          router.push("/");
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
              Deleting a project is irreversable and will remove all associated
              data.
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
