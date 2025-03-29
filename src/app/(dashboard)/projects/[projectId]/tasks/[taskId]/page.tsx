import { getServerAuthSession } from "@/server/auth";
import TaskIdClientPage from "./Client";
import { redirect } from "next/navigation";

export default async function TaskIdPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return <TaskIdClientPage />;
}
