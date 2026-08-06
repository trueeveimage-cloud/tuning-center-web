import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Binary,
  Cable,
  CircuitBoard,
  Code2,
  Gauge,
  Settings2,
  ShieldOff,
  Wrench,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";

const title = "Tjänster | Bilservice & motoroptimering i Kumla";
const description =
  "Motor- och växellådsoptimering, felsökning, kodning, programmering, VAG- och BMW-kodning samt FRM-reparation i Kumla.";

export const Route = createFileRoute("/tjanster")({
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
  component: TjansterPage,
});

const services = [
  {
    icon: Gauge,
    number: "01",
    title: "Motoroptimering",
    text: "Individuellt anpassad ECU-optimering för mer effekt, högre vridmoment och bättre respons med fokus på driftsäkerhet.",
    note: "ECU · Steg 1–3",
  },
  {
    icon: Settings2,
    number: "02",
    title: "Växellådsoptimering",
    text: "TCU- och DSG-optimering för snabbare växlingar, förbättrade växlingspunkter och bättre samspel med motorns vridmoment.",
    note: "TCU · DSG",
  },
  {
    icon: Binary,
    number: "03",
    title: "Felsökning, kodning & programmering",
    text: "Felkodsläsning, diagnos, kodning och programmering av styrenheter med tydlig genomgång av vad vi hittar.",
    note: "Diagnos · Mjukvara",
  },
  {
    icon: ShieldOff,
    number: "04",
    title: "AdBlue / DPF / EGR",
    text: "Felsökning och mjukvarurelaterade åtgärder. Kontakta oss för bedömning av vad som är tekniskt möjligt och tillåtet för fordonets användningsområde.",
    note: "Diagnos · Bedömning",
  },
  {
    icon: Code2,
    number: "05",
    title: "Kodning för VAG",
    text: "Kodning och anpassning för Volkswagen, Audi, Skoda och SEAT, inklusive aktivering av kompatibla fordonsfunktioner.",
    note: "VW · Audi · Skoda · SEAT",
  },
  {
    icon: Cable,
    number: "06",
    title: "Kodning för BMW",
    text: "Märkesspecifik BMW-kodning, programmering och anpassning av kompatibla funktioner och styrenheter.",
    note: "BMW · MINI",
  },
  {
    icon: CircuitBoard,
    number: "07",
    title: "FRM-reparation",
    text: "Diagnos och reparation av BMW:s Footwell Module vid fel på belysning, fönsterhissar och relaterade komfortfunktioner.",
    note: "BMW · Elektronik",
  },
];

function TjansterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="grid-lines relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-primary/5" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="section-kicker">
              <span className="h-px w-8 bg-primary" /> Tjänster
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl leading-[0.9] sm:text-7xl">
              Rätt optimering.
              <br />
              <span className="text-heat">För rätt bil.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Från motor och växellåda till avancerad diagnos, kodning och styrenhetsreparation. Vi
              utgår från din bil, dina mål och bilens tekniska förutsättningar.
            </p>
          </div>
        </section>

        <section className="scroll-reveal mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="grid-lines relative overflow-hidden border border-primary/30 bg-surface p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
            <div className="absolute -right-12 top-0 size-40 bg-primary/10 blur-3xl" />
            <div className="relative">
              <p className="section-kicker">
                <Wrench className="size-4" /> Mekaniskt arbete
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                För mekaniskt arbete, kontakta oss för offert.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                Skicka registreringsnummer och en kort beskrivning av arbetet så återkommer vi med
                bedömning och prisförslag.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="relative mt-6 h-12 bg-heat px-8 font-semibold shadow-heat lg:mt-0"
            >
              <Link to="/kontakt">
                Kontakta oss <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>

        <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="card-premium card-premium-hover card-sheen group min-h-72 p-7"
              >
                <div className="flex items-start justify-between">
                  <service.icon className="size-8 text-primary" />
                  <span className="font-display text-3xl text-foreground/15">{service.number}</span>
                </div>
                <p className="mt-10 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                  {service.note}
                </p>
                <h2 className="mt-3 text-2xl">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scroll-reveal border-y border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
            <div>
              <p className="section-kicker">Nyfiken på bilens potential?</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Beräkna möjlig effekt.</h2>
            </div>
            <Button asChild size="lg" className="h-12 bg-heat px-7 font-semibold shadow-heat">
              <Link to="/kalkylator">
                Beräkna effekt <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
