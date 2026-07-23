import { CheckSquare } from "lucide-react";

export const LoginHeaderSection = () => (
  <div className="auth-header">
    <div className="auth-logo" aria-hidden="true">
      <CheckSquare className="h-7 w-7 text-primary" strokeWidth={2.5} />
    </div>
    <h1 className="auth-title">Welcome back</h1>
    <p className="auth-subtitle">
      Sign in to your TaskFlow account to continue
    </p>
  </div>
);
