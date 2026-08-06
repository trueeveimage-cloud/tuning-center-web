import { Link } from "@tanstack/react-router";
import { Menu, MessageSquareText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/site/BrandLogo";
import { SITE } from "@/lib/site";

const links = [
  { to: "/", label: "Hem" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kalkylator", label: "Beräkna effekt" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
      setScrolled(window.scrollY > 18);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl transition-shadow duration-500 ${scrolled ? "shadow-[0_16px_40px_-28px_rgba(41,32,24,.35)]" : ""}`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label={`${SITE.name}, startsida`}
        >
          <BrandLogo className="transition-transform duration-300 group-hover:scale-[1.02]" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Huvudnavigation">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors after:absolute after:inset-x-4 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
              activeProps={{
                className:
                  "text-foreground after:absolute after:inset-x-4 after:-bottom-[1.1rem] after:h-0.5 after:bg-primary",
              }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden bg-heat font-semibold shadow-heat sm:inline-flex">
            <Link to="/kontakt">
              <MessageSquareText /> Kontakta oss
            </Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center border border-border bg-surface text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="animate-in slide-in-from-top-2 border-t border-border bg-surface px-4 py-4 duration-300 lg:hidden"
          aria-label="Mobilnavigation"
        >
          <div className="mx-auto max-w-7xl">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border/60 py-3 font-display text-xl uppercase tracking-wide text-muted-foreground"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
                <span className="text-sm">↗</span>
              </Link>
            ))}
            <Button asChild className="mt-4 w-full bg-heat font-semibold">
              <Link to="/kontakt">
                <MessageSquareText /> Kontakta oss
              </Link>
            </Button>
          </div>
        </nav>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-heat transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </header>
  );
}
