"use client";

import { MoreVerticalIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectId } from "../../../_hooks/use-project-id";
import useConfirm from "@/hooks/use-confirm";
import { api } from "@/trpc/react";
import { MemberAvatar } from "@/components/member-avatar";
import { Member } from "@prisma/client";

const MembersList = () => {
  const projectId = useProjectId();
  const { data } = api.member.getMembers.useQuery({ projectId });
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove member",
    "This member will be removed from the project",
    "destructive",
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  const handleUpdateMember = (memberId: string, role: Member["role"]) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) return;
  };

  return (
    <div className="w-full max-w-xl">
      <Card className="w-full flex-1 shadow-none">
        <ConfirmDialog />
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <CardTitle className="text-xl font-bold">Members List</CardTitle>
        </CardHeader>
        <div className="px-7">
          <Separator />
        </div>
        <CardContent className="p-7">
          {data?.map((member, index) => (
            <Fragment key={member.id}>
              <div className="flex items-center gap-2">
                <MemberAvatar
                  name={member.user.name!}
                  className="size-10"
                  fallbackClassName="text-lg"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{member.user.name!} </p>
                  <p className="text-sm text-muted-foreground">
                    {member.user?.email}
                  </p>
                  <p className="text-xs">{member.role} </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary" className="ml-auto">
                      <MoreVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() => handleUpdateMember(member.id, "ADMIN")}
                      // disabled={isUpdatingMember}
                    >
                      Set as Administrator
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() => handleUpdateMember(member.id, "MEMBER")}
                      // disabled={isUpdatingMember}
                    >
                      Set as member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-amber-700"
                      onClick={() => handleDeleteMember(member.id)}
                      // disabled={isDeletingMember}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {index < data.length - 1 && <Separator className="my-2.5" />}
            </Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersList;
