import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProjectIdPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return <div>Project Id page</div>;
}
