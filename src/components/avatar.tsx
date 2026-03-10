"use client";

import { forwardRef, useState, type ImgHTMLAttributes, type HTMLAttributes } from "react";
import { cn } from "../lib/utils";

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { size?: "sm" | "default" | "lg" | "xl" }>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        size === "sm" && "size-6",
        size === "default" && "size-8",
        size === "lg" && "size-10",
        size === "xl" && "size-14",
        className,
      )}
      {...props}
    />
  ),
);
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    if (hasError) return null;
    return (
      <img
        ref={ref}
        alt={alt}
        data-slot="avatar-image"
        className={cn("aspect-square size-full object-cover", className)}
        onError={() => setHasError(true)}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-xs font-medium",
        className,
      )}
      {...props}
    />
  ),
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
