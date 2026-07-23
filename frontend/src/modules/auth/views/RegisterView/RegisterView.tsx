import { AuthLayout } from "@shared/ui/layouts/AuthLayout";
import { RegisterHeaderSection } from "./sections/RegisterHeaderSection";
import { RegisterFormSection } from "./sections/RegisterFormSection";

export const RegisterView = () => (
  <AuthLayout>
    <div className="auth-card auth-card--tall">
      <RegisterHeaderSection />
      <RegisterFormSection />
    </div>
  </AuthLayout>
);
