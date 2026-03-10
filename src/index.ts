// Theme & Tokens
export { HearstProvider, useTheme, type HearstProviderProps } from "./lib/theme-provider";
export { brands, type BrandTheme } from "./lib/brands";
export { cn } from "./lib/utils";

// Components
export { Button, buttonVariants, type ButtonProps } from "./components/button";
export { Badge, badgeVariants, type BadgeProps } from "./components/badge";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card";
export { Input, inputVariants, type InputProps } from "./components/input";
export { Label } from "./components/label";
export { Textarea, type TextareaProps } from "./components/textarea";
export { Separator, type SeparatorProps } from "./components/separator";
export { Avatar, AvatarImage, AvatarFallback } from "./components/avatar";
export { Switch, type SwitchProps } from "./components/switch";
export { Select, type SelectProps, type SelectOption } from "./components/select";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from "./components/tabs";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from "./components/accordion";
export { Alert, AlertTitle, AlertDescription, alertVariants } from "./components/alert";
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  type DialogProps,
} from "./components/dialog";
export { Tooltip, type TooltipProps } from "./components/tooltip";
export { Skeleton } from "./components/skeleton";
export { AspectRatio, type AspectRatioProps } from "./components/aspect-ratio";
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
  type ArticleCardProps,
} from "./components/article-card";
export { BrandSwitcher, type BrandSwitcherProps } from "./components/brand-switcher";
export { BrandLogo, type BrandLogoProps } from "./components/brand-logo";
