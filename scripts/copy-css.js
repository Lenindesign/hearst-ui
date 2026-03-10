import { copyFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, "../dist");

mkdirSync(dist, { recursive: true });
copyFileSync(resolve(__dirname, "../src/globals.css"), resolve(dist, "globals.css"));
copyFileSync(resolve(__dirname, "../src/lib/tokens.css"), resolve(dist, "tokens.css"));

console.log("Copied CSS files to dist/");
