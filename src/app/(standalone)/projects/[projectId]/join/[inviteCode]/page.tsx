import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import ProjectJoinPageClient from "./Client";

export default async function ProjectJoinPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return <ProjectJoinPageClient />;
}
