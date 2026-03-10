import { useState, useEffect } from "react";
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
import { ArticleCard, ArticleCardImage, ArticleCardImg, ArticleCardEyebrow, ArticleCardBody, ArticleCardTitle, ArticleCardDescription, ArticleCardByline } from "../components/article-card";
import { BrandLogo } from "../components/brand-logo";
import { Navbar, NavbarLink } from "../components/navbar";
import { Footer, FooterLinkGroup, FooterLink } from "../components/footer";
import { Hero, HeroImage, HeroEyebrow, HeroTitle, HeroDescription, HeroActions } from "../components/hero";
import { Byline, BylineAvatar, BylineContent, BylineName, BylineMeta, BylineBio } from "../components/byline";
import { Newsletter } from "../components/newsletter";
import { Pagination } from "../components/pagination";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "../components/dropdown-menu";
import { CodeBlock } from "./code-block";
import { PropsPanel, DemoSection } from "./props-panel";
import { BrandCompare } from "./brand-compare";

const NAV_SECTIONS = [
  { id: "brand-logos", label: "Brand Logos" },
  { id: "button", label: "Button" },
  { id: "badge", label: "Badge" },
  { id: "card", label: "Card" },
  { id: "forms", label: "Form Controls" },
  { id: "avatar", label: "Avatar" },
  { id: "tabs", label: "Tabs" },
  { id: "accordion", label: "Accordion" },
  { id: "alert", label: "Alert" },
  { id: "dialog", label: "Dialog" },
  { id: "tooltip", label: "Tooltip" },
  { id: "skeleton", label: "Skeleton" },
  { id: "article-card", label: "Article Card" },
  { id: "navbar", label: "Navbar" },
  { id: "hero", label: "Hero" },
  { id: "byline", label: "Byline" },
  { id: "newsletter", label: "Newsletter" },
  { id: "pagination", label: "Pagination" },
  { id: "dropdown", label: "Dropdown Menu" },
  { id: "footer", label: "Footer" },
  { id: "brand-compare", label: "Brand Compare" },
];

