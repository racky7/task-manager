import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ProjectAnalyticsProps {
  totalTasks: number;
  assignedTasks: number;
  completedTasks: number;
  overdueTasks: number;
  incompleteTasks: number;
}

const AnalyticsCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2 overflow-hidden font-medium">
          <span className="truncate text-base">{title}</span>
        </CardTitle>
        <CardDescription className="text-3xl font-semibold">
          {value}
        </CardDescription>
      </CardHeader>
    </div>
  );
};

const ProjectAnalytics = ({ data }: { data: ProjectAnalyticsProps }) => {
  return (
    <ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-lg border">
      <div className="flex w-full">
        <div className="flex flex-1 items-center">
          <AnalyticsCard title="Total Tasks" value={data.totalTasks} />
          <Separator orientation="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard title="Assigned Tasks" value={data.assignedTasks} />
          <Separator orientation="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard title="Completed Tasks" value={data.completedTasks} />
          <Separator orientation="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Incomplete Tasks"
            value={data.incompleteTasks}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard title="Overdue Tasks" value={data.overdueTasks} />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ProjectAnalytics;
