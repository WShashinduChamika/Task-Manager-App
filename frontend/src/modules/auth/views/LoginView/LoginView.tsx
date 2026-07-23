import { AuthLayout } from "@shared/ui/layouts/AuthLayout";
import { LoginHeaderSection } from "./sections/LoginHeaderSection";
import { LoginFormSection } from "./sections/LoginFormSection";

export const LoginView = () => (
  <AuthLayout>
    <div className="auth-card">
      <LoginHeaderSection />
      <LoginFormSection />
    </div>
  </AuthLayout>
);
