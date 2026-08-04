import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TuningCalculator } from "@/components/site/TuningCalculator";

const title = "Tuningkalkylator — Tuning Center Örebro";
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
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl">Tuningkalkylator</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Se vad din bil kan prestera efter motoroptimering hos oss i Örebro. Hittar du inte din
          bil? Hör av dig så tar vi fram siffrorna åt dig.
        </p>
        <div className="mt-8">
          <TuningCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
