import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const heroVariants = cva("relative flex w-full overflow-hidden", {
  variants: {
    size: {
      sm: "min-h-[280px]",
      default: "min-h-[400px]",
      lg: "min-h-[520px]",
      full: "min-h-screen",
    },
    overlay: {
      none: "",
      light: "[&>[data-slot=hero-overlay]]:bg-black/30",
      medium: "[&>[data-slot=hero-overlay]]:bg-black/50",
      heavy: "[&>[data-slot=hero-overlay]]:bg-black/70",
      brand: "[&>[data-slot=hero-overlay]]:bg-[var(--brand-primary,var(--primary))]/80",
    },
    align: {
      left: "[&>[data-slot=hero-content]]:items-start [&>[data-slot=hero-content]]:text-left",
      center: "[&>[data-slot=hero-content]]:items-center [&>[data-slot=hero-content]]:text-center",
      right: "[&>[data-slot=hero-content]]:items-end [&>[data-slot=hero-content]]:text-right",
    },
  },
  defaultVariants: {
    size: "default",
    overlay: "medium",
    align: "left",
  },
});

export interface HeroProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroVariants> {}

const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ className, size, overlay, align, children, ...props }, ref) => (
    <section
      ref={ref}
      data-slot="hero"
      className={cn(heroVariants({ size, overlay, align, className }))}
      {...props}
    >
      <div data-slot="hero-overlay" className="absolute inset-0 transition-colors" />
      <div
        data-slot="hero-content"
        className="relative z-10 flex w-full flex-col justify-end gap-4 p-6 sm:p-10 lg:p-16"
      >
        {children}
      </div>
    </section>
  ),
);
Hero.displayName = "Hero";

const HeroImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      data-slot="hero-image"
      className={cn("absolute inset-0 size-full object-cover", className)}
      {...props}
    />
  ),
);
HeroImage.displayName = "HeroImage";

const HeroEyebrow = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="hero-eyebrow"
      className={cn(
        "font-brand-secondary text-xs font-semibold uppercase tracking-widest text-white/80",
        className,
      )}
      {...props}
    />
  ),
);
HeroEyebrow.displayName = "HeroEyebrow";

const HeroTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      data-slot="hero-title"
      className={cn(
        "font-headline text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl",
        className,
      )}
      {...props}
    />
  ),
);
HeroTitle.displayName = "HeroTitle";

const HeroDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="hero-description"
      className={cn("max-w-2xl text-base text-white/80 sm:text-lg", className)}
      {...props}
    />
  ),
);
HeroDescription.displayName = "HeroDescription";

export interface HeroActionsProps extends HTMLAttributes<HTMLDivElement> {}

const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="hero-actions"
      className={cn("flex flex-wrap gap-3 pt-2", className)}
      {...props}
    />
  ),
);
HeroActions.displayName = "HeroActions";

export { Hero, HeroImage, HeroEyebrow, HeroTitle, HeroDescription, HeroActions, heroVariants };
