import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editProjectConfig = z.object({
  name: z.string().min(1),
});

const EditProjectForm = ({ initialValues }: { initialValues: Project }) => {
  const utils = api.useUtils();
  const { mutate, isPending } = api.project.updateProject.useMutation();
  const form = useForm<z.infer<typeof editProjectConfig>>({
    resolver: zodResolver(editProjectConfig),
    defaultValues: {
      name: initialValues.name ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof editProjectConfig>) => {
    mutate(
      { ...values, projectId: initialValues.id },
      {
        onSuccess: () => {
          toast.success("Project updated!");
          void utils.project.getProject.invalidate({
            projectId: initialValues.id,
          });
          void utils.project.getProjects.invalidate();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <div className="w-full max-w-xl">
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <CardTitle className="text-xl font-bold">
            Project Information
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <Separator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-7 flex items-center justify-end">
                <Button type="submit" size="lg" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProjectForm;
