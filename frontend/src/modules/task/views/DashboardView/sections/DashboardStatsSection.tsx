import {
  ListTodo,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { TaskStats } from "../../../types";

interface DashboardStatsSectionProps {
  stats?: TaskStats;
  isLoading: boolean;
}

export const DashboardStatsSection = ({
  stats,
  isLoading,
}: DashboardStatsSectionProps) => {
  const cards = [
    {
      key: "total",
      label: "Total Tasks",
      value: stats?.total ?? 0,
      icon: ListTodo,
      variant: "total",
    },
    {
      key: "pending",
      label: "Pending Tasks",
      value: stats?.pending ?? 0,
      icon: Clock,
      variant: "pending",
    },
    {
      key: "inProgress",
      label: "In Progress Tasks",
      value: stats?.inProgress ?? 0,
      icon: Activity,
      variant: "inprogress",
    },
    {
      key: "completed",
      label: "Completed Tasks",
      value: stats?.completed ?? 0,
      icon: CheckCircle2,
      variant: "completed",
    },
    {
      key: "overdue",
      label: "Overdue Tasks",
      value: stats?.overdue ?? 0,
      icon: AlertTriangle,
      variant: "overdue",
    },
  ];

  if (isLoading) {
    return (
      <div className="stats-grid" aria-label="Loading task statistics">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="stat-card stat-card--skeleton"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="stats-grid" role="region" aria-label="Task statistics">
      {cards.map(({ key, label, value, icon: Icon, variant }) => (
        <div key={key} className={`stat-card stat-card--${variant}`}>
          <div className="stat-card-icon">
            <Icon size={20} />
          </div>
          <div className="stat-card-body">
            <span className="stat-card-value">{value}</span>
            <span className="stat-card-label">{label}</span>
          </div>
          <div className="stat-card-glow" />
        </div>
      ))}
    </div>
  );
};
