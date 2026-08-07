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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      const response = await fetch("/api/public/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namn: String(data.get("namn") ?? ""),
          telefon: String(data.get("telefon") ?? ""),
          epost: String(data.get("epost") ?? ""),
          bil: String(data.get("bil") ?? ""),
          meddelande: String(data.get("meddelande") ?? ""),
          webbplats: String(data.get("webbplats") ?? ""),
        }),
      });
      if (!response.ok) throw new Error("send failed");
      setSent(true);
      form.reset();
      toast.success("Tack! Din förfrågan är skickad", {
        description: "Vi återkommer så snart vi kan.",
      });
    } catch {
      toast.error("Något gick fel", {
        description: `Mejla oss direkt på ${SITE.email} eller ring ${SITE.phoneDisplay}.`,
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
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="section-kicker">
              <span className="h-px w-8 bg-primary" /> Kontakt
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl leading-[0.9] sm:text-7xl">
              Låt oss prata
              <br />
              <span className="text-heat">om din bil.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Berätta vad du kör och vad du vill uppnå. Vi återkommer med ett tydligt förslag på
              nästa steg.
            </p>
          </div>
        </section>

        <section className="scroll-reveal mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
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

            <div className="mt-8 border border-border bg-surface/60 p-5">
              <h3 className="text-xl">Veckans öppettider</h3>
              <dl className="mt-4 space-y-2 text-sm">
                {SITE.hours.map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-muted-foreground">{day}</dt>
                    <dd
                      className={
                        hours === "Stängt"
                          ? "text-muted-foreground"
                          : "font-semibold text-foreground"
                      }
                    >
                      {hours}
                    </dd>
                  </div>
                ))}
              </dl>
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

            className="relative border border-border bg-surface p-6 sm:p-8"
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
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="submit" className="h-12 bg-heat font-semibold shadow-heat sm:px-8">
                Skicka förfrågan <ArrowRight />
              </Button>
              <Button asChild type="button" variant="ghost" className="h-12">
                <a href={`mailto:${SITE.email}`}>
                  <Mail /> {SITE.email}
                </a>
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              {sent
                ? `Öppnades inget e-postprogram? Mejla oss direkt på ${SITE.email} eller ring ${SITE.phoneDisplay}.`
                : `Knappen öppnar ditt e-postprogram med uppgifterna ifyllda till ${SITE.email}.`}
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
