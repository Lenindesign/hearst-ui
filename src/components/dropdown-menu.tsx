"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/utils";

const DropdownContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, children, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
      function handleEsc(e: KeyboardEvent) {
        if (e.key === "Escape") setOpen(false);
      }
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEsc);
      };
    }, []);

    return (
      <DropdownContext.Provider value={{ open, setOpen }}>
        <div ref={containerRef} className={cn("relative inline-block", className)} {...props}>
          {children}
        </div>
      </DropdownContext.Provider>
    );
  },
);
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useContext(DropdownContext);
    return (
      <button
        ref={ref}
        type="button"
        data-slot="dropdown-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {children}
        <svg
          className={cn("size-4 transition-transform", open && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  },
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right";
}

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "left", children, ...props }, ref) => {
    const { open } = useContext(DropdownContext);
    if (!open) return null;

    return (
      <div
        ref={ref}
        role="menu"
        data-slot="dropdown-content"
        className={cn(
          "absolute top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-md border border-[var(--color-dropdown-border)] bg-[var(--color-dropdown-bg)] p-1 shadow-lg",
          align === "right" ? "right-0" : "left-0",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, disabled, children, onClick, ...props }, ref) => {
    const { setOpen } = useContext(DropdownContext);
    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        data-slot="dropdown-item"
        onClick={(e) => {
          onClick?.(e);
          setOpen(false);
        }}
        className={cn(
          "flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-[var(--color-dropdown-text)] transition-colors hover:bg-accent hover:text-[var(--color-dropdown-text-hover)]",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      data-slot="dropdown-separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--color-dropdown-border)]", className)}
      {...props}
    />
  ),
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dropdown-label"
      className={cn("px-2 py-1.5 text-xs font-semibold text-[var(--color-dropdown-text)]", className)}
      {...props}
    />
  ),
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
