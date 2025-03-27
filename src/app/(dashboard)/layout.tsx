import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { HydrateClient } from "@/trpc/server";
import { CreateProjectModal } from "./projects/[projectId]/_components/create-project-modal";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <CreateProjectModal />
      <div className="flex h-full w-full">
        <div className="fixed left-0 top-0 hidden h-full lg:block lg:w-[264px]">
          <Sidebar />
        </div>
        <div className="w-full lg:pl-[264px]">
          <div className="mx-auto h-full max-w-screen-2xl">
            <Navbar />
            <HydrateClient>
              <main className="flex h-full flex-col px-6 py-8">{children}</main>
            </HydrateClient>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
