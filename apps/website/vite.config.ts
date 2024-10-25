import { vitePlugin as remix } from "@remix-run/dev";
// import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { vercelPreset } from "@vercel/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: "es2020",
  },
  plugins: [
    remix({
      presets: [vercelPreset()],
      future: {
        v3_singleFetch: true,
      },
    }),
    tsconfigPaths(),
  ],
});
