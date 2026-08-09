import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Gauge,
  Laptop,
  ScanLine,
  Settings2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";

const title = "Om oss | Tuning Center Örebro";
const description =
  "Så arbetar Tuning Center Örebro med hälsokontroll, motoroptimering, testning, loggning och kvalitetssäkring i Kumla.";

export const Route = createFileRoute("/om-oss")({
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
  component: OmOssPage,
});

const processSteps = [
  {
    icon: ScanLine,
    number: "01",
    title: "Hälsokontroll",
    text: "Vi läser ut eventuella felkoder och kontrollerar bilens status. Loggar och felkoder sparas och utvärderas för att skapa rätt utgångsläge.",
  },
  {
    icon: Settings2,
    number: "02",
    title: "Optimering",
    text: "Originalprogramvaran läses ut och justeringar anpassas efter bilens motor, växellåda, hårdvara och resultatet från hälsokontrollen.",
  },
  {
    icon: Activity,
    number: "03",
    title: "Testning & loggning",
    text: "Bilen testas och relevanta motor- och växellådsvärden loggas. Resultaten används för att finjustera optimeringen efter bilen.",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Kvalitetskontroll",
    text: "Vi granskar resultaten och upprepar vid behov processen tills värdena ser rätt ut och bilen fungerar som den ska.",
  },
  {
    icon: Gauge,
    number: "05",
    title: "Resultatkontroll",
    text: "Originalvärden jämförs med de optimerade värdena genom loggning och mätning, så att förändringen kan verifieras tydligt.",
  },
  {
    icon: FileCheck2,
    number: "06",
    title: "Dokumentation",
    text: "Originalfil, optimerad programvara och relevanta mätvärden sparas för framtida behov och en transparent historik.",
  },
];

const equipment = [
  {
    icon: Laptop,
    title: "Professionell programvara",
    text: "Vi arbetar med professionella programvarulösningar för att läsa, analysera och anpassa fordonets styrsystem.",
  },
  {
    icon: Wrench,
    title: "Rätt verktyg för bilen",
    text: "Utrustning för diagnos, läsning, skrivning och kodning väljs efter bilmärke, modell och styrenhet.",
  },
  {
    icon: ShieldCheck,
    title: "Kvalitetssäkring",
    text: "Varje arbete utförs med fokus på driftsäkerhet, tydlig kontroll och bästa möjliga resultat inom bilens förutsättningar.",
  },
];

function OmOssPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="grid-lines relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-primary/6" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="section-kicker">
              <span className="h-px w-8 bg-primary" /> Om oss
            </p>
            <h1 className="mt-4 max-w-5xl text-5xl leading-[0.9] sm:text-7xl">
              Ett noggrant arbete.
              <br />
              <span className="text-heat">Ett resultat som håller.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              På Tuning Center Örebro kombinerar vi diagnos, loggning och individuellt anpassad
              fordonsmjukvara. Målet är en bil som inte bara känns starkare, utan fungerar rätt som
              helhet.
            </p>
          </div>
        </section>

        <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Vår process</p>
            <h2 className="mt-3 text-4xl leading-none sm:text-5xl">Så går en optimering till.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              En korrekt optimering tar tid. Vi lägger vikt vid att motor och drivlina presterar
              tillsammans och att resultatet kontrolleras innan bilen lämnas tillbaka.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="card-sheen premium-panel group min-h-72 overflow-hidden p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center bg-primary/10 text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <span className="font-display text-3xl text-foreground/15">{step.number}</span>
                </div>
                <h3 className="mt-8 text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scroll-reveal border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="max-w-3xl">
              <p className="section-kicker">Utrustning & kvalitet</p>
              <h2 className="mt-3 text-4xl leading-none sm:text-5xl">
                Professionella verktyg.
                <br />
                <span className="text-heat">Kontrollerade resultat.</span>
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {equipment.map((item) => (
                <article key={item.title} className="card-sheen premium-panel p-7 sm:p-8">
                  <item.icon className="size-7 text-primary" />
                  <h3 className="mt-6 text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid-lines premium-panel flex flex-col items-start justify-between gap-7 p-7 sm:p-10 lg:flex-row lg:items-center">
            <div>
              <p className="section-kicker">Nästa steg</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Vad vill du förbättra på din bil?</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-heat px-7 font-semibold shadow-heat">
                <Link to="/kontakt">
                  Kontakta oss <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7">
                <Link to="/kalkylator">Beräkna effekt</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
