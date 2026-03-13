"use client";

import { forwardRef, useState, type HTMLAttributes, type FormEvent } from "react";
import { cn } from "../lib/utils";

export interface NewsletterProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  onSubscribe?: (email: string) => void | Promise<void>;
  variant?: "default" | "inline" | "card";
}

const Newsletter = forwardRef<HTMLDivElement, NewsletterProps>(
  (
    {
      className,
      heading = "Subscribe to our newsletter",
      description = "Get the latest stories delivered to your inbox.",
      placeholder = "Enter your email",
      buttonText = "Subscribe",
      successMessage = "Thanks for subscribing!",
      onSubscribe,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setStatus("loading");
      try {
        await onSubscribe?.(email);
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("idle");
      }
    };

    return (
      <div
        ref={ref}
        data-slot="newsletter"
        data-variant={variant}
        className={cn(
          variant === "card" &&
            "rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 sm:p-8",
          variant === "default" && "py-8",
          className,
        )}
        {...props}
      >
        <div className={cn(variant === "inline" ? "flex flex-wrap items-end gap-4" : "space-y-4")}>
          <div className={cn(variant === "inline" ? "flex-1" : "")}>
            <h3 className="headline text-lg text-[var(--color-card-title)]">
              {heading}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-card-description)]">{description}</p>
          </div>

          {status === "success" ? (
            <p className="text-sm font-medium text-[var(--color-badge-success-text)]">
              {successMessage}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={cn(
                "flex gap-2",
                variant === "inline" ? "w-full sm:w-auto" : "w-full max-w-md",
              )}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="flex-1 rounded-button border-[length:var(--border-width-input)] border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-3 py-2 text-sm text-[var(--color-input-text)] placeholder:text-[var(--color-input-placeholder)] focus:border-[var(--color-input-border-active)] focus:outline-none focus:ring-[3px] focus:ring-ring/50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex shrink-0 items-center justify-center rounded-button bg-[var(--color-nav-btn-bg)] px-4 py-2 text-sm font-medium text-[var(--color-nav-btn-text)] transition-colors hover:bg-[var(--color-nav-btn-bg-hover)] disabled:opacity-50"
              >
                {status === "loading" ? "..." : buttonText}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  },
);
Newsletter.displayName = "Newsletter";

export { Newsletter };
