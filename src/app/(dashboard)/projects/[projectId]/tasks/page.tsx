import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import TaskViewSwitcher from "./_components/task-view-switcher";

export default async function ProjectTasksPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col">
      <TaskViewSwitcher />
    </div>
  );
}
