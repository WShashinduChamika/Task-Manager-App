import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../../validation/register.schema";
import { useAuth } from "../../../hooks/useAuth";
import { ErrorBanner } from "@shared/ui/feedback/ErrorBanner";
import { ROUTES } from "@router/routes";
import { cn } from "@core/utils/cn";

// Note: useState used ONLY for password visibility toggles (pure UI state, no business logic)
export const RegisterFormSection = () => {
  const navigate = useNavigate();
  const { register: registerAction, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: RegisterFormValues) => {
    const success = await registerAction(values);
    if (success) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  };

  return (
    <form
      id="register-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      {/* Server error */}
      {error.value && (
        <ErrorBanner message={error.value} onDismiss={clearError} />
      )}

      {/* Full name */}
      <div className="auth-field-group">
        <label htmlFor="register-name" className="auth-label">
          Full name
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          {...register("name")}
          className={cn("auth-input", errors.name && "auth-input--error")}
        />
        {errors.name && (
          <p role="alert" className="auth-field-error">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="auth-field-group">
        <label htmlFor="register-email" className="auth-label">
          Work email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          {...register("email")}
          className={cn("auth-input", errors.email && "auth-input--error")}
        />
        {errors.email && (
          <p role="alert" className="auth-field-error">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="auth-field-group">
        <label htmlFor="register-password" className="auth-label">
          Password
        </label>
        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Min. 6 characters"
            {...register("password")}
            className={cn(
              "auth-input pr-11",
              errors.password && "auth-input--error",
            )}
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            className="auth-eye-btn"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p role="alert" className="auth-field-error">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="auth-field-group">
        <label htmlFor="register-confirm-password" className="auth-label">
          Confirm password
        </label>
        <div className="relative">
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={cn(
              "auth-input pr-11",
              errors.confirmPassword && "auth-input--error",
            )}
          />
          <button
            type="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="auth-eye-btn"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p role="alert" className="auth-field-error">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        id="register-submit-btn"
        type="submit"
        disabled={isLoading.value}
        className="auth-btn-primary mt-1"
      >
        {isLoading.value ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Creating account…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <UserPlus className="h-4 w-4" />
            Create account
          </span>
        )}
      </button>

      {/* Terms */}
      <p className="text-center text-xs text-muted-foreground leading-relaxed">
        By creating an account you agree to our{" "}
        <a href="#" className="auth-link">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="auth-link">
          Privacy Policy
        </a>
        .
      </p>

      {/* Login link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="auth-link font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
};
