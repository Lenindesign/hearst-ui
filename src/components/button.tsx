"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-button text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border bg-[var(--color-btn-solid-bg)] text-[var(--color-btn-solid-text)] border-[var(--color-btn-solid-border)] hover:bg-[var(--color-btn-solid-bg-hover)]",
        outline:
          "border border-[var(--color-btn-outline-border)] bg-[var(--color-btn-outline-bg)] text-[var(--color-btn-outline-text)] hover:bg-[var(--color-btn-outline-bg-hover)]",
        secondary:
          "border border-transparent bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)] hover:bg-[var(--color-btn-secondary-bg-hover)]",
        ghost:
          "border border-transparent text-[var(--color-btn-ghost-text)] hover:bg-[var(--color-btn-ghost-bg-hover)]",
        destructive:
          "border border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "border border-transparent text-[var(--color-btn-outline-text)] underline-offset-4 hover:underline",
        brand:
          "border border-transparent bg-brand-primary text-primary-foreground hover:opacity-90",
      },
      size: {
        default: "h-9 gap-2 px-4",
        xs: "h-6 gap-1 px-2 text-xs",
        sm: "h-7 gap-1.5 px-3 text-xs",
        lg: "h-10 gap-2 px-6",
        xl: "h-12 gap-2.5 px-8 text-base",
        icon: "size-9",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
