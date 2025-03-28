import { useQueryState, parseAsString } from "nuqs";

const useEditTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);

  return { open, close, setTaskId, taskId };
};

export default useEditTaskModal;
