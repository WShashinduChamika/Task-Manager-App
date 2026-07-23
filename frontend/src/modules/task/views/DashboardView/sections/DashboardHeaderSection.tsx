import { CheckSquare, LogOut } from "lucide-react";
import { useAuth } from "@modules/auth/hooks/useAuth";

export const DashboardHeaderSection = () => {
  const { user, logout } = useAuth();
  const userName = user.value?.name ?? "User";

  return (
    <header className="dashboard-header">
      <div className="dashboard-brand">
        <span className="dashboard-brand-icon" aria-hidden="true">
          <CheckSquare size={20} />
        </span>
        <span className="dashboard-brand-name">TaskFlow</span>
      </div>

      <div className="dashboard-header-right">
        <p className="dashboard-greeting">
          Hello, <strong>{userName}</strong> 👋
        </p>
        <button
          id="dashboard-logout-btn"
          className="dashboard-logout-btn"
          onClick={logout}
          aria-label="Logout"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
