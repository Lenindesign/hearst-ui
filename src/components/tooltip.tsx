"use client";

import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/utils";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayMs?: number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, side = "top", delayMs = 200, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    let timeout: ReturnType<typeof setTimeout>;

    const show = () => {
      timeout = setTimeout(() => setVisible(true), delayMs);
    };
    const hide = () => {
      clearTimeout(timeout);
      setVisible(false);
    };

    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
        {visible && (
          <div
            role="tooltip"
            data-slot="tooltip"
            className={cn(
              "absolute z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
              positionClasses[side],
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);
Tooltip.displayName = "Tooltip";

export { Tooltip };
