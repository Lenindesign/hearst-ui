import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-badge border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-badge-primary-bg)] text-[var(--color-badge-primary-text)]",
        secondary: "bg-secondary text-secondary-foreground",
        destructive:
          "bg-[var(--color-badge-danger-bg)] text-[var(--color-badge-danger-text)]",
        outline: "border-border text-foreground",
        ghost: "text-muted-foreground",
        success:
          "bg-[var(--color-badge-success-bg)] text-[var(--color-badge-success-text)]",
        warning:
          "bg-[var(--color-badge-warning-bg)] text-[var(--color-badge-warning-text)]",
        danger:
          "bg-[var(--color-badge-danger-bg)] text-[var(--color-badge-danger-text)]",
        highlight:
          "bg-[var(--color-badge-highlight-bg)] text-[var(--color-badge-highlight-text)]",
        brand:
          "bg-brand-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
