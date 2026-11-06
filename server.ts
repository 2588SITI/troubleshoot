import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distServer = path.join(process.cwd(), "dist", "server.cjs");

// In dev mode (running with tsx or NODE_ENV !== 'production' or npm dev):
const isDev = process.env.NODE_ENV !== "production" || process.env.npm_lifecycle_event === "dev" || !fs.existsSync(distServer);

if (isDev) {
  await import("./server-dev.ts");
} else {
  // In production (npm start / Cloud Run deployment), run the pre-bundled server:
  await import(pathToFileURL(distServer).href);
}