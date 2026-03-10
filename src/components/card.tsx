import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/utils";

const Card = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { size?: "default" | "sm" }
>(({ className, size = "default", ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card"
    data-size={size}
    className={cn(
      "flex flex-col gap-4 overflow-hidden rounded-xl bg-[var(--color-card-bg)] py-4 text-sm text-card-foreground border border-[var(--color-card-border)] data-[size=sm]:gap-3 data-[size=sm]:py-3",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("grid auto-rows-min gap-1 px-4", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn("font-headline text-base leading-snug font-medium text-[var(--color-card-title)]", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-description"
    className={cn("text-sm text-[var(--color-card-description)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("px-4", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
