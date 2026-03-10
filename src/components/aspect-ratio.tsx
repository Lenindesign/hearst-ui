import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, style, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="aspect-ratio"
      style={{ paddingBottom: `${100 / ratio}%`, ...style }}
      className={cn("relative w-full", className)}
    >
      <div className="absolute inset-0" {...props} />
    </div>
  ),
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
