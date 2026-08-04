import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TuningCalculator } from "@/components/site/TuningCalculator";

const title = "Tuningkalkylator | Tuning Center Örebro";
const description =
  "Beräkna hästkrafter och vridmoment efter steg 1 eller steg 2 motoroptimering. Välj märke, modell och motor.";

export const Route = createFileRoute("/kalkylator")({
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
  component: KalkylatorPage,
});

function KalkylatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="grid-lines border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="section-kicker">
              <span className="h-px w-8 bg-primary" /> Tuningkalkylator
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <h1 className="text-5xl leading-[0.9] sm:text-7xl">
                Se potentialen
                <br />
                <span className="text-heat">i din bil.</span>
              </h1>
              <div>
                <p className="leading-7 text-muted-foreground">
                  Välj din bil för en snabb uppskattning. Hittar du inte rätt modell eller motor tar
                  vi gärna fram siffrorna åt dig.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-wider text-foreground/65">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" /> Kostnadsfritt
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" /> Svar direkt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="scroll-reveal mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <TuningCalculator />
        </section>
      </main>
      <Footer />
    </div>
  );
}
