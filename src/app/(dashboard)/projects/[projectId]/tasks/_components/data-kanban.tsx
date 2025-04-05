import { Task } from "@prisma/client";
import {
  closestCorners,
  DndContext,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { TASK_STATUS, TaskStatus } from "../_lib/constants";
import { useState } from "react";
import DataKanbanColumn from "./data-kanban-column";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

type TaskState = Record<TaskStatus, Task[]>;

interface DataKanbanProps {
  data: (Task & { assignee?: { id: string; name: string | null } | null })[];
}

const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const initialState: TaskState = {} as TaskState;

    data.forEach((task) => {
      const status = task.status as TaskStatus;
      if (!initialState[status]) {
        initialState[status] = [];
      }
      initialState[status].push(task);
    });

    return initialState;
  });

  const findColumn = (taskId: string): TaskStatus | undefined => {
    return Object.entries(tasks).find(([_, items]) =>
      items.some((task) => task.id === taskId),
    )?.[0] as TaskStatus | undefined;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (activeId === overId && activeColumn === overColumn) return;

    if (!activeColumn) return;

    const activeTask = tasks[activeColumn].find((task) => task.id === activeId);
    if (!activeTask) return;

    setTasks((prev) => {
      const newTasks = { ...prev };

      newTasks[activeColumn] = newTasks[activeColumn].filter(
        (task) => task.id !== activeId,
      );

      if (!overColumn) {
        newTasks[over.id as TaskStatus] = [
          ...newTasks[over.id as TaskStatus],
          activeTask,
        ];
      } else {
        const insertIndex = newTasks[overColumn].findIndex(
          (task) => task.id === overId,
        );

        newTasks[overColumn] = [
          ...newTasks[overColumn].slice(0, insertIndex),
          activeTask,
          ...newTasks[overColumn].slice(insertIndex),
        ];
      }

      return newTasks;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragOver={onDragOver}
      collisionDetection={closestCorners}
    >
      <div className="flex overflow-x-auto">
        {TASK_STATUS.map((status, index) => (
          <DataKanbanColumn
            key={`${status}-kanban-${index}`}
            id={`${status}`}
            title={status}
            cards={tasks[status] ?? []}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default DataKanban;
