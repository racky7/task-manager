import Link from "next/link";
import { Separator } from "./ui/separator";
import { ProjectSwitcher } from "./project-switcher";

export const Sidebar = () => {
  return (
    <div className="h-full w-full bg-neutral-100 p-4">
      <Link href={"/"}>
        <div className="text-2xl">Task Manager</div>
      </Link>
      <Separator className="my-4" />
      <ProjectSwitcher />
    </div>
  );
};
