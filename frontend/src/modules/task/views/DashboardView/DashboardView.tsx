import { DashboardLayout } from "@shared/ui/layouts/DashboardLayout";
import { DashboardHeaderSection } from "./sections/DashboardHeaderSection";
import { DashboardTasksSection } from "./sections/DashboardTasksSection";

export const DashboardView = () => {
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

        <DashboardTasksSection />
      </main>
    </DashboardLayout>
  );
};

