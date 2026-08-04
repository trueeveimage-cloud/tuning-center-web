import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Disc3,
  Fuel,
  Gauge,
  Settings2,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";

const title = "Tjänster | Bilservice & motoroptimering i Kumla";
const description =
  "Bromsar, elsystem, programmering, chiptuning, DPF- och EGR-service samt motoroptimering steg 1–3 i Kumla.";

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
    title: "Steg 1 optimering",
    text: "Optimerad mjukvara på originalhårdvara. Mer effekt, bättre gasrespons och en körkänsla som märks direkt.",
    note: "För originalbilar",
  },
  {
    icon: Settings2,
    number: "02",
    title: "Steg 2 optimering",
    text: "För bilar med uppgraderad hårdvara, exempelvis downpipe eller intercooler, där vi tar nästa steg i prestanda.",
    note: "För uppgraderade bilar",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Steg 3 optimering",
    text: "Individuellt upplägg för mer omfattande motorbyggen med uppgraderad turbo, bränslesystem och kringutrustning.",
    note: "För specialbyggen",
  },
  {
    icon: Fuel,
    number: "04",
    title: "Ekonomifil",
    text: "Mjukvara med fokus på vridmoment och lägre förbrukning vid normal, blandad körning.",
    note: "Effektivare vardag",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "DPF & EGR-service",
    text: "Felsökning, rengöring och service av partikelfilter och EGR-system.",
    note: "Diagnos & service",
  },
  {
    icon: Wrench,
    number: "06",
    title: "Diagnos & felkoder",
    text: "Läsning och tolkning av felkoder med professionell utrustning och tydlig återkoppling.",
    note: "Hitta grundorsaken",
  },
  {
    icon: Truck,
    number: "07",
    title: "Lastbil & entreprenad",
    text: "Optimering av tunga fordon för bättre dragkraft och lägre dieselförbrukning.",
    note: "Tunga fordon",
  },
  {
    icon: Disc3,
    number: "08",
    title: "Bromsservice",
    text: "Kontroll, felsökning och service av bromssystem för en trygg och konsekvent bromsverkan.",
    note: "Säkerhet & underhåll",
  },
  {
    icon: Zap,
    number: "09",
    title: "Elsystem & programmering",
    text: "Felsökning av elsystem, styrenheter och fordonsmjukvara samt programmering efter bilens behov.",
    note: "Elektronik & mjukvara",
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
              Från smidigare vardagskörning till mer målmedveten prestanda. Vi utgår från din bil,
              dina mål och bilens tekniska förutsättningar.
            </p>
          </div>
        </section>

        <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative min-h-80 border-b border-r border-border bg-surface/55 p-7 transition-colors hover:bg-surface-2/55"
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
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-heat transition-all duration-300 group-hover:w-full" />
              </article>
            ))}
          </div>
        </section>

        <section className="scroll-reveal border-y border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
            <div>
              <p className="section-kicker">Osäker på vad bilen behöver?</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Börja med en snabb uppskattning.</h2>
            </div>
            <Button asChild size="lg" className="h-12 bg-heat px-7 font-semibold shadow-heat">
              <Link to="/kalkylator">
                Öppna kalkylatorn <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
