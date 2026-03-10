import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const articleCardVariants = cva("group flex overflow-hidden bg-card text-card-foreground", {
  variants: {
    layout: {
      vertical: "flex-col",
      horizontal: "flex-row",
      overlay: "relative flex-col",
    },
    size: {
      sm: "gap-2",
      default: "gap-3",
      lg: "gap-4",
      feature: "gap-6",
    },
  },
  defaultVariants: {
    layout: "vertical",
    size: "default",
  },
});

export interface ArticleCardProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof articleCardVariants> {}

const ArticleCard = forwardRef<HTMLElement, ArticleCardProps>(
  ({ className, layout, size, ...props }, ref) => (
    <article
      ref={ref}
      data-slot="article-card"
      className={cn(articleCardVariants({ layout, size, className }))}
      {...props}
    />
  ),
);
ArticleCard.displayName = "ArticleCard";

const ArticleCardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { ratio?: number }>(
  ({ className, ratio = 16 / 9, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="article-card-image"
      className={cn(
        "relative shrink-0 overflow-hidden bg-muted",
        "group-data-[slot=article-card][class*=flex-row]:w-1/3",
        className,
      )}
      style={{ aspectRatio: ratio }}
      {...props}
    >
      {children}
    </div>
  ),
);
ArticleCardImage.displayName = "ArticleCardImage";

const ArticleCardImg = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      data-slot="article-card-img"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  ),
);
ArticleCardImg.displayName = "ArticleCardImg";

const ArticleCardEyebrow = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="article-card-eyebrow"
      className={cn(
        "font-brand-secondary text-xs font-semibold uppercase tracking-wider text-[var(--color-card-eyebrow)]",
        className,
      )}
      {...props}
    />
  ),
);
ArticleCardEyebrow.displayName = "ArticleCardEyebrow";

const ArticleCardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="article-card-body"
      className={cn("flex flex-1 flex-col gap-1.5", className)}
      {...props}
    />
  ),
);
ArticleCardBody.displayName = "ArticleCardBody";

const ArticleCardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      data-slot="article-card-title"
      className={cn(
        "font-headline text-base font-bold leading-snug tracking-tight text-[var(--color-card-title)] group-hover:underline",
        className,
      )}
      {...props}
    />
  ),
);
ArticleCardTitle.displayName = "ArticleCardTitle";

const ArticleCardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="article-card-description"
      className={cn("line-clamp-2 text-sm text-[var(--color-card-description)]", className)}
      {...props}
    />
  ),
);
ArticleCardDescription.displayName = "ArticleCardDescription";

const ArticleCardByline = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="article-card-byline"
      className={cn("text-xs text-[var(--color-card-byline)]", className)}
      {...props}
    />
  ),
);
ArticleCardByline.displayName = "ArticleCardByline";

export {
  ArticleCard,
  ArticleCardImage,
  ArticleCardImg,
  ArticleCardEyebrow,
  ArticleCardBody,
  ArticleCardTitle,
  ArticleCardDescription,
  ArticleCardByline,
  articleCardVariants,
};
