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
      className={`sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-2xl transition-shadow duration-500 ${scrolled ? "shadow-[0_14px_36px_-26px_rgba(41,32,24,.45)]" : ""}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-500 sm:px-6 ${scrolled ? "h-16" : "h-[4.5rem]"}`}
      >
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${SITE.name}, startsida`}
        >
          <BrandLogo className="max-w-[13rem] transition-transform duration-300 group-hover:scale-[1.02] sm:max-w-none" />
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-border/70 bg-surface/70 px-1.5 py-1 shadow-[0_10px_28px_-26px_rgba(41,32,24,.6)] lg:flex"
          aria-label="Huvudnavigation"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-surface-2/70 hover:text-foreground"
              activeProps={{
                className: "bg-primary/12 text-primary hover:bg-primary/12 hover:text-primary",
              }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-heat px-5 font-semibold shadow-heat sm:inline-flex"
          >
            <Link to="/kontakt">
              <MessageSquareText /> Kontakta oss
            </Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
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
            <Button asChild className="mt-4 w-full rounded-full bg-heat font-semibold">
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
