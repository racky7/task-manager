"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useProjectId } from "../../../_hooks/use-project-id";
import {
  TASK_PRIORITY,
  TASK_PRIORITY_MAP,
  TASK_STATUS,
  TASK_STATUS_MAP,
} from "../_lib/constants";
import { toast } from "sonner";

const createTaskConfig = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date(),
  assigneeId: z.string(),
  status: z.enum(TASK_STATUS),
  priority: z.enum(TASK_PRIORITY),
});

export const CreateTaskForm = ({ onCancel }: { onCancel: () => void }) => {
  const utils = api.useUtils();
  const projectId = useProjectId();
  const { data: members } = api.member.getMembers.useQuery({ projectId });
  const form = useForm<z.infer<typeof createTaskConfig>>({
    resolver: zodResolver(createTaskConfig),
  });
  const { mutate, isPending } = api.task.createTask.useMutation();

  const onSubmit = (values: z.infer<typeof createTaskConfig>) => {
    mutate(
      { ...values, projectId },
      {
        onSuccess: () => {
          void utils.task.getTasks.invalidate();
          void utils.project.getProjectAnalytics.invalidate({ projectId });
          toast.success("Task created successfully");
          form.reset();
          onCancel?.();
        },
        onError: (err) => {
          console.log(err);
          toast.error("Failed to create task!");
        },
      },
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create a new Task</CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter task title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TASK_STATUS.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center gap-x-2">
                                {TASK_STATUS_MAP[status].label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TASK_PRIORITY.map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              <div className="flex items-center gap-x-2">
                                {TASK_PRIORITY_MAP[priority].label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {members?.map((member) => (
                            <SelectItem
                              key={member.user.id}
                              value={member.user.id}
                            >
                              <div className="flex items-center gap-x-2">
                                {member.user.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="py-7">
              <Separator />
            </div>

            <div className="flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:gap-2">
              <div className="w-full sm:w-fit">
                <Button
                  size="lg"
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn("w-full sm:w-auto", !onCancel && "invisible")}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-full sm:w-fit">
                <Button
                  className="w-full sm:w-auto"
                  disabled={isPending}
                  type="submit"
                  size="lg"
                >
                  Create Task
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
