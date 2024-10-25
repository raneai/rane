import { Hono } from "hono";
import { handle as vercel } from "@hono/node-server/vercel";
import { serve as node } from "@hono/node-server";

export default function serve(app: Hono, opts: { port: number }) {
  let handler: any;

  if (process.env.VERCEL) {
    handler = vercel(app);
  } else {
    handler = node({ fetch: app.fetch, port: opts.port });
  }

  return handler;
}
