"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  trigger?: ReactNode;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, options, value, onChange, placeholder = "Select...", disabled, error, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find((o) => o.value === value);

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          aria-expanded={open}
          data-slot="select-trigger"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-input border-[length:var(--border-width-input)] border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-3 py-2 text-sm text-[var(--color-input-text)] transition-colors placeholder:text-[var(--color-input-placeholder)] focus:border-[var(--color-input-border-active)] focus:outline-none focus:ring-[3px] focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
          )}
        >
          <span className={cn(!selected && "text-muted-foreground")}>
            {selected?.label || placeholder}
          </span>
          <svg className="size-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div
            data-slot="select-content"
            className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                data-slot="select-item"
                className={cn(
                  "relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                  option.value === value && "bg-accent text-accent-foreground",
                  option.disabled && "pointer-events-none opacity-50",
                )}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
