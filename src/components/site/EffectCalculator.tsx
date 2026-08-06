import { Database, ShieldCheck } from "lucide-react";

const BYTEFLASH_WIDGET_URL = "https://widget.byteflash.dev/";

export function EffectCalculator() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_28px_80px_-48px_rgba(41,32,24,.55)]">
      <div className="grid gap-5 border-b border-border px-5 py-5 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="section-kicker">
            <Database className="size-4" /> Tuning Center effektdata
          </p>
          <h3 className="mt-2 text-2xl sm:text-3xl">Välj din bil och se Stage 1-potentialen.</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            En gemensam kalkylator med aktuella originalvärden, hästkrafter och vridmoment direkt
            från ByteFLASH fordonsdatabas.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-2 text-xs font-semibold text-primary">
          <ShieldCheck className="size-4" /> Live-data · Stage 1
        </span>
      </div>

      <iframe
        title="Tuning Center effektkalkylator med ByteFLASH-data"
        src={BYTEFLASH_WIDGET_URL}
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
          Fordonsdata levereras live av ByteFLASH och lagras inte av Tuning Center Örebro.
        </p>
      </div>
    </div>
  );
}
