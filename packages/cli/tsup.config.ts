import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      cli: "src/cli.ts",
      index: "src/index.ts",
    },
    minifyIdentifiers: false,
    format: ["esm"],
    dts: true,
    splitting: true,
    skipNodeModulesBundle: true,
    shims: true,
    clean: true,
  },
]);
