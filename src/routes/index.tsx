import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, Wrench, Fuel, ShieldCheck, Star, Instagram, Facebook, Phone } from "lucide-react";
import heroImg from "@/assets/hero-tuning.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TuningCalculator } from "@/components/site/TuningCalculator";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const title = "Tuning Center Örebro — Motoroptimering & Chiptuning";
const description =
  "Professionell motoroptimering, chiptuning och prestandaservice i Örebro. Räkna ut din effektökning direkt med vår tuningkalkylator.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const services = [
  { icon: Gauge, title: "Motoroptimering", text: "Steg 1 & steg 2 med mjukvara anpassad efter din bil och körstil." },
  { icon: Fuel, title: "Bränslebesparing", text: "Ekonomifiler som sänker förbrukningen på lastbilar och personbilar." },
  { icon: Wrench, title: "Felkodsläsning", text: "Diagnos, felsökning och radering av felkoder på plats i Örebro." },
  { icon: ShieldCheck, title: "DPF / EGR-service", text: "Rengöring och åtgärder för partikelfilter och avgasåterföring." },
];

const reviews = [
  { name: "Marcus L.", text: "Otroligt nöjd med steg 1 på min Golf. Märkbar skillnad direkt och grym service.", stars: 5 },
  { name: "Sanna K.", text: "Snabb bokning, tydlig förklaring och bra pris. Rekommenderas varmt!", stars: 5 },
  { name: "Ali H.", text: "Bästa stället i Örebro för tuning. Bilen går som en helt annan bil nu.", stars: 5 },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden">
          <img
            src={heroImg}
            alt="Tunad sportbil i verkstad hos Tuning Center Örebro"
            width={1920}
            height={1088}
            className="absolute inset-0 -z-10 size-full object-cover opacity-45"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Örebro</p>
            <h1 className="mt-4 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
              Mer effekt. <span className="text-heat">Bättre körkänsla.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Vi optimerar bensin- och dieselbilar med skräddarsydd mjukvara. Räkna ut din
              effektökning på sekunder och boka tid direkt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-heat text-primary-foreground shadow-heat">
                <Link to="/kalkylator">Testa tuningkalkylatorn</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${SITE.phone}`}>
                  <Phone className="mr-2 size-4" /> {SITE.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border px-4 md:grid-cols-4">
            {[
              ["1000+", "Optimerade bilar"],
              ["+25%", "Snitt effektökning"],
              ["5.0", "Snittbetyg"],
              ["1 dag", "Vanlig leveranstid"],
            ].map(([v, l]) => (
              <div key={l} className="px-4 py-8 text-center">
                <p className="font-display text-3xl text-heat">{v}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl md:text-4xl">Våra tjänster</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/60">
                <s.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="link" className="mt-4 px-0 text-primary">
            <Link to="/tjanster">Se alla tjänster →</Link>
          </Button>
        </section>

        <section className="grid-lines border-y border-border">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-3xl md:text-4xl">Räkna ut din effekt</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Välj bil och steg — vi visar uppskattad effekt och vridmoment efter optimering.
            </p>
            <div className="mt-8">
              <TuningCalculator />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl md:text-4xl">Recensioner</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-xl border border-border bg-surface p-6">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-muted-foreground">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14">
            <div>
              <h2 className="text-3xl">Följ bygget på sociala medier</h2>
              <p className="mt-2 text-muted-foreground">Dagliga uppdateringar från verkstaden.</p>
            </div>
            <div className="flex gap-3">
              <Button asChild size="lg" className="bg-heat text-primary-foreground">
                <a href={SITE.instagram} target="_blank" rel="noreferrer">
                  <Instagram className="mr-2 size-4" /> Instagram
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={SITE.facebook} target="_blank" rel="noreferrer">
                  <Facebook className="mr-2 size-4" /> Facebook
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
