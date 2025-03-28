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
      <div className="w-full max-w-xl flex-1 rounded-lg border p-4">
        <h2 className="text-lg font-bold">Project Information</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Project Name</label>
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder={"Enter project name"}
            className="mt-1"
          />
          <div className="mt-3 flex justify-end">
            <Button>Update</Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl flex-1 rounded-lg border p-4">
        <h2 className="text-lg font-bold">Invite Members</h2>
        <p className="text-sm text-gray-600">
          Use the invite link to add members to your workspace.
        </p>
        <div className="mt-2 flex items-center space-x-2">
          <Input
            value="https://task-manager.app/projects/67e51ed40017d5ce66b4/join/WAk6Yn"
            readOnly
          />
          <Button className="bg-gray-600 text-white hover:bg-gray-700">
            Copy
          </Button>
        </div>
        <div className="mt-3 flex justify-end">
          <Button>Reset invite link</Button>
        </div>
      </div>
      <div className="w-full max-w-xl flex-1 rounded-lg border bg-red-50 p-4">
        <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
        <p className="text-sm text-gray-600">
          This action is irreversible. Proceed with caution.
        </p>
        <div className="flex justify-end">
          <Button className="mt-2 bg-red-600 text-white hover:bg-red-700">
            Delete Project
          </Button>
        </div>
      </div>
    </div>
  );
}
