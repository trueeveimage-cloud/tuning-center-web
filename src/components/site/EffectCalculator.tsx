import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Gauge, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALCULATOR_WIDGET_URL = "https://widget.byteflash.dev/";

export function EffectCalculator() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/kalkylator") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_24px_70px_-48px_rgba(41,32,24,.55)] sm:p-8">
        <p className="section-kicker">
          <Gauge className="size-4" /> En gemensam kalkylator
        </p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h3 className="text-3xl sm:text-4xl">Aktuella värden på ett ställe.</h3>
            <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
              Öppna Tuning Centers effektkalkylator och välj bil och motor för aktuella
              originalvärden och Stage 1-potential.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-heat px-7 font-semibold shadow-heat"
          >
            <Link to="/kalkylator">
              Öppna kalkylatorn <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_28px_80px_-48px_rgba(41,32,24,.55)]">
      <div className="grid gap-5 border-b border-border px-5 py-5 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="section-kicker">
            <Gauge className="size-4" /> Tuning Center effektkalkylator
          </p>
          <h3 className="mt-2 text-2xl sm:text-3xl">Välj din bil och se Stage 1-potentialen.</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Välj märke, modell och motor för att se aktuella originalvärden, hästkrafter,
            vridmoment och uppskattad Stage 1-potential.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-2 text-xs font-semibold text-primary">
          <ShieldCheck className="size-4" /> Live-data · Stage 1
        </span>
      </div>

      <iframe
        title="Tuning Center effektkalkylator"
        src={CALCULATOR_WIDGET_URL}
        allowTransparency
        frameBorder="0"
        width="100%"
        height="430"
        className="block min-h-[430px] w-full border-0 bg-surface"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      <div className="border-t border-border bg-background/55 px-5 py-4 sm:px-7">
        <p className="text-xs leading-6 text-muted-foreground">
          <strong className="font-semibold text-foreground">Observera:</strong> Värdena är
          uppskattningar och kan variera beroende på bilens skick, bränsle, hårdvara,
          mjukvaruversion och mätmetod. Slutligt resultat verifieras med loggning eller bromsbänk.
          Resultaten är vägledande och ersätter inte en individuell kontroll av bilen.
        </p>
      </div>
    </div>
  );
}
