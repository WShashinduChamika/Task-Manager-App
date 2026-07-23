import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="dashboard-layout">
    <div className="dashboard-content">{children}</div>
  </div>
);
