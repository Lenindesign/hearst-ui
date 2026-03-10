"use client";

import { forwardRef, type ImgHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { useTheme } from "../lib/theme-provider";
import type { BrandTheme } from "../lib/brands";

export interface BrandLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  brand?: BrandTheme;
  fallback?: "name" | "none";
}

const BrandLogo = forwardRef<HTMLImageElement, BrandLogoProps>(
  ({ className, brand: brandOverride, fallback = "name", ...props }, ref) => {
    const { brand: contextBrand } = useTheme();
    const brand = brandOverride || contextBrand;

    if (!brand.logo) {
      if (fallback === "none") return null;
      return (
        <span
          data-slot="brand-logo"
          className={cn(
            "inline-flex items-center font-brand text-lg font-bold tracking-tight",
            className,
          )}
        >
          {brand.name}
        </span>
      );
    }

    return (
      <img
        ref={ref}
        src={brand.logo}
        alt={`${brand.name} logo`}
        data-slot="brand-logo"
        className={cn("h-8 w-auto object-contain", className)}
        {...props}
      />
    );
  },
);
BrandLogo.displayName = "BrandLogo";

export { BrandLogo };
