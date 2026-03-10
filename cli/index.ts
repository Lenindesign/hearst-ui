#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "fs";
import { resolve, dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = resolve(__dirname, "../registry/index.json");
const SRC_ROOT = resolve(__dirname, "../src");

interface RegistryFile {
  path: string;
  type: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: RegistryFile[];
  dependencies?: string[];
}

interface Registry {
  name: string;
  items: RegistryItem[];
}

function loadRegistry(): Registry {
  return JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
}

function printHelp() {
  console.log(`
  hearst-ui — Hearst Design System CLI

  Usage:
    npx hearst-ui <command> [options]

  Commands:
    add <component...>   Copy component(s) into your project
    list                 List all available components
    init                 Initialize Hearst UI in your project (tokens + theme)

  Options:
    --dir <path>         Target directory (default: src/components/ui)
    --lib-dir <path>     Library directory for utils/theme (default: src/lib)
    --overwrite          Overwrite existing files

  Examples:
    npx hearst-ui add button card badge
    npx hearst-ui add article-card --dir components/hearst
    npx hearst-ui init
    npx hearst-ui list
`);
}

function rewriteImports(content: string, componentDir: string, libDir: string): string {
  return content
    .replace(/from\s+["']\.\.\/lib\/utils["']/g, `from "${libDir}/utils"`)
    .replace(/from\s+["']\.\.\/lib\/theme-provider["']/g, `from "${libDir}/theme-provider"`)
    .replace(/from\s+["']\.\.\/lib\/brands["']/g, `from "${libDir}/brands"`)
    .replace(/from\s+["']@\/lib\/utils["']/g, `from "${libDir}/utils"`)
    .replace(/from\s+["']@\/lib\/theme-provider["']/g, `from "${libDir}/theme-provider"`)
    .replace(/from\s+["']@\/lib\/brands["']/g, `from "${libDir}/brands"`);
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`  Created ${dir}`);
  }
}

function addComponents(names: string[], options: { dir: string; libDir: string; overwrite: boolean }) {
  const registry = loadRegistry();
  const componentDir = resolve(process.cwd(), options.dir);
  const libDir = resolve(process.cwd(), options.libDir);

  const toInstall = new Set<string>();
  const depsToInstall = new Set<string>();

  for (const name of names) {
    const item = registry.items.find((i) => i.name === name);
    if (!item) {
      console.error(`  Component "${name}" not found. Run 'hearst-ui list' to see available components.`);
      continue;
    }
    toInstall.add(name);
    item.dependencies?.forEach((d) => depsToInstall.add(d));
  }

  if (toInstall.size === 0) {
    console.log("No components to install.");
    return;
  }

  ensureDir(componentDir);

  const relLibDir = getRelativePath(componentDir, libDir);

  for (const name of toInstall) {
    const item = registry.items.find((i) => i.name === name)!;

    for (const file of item.files) {
      const srcPath = resolve(SRC_ROOT, file.path.replace("src/", ""));
      const fileName = basename(file.path);

      const isLib = file.type === "registry:lib";
      const targetDir = isLib ? libDir : componentDir;
      ensureDir(targetDir);
      const targetPath = join(targetDir, fileName);

      if (existsSync(targetPath) && !options.overwrite) {
        console.log(`  Skipped ${fileName} (already exists, use --overwrite)`);
        continue;
      }

      let content = readFileSync(srcPath, "utf-8");
      if (!isLib) {
        content = rewriteImports(content, componentDir, relLibDir);
      }

      writeFileSync(targetPath, content);
      console.log(`  Added ${isLib ? "lib" : "component"}: ${fileName}`);
    }
  }

  if (depsToInstall.size > 0) {
    console.log(`\n  Install dependencies:\n    npm install ${[...depsToInstall].join(" ")}`);
  }

  console.log("\n  Done!");
}

function getRelativePath(from: string, to: string): string {
  const fromParts = from.split("/").filter(Boolean);
  const toParts = to.split("/").filter(Boolean);

  let common = 0;
  while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) {
    common++;
  }

  const ups = fromParts.length - common;
  const downs = toParts.slice(common);

  const rel = [...Array(ups).fill(".."), ...downs].join("/");
  return rel.startsWith(".") ? rel : `./${rel}`;
}

function listComponents() {
  const registry = loadRegistry();
  console.log("\n  Available components:\n");

  const uiItems = registry.items.filter((i) => i.type === "registry:ui");
  const libItems = registry.items.filter((i) => i.type === "registry:lib");

  console.log("  UI Components:");
  for (const item of uiItems) {
    console.log(`    ${item.name.padEnd(20)} ${item.description}`);
  }

  console.log("\n  Library:");
  for (const item of libItems) {
    console.log(`    ${item.name.padEnd(20)} ${item.description}`);
  }

  console.log(`\n  Total: ${registry.items.length} items\n`);
}

function initProject(options: { dir: string; libDir: string; overwrite: boolean }) {
  console.log("\n  Initializing Hearst UI...\n");

  const libDir = resolve(process.cwd(), options.libDir);
  ensureDir(libDir);

  const filesToCopy: [string, string][] = [
    [resolve(SRC_ROOT, "lib/utils.ts"), join(libDir, "utils.ts")],
    [resolve(SRC_ROOT, "lib/theme-provider.tsx"), join(libDir, "theme-provider.tsx")],
    [resolve(SRC_ROOT, "lib/brands.ts"), join(libDir, "brands.ts")],
    [resolve(SRC_ROOT, "lib/tokens.css"), join(libDir, "tokens.css")],
    [resolve(SRC_ROOT, "globals.css"), join(libDir, "globals.css")],
  ];

  for (const [src, dest] of filesToCopy) {
    if (existsSync(dest) && !options.overwrite) {
      console.log(`  Skipped ${basename(dest)} (already exists)`);
      continue;
    }
    copyFileSync(src, dest);
    console.log(`  Copied ${basename(dest)}`);
  }

  console.log(`
  Next steps:
    1. Import globals.css in your app entry point
    2. Wrap your app with <HearstProvider>
    3. Add components: npx hearst-ui add button card badge
    4. Install peer deps: npm install clsx tailwind-merge class-variance-authority

  Done!
`);
}

// ── Main ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const command = args[0];

const flagIndex = (flag: string) => args.indexOf(flag);
const flagValue = (flag: string) => {
  const i = flagIndex(flag);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
};

const options = {
  dir: flagValue("--dir") || "src/components/ui",
  libDir: flagValue("--lib-dir") || "src/lib",
  overwrite: args.includes("--overwrite"),
};

switch (command) {
  case "add": {
    const componentNames = args
      .slice(1)
      .filter((a) => !a.startsWith("--") && a !== flagValue("--dir") && a !== flagValue("--lib-dir"));
    if (componentNames.length === 0) {
      console.error("  Please specify component names. Example: hearst-ui add button card");
      process.exit(1);
    }
    addComponents(componentNames, options);
    break;
  }
  case "list":
    listComponents();
    break;
  case "init":
    initProject(options);
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    printHelp();
    break;
  default:
    console.error(`  Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
