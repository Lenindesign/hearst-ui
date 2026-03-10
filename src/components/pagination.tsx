"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
}

function getPageRange(current: number, total: number, siblings: number): (number | "...")[] {
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, siblingCount = 1, ...props }, ref) => {
    const pages = getPageRange(currentPage, totalPages, siblingCount);

    return (
      <nav
        ref={ref}
        data-slot="pagination"
        aria-label="Pagination"
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="inline-flex size-9 items-center justify-center rounded-md text-sm text-[var(--color-page-text)] transition-colors hover:bg-[var(--color-page-bg-hover)] disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="flex size-9 items-center justify-center text-sm text-[var(--color-page-text)]">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange?.(page)}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
                page === currentPage
                  ? "bg-[var(--color-page-bg-active)] text-[var(--color-page-text-active)]"
                  : "text-[var(--color-page-text)] hover:bg-[var(--color-page-bg-hover)] hover:text-[var(--color-page-text-hover)]",
              )}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="inline-flex size-9 items-center justify-center rounded-md text-sm text-[var(--color-page-text)] transition-colors hover:bg-[var(--color-page-bg-hover)] disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";

export { Pagination };
