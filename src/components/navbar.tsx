"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/utils";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  actions?: ReactNode;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo, actions, children, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
      <nav
        ref={ref}
        data-slot="navbar"
        className={cn(
          "sticky top-0 z-40 w-full border-b border-[var(--color-nav-border)] bg-[var(--color-nav-bg)] backdrop-blur-sm",
          className,
        )}
        {...props}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {logo && (
            <div data-slot="navbar-logo" className="flex shrink-0 items-center">
              {logo}
            </div>
          )}

          <div
            data-slot="navbar-links"
            className="hidden items-center gap-1 md:flex"
          >
            {children}
          </div>

          <div className="flex items-center gap-2">
            {actions && (
              <div data-slot="navbar-actions" className="hidden sm:flex sm:items-center sm:gap-2">
                {actions}
              </div>
            )}

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex size-9 items-center justify-center rounded-md text-[var(--color-nav-text)] transition-colors hover:bg-[var(--color-nav-text)]/10 md:hidden"
            >
              {mobileOpen ? (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            data-slot="navbar-mobile"
            className="border-t border-[var(--color-nav-border)] px-4 pb-4 pt-2 md:hidden"
          >
            <div className="flex flex-col gap-1">{children}</div>
            {actions && <div className="mt-3 flex flex-col gap-2 border-t border-[var(--color-nav-border)] pt-3">{actions}</div>}
          </div>
        )}
      </nav>
    );
  },
);
Navbar.displayName = "Navbar";

export interface NavbarLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  active?: boolean;
}

const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, children, ...props }, ref) => (
    <a
      ref={ref}
      data-slot="navbar-link"
      data-active={active || undefined}
      className={cn(
        "inline-flex items-center px-3 py-2 text-sm font-medium text-[var(--color-nav-text)] transition-colors hover:text-[var(--color-nav-text-hover)] data-[active]:text-[var(--color-nav-text)]",
        "rounded-md hover:bg-[var(--color-nav-text)]/5 data-[active]:bg-[var(--color-nav-text)]/10",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
);
NavbarLink.displayName = "NavbarLink";

export { Navbar, NavbarLink };
