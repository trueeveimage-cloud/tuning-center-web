import { Gauge, ShieldCheck } from "lucide-react";

const CALCULATOR_WIDGET_URL = "https://widget.byteflash.dev/";

export function EffectCalculator() {
  return (
    <div className="premium-panel overflow-hidden">
      <div className="grid gap-5 border-b border-border px-5 py-5 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="section-kicker">
            <Gauge className="size-4" /> Tuning Center effektkalkylator
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl">Välj din bil och se Stage 1-potentialen.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Välj märke, modell, årsmodell och motor för att se aktuella originalvärden, hästkrafter,
            vridmoment och uppskattad effekt efter optimering.
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
        height="520"
        className="block min-h-[520px] w-full border-0 bg-white"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      <div className="border-t border-border bg-background/70 px-5 py-4 sm:px-7">
        <p className="text-xs leading-6 text-muted-foreground">
          <strong className="font-semibold text-foreground">Observera:</strong> Värdena är
          uppskattningar och kan variera beroende på bilens skick, bränsle, hårdvara,
          mjukvaruversion och mätmetod. Slutligt resultat verifieras med loggning eller bromsbänk.
        </p>
      </div>
    </div>
  );
}
