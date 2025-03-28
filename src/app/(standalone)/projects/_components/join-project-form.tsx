"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProjectId } from "@/app/(dashboard)/projects/_hooks/use-project-id";
import { useInviteCode } from "@/app/(dashboard)/projects/_hooks/use-invite-code";
import { type Project } from "@prisma/client";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export const JoinProjectForm = ({
  initialValues,
}: {
  initialValues: {
    name: string;
    id: string;
  };
}) => {
  const router = useRouter();
  const projectId = useProjectId();
  const inviteCode = useInviteCode();

  const { mutate, isPending } = api.project.joinProject.useMutation();

  const onSubmit = () => {
    mutate(
      {
        projectId,
        code: inviteCode,
      },
      {
        onSuccess: (data) => {
          router.push(`/projects/${data.projectId}`);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join project</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join{" "}
          <strong>{initialValues?.name}</strong> project
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full lg:w-fit"
            disabled={isPending}
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            type="button"
            size="lg"
            className="w-full lg:w-fit"
            onClick={onSubmit}
            disabled={isPending}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
