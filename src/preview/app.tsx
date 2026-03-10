import { useState } from "react";
import { HearstProvider, useTheme } from "../lib/theme-provider";
import { BrandSwitcher } from "../components/brand-switcher";
import { Button } from "../components/button";
import { Badge } from "../components/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Textarea } from "../components/textarea";
import { Separator } from "../components/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../components/avatar";
import { Switch } from "../components/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/accordion";
import { Alert, AlertTitle, AlertDescription } from "../components/alert";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/dialog";
import { Tooltip } from "../components/tooltip";
import { Skeleton } from "../components/skeleton";
import {
  ArticleCard,
  ArticleCardImage,
  ArticleCardImg,
  ArticleCardEyebrow,
  ArticleCardBody,
  ArticleCardTitle,
  ArticleCardDescription,
  ArticleCardByline,
} from "../components/article-card";
import { BrandLogo } from "../components/brand-logo";

function ComponentShowcase() {
  const { brand } = useTheme();
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-12 p-8">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <BrandLogo className="h-10" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Hearst UI
        </h1>
        <p className="text-lg text-muted-foreground">
          Multi-brand component library — currently viewing{" "}
          <strong className="text-foreground">{brand.name}</strong>
        </p>
        <BrandSwitcher className="max-w-xs" />
      </header>

      <Separator />

      {/* Brand Logo Gallery */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Brand Logos</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brand.logo ? (
            <>
              <div className="flex h-16 items-center justify-center rounded-lg border bg-white p-3">
                <BrandLogo className="h-full max-h-10 w-auto" />
              </div>
              <div className="flex h-16 items-center justify-center rounded-lg border bg-foreground p-3">
                <BrandLogo className="h-full max-h-10 w-auto brightness-0 invert" />
              </div>
              <div
                className="flex h-16 items-center justify-center rounded-lg p-3"
                style={{ backgroundColor: brand.colors["1"] || "#000" }}
              >
                <BrandLogo className="h-full max-h-10 w-auto brightness-0 invert" />
              </div>
            </>
          ) : (
            <div className="col-span-full text-sm text-muted-foreground">
              No logo available for {brand.name}
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button variant="brand">Brand</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      <Separator />

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Badge</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="brand">Brand</Badge>
        </div>
      </section>

      <Separator />

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Card</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content with some text.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>Compact variant</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Less padding for dense layouts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Forms */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Form Controls</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" error />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself..." />
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            <Label>Notifications {switchOn ? "on" : "off"}</Label>
          </div>
        </div>
      </section>

      <Separator />

      {/* Avatar */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Avatar</h2>
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/64?img=3" alt="User" />
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="User" />
          </Avatar>
          <Avatar size="xl">
            <AvatarFallback>XL</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <Separator />

      {/* Tabs */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Tabs</h2>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-4">Overview content goes here.</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardContent className="pt-4">Analytics dashboard.</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card>
              <CardContent className="pt-4">Reports and exports.</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* Accordion */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Accordion</h2>
        <Accordion defaultValue={["item-1"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger value="item-1">What is Hearst UI?</AccordionTrigger>
            <AccordionContent value="item-1">
              A multi-brand component library built for Hearst's 29 media brands, powered by Token Studio design tokens.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger value="item-2">How do I switch brands?</AccordionTrigger>
            <AccordionContent value="item-2">
              Use the BrandSwitcher component or call setBrand() from the useTheme hook.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger value="item-3">Can I customize components?</AccordionTrigger>
            <AccordionContent value="item-3">
              Yes — use the CLI to copy components into your project and modify them freely.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* Alerts */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Alert</h2>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>This is a default alert message.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your changes have been saved.</AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Dialog */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Dialog</h2>
        <Dialog>
          <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
            Open Dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description. It can contain any content.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">Dialog body content here.</p>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <Separator />

      {/* Tooltip */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Tooltip</h2>
        <div className="flex gap-4">
          <Tooltip content="Top tooltip" side="top">
            <Button variant="outline">Hover me (top)</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button variant="outline">Hover me (bottom)</Button>
          </Tooltip>
        </div>
      </section>

      <Separator />

      {/* Skeleton */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Skeleton</h2>
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Article Card — Hearst-specific */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-semibold">Article Card</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard layout="vertical">
            <ArticleCardImage ratio={16 / 9}>
              <ArticleCardImg
                src="https://picsum.photos/seed/hearst1/600/340"
                alt="Article"
              />
            </ArticleCardImage>
            <ArticleCardBody>
              <ArticleCardEyebrow>Trending</ArticleCardEyebrow>
              <ArticleCardTitle>
                The Future of Digital Media in 2026
              </ArticleCardTitle>
              <ArticleCardDescription>
                How emerging technologies are reshaping the way we consume content.
              </ArticleCardDescription>
              <ArticleCardByline>By Jane Smith</ArticleCardByline>
            </ArticleCardBody>
          </ArticleCard>

          <ArticleCard layout="vertical">
            <ArticleCardImage ratio={16 / 9}>
              <ArticleCardImg
                src="https://picsum.photos/seed/hearst2/600/340"
                alt="Article"
              />
            </ArticleCardImage>
            <ArticleCardBody>
              <ArticleCardEyebrow>Culture</ArticleCardEyebrow>
              <ArticleCardTitle>
                Inside the World's Most Exclusive Events
              </ArticleCardTitle>
              <ArticleCardDescription>
                A behind-the-scenes look at high-profile gatherings.
              </ArticleCardDescription>
              <ArticleCardByline>By John Doe</ArticleCardByline>
            </ArticleCardBody>
          </ArticleCard>

          <ArticleCard layout="horizontal" className="sm:col-span-2 lg:col-span-1">
            <ArticleCardImage ratio={1}>
              <ArticleCardImg
                src="https://picsum.photos/seed/hearst3/300/300"
                alt="Article"
              />
            </ArticleCardImage>
            <ArticleCardBody>
              <ArticleCardEyebrow>Style</ArticleCardEyebrow>
              <ArticleCardTitle>
                Spring Fashion Trends You Need to Know
              </ArticleCardTitle>
              <ArticleCardByline>By Maria Garcia</ArticleCardByline>
            </ArticleCardBody>
          </ArticleCard>
        </div>
      </section>
    </div>
  );
}

export function App() {
  return (
    <HearstProvider defaultBrand="cosmopolitan">
      <ComponentShowcase />
    </HearstProvider>
  );
}
