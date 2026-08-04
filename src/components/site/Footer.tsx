import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="text-lg">Tuning Center Örebro</h3>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Motoroptimering, chiptuning och prestandaservice för bensin- och dieselbilar.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="text-base">Kontakt</h4>
          <a className="flex items-center gap-2 text-muted-foreground hover:text-foreground" href={`tel:${SITE.phone}`}>
            <Phone className="size-4 text-primary" /> {SITE.phoneDisplay}
          </a>
          <a className="flex items-center gap-2 text-muted-foreground hover:text-foreground" href={`mailto:${SITE.email}`}>
            <Mail className="size-4 text-primary" /> {SITE.email}
          </a>
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4 text-primary" /> Örebro, Sverige
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="text-base">Följ oss</h4>
          <a
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="size-4 text-primary" /> {SITE.instagramHandle}
          </a>
          <a
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            href={SITE.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="size-4 text-primary" /> {SITE.facebookHandle}
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Tuning Center Örebro. Alla rättigheter förbehållna.
      </div>
    </footer>
  );
}
