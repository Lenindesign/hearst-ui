"use client";

import { type ReactNode } from "react";

interface PropOption {
  label: string;
  value: string;
}

interface PropControl {
  name: string;
  type: "select" | "toggle";
  options?: PropOption[];
  value: string | boolean;
  onChange: (value: any) => void;
}

export function PropsPanel({ controls }: { controls: PropControl[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
      {controls.map((ctrl) => (
        <div key={ctrl.name} className="flex items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground">{ctrl.name}</label>
          {ctrl.type === "select" && ctrl.options && (
            <select
              value={ctrl.value as string}
              onChange={(e) => ctrl.onChange(e.target.value)}
              className="h-7 rounded-md border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {ctrl.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
          {ctrl.type === "toggle" && (
            <button
              type="button"
              onClick={() => ctrl.onChange(!ctrl.value)}
              className={`h-7 rounded-md border px-2 text-xs transition-colors ${
                ctrl.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-foreground"
              }`}
            >
              {ctrl.value ? "On" : "Off"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export function DemoSection({
  id,
  title,
  description,
  children,
  code,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  code?: string;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="headline text-2xl">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
