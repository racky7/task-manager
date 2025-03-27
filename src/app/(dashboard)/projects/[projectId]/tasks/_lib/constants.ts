export const TASK_STATUS = ["TODO", "INPROGRESS", "INREVIEW", "DONE"] as const;

export const TASK_STATUS_MAP: Record<
  (typeof TASK_STATUS)[number],
  { key: string; label: string; color: string }
> = {
  TODO: {
    key: "TODO",
    label: "To Do",
    color: "#F59E0B", // Amber
  },
  INPROGRESS: {
    key: "INPROGRESS",
    label: "In Progress",
    color: "#3B82F6", // Blue
  },
  INREVIEW: {
    key: "INREVIEW",
    label: "In Review",
    color: "#EAB308", // Yellow
  },
  DONE: {
    key: "DONE",
    label: "Done",
    color: "#10B981", // Green
  },
};

export const TASK_PRIORITY = ["LOW", "MEDIUM", "HIGH"] as const;

export const TASK_PRIORITY_MAP: Record<
  (typeof TASK_PRIORITY)[number],
  { key: string; label: string }
> = {
  LOW: {
    key: "LOW",
    label: "Low",
  },
  MEDIUM: {
    key: "MEDIUM",
    label: "Medium",
  },
  HIGH: {
    key: "HIGH",
    label: "High",
  },
};
