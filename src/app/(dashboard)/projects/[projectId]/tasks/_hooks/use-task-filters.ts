import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { TASK_PRIORITY, TASK_STATUS } from "../_lib/constants";

export const useTaskFilters = () => {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum([...TASK_STATUS]),
    assigneeId: parseAsString,
    priority: parseAsStringEnum([...TASK_PRIORITY]),
  });
};
