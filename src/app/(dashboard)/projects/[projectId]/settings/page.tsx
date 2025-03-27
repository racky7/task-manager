import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import ProjectSettingsClient from "./Client";

export default async function ProjectSettingsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return <ProjectSettingsClient />;
}
