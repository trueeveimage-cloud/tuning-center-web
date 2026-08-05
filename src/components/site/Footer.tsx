import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#12110f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 -skew-x-12 bg-heat" />
            <h2 className="text-2xl">
              Tuning Center <span className="text-primary">Örebro</span>
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Skräddarsydd motoroptimering för mer effekt, bättre respons och en körkänsla som märks
            direkt.
          </p>
          <Link
            to="/kalkylator"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary hover:text-foreground"
          >
            Beräkna effekt <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-base">Kontakt</h3>
          <a
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
            href={`tel:${SITE.phone}`}
          >
            <Phone className="size-4 text-primary" /> {SITE.phoneDisplay}
          </a>
          <a
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
            href={`mailto:${SITE.email}`}
          >
            <Mail className="size-4 text-primary" /> {SITE.email}
          </a>
          <a
            className="flex items-start gap-3 text-muted-foreground hover:text-foreground"
            href={SITE.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin className="mt-0.5 size-4 text-primary" />
            <span>
              {SITE.address}
              <br />
              {SITE.postalCity}
            </span>
          </a>
          <p className="text-xs text-muted-foreground">Mån–fre 07–20 · Lör 09–18</p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-base">Följ verkstaden</h3>
          <a
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="size-4 text-primary" /> {SITE.instagramHandle}
          </a>
          <a
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
            href={SITE.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="size-4 text-primary" /> {SITE.facebookHandle}
          </a>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:px-6">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Motoroptimering i Kumla</span>
        </div>
      </div>
    </footer>
  );
}
