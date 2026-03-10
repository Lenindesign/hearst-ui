"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const inputVariants = cva(
  "flex w-full rounded-input border-[length:var(--border-width-input)] border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-3 text-sm text-[var(--color-input-text)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-input-placeholder)] focus-visible:border-[var(--color-input-border-active)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      inputSize: {
        default: "h-9 py-1",
        sm: "h-7 px-2 text-xs",
        lg: "h-11 px-4",
        xl: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, error, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        aria-invalid={error || undefined}
        className={cn(
          inputVariants({ inputSize }),
          error && "border-[var(--color-input-border-error)] bg-[var(--component-input-background-primary-outlined-error,transparent)] focus-visible:border-[var(--color-input-border-error)] focus-visible:ring-destructive/20",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
