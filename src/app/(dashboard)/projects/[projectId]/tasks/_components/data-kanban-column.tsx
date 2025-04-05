import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Task } from "@prisma/client";
import DataKanbanCard from "./data-kanban-card";

interface DataKanbanColumnProps {
  id: string;
  title: string;
  cards: (Task & { assignee?: { id: string; name: string | null } | null })[];
}

const DataKanbanColumn = ({ id, title, cards }: DataKanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="mx-2 min-w-[200px] flex-1 rounded-md bg-muted p-1.5">
      <div className="flex items-center justify-between px-2 py-1.5">
        <div className="flex items-center gap-x-2">
          {/* {icon} */}
          <h2 className="textsm font-medium lowercase">{title}</h2>
          <div className="flex size-5 items-center justify-center rounded-md bg-neutral-200 text-xs font-medium text-neutral-700">
            {cards.length}
          </div>
        </div>
      </div>
      <SortableContext items={cards} strategy={rectSortingStrategy}>
        <div ref={setNodeRef} className="min-h-[200px] py-1.5">
          {cards.map((item) => (
            <DataKanbanCard key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default DataKanbanColumn;
