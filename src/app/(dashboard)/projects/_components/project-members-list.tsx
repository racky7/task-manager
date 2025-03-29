import { Member } from "@prisma/client";
import { useProjectId } from "../_hooks/use-project-id";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { MemberAvatar } from "@/components/member-avatar";

export const ProjectMembersList = ({
  data,
  total,
}: {
  data: (Member & {
    user: { id: string; name: string | null; email: string | null };
  })[];
  total: number;
}) => {
  const projectId = useProjectId();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Button variant="secondary" size="icon">
            <Link href={`/projects/${projectId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <Separator className="my-4" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((member) => (
            <li key={member.id}>
              <Card className="overflow-hidden rounded-lg shadow-none">
                <CardContent className="flex flex-col items-center gap-x-2 p-4">
                  <MemberAvatar
                    className="size-12"
                    name={member.user.name ?? ""}
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="line-clamp-1 text-lg font-medium">
                      {member.user.name}
                    </p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {member.user.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  );
};
