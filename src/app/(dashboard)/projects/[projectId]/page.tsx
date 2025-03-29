import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import ProjectIdClientPage from "./Client";

export default async function ProjectIdPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return <ProjectIdClientPage />;
}
