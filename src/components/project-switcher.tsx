"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RiAddCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useProjectId } from "@/app/(dashboard)/projects/_hooks/use-project-id";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useCreateProjecteModal } from "@/app/(dashboard)/projects/_hooks/use-create-project-modal";

export const ProjectSwitcher = () => {
  const router = useRouter();

  const { data: projects } = api.project.getProjects.useQuery();
  const { open } = useCreateProjecteModal();
  const projectId = useProjectId();

  const onSelect = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 cursor-pointer text-neutral-500 hover:hover:opacity-75"
        />
      </div>
      <Select onValueChange={onSelect} value={projectId}>
        <SelectTrigger className="w-full bg-neutral-200 p-1 font-medium">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {projects?.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex items-center justify-start gap-3 font-medium">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-blue-600 text-lg font-semibold uppercase text-white">
                    {project.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{project.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
