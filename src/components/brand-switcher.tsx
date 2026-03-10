"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { useTheme } from "../lib/theme-provider";

export interface BrandSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  showColors?: boolean;
  showLogo?: boolean;
}

const BrandSwitcher = forwardRef<HTMLDivElement, BrandSwitcherProps>(
  ({ className, showColors = true, showLogo = true, ...props }, ref) => {
    const { brand, setBrand, brands } = useTheme();

    return (
      <div
        ref={ref}
        data-slot="brand-switcher"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        <select
          value={brand.slug}
          onChange={(e) => setBrand(e.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
        {showLogo && brand.logo && (
          <div className="flex h-10 items-center">
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-full w-auto max-w-[200px] object-contain"
            />
          </div>
        )}
        {showColors && (
          <div className="flex gap-1">
            {Object.entries(brand.colors)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .slice(0, 6)
              .map(([key, color]) => (
                <div
                  key={key}
                  className="size-6 rounded-full ring-1 ring-foreground/10"
                  style={{ backgroundColor: color }}
                  title={`Brand ${key}: ${color}`}
                />
              ))}
          </div>
        )}
      </div>
    );
  },
);
BrandSwitcher.displayName = "BrandSwitcher";

export { BrandSwitcher };
