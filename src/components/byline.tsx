import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface BylineProps extends HTMLAttributes<HTMLDivElement> {
  layout?: "inline" | "stacked";
}

const Byline = forwardRef<HTMLDivElement, BylineProps>(
  ({ className, layout = "inline", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="byline"
      data-layout={layout}
      className={cn(
        "flex gap-3",
        layout === "inline" ? "items-center" : "flex-col items-start",
        className,
      )}
      {...props}
    />
  ),
);
Byline.displayName = "Byline";

const BylineAvatar = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      data-slot="byline-avatar"
      className={cn("size-10 shrink-0 rounded-full object-cover", className)}
      {...props}
    />
  ),
);
BylineAvatar.displayName = "BylineAvatar";

const BylineContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="byline-content"
      className={cn("flex min-w-0 flex-col", className)}
      {...props}
    />
  ),
);
BylineContent.displayName = "BylineContent";

const BylineName = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="byline-name"
      className={cn("text-sm font-semibold text-[var(--color-card-title)]", className)}
      {...props}
    />
  ),
);
BylineName.displayName = "BylineName";

const BylineMeta = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="byline-meta"
      className={cn("text-xs text-[var(--color-card-byline)]", className)}
      {...props}
    />
  ),
);
BylineMeta.displayName = "BylineMeta";

const BylineBio = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="byline-bio"
      className={cn("mt-1 text-sm text-[var(--color-card-description)]", className)}
      {...props}
    />
  ),
);
BylineBio.displayName = "BylineBio";

export { Byline, BylineAvatar, BylineContent, BylineName, BylineMeta, BylineBio };
