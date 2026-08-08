import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-8xl font-bold text-heat">404</p>
        <h1 className="mt-4 text-2xl">Sidan hittades inte</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sidan du söker finns inte eller har flyttats.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex bg-heat px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Till startsidan
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">Sidan kunde inte laddas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Något gick fel. Försök igen eller gå tillbaka till startsidan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-heat px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Försök igen
          </button>
          <a
            href="/"
            className="border border-input bg-background px-5 py-2.5 text-sm font-semibold"
          >
            Till startsidan
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tuning Center Örebro" },
      {
        name: "description",
        content: "Motoroptimering, bilservice och programmering i Kumla nära Örebro.",
      },
      { name: "author", content: "Tuning Center Örebro" },
      { name: "theme-color", content: "#faf7ef" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Tuning Center Örebro" },
      { name: "twitter:title", content: "Tuning Center Örebro" },
      {
        property: "og:description",
        content: "Motoroptimering, bilservice och programmering i Kumla nära Örebro.",
      },
      {
        name: "twitter:description",
        content: "Motoroptimering, bilservice och programmering i Kumla nära Örebro.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7e447ddf-1eff-44bf-b3cd-112af84ef589/id-preview-67aa871d--76b241b6-8f59-42c7-8637-bdd59f89928a.lovable.app-1785875494256.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7e447ddf-1eff-44bf-b3cd-112af84ef589/id-preview-67aa871d--76b241b6-8f59-42c7-8637-bdd59f89928a.lovable.app-1785875494256.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/tuning-center-logo.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/tuning-center-logo.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
