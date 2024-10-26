import { spawnSync } from "./internal/utils";
import { PATHS } from "./internal/constants";

(async () => {
  const command = `bunx taze -wr && bun install && bun biome migrate --write`;
  spawnSync(command, { cwd: PATHS.ROOT });
})();
