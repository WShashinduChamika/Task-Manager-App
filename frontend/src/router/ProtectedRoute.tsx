import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedInStore } from "@store/auth.store";
import { ROUTES } from "./routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Route guard that reads the global auth signal reactively.
 * Redirects to /login preserving the attempted path in location state.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isLoggedInStore.value) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};
