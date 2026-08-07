import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  /** Lucide icon component to display */
  icon: LucideIcon;
  /** Main title text */
  title: string;
  /** Optional description below the title */
  description?: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Use monospace font (useful for console-style panels) */
  mono?: boolean;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  className = "",
  mono = false,
}: Props) {
  return (
    <div
      className={`flex h-full flex-col items-center justify-center gap-3 py-8 ${className}`}
    >
      <div className="bg-surface-secondary rounded-xl p-3">
        <Icon className="text-muted h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className={`text-muted text-sm ${mono ? "font-mono text-xs" : ""}`}>
          {title}
        </p>
        {description && (
          <p
            className={`text-muted max-w-xs text-center text-xs ${mono ? "font-mono" : ""}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
