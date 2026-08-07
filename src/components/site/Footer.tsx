import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { BrandLogo } from "@/components/site/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-[#1F2937] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo variant="footer" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Skräddarsydd motoroptimering för mer effekt, bättre respons och en körkänsla som märks
            direkt.
          </p>
          <Link
            to="/kalkylator"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-300 hover:text-white"
          >
            Beräkna effekt <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-base text-white">Kontakt</h3>
          <a
            className="flex items-center gap-3 text-slate-300 hover:text-white"
            href={`tel:${SITE.phone}`}
          >
            <Phone className="size-4 text-blue-300" /> {SITE.phoneDisplay}
          </a>
          <a
            className="flex items-center gap-3 text-slate-300 hover:text-white"
            href={`mailto:${SITE.email}`}
          >
            <Mail className="size-4 text-blue-300" /> {SITE.email}
          </a>
          <a
            className="flex items-start gap-3 text-slate-300 hover:text-white"
            href={SITE.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin className="mt-0.5 size-4 text-blue-300" />
            <span>
              {SITE.address}
              <br />
              {SITE.postalCity}
            </span>
          </a>
          <p className="text-xs text-slate-400">Mån–fre 07–20 · Lör 09–18</p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="text-base text-white">Följ verkstaden</h3>
          <a
            className="flex items-center gap-3 text-slate-300 hover:text-white"
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="size-4 text-blue-300" /> {SITE.instagramHandle}
          </a>
          <a
            className="flex items-center gap-3 text-slate-300 hover:text-white"
            href={SITE.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="size-4 text-blue-300" /> {SITE.facebookHandle}
          </a>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-slate-400 sm:px-6">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Motoroptimering i Kumla</span>
        </div>
      </div>
    </footer>
  );
}
