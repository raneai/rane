import fs from "fs-extra";
import path from "node:path";
import ncc from "@vercel/ncc";
import { BuildOptions } from "../../build";

export type VercelRuntime = "node" | "edge";

export default async function vercel(opts: BuildOptions) {
  const configJson = {
    version: 3,
    routes: [
      {
        src: ".*",
        dest: "_serverless",
      },
    ] as any[],
    overrides: {},
    crons: [],
  };

  const bundleName = "index.js";
  const vcConfig = {
    edge: {
      runtime: "edge",
      entrypoint: bundleName,
    },
    node: {
      runtime: "nodejs20.x",
      handler: bundleName,
      launcherType: "Nodejs",
    },
  } satisfies Record<VercelRuntime, object>;

  const { output = "dist", vercel = false, entry = "src/main.ts", root } = opts;
  const outputPath = vercel ? path.join(root, ".vercel/output") : output;

  // remove output path
  fs.removeSync(outputPath);
  const dirs = {
    functions: path.join(outputPath, "functions"),
    static: path.join(outputPath, "static"),
  };

  const targetPath = vercel ? path.join(dirs.functions, "_serverless.func") : output;
  fs.ensureDirSync(targetPath);

  // check static dir
  if (fs.existsSync(opts.staticDir)) {
    const staticPath = path.join(outputPath, "static");
    fs.ensureDirSync(staticPath);
    fs.copySync(opts.staticDir, staticPath, { overwrite: true });
  }

  // bundle code
  const { code, assets } = await ncc(path.join(root, entry), {
    minify: false,
    sourceMap: true,
    out: targetPath,
    cache: true,
    externals: [],
    assetsBuilds: false,
  });

  // copy assets
  for (const assetKey of Object.keys(assets)) {
    const asset = assets[assetKey];
    const data = asset.source;
    const fileTarget = path.join(targetPath, assetKey);
    fs.ensureDirSync(path.dirname(fileTarget));
    fs.writeFileSync(fileTarget, data);
  }

  // write code to package
  const outfile = path.join(targetPath, bundleName);
  fs.ensureDirSync(path.dirname(outfile));
  fs.writeFileSync(path.join(targetPath, bundleName), code, {
    encoding: "utf-8",
  });

  fs.writeJsonSync(path.join(targetPath, ".vc-config.json"), vcConfig[opts.edge ? "edge" : "node"], {
    spaces: 2,
    encoding: "utf-8",
  });
  configJson.routes.unshift({ handle: "filesystem" });
  fs.writeJsonSync(path.join(outputPath, "config.json"), configJson, {
    spaces: 2,
    encoding: "utf-8",
  });
}
