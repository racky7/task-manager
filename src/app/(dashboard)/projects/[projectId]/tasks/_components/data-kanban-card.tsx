import { MemberAvatar } from "@/components/member-avatar";
import { Separator } from "@/components/ui/separator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@prisma/client";
import { format } from "date-fns";

interface DataKanbanCardProps {
  item: Task & { assignee?: { id: string; name: string | null } | null };
}

const DataKanbanCard = ({ item }: DataKanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: item.id,
  });

  const style = {
    opacity: 1,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="mb-1.5 space-y-3 rounded bg-white p-2.5 shadow-sm"
      style={style}
    >
      <div className="flex items-start justify-between gap-x-2">
        <p className="line-clamp-2 text-sm">{item.title}</p>
      </div>
      <Separator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={item?.assignee?.name ?? "U"}
          fallbackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <div>
          <span className="truncate text-sm">
            {format(item.dueDate, "EEE, MMM d, yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataKanbanCard;
