import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const title = "Kontakta oss | Tuning Center Örebro";
const description =
  "Skicka ett mail till Tuning Center Örebro för bokning, service och motoroptimering eller besök oss på Ymergatan 3A i Kumla.";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tuningcenterorebro.se/kontakt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://tuningcenterorebro.se/kontakt" }],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      namn: String(data.get("namn") || ""),
      telefon: String(data.get("telefon") || ""),
      epost: String(data.get("epost") || ""),
      regnummer: String(data.get("regnummer") || "").toUpperCase(),
      bil: String(data.get("bil") || ""),
      meddelande: String(data.get("meddelande") || ""),
      webbplats: String(data.get("webbplats") || ""),
    };

    setSending(true);
    try {
      const res = await fetch("/api/public/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setSent(true);
      form.reset();
      toast.success("Tack! Din förfrågan är skickad", {
        description: "Vi återkommer så snart vi kan.",
      });
    } catch {
      toast.error("Kunde inte skicka just nu", {
        description: `Ring ${SITE.phoneDisplay} eller mejla ${SITE.email}.`,
      });
    } finally {
      setSending(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="grid-lines border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
            <p className="section-kicker">
              <span className="h-px w-8 bg-primary" /> Kontakt
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl leading-[0.95] sm:text-5xl">
              Låt oss prata <span className="text-heat">om din bil.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Berätta vad du kör och vad du vill uppnå. Vi återkommer med ett tydligt förslag på
              nästa steg.
            </p>
          </div>
        </section>

        <section className="scroll-reveal mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.22fr_0.78fr]">
          <div className="order-2">
            <h2 className="text-3xl">Skicka ett mail</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Maila registreringsnummer och vad du vill ha hjälp med så återkommer vi så snart vi
              kan.
            </p>
            <div className="mt-7 border-t border-border">
              <ContactLink
                icon={Mail}
                label="Skicka ett mail"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
              />
              <ContactLink
                icon={Phone}
                label="Telefon"
                value={SITE.phoneDisplay}
                href={`tel:${SITE.phone}`}
              />
              <a
                href={SITE.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-4 border-b border-border py-5"
              >
                <span className="grid size-10 shrink-0 place-items-center bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <div className="flex-1">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Besöksadress
                  </p>
                  <p className="mt-1 font-medium group-hover:text-primary">
                    {SITE.address}
                    <br />
                    {SITE.postalCity}
                  </p>
                </div>
                <ArrowRight className="size-4 self-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </a>
              <div className="flex gap-4 border-b border-border py-5">
                <span className="grid size-10 shrink-0 place-items-center bg-primary/10 text-primary">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Öppettider
                  </p>
                  <p className="mt-1 font-medium">Mån–fre 07–20 · Lör 09–18</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <Button asChild variant="outline" size="icon">
                <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon">
                <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook />
                </a>
              </Button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}

            className="premium-panel relative order-1 overflow-hidden p-6 sm:p-8"
          >
            <span className="absolute left-0 top-0 h-1 w-20 bg-heat" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Offertförfrågan</p>
                <h2 className="mt-2 text-3xl">Vad kan vi hjälpa dig med?</h2>
              </div>
              <span className="font-display text-4xl text-foreground/10">01</span>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <FormField name="namn" label="Namn" placeholder="Ditt namn" required />
              <FormField
                name="telefon"
                label="Telefon"
                placeholder="070 000 00 00"
                type="tel"
                required
              />
              <FormField
                name="epost"
                label="E-post"
                placeholder="din@mail.se"
                type="email"
              />
              <FormField
                name="regnummer"
                label="Registreringsnummer *"
                placeholder="ABC12X"
                required
              />
              <div className="sm:col-span-2">
                <FormField
                  name="bil"
                  label="Bilmodell & årsmodell"
                  placeholder="Exempel: BMW 320d, 2018"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="meddelande"
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Meddelande
                </label>
                <textarea
                  id="meddelande"
                  name="meddelande"
                  rows={5}
                  placeholder="Berätta gärna om bilen och vad du vill uppnå..."
                  className="w-full resize-y border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/55 focus:border-primary"
                />
              </div>
              <input
                type="text"
                name="webbplats"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                type="submit"
                disabled={sending}
                className="h-12 bg-heat font-semibold shadow-heat sm:px-8"
              >
                {sending ? "Skickar..." : "Skicka förfrågan"} <ArrowRight />
              </Button>
              <Button asChild type="button" variant="ghost" className="h-12">
                <a href={`tel:${SITE.phone}`}>
                  <Phone /> {SITE.phoneDisplay}
                </a>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {sent
                ? `Tack! Din förfrågan är skickad till ${SITE.email}. Vi hör av oss.`
                : `Registreringsnummer är obligatoriskt så vi kan ta fram rätt uppgifter för din bil.`}
            </p>

          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-4 border-b border-border py-5">
      <span className="grid size-10 shrink-0 place-items-center bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate font-medium group-hover:text-primary">{value}</p>
      </div>
      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </a>
  );
}

function FormField({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full border border-input bg-background px-4 text-sm outline-none placeholder:text-muted-foreground/55 focus:border-primary"
      />
    </div>
  );
}
