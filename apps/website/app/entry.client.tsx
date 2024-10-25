import { createCache, StyleProvider } from "@ant-design/cssinjs";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  const cache = createCache();
  hydrateRoot(
    document,
    <StrictMode>
      <StyleProvider cache={cache}>
        <RemixBrowser />
      </StyleProvider>
    </StrictMode>
  );
});
