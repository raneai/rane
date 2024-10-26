import { cac } from "cac";
import path from "node:path";
import { version } from "../package.json";
import { build, BuildOptions } from "./build";
import { name } from "./consts";

const cli = cac(name).version(version).help();
const isVercel = process.env.VERCEL === "1";

cli
  .command("build [root]", "build for production")
  .option("--output [output]", "output directory", { default: "dist" })
  .option("--vercel", "[boolean] build for vercel", { default: isVercel })
  .option("--entry [entry]", "entry file", { default: "src/main.ts" })
  .option("--staticDir [path]", "static directory", { default: "public" })
  .option("--edge", "[boolean] build for edge", { default: false })
  .action(async (root: string = process.cwd(), opts: BuildOptions) => {
    try {
      await build({
        ...opts,
        root: path.resolve(root),
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

cli.parse();
