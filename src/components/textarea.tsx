import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      aria-invalid={error || undefined}
      className={cn(
        "flex min-h-[80px] w-full rounded-input border-[length:var(--border-width-input)] border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-3 py-2 text-sm text-[var(--color-input-text)] transition-colors placeholder:text-[var(--color-input-placeholder)] focus-visible:border-[var(--color-input-border-active)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-[var(--color-input-border-error)] focus-visible:border-[var(--color-input-border-error)] focus-visible:ring-destructive/20",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
