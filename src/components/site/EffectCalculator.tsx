import { useState } from "react";
import { Database, Gauge } from "lucide-react";
import { TuningCalculator } from "@/components/site/TuningCalculator";

const drFileLicense = import.meta.env['VITE_DR_FILE_LICENSE']?.trim();

type Source = "internal" | "byteflash";

export function EffectCalculator() {
  const [source, setSource] = useState<Source>("internal");

  const tabs: Array<{ id: Source; label: string; hint: string }> = [
    { id: "internal", label: "Tuning Center-kalkylator", hint: "Regnummer + manuellt val" },
    { id: "byteflash", label: "ByteFLASH live-databas", hint: "Extern databas" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface/80 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="grid grid-cols-2 gap-2 sm:inline-flex"
          role="tablist"
          aria-label="Välj datakälla"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={source === tab.id}
              onClick={() => setSource(tab.id)}
              className={`rounded-lg px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.12em] transition-colors sm:text-center ${
                source === tab.id
                  ? "bg-primary/12 text-primary ring-1 ring-primary/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className="mt-0.5 block text-[0.6rem] font-medium normal-case tracking-normal text-muted-foreground">
                {tab.hint}
              </span>
            </button>
          ))}
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          {source === "internal" ? (
            <Gauge className="size-4 shrink-0 text-primary" />
          ) : (
            <Database className="size-4 shrink-0 text-primary" />
          )}
          Aktiv datakälla:{" "}
          <strong className="font-semibold text-foreground">
            {source === "internal"
              ? "Tuning Center (egen beräkning)"
              : "ByteFLASH (extern live-databas)"}
          </strong>
        </p>
      </div>

      {source === "internal" ? (
        <>
          <TuningCalculator />
          {drFileLicense && <DrFileFrame license={drFileLicense} />}
        </>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_70px_-45px_rgba(41,32,24,.35)]">
          <div className="border-b border-border px-5 py-4 sm:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Extern live-databas
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Widgeten nedan levereras och driftas av ByteFLASH. Uppgifterna hämtas direkt från
              deras databas – Tuning Center Örebro ansvarar inte för innehållet och lagrar ingen
              data därifrån.
            </p>
          </div>
          <iframe
            title="ByteFLASH effektkalkylator"
            src="https://widget.byteflash.dev/"
            allowTransparency
            frameBorder="0"
            width="100%"
            height="420"
            className="block w-full border-0 bg-surface"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}

      <p className="rounded-xl border border-border bg-surface/70 px-5 py-4 text-xs leading-6 text-muted-foreground">
        <strong className="font-semibold text-foreground">Observera:</strong> Alla hk- och
        Nm-värden är uppskattningar. Faktiskt resultat varierar beroende på bilens skick, bränsle,
        hårdvara, mjukvaruversion och mätmetod. Slutliga värden måste alltid verifieras med loggning
        och/eller mätning i bromsbänk (dyno).
      </p>
    </div>
  );
}

function DrFileFrame({ license }: { license: string }) {
  const params = new URLSearchParams({
    lic: license,
    origin: "dr-file.de",
    theme: "custom",
    lang: "sv",
    bg: "#faf7ef",
    text: "#2a241f",
    accent: "#f0782b",
    pulse: "#f0782b",
    pulseOff: "0",
    dyno: "0",
    dynoBg: "#f2ede3",
    dynoText: "#2a241f",
    dynoAccent: "#f0782b",
  });

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_70px_-45px_rgba(41,32,24,.35)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Fordonskonfigurator
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Välj bil och motor för verifierade värden, ECU och tillgängliga lösningar.
          </p>
        </div>
        <span className="font-display text-3xl text-foreground/15">DR</span>
      </div>
      <iframe
        title="Beräkna effekt med DR-File"
        src={`https://konf.dr-file.de/index.php?${params.toString()}`}
        className="block min-h-[58rem] w-full border-0 bg-[#faf7ef] sm:min-h-[52rem]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
