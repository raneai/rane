import {
  createCache,
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { version } from "../package.json";

export const loader = (params: LoaderFunctionArgs) => {
  return {
    version,
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { version } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {version && <div id="version">{version}</div>}
      </body>
    </html>
  );
}

export default function App() {
  const cache = createCache();
  return (
    <StyleProvider
      transformers={[legacyLogicalPropertiesTransformer]}
      cache={cache}
    >
      <Outlet />
    </StyleProvider>
  );
}
