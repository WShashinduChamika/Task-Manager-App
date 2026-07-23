import { useNavigate } from "react-router-dom";
import { CheckSquare, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@modules/auth/hooks/useAuth";
import { useTheme } from "@core/hooks/useTheme";

export const DashboardHeaderSection = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const userName = user.value?.name ?? "User";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-brand">
        <span className="dashboard-brand-icon" aria-hidden="true">
          <CheckSquare size={20} />
        </span>
        <span className="dashboard-brand-name">TaskFlow</span>
      </div>

      <div className="dashboard-header-right">
        <button
          type="button"
          id="theme-toggle-btn"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <p className="dashboard-greeting">
          Hello, <strong>{userName}</strong> 👋
        </p>
        <button
          id="dashboard-logout-btn"
          className="dashboard-logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};


