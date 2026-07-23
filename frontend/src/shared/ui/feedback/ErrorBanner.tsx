import { AlertCircle, X } from "lucide-react";
import { cn } from "@core/utils/cn";

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorBanner = ({ message, onDismiss, className }: ErrorBannerProps) => (
  <div
    role="alert"
    className={cn(
      "flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
      "animate-in fade-in slide-in-from-top-1 duration-200",
      className
    )}
  >
    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
    <p className="flex-1 leading-relaxed">{message}</p>
    {onDismiss && (
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="ml-auto shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-destructive"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);
