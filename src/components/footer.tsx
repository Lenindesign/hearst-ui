import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/utils";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  copyright?: string;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, logo, copyright, children, ...props }, ref) => (
    <footer
      ref={ref}
      data-slot="footer"
      className={cn(
        "border-t border-[var(--color-footer-border)] bg-[var(--color-footer-bg)] text-[var(--color-footer-text)]",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {logo && (
          <div data-slot="footer-logo" className="mb-8">
            {logo}
          </div>
        )}

        {children && (
          <div data-slot="footer-content" className="mb-8">
            {children}
          </div>
        )}

        {copyright && (
          <div
            data-slot="footer-legal"
            className="border-t border-[var(--color-footer-border)] pt-6 text-xs text-[var(--color-footer-text-hover)]"
          >
            {copyright}
          </div>
        )}
      </div>
    </footer>
  ),
);
Footer.displayName = "Footer";

export interface FooterLinkGroupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const FooterLinkGroup = forwardRef<HTMLDivElement, FooterLinkGroupProps>(
  ({ className, title, children, ...props }, ref) => (
    <div ref={ref} data-slot="footer-link-group" className={cn("space-y-3", className)} {...props}>
      {title && (
        <h3 className="text-sm font-semibold text-[var(--color-footer-text)]">{title}</h3>
      )}
      <ul className="space-y-2">{children}</ul>
    </div>
  ),
);
FooterLinkGroup.displayName = "FooterLinkGroup";

export interface FooterLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, children, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        data-slot="footer-link"
        className={cn(
          "text-sm text-[var(--color-footer-text-hover)] transition-colors hover:text-[var(--color-footer-text)]",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </li>
  ),
);
FooterLink.displayName = "FooterLink";

export { Footer, FooterLinkGroup, FooterLink };
