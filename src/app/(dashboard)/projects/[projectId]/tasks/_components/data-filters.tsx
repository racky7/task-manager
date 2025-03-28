import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TASK_PRIORITY,
  TASK_PRIORITY_MAP,
  TASK_STATUS,
  TASK_STATUS_MAP,
  TaskPriority,
  TaskStatus,
} from "../_lib/constants";
import { FlagIcon, ListCheckIcon, UserIcon } from "lucide-react";
import { useTaskFilters } from "../_hooks/use-task-filters";
import { api } from "@/trpc/react";
import { useProjectId } from "../../../_hooks/use-project-id";

const DataFilters = () => {
  const projectId = useProjectId();
  const [{ status, priority, assigneeId }, setFilters] = useTaskFilters();
  const { data: members } = api.member.getMembers.useQuery({ projectId });

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  };

  const onPriorityChange = (value: string) => {
    setFilters({ priority: value === "all" ? null : (value as TaskPriority) });
  };

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="mr-2 size-4" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          {TASK_STATUS.map((status) => {
            return (
              <SelectItem key={`filter-by-${status}`} value={status}>
                {TASK_STATUS_MAP[status].label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <UserIcon className="mr-2 size-4" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All assignees</SelectItem>
          <SelectSeparator />
          {members?.map((member) => (
            <SelectItem key={member.id} value={member.user.id}>
              {member.user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={priority ?? undefined}
        onValueChange={(value) => onPriorityChange(value)}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <FlagIcon className="mr-2 size-4" />
            <SelectValue placeholder="All priorities" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          <SelectSeparator />
          {TASK_PRIORITY.map((priority) => {
            return (
              <SelectItem key={`filter-by-${priority}`} value={priority}>
                {TASK_PRIORITY_MAP[priority].label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DataFilters;
