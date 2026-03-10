"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "../lib/utils";

const AccordionContext = createContext<{
  openItems: string[];
  toggle: (value: string) => void;
  multiple: boolean;
}>({ openItems: [], toggle: () => {}, multiple: false });

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
  collapsible?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", defaultValue = [], collapsible = true, children, className, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<string[]>(defaultValue);

    const toggle = (value: string) => {
      setOpenItems((prev) => {
        if (prev.includes(value)) {
          return collapsible || type === "multiple"
            ? prev.filter((v) => v !== value)
            : prev;
        }
        return type === "multiple" ? [...prev, value] : [value];
      });
    };

    return (
      <AccordionContext.Provider value={{ openItems, toggle, multiple: type === "multiple" }}>
        <div ref={ref} data-slot="accordion" className={className} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => {
    const { openItems } = useContext(AccordionContext);
    return (
      <div
        ref={ref}
        data-slot="accordion-item"
        data-state={openItems.includes(value) ? "open" : "closed"}
        className={cn("border-b border-[var(--color-accordion-border)]", className)}
        {...props}
      />
    );
  },
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { openItems, toggle } = useContext(AccordionContext);
    const isOpen = openItems.includes(value);

    return (
      <button
        ref={ref}
        type="button"
        id={`accordion-trigger-${value}`}
        data-slot="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
        onClick={() => toggle(value)}
        className={cn(
          "flex w-full flex-1 items-center justify-between bg-[var(--color-accordion-bg)] py-4 px-2 text-sm font-medium text-[var(--color-accordion-text)] transition-all hover:bg-[var(--color-accordion-bg-hover)] [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <svg
          className="size-4 shrink-0 transition-transform duration-200"
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
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, value, ...props }, ref) => {
    const { openItems } = useContext(AccordionContext);
    const isOpen = openItems.includes(value);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        id={`accordion-content-${value}`}
        data-slot="accordion-content"
        data-state="open"
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
        className={cn("overflow-hidden pb-4 pt-0 text-sm", className)}
        {...props}
      />
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
