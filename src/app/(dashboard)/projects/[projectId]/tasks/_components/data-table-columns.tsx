import { MemberAvatar } from "@/components/member-avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { type Task } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TASK_PRIORITY_MAP, TASK_STATUS_MAP } from "../_lib/constants";
import TaskActions from "./task-action";

export const columns: ColumnDef<
  Task & { assignee?: { id: string; name: string | null } | null }
>[] = [
  {
    accessorKey: "title",
    header: () => {
      return <div>Task Title</div>;
    },
    cell: ({ row }) => {
      const title = row.original.title;

      return <p className="line-clamp-1">{title}</p>;
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          {assignee?.name ? (
            <>
              <MemberAvatar
                name={assignee.name}
                fallbackClassName="text-xs"
                className="size-6"
              />
              <p className="line-clamp-1">{assignee.name}</p>
            </>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;

      return (
        <div>
          <span className="truncate">
            {format(dueDate, "EEE, MMM d, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          style={{
            backgroundColor: TASK_STATUS_MAP[status].color,
          }}
        >
          {TASK_STATUS_MAP[status].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority = row.original.priority;

      return <div>{TASK_PRIORITY_MAP[priority].label}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TaskActions id={row.original.id}>
          <Button className="size-8 p-0" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  },
];
