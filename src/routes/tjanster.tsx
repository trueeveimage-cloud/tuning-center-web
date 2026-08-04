import { createFileRoute } from "@tanstack/react-router";
import { Gauge, Fuel, Wrench, ShieldCheck, Truck, Settings2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const title = "Tjänster — Motoroptimering i Örebro | Tuning Center";
const description =
  "Chiptuning, ekonomifiler, DPF- och EGR-service, felkodsläsning och lastbilsoptimering i Örebro.";

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
  { icon: Gauge, title: "Steg 1 optimering", text: "Optimerad mjukvara på originalhårdvara. Mer effekt, mjukare gasrespons och bibehållen driftsäkerhet." },
  { icon: Settings2, title: "Steg 2 optimering", text: "För bilar med uppgraderad hårdvara som downpipe eller intercooler — maximalt uttag." },
  { icon: Fuel, title: "Ekonomifil", text: "Anpassad mjukvara med fokus på lägre förbrukning i blandad körning." },
  { icon: ShieldCheck, title: "DPF & EGR", text: "Rengöring, felsökning och åtgärder på partikelfilter och EGR-system." },
  { icon: Wrench, title: "Diagnos & felkoder", text: "Läsning, tolkning och radering av felkoder med professionell utrustning." },
  { icon: Truck, title: "Lastbil & entreprenad", text: "Optimering av tunga fordon för bättre dragkraft och lägre dieselförbrukning." },
];

function TjansterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl">Tjänster</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Allt inom motoroptimering och prestanda — utfört av oss i Örebro.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/60">
              <s.icon className="size-6 text-primary" />
              <h2 className="mt-4 text-xl">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
