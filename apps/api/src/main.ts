import { Hono } from "hono";
import { cors } from "hono/cors";
import vm from "node:vm";
import serve from "./serve";

const app = new Hono().use(cors());

app.get("/", async c => {
  const sandbox = {
    console: {
      log: (...args: any[]) => {
        console.log("sandbox", ...args);
        console.log(...args);
      },
    },
  };
  vm.createContext(sandbox);
  const res = vm.runInContext(
    `
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += i;
    }
    sum;
    `,
    sandbox,
  );
  return c.json({ message: "Hello World", res });
});

export default serve(app, { port: 3002 });
