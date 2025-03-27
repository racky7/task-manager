"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useProjectId } from "../_hooks/use-project-id";
import { useState } from "react";

export default function ProjectSettingsClient() {
  const projectId = useProjectId();
  const [projectName, setProjectName] = useState("");

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full max-w-2xl flex-1 rounded-lg border p-4">
        <h2 className="text-lg font-bold">Project Information</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Project Name</label>
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder={"Enter project name"}
            className="mt-1"
          />
          <Button className="mt-2">Update</Button>
        </div>
      </div>
      <div className="w-full max-w-2xl flex-1 rounded-lg border bg-red-50 p-4">
        <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
        <p className="text-sm text-gray-600">
          This action is irreversible. Proceed with caution.
        </p>
        <Button className="mt-2 bg-red-600 text-white hover:bg-red-700">
          Delete Project
        </Button>
      </div>
    </div>
  );
}
