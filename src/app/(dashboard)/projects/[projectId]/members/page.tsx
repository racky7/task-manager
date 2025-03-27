import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProjectMembersPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return <div>Project Members Page</div>;
}
