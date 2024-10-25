import path from "node:path";
import vercel from "./bundlers/vercel";

export type VercelRuntime = "node" | "edge";

export interface BuildOptions {
  output: string;
  vercel: boolean;
  edge: boolean;
  entry: string;
  root: string;
  staticDir: string;
}

class Builder {
  constructor(private opts: BuildOptions) {
    this.opts = opts;
  }

  async build() {
    if (this.opts.vercel) {
      await vercel(this.opts);
    }
  }
}

export async function build(opts: BuildOptions) {
  const config: BuildOptions = {
    ...opts,
    staticDir: path.resolve(opts.staticDir),
    root: opts.root,
    output: path.resolve(opts.output ?? "dist"),
    vercel: opts.vercel,
    entry: opts.entry,
  };
  const builder = new Builder(config);
  await builder.build();
}
