"use client";

import { UserButton } from "./auth/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { usePathname } from "next/navigation";

const pathnameMap = {
  tasks: {
    title: "My Tasks",
    description: "View all of your tasks here",
  },
  settings: {
    title: "Settings",
    description: "Manage your project settings here",
  },
  members: {
    title: "Members",
    description: "Manage your project members here",
  },
};

const defaultMap = {
  title: "Dashboard",
  description: "Keep track of all your project tasks here",
};

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
