import { cn } from "@core/utils/cn";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export const LoadingSpinner = ({ size = "md", label, className }: LoadingSpinnerProps) => (
  <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
    <div
      role="status"
      aria-label={label ?? "Loading"}
      className={cn(
        "animate-spin rounded-full border-border border-t-primary",
        sizeMap[size]
      )}
    />
    {label && (
      <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
    )}
  </div>
);
