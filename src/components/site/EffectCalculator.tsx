import { TuningCalculator } from "@/components/site/TuningCalculator";

const drFileLicense = import.meta.env.VITE_DR_FILE_LICENSE?.trim();

export function EffectCalculator() {
  if (!drFileLicense) return <TuningCalculator />;

  const params = new URLSearchParams({
    lic: drFileLicense,
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
    <div className="overflow-hidden border border-border bg-surface shadow-[0_24px_70px_-45px_rgba(41,32,24,.35)]">
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
