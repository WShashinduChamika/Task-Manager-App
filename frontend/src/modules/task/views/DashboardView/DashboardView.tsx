import { DashboardLayout } from "@shared/ui/layouts/DashboardLayout";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { DashboardStatsSection } from "./sections/DashboardStatsSection";
import { DashboardTasksSection } from "./sections/DashboardTasksSection";
import { useTaskStats } from "../../hooks/useTasks";

export const DashboardView = () => {
  const { stats, isLoading } = useTaskStats();

  return (
    <DashboardLayout>
      <DashboardHeaderSection />

      <main className="dashboard-main" id="dashboard-main">
        <div className="dashboard-page-heading">
          <h1 className="dashboard-page-title">Dashboard</h1>
          <p className="dashboard-page-subtitle">
            Here's an overview of all your tasks.
          </p>
        </div>

        <DashboardStatsSection stats={stats} isLoading={isLoading} />

        <DashboardTasksSection />
      </main>
    </DashboardLayout>
  );
};


