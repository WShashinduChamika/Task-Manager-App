import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { loginSchema, type LoginFormValues } from "../../../validation/login.schema";
import { useAuth } from "../../../hooks/useAuth";
import { ErrorBanner } from "@shared/ui/feedback/ErrorBanner";
import { ROUTES } from "@router/routes";
import { cn } from "@core/utils/cn";

// Note: useState used ONLY for password visibility toggle (pure UI, no business state)
export const LoginFormSection = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (values: LoginFormValues) => {
    const success = await login(values);
    if (success) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  };

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Server error */}
      {error.value && (
        <ErrorBanner message={error.value} onDismiss={clearError} />
      )}

      {/* Email */}
      <div className="auth-field-group">
        <label htmlFor="login-email" className="auth-label">
          Email address
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          {...register("email")}
          className={cn("auth-input", errors.email && "auth-input--error")}
        />
        {errors.email && (
          <p role="alert" className="auth-field-error">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="auth-field-group">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="auth-label">
            Password
          </label>
          <a href="#" className="auth-link text-xs">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("password")}
            className={cn("auth-input pr-11", errors.password && "auth-input--error")}
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
          <p role="alert" className="auth-field-error">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        id="login-submit-btn"
        type="submit"
        disabled={isLoading.value}
        className="auth-btn-primary"
      >
        {isLoading.value ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Signing in…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign in
          </span>
        )}
      </button>

      {/* Register link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to={ROUTES.REGISTER} className="auth-link font-medium">
          Create account
        </Link>
      </p>
    </form>
  );
};
