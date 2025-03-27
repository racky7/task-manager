import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import ProjectTasksClient from "./Client";

export default async function ProjectTasksPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return <ProjectTasksClient />;
}
