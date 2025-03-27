import CreateProjectForm from "@/app/(dashboard)/projects/[projectId]/_components/create-project-form";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function CreateProjectPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <CreateProjectForm />
    </div>
  );
}
