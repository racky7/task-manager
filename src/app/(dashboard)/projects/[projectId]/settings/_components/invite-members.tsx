import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useConfirm from "@/hooks/use-confirm";
import { generateInviteCode } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Project } from "@prisma/client";
import { toast } from "sonner";

const InviteMembers = ({ initialValues }: { initialValues: Project }) => {
  const utils = api.useUtils();
  const { mutate, isPending } = api.project.updateProject.useMutation();

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset invite link",
    "This action will invalidate the current invite link.",
    "destructive",
  );
  const fullInviteLink = `${window.location.origin}/projects/${initialValues.id}/join/${initialValues.inviteCode}`;

  const handleResetInviteCode = async () => {
    const ok = await confirmReset();

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

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  return (
    <div className="w-full max-w-xl">
      <ResetDialog />
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <CardTitle className="text-xl font-bold">Invite Members</CardTitle>
        </CardHeader>
        <div className="px-7">
          <Separator />
        </div>
        <CardContent className="p-7">
          <div className="flex flex-col gap-y-4">
            <div className="mt-2 flex items-center space-x-2">
              <Input value={fullInviteLink} readOnly />
              <Button variant="outline" onClick={handleCopyInviteLink}>
                Copy
              </Button>
            </div>
          </div>
          <div className="mt-7 flex items-center justify-end">
            <Button
              type="submit"
              onClick={handleResetInviteCode}
              disabled={isPending}
            >
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteMembers;
