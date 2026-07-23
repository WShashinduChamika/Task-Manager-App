import { CheckSquare } from "lucide-react";

export const RegisterHeaderSection = () => (
  <div className="auth-header">
    <div className="auth-logo" aria-hidden="true">
      <CheckSquare className="h-7 w-7 text-primary" strokeWidth={2.5} />
    </div>
    <h1 className="auth-title">Create your account</h1>
    <p className="auth-subtitle">
      Join TaskFlow and start managing your projects today
    </p>
  </div>
);
