import { PATHS } from "./internal/constants";
import { spawnSync } from "./internal/utils";
import chalk from "chalk";

(async () => {
  const startTime = Date.now();
  const args = process.argv.slice(2);

  args.unshift("--filter", `"./apps/*"`, "--output-logs", "errors-only");

  const command = `turbo run ${args.join(" ")} build`;

  spawnSync(command, { cwd: PATHS.ROOT });

  console.log(chalk.green(`Build completed in ${Date.now() - startTime}ms`));
})();
