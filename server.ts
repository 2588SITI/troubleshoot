import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distServer = path.join(process.cwd(), "dist", "server.cjs");

// In dev mode (npm run dev), run live TypeScript server with Vite middleware:
if (process.env.npm_lifecycle_event === "dev" || !fs.existsSync(distServer)) {
  await import("./server-dev.ts");
} else {
  // In production (npm start / Cloud Run deployment), run the pre-bundled server:
  await import(pathToFileURL(distServer).href);
}