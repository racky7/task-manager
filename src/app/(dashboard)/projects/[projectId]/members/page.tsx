import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import MembersList from "./_components/members-list";

export default async function ProjectMembersPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex w-full flex-col items-center">
      <MembersList />
    </div>
  );
}
