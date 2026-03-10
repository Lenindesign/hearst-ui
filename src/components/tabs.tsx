"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "../lib/utils";

const TabsContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({ value: "", onValueChange: () => {} });

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue = "", value: controlledValue, onValueChange, children, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue ?? internalValue;
    const handleChange = (v: string) => {
      setInternalValue(v);
      onValueChange?.(v);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleChange }}>
        <div ref={ref} data-slot="tabs" className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="tabs-list"
      role="tablist"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const ctx = useContext(TabsContext);
    const isActive = ctx.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        data-slot="tabs-trigger"
        data-state={isActive ? "active" : "inactive"}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => ctx.onValueChange(value)}
        onKeyDown={(e) => {
          const triggers = (e.currentTarget.parentElement?.querySelectorAll('[role="tab"]') ?? []) as NodeListOf<HTMLButtonElement>;
          const idx = Array.from(triggers).indexOf(e.currentTarget);
          let next = -1;
          if (e.key === "ArrowRight") next = (idx + 1) % triggers.length;
          else if (e.key === "ArrowLeft") next = (idx - 1 + triggers.length) % triggers.length;
          else if (e.key === "Home") next = 0;
          else if (e.key === "End") next = triggers.length - 1;
          if (next >= 0) { e.preventDefault(); triggers[next].focus(); triggers[next].click(); }
        }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive && "bg-background text-foreground shadow-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const ctx = useContext(TabsContext);
    if (ctx.value !== value) return null;

    return (
      <div
        ref={ref}
        data-slot="tabs-content"
        role="tabpanel"
        tabIndex={0}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
