import type { ReactNode } from "react";
import { cn } from "@core/utils/cn";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Full-screen auth layout with a deep gradient background and centered glass card.
 * Used by LoginView and RegisterView.
 */
export const AuthLayout = ({ children, className }: AuthLayoutProps) => (
  <div className="auth-layout-root">
    {/* Ambient background blobs */}
    <div className="auth-blob auth-blob--top" aria-hidden="true" />
    <div className="auth-blob auth-blob--bottom" aria-hidden="true" />

    {/* Centered glass card */}
    <main className={cn("auth-card-wrapper", className)}>
      {children}
    </main>
  </div>
);
