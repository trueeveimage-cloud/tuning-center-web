import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Hem" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/kalkylator", label: "Tuningkalkylator" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-7 w-1.5 rounded-full bg-heat" />
          <span className="font-display text-xl leading-none tracking-wide">
            Tuning Center <span className="text-heat">Örebro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden bg-heat text-primary-foreground sm:inline-flex">
            <a href={`tel:${SITE.phone}`}>
              <Phone className="mr-1 size-4" /> {SITE.phoneDisplay}
            </a>
          </Button>
          <button
            type="button"
            aria-label="Meny"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm uppercase tracking-wide text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