function SidebarNav({ activeId }: { activeId: string }) {
  return (
    <nav className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto border-r py-6 pr-4 lg:block">
      <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Components
      </div>
      <ul className="space-y-0.5">
        {NAV_SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                activeId === s.id
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function useActiveSection() {
  const [activeId, setActiveId] = useState("brand-logos");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeId;
}

function ComponentShowcase() {
  const { brand } = useTheme();
  const activeId = useActiveSection();

  const [switchOn, setSwitchOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(3);

  const [btnVariant, setBtnVariant] = useState("default");
  const [btnSize, setBtnSize] = useState("default");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [badgeVariant, setBadgeVariant] = useState("default");

  const [heroOverlay, setHeroOverlay] = useState("medium");
  const [heroAlign, setHeroAlign] = useState("left");

  const [showCode, setShowCode] = useState<Record<string, boolean>>({});
  const toggleCode = (id: string) => setShowCode((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="flex min-h-screen">
      <SidebarNav activeId={activeId} />

      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <BrandLogo className="h-7" />
              <span className="text-lg font-semibold">Hearst UI</span>
              <Badge variant="outline" className="text-[10px]">26 components</Badge>
            </div>
            <div className="flex items-center gap-3">
              <BrandSwitcher className="w-48" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl space-y-16 px-6 py-10">

          {/* Brand Logos */}
          <DemoSection id="brand-logos" title="Brand Logos" description="Each brand has its own SVG logo that adapts to different backgrounds.">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {brand.logo ? (
                <>
                  <div className="flex h-16 items-center justify-center rounded-lg border bg-white p-3">
                    <BrandLogo className="h-full max-h-10 w-auto" />
                  </div>
                  <div className="flex h-16 items-center justify-center rounded-lg border bg-foreground p-3">
                    <BrandLogo className="h-full max-h-10 w-auto brightness-0 invert" />
                  </div>
                  <div className="flex h-16 items-center justify-center rounded-lg p-3" style={{ backgroundColor: brand.colors["1"] || "#000" }}>
                    <BrandLogo className="h-full max-h-10 w-auto brightness-0 invert" />
                  </div>
                </>
              ) : (
                <div className="col-span-full text-sm text-muted-foreground">No logo available for {brand.name}</div>
              )}
            </div>
            <button type="button" onClick={() => toggleCode("brand-logos")} className="text-xs text-muted-foreground hover:text-foreground">
              {showCode["brand-logos"] ? "Hide code" : "Show code"}
            </button>
            {showCode["brand-logos"] && <CodeBlock code={`<BrandLogo className="h-10" />`} />}
          </DemoSection>

          {/* Button */}
          <DemoSection id="button" title="Button" description="Token-driven button with per-brand colors, radii, and hover states.">
            <PropsPanel controls={[
              { name: "variant", type: "select", value: btnVariant, onChange: setBtnVariant, options: [
                { label: "Default", value: "default" }, { label: "Secondary", value: "secondary" },
                { label: "Outline", value: "outline" }, { label: "Ghost", value: "ghost" },
                { label: "Destructive", value: "destructive" }, { label: "Link", value: "link" },
                { label: "Brand", value: "brand" },
              ]},
              { name: "size", type: "select", value: btnSize, onChange: setBtnSize, options: [
                { label: "XS", value: "xs" }, { label: "SM", value: "sm" },
                { label: "Default", value: "default" }, { label: "LG", value: "lg" }, { label: "XL", value: "xl" },
              ]},
              { name: "disabled", type: "toggle", value: btnDisabled, onChange: setBtnDisabled },
            ]} />
            <div className="flex flex-wrap gap-3 rounded-lg border p-6">
              <Button variant={btnVariant as any} size={btnSize as any} disabled={btnDisabled}>
                {btnVariant.charAt(0).toUpperCase() + btnVariant.slice(1)} Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {(["default", "secondary", "outline", "ghost", "destructive", "link", "brand"] as const).map((v) => (
                <Button key={v} variant={v} size="sm">{v}</Button>
              ))}
            </div>
            <button type="button" onClick={() => toggleCode("button")} className="text-xs text-muted-foreground hover:text-foreground">
              {showCode["button"] ? "Hide code" : "Show code"}
            </button>
            {showCode["button"] && <CodeBlock code={`<Button variant="${btnVariant}" size="${btnSize}"${btnDisabled ? " disabled" : ""}>\n  Click me\n</Button>`} />}
          </DemoSection>

          {/* Badge */}
          <DemoSection id="badge" title="Badge" description="Status indicators with token-driven colors per brand.">
            <PropsPanel controls={[
              { name: "variant", type: "select", value: badgeVariant, onChange: setBadgeVariant, options: [
                { label: "Default", value: "default" }, { label: "Secondary", value: "secondary" },
                { label: "Outline", value: "outline" }, { label: "Destructive", value: "destructive" },
                { label: "Success", value: "success" }, { label: "Warning", value: "warning" },
                { label: "Danger", value: "danger" }, { label: "Highlight", value: "highlight" },
                { label: "Brand", value: "brand" },
              ]},
            ]} />
            <div className="flex flex-wrap gap-2">
              {(["default", "secondary", "outline", "destructive", "success", "warning", "danger", "highlight", "brand"] as const).map((v) => (
                <Badge key={v} variant={v}>{v}</Badge>
              ))}
            </div>
            <button type="button" onClick={() => toggleCode("badge")} className="text-xs text-muted-foreground hover:text-foreground">
              {showCode["badge"] ? "Hide code" : "Show code"}
            </button>
            {showCode["badge"] && <CodeBlock code={`<Badge variant="${badgeVariant}">Label</Badge>`} />}
          </DemoSection>

          {/* Card */}
          <DemoSection id="card" title="Card" description="Content container with token-driven background, border, and text colors.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent><p>Card content with some text.</p></CardContent>
                <CardFooter><Button size="sm">Action</Button></CardFooter>
              </Card>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>Small Card</CardTitle>
                  <CardDescription>Compact variant</CardDescription>
                </CardHeader>
                <CardContent><p>Less padding for dense layouts.</p></CardContent>
              </Card>
            </div>
            <button type="button" onClick={() => toggleCode("card")} className="text-xs text-muted-foreground hover:text-foreground">
              {showCode["card"] ? "Hide code" : "Show code"}
            </button>
            {showCode["card"] && <CodeBlock code={`<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n    <CardDescription>Description</CardDescription>\n  </CardHeader>\n  <CardContent>Content</CardContent>\n  <CardFooter><Button size="sm">Action</Button></CardFooter>\n</Card>`} />}
          </DemoSection>

          {/* Forms */}
          <DemoSection id="forms" title="Form Controls" description="Input, Textarea, Switch — all using brand-specific border, radius, and color tokens.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (error state)</Label>
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
            <button type="button" onClick={() => toggleCode("forms")} className="text-xs text-muted-foreground hover:text-foreground">
              {showCode["forms"] ? "Hide code" : "Show code"}
            </button>
            {showCode["forms"] && <CodeBlock code={`<Input placeholder="Enter your name" />\n<Input error placeholder="Error state" />\n<Textarea placeholder="Bio..." />\n<Switch checked={on} onCheckedChange={setOn} />`} />}
          </DemoSection>

          {/* Avatar */}
          <DemoSection id="avatar" title="Avatar" description="User avatars with image and fallback support.">
            <div className="flex items-center gap-3">
              <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
              <Avatar><AvatarImage src="https://i.pravatar.cc/64?img=3" alt="User" /></Avatar>
              <Avatar size="lg"><AvatarImage src="https://i.pravatar.cc/80?img=5" alt="User" /></Avatar>
              <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
            </div>
          </DemoSection>

          {/* Tabs */}
          <DemoSection id="tabs" title="Tabs" description="Tabbed content panels.">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview"><Card><CardContent className="pt-4">Overview content goes here.</CardContent></Card></TabsContent>
              <TabsContent value="analytics"><Card><CardContent className="pt-4">Analytics dashboard.</CardContent></Card></TabsContent>
              <TabsContent value="reports"><Card><CardContent className="pt-4">Reports and exports.</CardContent></Card></TabsContent>
            </Tabs>
          </DemoSection>

          {/* Accordion */}
          <DemoSection id="accordion" title="Accordion" description="Collapsible content sections with token-driven background and border.">
            <Accordion defaultValue={["item-1"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger value="item-1">What is Hearst UI?</AccordionTrigger>
                <AccordionContent value="item-1">A multi-brand component library built for Hearst's 29 media brands, powered by Token Studio design tokens.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger value="item-2">How do I switch brands?</AccordionTrigger>
                <AccordionContent value="item-2">Use the BrandSwitcher component or call setBrand() from the useTheme hook.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger value="item-3">Can I customize components?</AccordionTrigger>
                <AccordionContent value="item-3">Yes — use the CLI to copy components into your project and modify them freely.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </DemoSection>

          {/* Alert */}
          <DemoSection id="alert" title="Alert" description="Contextual feedback messages.">
            <Alert><AlertTitle>Heads up!</AlertTitle><AlertDescription>This is a default alert message.</AlertDescription></Alert>
            <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong.</AlertDescription></Alert>
            <Alert variant="success"><AlertTitle>Success</AlertTitle><AlertDescription>Your changes have been saved.</AlertDescription></Alert>
          </DemoSection>

          {/* Dialog */}
          <DemoSection id="dialog" title="Dialog" description="Modal dialog with token-driven background.">
            <Dialog>
              <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-button bg-[var(--color-btn-solid-bg)] px-4 text-sm font-medium text-[var(--color-btn-solid-text)]">
                Open Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>This is a dialog description.</DialogDescription>
                </DialogHeader>
                <div className="py-4"><p className="text-sm text-muted-foreground">Dialog body content here.</p></div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DemoSection>

          {/* Tooltip */}
          <DemoSection id="tooltip" title="Tooltip" description="Hover tooltips with configurable placement.">
            <div className="flex gap-4">
              <Tooltip content="Top tooltip" side="top"><Button variant="outline">Hover me (top)</Button></Tooltip>
              <Tooltip content="Bottom tooltip" side="bottom"><Button variant="outline">Hover me (bottom)</Button></Tooltip>
            </div>
          </DemoSection>

          {/* Skeleton */}
          <DemoSection id="skeleton" title="Skeleton" description="Loading placeholders.">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </DemoSection>

          {/* Article Card */}
          <DemoSection id="article-card" title="Article Card" description="Editorial content card with eyebrow, title, description, and byline — all token-driven.">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard layout="vertical">
                <ArticleCardImage ratio={16 / 9}><ArticleCardImg src="https://picsum.photos/seed/hearst1/600/340" alt="Article" /></ArticleCardImage>
                <ArticleCardBody>
                  <ArticleCardEyebrow>Trending</ArticleCardEyebrow>
                  <ArticleCardTitle>The Future of Digital Media in 2026</ArticleCardTitle>
                  <ArticleCardDescription>How emerging technologies are reshaping the way we consume content.</ArticleCardDescription>
                  <ArticleCardByline>By Jane Smith</ArticleCardByline>
                </ArticleCardBody>
              </ArticleCard>
              <ArticleCard layout="vertical">
                <ArticleCardImage ratio={16 / 9}><ArticleCardImg src="https://picsum.photos/seed/hearst2/600/340" alt="Article" /></ArticleCardImage>
                <ArticleCardBody>
                  <ArticleCardEyebrow>Culture</ArticleCardEyebrow>
                  <ArticleCardTitle>Inside the World's Most Exclusive Events</ArticleCardTitle>
                  <ArticleCardDescription>A behind-the-scenes look at high-profile gatherings.</ArticleCardDescription>
                  <ArticleCardByline>By John Doe</ArticleCardByline>
                </ArticleCardBody>
              </ArticleCard>
              <ArticleCard layout="horizontal" className="sm:col-span-2 lg:col-span-1">
                <ArticleCardImage ratio={1}><ArticleCardImg src="https://picsum.photos/seed/hearst3/300/300" alt="Article" /></ArticleCardImage>
                <ArticleCardBody>
                  <ArticleCardEyebrow>Style</ArticleCardEyebrow>
                  <ArticleCardTitle>Spring Fashion Trends You Need to Know</ArticleCardTitle>
                  <ArticleCardByline>By Maria Garcia</ArticleCardByline>
                </ArticleCardBody>
              </ArticleCard>
            </div>
            <button type="button" onClick={() => toggleCode("article-card")} className="text-xs text-muted-foreground hover:text-foreground">
              {showCode["article-card"] ? "Hide code" : "Show code"}
            </button>
            {showCode["article-card"] && <CodeBlock code={`<ArticleCard layout="vertical">\n  <ArticleCardImage ratio={16/9}>\n    <ArticleCardImg src="..." alt="Article" />\n  </ArticleCardImage>\n  <ArticleCardBody>\n    <ArticleCardEyebrow>Trending</ArticleCardEyebrow>\n    <ArticleCardTitle>Title</ArticleCardTitle>\n    <ArticleCardDescription>Description</ArticleCardDescription>\n    <ArticleCardByline>By Author</ArticleCardByline>\n  </ArticleCardBody>\n</ArticleCard>`} />}
          </DemoSection>

          {/* Navbar */}
          <DemoSection id="navbar" title="Navbar" description="Brand-aware navigation header with mobile menu and dropdown integration.">
            <div className="overflow-hidden rounded-lg border">
              <Navbar logo={<BrandLogo className="h-6" />} actions={<Button size="sm">Subscribe</Button>}>
                <NavbarLink href="#" active>Home</NavbarLink>
                <NavbarLink href="#">News</NavbarLink>
                <NavbarLink href="#">Culture</NavbarLink>
                <NavbarLink href="#">Style</NavbarLink>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center px-3 py-2 text-sm font-medium text-[var(--color-nav-text)] transition-colors hover:text-[var(--color-nav-text-hover)] rounded-md hover:bg-[var(--color-nav-text)]/5">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuItem>Travel</DropdownMenuItem>
                    <DropdownMenuItem>Food</DropdownMenuItem>
                    <DropdownMenuItem>Health</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>About</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Navbar>
            </div>
          </DemoSection>

          {/* Hero */}
          <DemoSection id="hero" title="Hero" description="Full-width hero block with image, overlay, and content alignment options.">
            <PropsPanel controls={[
              { name: "overlay", type: "select", value: heroOverlay, onChange: setHeroOverlay, options: [
                { label: "None", value: "none" }, { label: "Light", value: "light" },
                { label: "Medium", value: "medium" }, { label: "Heavy", value: "heavy" },
                { label: "Brand", value: "brand" },
              ]},
              { name: "align", type: "select", value: heroAlign, onChange: setHeroAlign, options: [
                { label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" },
              ]},
            ]} />
            <div className="overflow-hidden rounded-lg">
              <Hero size="sm" overlay={heroOverlay as any} align={heroAlign as any}>
                <HeroImage src="https://picsum.photos/seed/hero1/1200/600" alt="Hero" />
                <HeroEyebrow>Exclusive</HeroEyebrow>
                <HeroTitle>The Stories That Define Our Time</HeroTitle>
                <HeroDescription>Discover in-depth reporting, bold perspectives, and the voices shaping culture today.</HeroDescription>
                <HeroActions>
                  <Button variant="brand" size="lg">Read More</Button>
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">Explore</Button>
                </HeroActions>
              </Hero>
            </div>
            <button type="button" onClick={() => toggleCode("hero")} className="text-xs text-muted-foreground hover:text-foreground">
              {showCode["hero"] ? "Hide code" : "Show code"}
            </button>
            {showCode["hero"] && <CodeBlock code={`<Hero size="sm" overlay="${heroOverlay}" align="${heroAlign}">\n  <HeroImage src="..." alt="Hero" />\n  <HeroEyebrow>Exclusive</HeroEyebrow>\n  <HeroTitle>Title</HeroTitle>\n  <HeroDescription>Description</HeroDescription>\n  <HeroActions>\n    <Button variant="brand" size="lg">CTA</Button>\n  </HeroActions>\n</Hero>`} />}
          </DemoSection>

          {/* Byline */}
          <DemoSection id="byline" title="Byline / Author" description="Author attribution with inline and stacked layouts.">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardContent className="pt-4">
                  <Byline layout="inline">
                    <BylineAvatar src="https://i.pravatar.cc/80?img=12" alt="Author" />
                    <BylineContent>
                      <BylineName>Sarah Mitchell</BylineName>
                      <BylineMeta>March 8, 2026 · 5 min read</BylineMeta>
                    </BylineContent>
                  </Byline>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <Byline layout="stacked">
                    <BylineAvatar src="https://i.pravatar.cc/80?img=32" alt="Author" className="size-14" />
                    <BylineContent>
                      <BylineName>James Rodriguez</BylineName>
                      <BylineMeta>Senior Editor · March 8, 2026</BylineMeta>
                      <BylineBio>James covers technology and culture for {brand.name}.</BylineBio>
                    </BylineContent>
                  </Byline>
                </CardContent>
              </Card>
            </div>
          </DemoSection>

          {/* Newsletter */}
          <DemoSection id="newsletter" title="Newsletter Signup" description="Email capture form with card and inline variants.">
            <Newsletter
              variant="card"
              heading={`Get the best of ${brand.name}`}
              description="Sign up for our daily newsletter and never miss a story."
              onSubscribe={async (email) => { await new Promise((r) => setTimeout(r, 800)); console.log("Subscribed:", email); }}
            />
            <Newsletter variant="inline" heading="Quick subscribe" description="Enter your email to stay updated." />
          </DemoSection>

          {/* Pagination */}
          <DemoSection id="pagination" title="Pagination" description="Token-driven page navigation with active state.">
            <Pagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
            <p className="text-sm text-muted-foreground">Page {currentPage} of 12</p>
          </DemoSection>

          {/* Dropdown Menu */}
          <DemoSection id="dropdown" title="Dropdown Menu" description="Contextual menu with items, separators, and labels.">
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-button border border-[var(--color-btn-outline-border)] bg-[var(--color-btn-outline-bg)] px-4 text-sm font-medium text-[var(--color-btn-outline-text)]">
                  Options
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-button bg-[var(--color-btn-solid-bg)] px-4 text-sm font-medium text-[var(--color-btn-solid-text)]">
                  Account
                </DropdownMenuTrigger>
                <DropdownMenuContent align="right">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DemoSection>

          {/* Footer */}
          <DemoSection id="footer" title="Footer" description="Editorial footer with brand logo, link groups, and legal text.">
            <div className="overflow-hidden rounded-lg border">
              <Footer
                logo={<BrandLogo className="h-8" />}
                copyright={`© ${new Date().getFullYear()} ${brand.name}. All rights reserved. A Hearst Magazine.`}
              >
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                  <FooterLinkGroup title="Sections">
                    <FooterLink href="#">News</FooterLink>
                    <FooterLink href="#">Culture</FooterLink>
                    <FooterLink href="#">Style</FooterLink>
                    <FooterLink href="#">Travel</FooterLink>
                  </FooterLinkGroup>
                  <FooterLinkGroup title="About">
                    <FooterLink href="#">About Us</FooterLink>
                    <FooterLink href="#">Careers</FooterLink>
                    <FooterLink href="#">Contact</FooterLink>
                  </FooterLinkGroup>
                  <FooterLinkGroup title="Legal">
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Use</FooterLink>
                  </FooterLinkGroup>
                  <FooterLinkGroup title="Follow Us">
                    <FooterLink href="#">Instagram</FooterLink>
                    <FooterLink href="#">Twitter</FooterLink>
                    <FooterLink href="#">YouTube</FooterLink>
                  </FooterLinkGroup>
                </div>
              </Footer>
            </div>
          </DemoSection>

          {/* Brand Compare */}
          <DemoSection id="brand-compare" title="Brand Comparison" description="See how the same component looks across different brands side by side.">
            <BrandCompare
              brandSlugs={["cosmopolitan", "esquire", "car-and-driver"]}
              render={(slug) => (
                <div className="space-y-3">
                  <Button variant="default" className="w-full">Subscribe</Button>
                  <Button variant="outline" className="w-full">Learn More</Button>
                  <div className="flex gap-1">
                    <Badge>New</Badge>
                    <Badge variant="success">Live</Badge>
                  </div>
                  <Input placeholder="Search..." />
                </div>
              )}
            />
            <BrandCompare
              brandSlugs={["elle", "harpers-bazaar", "town-and-country"]}
              render={(slug, name) => (
                <ArticleCard layout="vertical">
                  <ArticleCardImage ratio={16 / 9}>
                    <ArticleCardImg src={`https://picsum.photos/seed/${slug}/400/225`} alt={name} />
                  </ArticleCardImage>
                  <ArticleCardBody>
                    <ArticleCardEyebrow>Featured</ArticleCardEyebrow>
                    <ArticleCardTitle>Spring Collection Preview</ArticleCardTitle>
                    <ArticleCardByline>By Editor</ArticleCardByline>
                  </ArticleCardBody>
                </ArticleCard>
              )}
            />
          </DemoSection>

        </main>
      </div>
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
