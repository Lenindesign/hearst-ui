"use client";

import { type ReactNode } from "react";
import { brands } from "../lib/brands";

export function BrandCompare({
  brandSlugs,
  render,
}: {
  brandSlugs: string[];
  render: (brandSlug: string, brandName: string) => ReactNode;
}) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${brandSlugs.length}, 1fr)` }}>
      {brandSlugs.map((slug) => {
        const brand = brands.find((b) => b.slug === slug);
        if (!brand) return null;
        return (
          <div key={slug} className="space-y-2">
            <div className="text-center text-xs font-semibold text-muted-foreground">
              {brand.name}
            </div>
            <div data-brand={slug} className="rounded-lg border p-4">
              {render(slug, brand.name)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
