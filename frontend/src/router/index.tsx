import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginView, RegisterView } from "@modules/auth";
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
        {/* Placeholder — replace with <MainLayout /> + task views */}
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Task views will load here.</p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
