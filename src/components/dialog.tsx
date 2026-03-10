"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/utils";

const DialogContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

export interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function Dialog({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

const DialogTrigger = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { setOpen } = useContext(DialogContext);
    return (
      <button
        ref={ref}
        type="button"
        data-slot="dialog-trigger"
        onClick={(e) => {
          setOpen(true);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
DialogTrigger.displayName = "DialogTrigger";

const DialogOverlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  ),
);
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useContext(DialogContext);

    useEffect(() => {
      function handleEsc(e: KeyboardEvent) {
        if (e.key === "Escape") setOpen(false);
      }
      if (open) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }, [open, setOpen]);

    if (!open) return null;

    return (
      <>
        <DialogOverlay onClick={() => setOpen(false)} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          data-slot="dialog-content"
          data-state="open"
          className={cn(
            "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-[var(--color-modal-bg)] p-6 shadow-lg sm:rounded-lg",
            className,
          )}
          {...props}
        >
          {children}
          <button
            type="button"
            data-slot="dialog-close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </>
    );
  },
);
DialogContent.displayName = "DialogContent";

const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  ),
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      data-slot="dialog-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
);
DialogDescription.displayName = "DialogDescription";

const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2", className)}
      {...props}
    />
  ),
);
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
};
