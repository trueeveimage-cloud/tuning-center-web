import { Link, useRouterState } from "@tanstack/react-router";
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
  const location = useRouterState({ select: (state) => state.location });

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

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-[#1F2937]/[.97] text-white backdrop-blur-2xl transition-all duration-500 ${scrolled ? "shadow-[0_18px_55px_-32px_rgba(15,23,42,.8)]" : ""}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-500 sm:px-6 ${scrolled ? "h-[4.25rem]" : "h-[4.75rem]"}`}
      >
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label={`${SITE.name}, startsida`}
        >
          <BrandLogo className="transition-transform duration-300 group-hover:scale-[1.02]" />
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 shadow-sm lg:flex"
          aria-label="Huvudnavigation"
        >
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden bg-primary font-semibold shadow-heat hover:bg-blue-500 sm:inline-flex"
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
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm hover:border-white/30 hover:bg-white/15 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="absolute inset-x-0 top-full animate-in slide-in-from-top-2 border-t border-white/10 bg-[#1F2937]/[.99] px-4 pb-6 pt-3 shadow-[0_30px_70px_-35px_rgba(15,23,42,.95)] backdrop-blur-2xl duration-300 lg:hidden"
          aria-label="Mobilnavigation"
        >
          <div className="mx-auto max-w-7xl">
            {links.map((link) => {
              const hash = "hash" in link ? link.hash : undefined;
              const active =
                location.pathname === link.to && (!hash || location.hash === `#${hash}`);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={hash}
                  activeOptions={{ exact: link.to === "/", includeHash: Boolean(hash) }}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-white/10 py-3 font-display text-xl uppercase tracking-wide ${active ? "text-blue-300" : "text-slate-200 hover:text-white"}`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`h-px bg-blue-400 transition-all ${active ? "w-10" : "w-6 opacity-55"}`}
                  />
                </Link>
              );
            })}
            <Button asChild className="mt-4 w-full bg-primary font-semibold hover:bg-blue-500">
              <Link to="/kontakt">
                <MessageSquareText /> Kontakta oss
              </Link>
            </Button>
          </div>
        </nav>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-primary transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </header>
  );
}
