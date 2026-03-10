# Hearst UI

Multi-brand component library for Hearst's 29 media brands. Built on Tailwind CSS v4, powered by Token Studio design tokens.

Think **shadcn/ui**, but every component automatically adapts to whichever Hearst brand is active — Cosmopolitan, Esquire, Car and Driver, Elle, and 25 more.

## Quick Start

### Option A: npm package

```bash
npm install @hearst/ui
```

```tsx
import { HearstProvider, Button, Card } from "@hearst/ui";
import "@hearst/ui/globals.css";

function App() {
  return (
    <HearstProvider defaultBrand="cosmopolitan">
      <Button variant="brand">Cosmo Button</Button>
    </HearstProvider>
  );
}
```

### Option B: Copy-paste (like shadcn)

```bash
# Initialize tokens + theme in your project
npx hearst-ui init

# Add individual components
npx hearst-ui add button card badge article-card

# See all available components
npx hearst-ui list
```

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Multi-variant button with `brand` variant |
| `Badge` | Inline status indicator |
| `Card` | Container with header, content, footer slots |
| `Input` | Text input with size variants and error state |
| `Label` | Form label |
| `Textarea` | Multi-line text input |
| `Separator` | Visual divider |
| `Avatar` | User avatar with image + fallback |
| `Switch` | Toggle switch |
| `Select` | Dropdown select |
| `Tabs` | Tabbed content navigation |
| `Accordion` | Collapsible content sections |
| `Alert` | Feedback alert (default, destructive, success, warning) |
| `Dialog` | Modal dialog with overlay |
| `Tooltip` | Hover tooltip |
| `Skeleton` | Loading placeholder |
| `AspectRatio` | Constrained aspect ratio container |
| `ArticleCard` | Editorial card with eyebrow, image, title, byline |
| `BrandSwitcher` | Runtime brand theme switcher |

## Brand Theming

Every component responds to the active brand via CSS custom properties. The `HearstProvider` sets `data-brand` on the root element, which activates the corresponding token overrides from `tokens.css`.

```tsx
import { HearstProvider, useTheme } from "@hearst/ui";

function MyComponent() {
  const { brand, setBrand } = useTheme();

  return (
    <div>
      <p>Current brand: {brand.name}</p>
      <button onClick={() => setBrand("esquire")}>
        Switch to Esquire
      </button>
    </div>
  );
}
```

### Available Brands

Autoweek, Bicycling, Car and Driver, Cosmopolitan, Country Living, Delish, Elle, Elle Decor, Esquire, Food Network, Good Housekeeping, Harper's Bazaar, HGTV, House Beautiful, Marie Claire, Men's Health, Oprah Daily, Popular Mechanics, Prevention, Road & Track, Runner's World, Seventeen, The Pioneer Woman, Town & Country, Veranda, White Label, Woman's Day, Women's Health

## Token System

Tokens flow from the Figma Token Studio API through sync scripts into CSS custom properties:

```
Token Studio API → sync-tokens.ts → tokens.css + brands.ts
                                   ↓
                              [data-brand="cosmopolitan"] {
                                --brand-primary: #d70000;
                                --font-brand-sans: "Basis Grotesque Pro";
                                --component-button-background-primary-solid-default: #d70000;
                                ...
                              }
```

### Syncing Tokens

```bash
# Fetch latest tokens from Token Studio API
npm run sync-tokens
```

## Development

```bash
# Install dependencies
npm install

# Start dev preview (Vite)
npm run dev

# Build library
npm run build

# Type check
npm run typecheck
```

## Project Structure

```
hearst-ui/
├── src/
│   ├── components/      # All UI components
│   ├── lib/
│   │   ├── brands.ts    # Brand theme data (auto-generated)
│   │   ├── tokens.css   # CSS custom properties (auto-generated)
│   │   ├── theme-provider.tsx  # HearstProvider + useTheme
│   │   └── utils.ts     # cn() utility
│   ├── preview/         # Vite dev preview app
│   ├── globals.css      # Tailwind v4 + token imports
│   └── index.ts         # Barrel exports
├── cli/                 # Copy-paste CLI (like shadcn add)
├── registry/            # Component registry for CLI
├── scripts/             # Token sync scripts
├── dist/                # Built output (ESM + CJS + types)
└── package.json
```

## License

MIT
