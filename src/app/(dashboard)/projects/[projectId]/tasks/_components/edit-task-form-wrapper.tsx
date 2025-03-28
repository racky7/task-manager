import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { EditTaskForm } from "./edit-task-form";
import { api } from "@/trpc/react";

interface Props {
  onCancel: () => void;
  id: string;
}

const EditTaskFormWrapper = ({ onCancel, id }: Props) => {
  const { data: initialValues, isLoading } = api.task.getTask.useQuery({
    taskId: id,
  });

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) {
    return null;
  }
  return (
    <div className="">
      <EditTaskForm initialValues={initialValues} onCancel={onCancel} />
    </div>
  );
};

export default EditTaskFormWrapper;
