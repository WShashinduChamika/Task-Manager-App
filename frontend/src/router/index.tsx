import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginView, RegisterView } from "@modules/auth";
import { DashboardView } from "@modules/task";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "./routes";

/**
 * Central route map — thin router with zero business logic.
 * Guards use signals only. Business logic lives in modules.
 */
const router = createBrowserRouter([
  // ─── Public Auth Routes ───────────────────────────────────────────────────
  {
    path: ROUTES.LOGIN,
    element: <LoginView />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterView />,
  },

  // ─── Protected App Routes ────────────────────────────────────────────────
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <DashboardView />
      </ProtectedRoute>
    ),
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
