import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }
  const projects = await api.project.getProjects();
  if (projects.length === 0) {
    redirect("/projects/create");
  } else {
    redirect(`/projects/${projects[0]?.id}`);
  }
}
