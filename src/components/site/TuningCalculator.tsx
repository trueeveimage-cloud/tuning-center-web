import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  CheckCircle2,
  CircleHelp,
  CircleX,
  Cpu,
  Gauge,
  Loader2,
  Phone,
  ScanLine,
  Search,
  TrendingUp,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { getTuningCatalog, estimateByRegistration, estimateTuning } from "@/lib/tuning.functions";
import type {
  CapabilityStatus,
  VehicleCapabilities,
  VehicleFeature,
} from "@/lib/vehicle-capabilities.server";
import type { RegistrationLookupResult } from "@/lib/vehicle-lookup.server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE } from "@/lib/site";

type Stage = "stage1" | "stage2";

export function TuningCalculator({ onOpenDatabase }: { onOpenDatabase?: () => void }) {
  const catalogFn = useServerFn(getTuningCatalog);
  const estimateFn = useServerFn(estimateTuning);
  const registrationFn = useServerFn(estimateByRegistration);
  const { data: brands, isLoading } = useQuery({
    queryKey: ["tuning-catalog"],
    queryFn: () => catalogFn(),
  });

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [registration, setRegistration] = useState("");
  const [stage, setStage] = useState<Stage>("stage1");
  const models = brands?.find((item) => item.name === brand)?.models ?? [];
  const engines = models.find((item) => item.name === model)?.engines ?? [];
  const manualMutation = useMutation({
    mutationFn: () => estimateFn({ data: { brand, model, engine, stage } }),
  });
  const registrationMutation = useMutation({
    mutationFn: (selectedStage: Stage = stage) =>
      registrationFn({ data: { registration, stage: selectedStage } }),
    onSuccess: (data) => {
      setBrand(data.match?.brand ?? "");
      setModel(data.match?.model ?? "");
      setEngine(data.match?.engine ?? "");
      manualMutation.reset();
    },
  });
  const result = registrationMutation.data?.estimate ?? manualMutation.data;
  const usesDatabaseResults = Boolean(onOpenDatabase);

  const resetResult = () => {
    manualMutation.reset();
    registrationMutation.reset();
  };

  const searchRegistration = (event: FormEvent) => {
    event.preventDefault();
    if (registration.replace(/[^a-zA-Z0-9]/g, "").length >= 6) {
      registrationMutation.mutate(stage);
    }
  };

  return (
    <div className="card-sheen grid overflow-hidden border border-border bg-surface shadow-[0_24px_70px_-45px_rgba(41,32,24,.35)] lg:grid-cols-[0.92fr_1.08fr]">
      <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center bg-primary/12 text-primary">
              <Gauge className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Din bil
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {isLoading
                  ? "Laddar fordonsdata..."
                  : `${brands?.length ?? 0} bilmärken att välja bland`}
              </p>
            </div>
          </div>
          <span className="font-display text-3xl text-foreground/15">01</span>
        </div>

        <div className="mt-7 space-y-5">
          <form
            onSubmit={searchRegistration}
            className="border border-primary/25 bg-primary/[0.045] p-4"
          >
            <div className="flex items-center gap-2 text-primary">
              <ScanLine className="size-4" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
                Automatisk motorsökning
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="relative min-w-0 flex-1">
                <span className="absolute inset-y-0 left-0 w-3 bg-[#1c5aa6]" aria-hidden="true" />
                <Input
                  aria-label="Registreringsnummer"
                  autoComplete="off"
                  inputMode="text"
                  maxLength={8}
                  placeholder="ABC 123"
                  value={registration}
                  onChange={(event) => {
                    setRegistration(event.target.value.toUpperCase());
                    registrationMutation.reset();
                  }}
                  className="h-12 rounded-none border-foreground/25 bg-[#f3f1df] pl-6 text-center font-display text-xl uppercase tracking-[0.18em] text-[#171512] placeholder:text-[#171512]/35 focus-visible:ring-primary"
                />
              </div>
              <Button
                type="submit"
                className="h-12 shrink-0 rounded-none px-4"
                disabled={
                  registration.replace(/[^a-zA-Z0-9]/g, "").length < 6 ||
                  registrationMutation.isPending
                }
              >
                {registrationMutation.isPending ? <Loader2 className="animate-spin" /> : <Search />}
                <span className="hidden sm:inline">Sök bilen</span>
              </Button>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Skriv regnumret så identifierar vi bil, motor och registrerad effekt automatiskt. Vi
              använder aldrig ägaruppgifter.
            </p>
          </form>

          {registrationMutation.data && <RegistrationMatch data={registrationMutation.data} />}

          {registrationMutation.isError && (
            <p className="border-l-2 border-destructive bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {getErrorMessage(registrationMutation.error)}
            </p>
          )}

          <div className="flex items-center gap-3 py-1" aria-hidden="true">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Eller välj manuellt
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Field label="Märke">
            <Select
              value={brand}
              onValueChange={(value) => {
                setBrand(value);
                setModel("");
                setEngine("");
                resetResult();
              }}
            >
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder={isLoading ? "Laddar bilmärken..." : "Välj märke"} />
              </SelectTrigger>
              <SelectContent>
                {(brands ?? []).map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Modell">
            <Select
              value={model}
              disabled={!brand}
              onValueChange={(value) => {
                setModel(value);
                setEngine("");
                resetResult();
              }}
            >
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder="Välj modell" />
              </SelectTrigger>
              <SelectContent>
                {models.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Motor">
            <Select
              value={engine}
              disabled={!model}
              onValueChange={(value) => {
                setEngine(value);
                resetResult();
              }}
            >
              <SelectTrigger className="h-11 bg-background">
                <SelectValue placeholder="Välj motor" />
              </SelectTrigger>
              <SelectContent>
                {engines.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name} · {item.hp} hk / {item.nm} Nm
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {!usesDatabaseResults && (
            <Field label="Tuningsteg">
              <div className="grid grid-cols-2 gap-2">
                {(["stage1", "stage2"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setStage(item);
                      manualMutation.reset();
                      if (registrationMutation.data) {
                        registrationMutation.mutate(item);
                      } else {
                        registrationMutation.reset();
                      }
                    }}
                    className={`h-11 border text-sm font-semibold uppercase tracking-wider ${stage === item ? "border-primary bg-primary/12 text-primary" : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
                  >
                    {item === "stage1" ? "Steg 1" : "Steg 2"}
                  </button>
                ))}
              </div>
            </Field>
          )}

          <Button
            className="h-12 w-full bg-heat font-semibold shadow-heat hover:-translate-y-0.5"
            disabled={!usesDatabaseResults && (!engine || manualMutation.isPending)}
            onClick={() => {
              if (onOpenDatabase) onOpenDatabase();
              else manualMutation.mutate();
            }}
          >
            {usesDatabaseResults ? (
              <>
                Visa Stage 1-data <ArrowRight />
              </>
            ) : manualMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Beräknar...
              </>
            ) : (
              <>
                Visa min potential <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="relative flex min-h-[26rem] flex-col bg-background/70 p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-32 w-32 bg-primary/8 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center bg-surface-2 text-primary">
              <TrendingUp className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {usesDatabaseResults ? "Databasresultat" : "Uppskattat resultat"}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {usesDatabaseResults
                  ? "Stage 1-data"
                  : result
                    ? result.source === "catalog"
                      ? "Katalogvärde · försiktig uppskattning"
                      : "Registreringsdata · försiktig uppskattning"
                    : "Före och efter optimering"}
              </p>
            </div>
          </div>
          <span className="font-display text-3xl text-foreground/15">02</span>
        </div>

        {usesDatabaseResults ? (
          <div className="relative grid flex-1 place-items-center py-10 text-center">
            <div className="max-w-md">
              <BadgeCheck className="mx-auto size-14 stroke-1 text-primary/55" />
              <h3 className="mt-5 text-2xl text-foreground">En källa för hk och Nm</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Registreringssökningen identifierar bilen och visar verifierad ECU- och
                funktionsdata när sådan finns. Alla trimmade effektvärden visas i kalkylatorn så att
                du inte får två olika svar.
              </p>
              <Button className="mt-6 h-11 bg-heat px-6 shadow-heat" onClick={onOpenDatabase}>
                Öppna Stage 1-data <ArrowRight />
              </Button>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Välj samma bil och motor i kalkylatorn för att se uppskattade effektvärden.
              </p>
            </div>
          </div>
        ) : !result ? (
          <div className="relative grid flex-1 place-items-center py-10 text-center">
            <div className="max-w-sm">
              <Car className="mx-auto size-14 stroke-1 text-foreground/20" />
              <h3 className="mt-5 text-2xl text-foreground/60">Din potential visas här</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sök på registreringsnumret eller välj märke, modell och motor för att se uppskattad
                effekt och vridmoment.
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 relative mt-8 flex flex-1 flex-col duration-500">
            <div className="border-l-2 border-primary pl-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {result.brand} {result.model}
              </p>
              <h3 className="mt-1 text-3xl">{result.engine}</h3>
            </div>
            <div className="mt-8 space-y-7">
              <ResultRow
                label="Effekt"
                unit="hk"
                stock={result.stockHp}
                tunedMin={result.tunedHpMin}
                tunedMax={result.tunedHpMax}
                gainMin={result.gainHpMin}
                gainMax={result.gainHpMax}
              />
              <ResultRow
                label="Vridmoment"
                unit="Nm"
                stock={result.stockNm}
                tunedMin={result.tunedNmMin}
                tunedMax={result.tunedNmMax}
                gainMin={result.gainNmMin}
                gainMax={result.gainNmMax}
              />
            </div>
            <div className="mt-auto pt-8">
              <div className="border-l-2 border-amber-600 bg-amber-600/8 p-3">
                <div className="flex items-center gap-2 text-amber-800">
                  <TriangleAlert className="size-4 shrink-0" />
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em]">
                    Viktigt om siffrorna
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Siffrorna är ungefärliga intervall och kan avvika från bilens verkliga resultat.
                  Motorvariant, ECU-mjukvara, hårdvara, bränsle och bilens skick påverkar utfallet.
                  Exakta hk- och Nm-värden kan bara bekräftas efter diagnos och mätning.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-4 h-11 w-full border-primary/40 hover:border-primary"
              >
                <a href={`tel:${SITE.phone}`}>
                  <Phone /> Ring för exakt offert
                </a>
              </Button>
            </div>
          </div>
        )}
        {!usesDatabaseResults && manualMutation.isError && (
          <p className="relative mt-4 text-sm text-destructive">
            Något gick fel. Försök igen eller ring oss så hjälper vi dig.
          </p>
        )}
      </div>
    </div>
  );
}

function RegistrationMatch({ data }: { data: RegistrationLookupResult }) {
  return (
    <div className="animate-in fade-in slide-in-from-top-1 border border-border bg-background p-4 duration-300">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center bg-primary/12 text-primary">
          <BadgeCheck className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {data.vehicle.registration} hittad
          </p>
          <p className="mt-1 font-semibold text-foreground">
            {data.vehicle.make} {data.vehicle.model}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {[
              data.vehicle.year,
              data.vehicle.displacementCc
                ? `${(data.vehicle.displacementCc / 1000).toFixed(1)} l`
                : null,
              data.vehicle.fuelLabel,
              data.vehicle.hp ? `${data.vehicle.hp} hk registrerad effekt` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {data.match ? (
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {data.match.confidence === "exact"
                ? "Motorvarianten identifierades och bilens potential har räknats ut automatiskt."
                : "Bilen och motorn har identifierats från fordonsregistret. Resultatet visas direkt."}
            </p>
          ) : data.estimate ? (
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Bilen finns inte i vår manuella lista, men motorn har identifierats från
              fordonsregistret och resultatet har räknats ut automatiskt.
            </p>
          ) : (
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{data.reason}</p>
          )}
        </div>
      </div>
      <VehicleCapabilitiesPanel capabilities={data.capabilities} />
    </div>
  );
}

function VehicleCapabilitiesPanel({ capabilities }: { capabilities: VehicleCapabilities }) {
  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
            ECU och funktioner
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Visas endast när datakällan kan verifiera uppgiften.
          </p>
        </div>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {capabilities.sourceLabel}
        </span>
      </div>

      <div className="mt-3 space-y-3">
        <div className="border border-border bg-surface-2/45 p-3">
          <div className="flex items-center gap-2 text-primary">
            <Cpu className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              ECU / styrenhet
            </span>
          </div>
          <p className="mt-3 break-words font-display text-xl text-foreground">
            {capabilities.ecu ?? "Kräver manuell kontroll"}
          </p>
          <CapabilityStatusPill status={capabilities.ecuStatus} />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {capabilities.features.map((feature) => (
            <CapabilityFeature key={feature.key} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CapabilityFeature({ feature }: { feature: VehicleFeature }) {
  return (
    <div className="border border-border bg-background/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Wrench className="size-3.5 text-primary" />
          {feature.label}
        </span>
        <CapabilityStatusPill status={feature.status} compact />
      </div>
      {feature.detail && (
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{feature.detail}</p>
      )}
    </div>
  );
}

function CapabilityStatusPill({
  status,
  compact = false,
}: {
  status: CapabilityStatus;
  compact?: boolean;
}) {
  const meta = {
    provider_verified: {
      label: "Provider-verifierad",
      className: "border-primary/25 bg-primary/10 text-primary",
      icon: CheckCircle2,
    },
    available: {
      label: "Tillgänglig",
      className: "border-emerald-600/20 bg-emerald-600/10 text-emerald-700",
      icon: CheckCircle2,
    },
    not_applicable: {
      label: "Ej tillämplig",
      className: "border-border bg-surface-2 text-muted-foreground",
      icon: CircleX,
    },
    manual_review: {
      label: "Kräver kontroll",
      className: "border-amber-600/25 bg-amber-600/10 text-amber-800",
      icon: CircleHelp,
    },
  }[status];
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 border px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${compact ? "max-w-[7.5rem] truncate" : "mt-2"} ${meta.className}`}
    >
      <Icon className="size-3 shrink-0" />
      <span className="truncate">{meta.label}</span>
    </span>
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Registreringsnumret kunde inte sökas. Välj bilen manuellt i stället.";
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function ResultRow({
  label,
  unit,
  stock,
  tunedMin,
  tunedMax,
  gainMin,
  gainMax,
}: {
  label: string;
  unit: string;
  stock: number;
  tunedMin: number;
  tunedMax: number;
  gainMin: number;
  gainMax: number;
}) {
  const stockWidth = Math.min(100, Math.max(55, Math.round((stock / tunedMax) * 100)));
  const animatedTunedMin = useAnimatedNumber(tunedMin, stock);
  const animatedTunedMax = useAnimatedNumber(tunedMax, stock);
  const animatedGainMin = useAnimatedNumber(gainMin, 0);
  const animatedGainMax = useAnimatedNumber(gainMax, 0);
  const [barReady, setBarReady] = useState(false);

  useEffect(() => {
    setBarReady(false);
    let startFrame = 0;
    const resetFrame = requestAnimationFrame(() => {
      startFrame = requestAnimationFrame(() => setBarReady(true));
    });
    return () => {
      cancelAnimationFrame(resetFrame);
      cancelAnimationFrame(startFrame);
    };
  }, [stock, tunedMin, tunedMax]);

  return (
    <div className="group/result">
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-display text-2xl tabular-nums">
          <span className="text-muted-foreground">{stock}</span>
          <span
            className={`mx-2 inline-block text-foreground/25 transition-transform duration-700 ${barReady ? "translate-x-0" : "-translate-x-1"}`}
          >
            →
          </span>
          <span className={`text-heat result-number ${barReady ? "is-active" : ""}`}>
            {animatedTunedMin}~{animatedTunedMax} {unit}
          </span>
        </span>
      </div>
      <div className="relative mt-3 flex h-2 overflow-hidden bg-surface-2">
        <div className="h-full shrink-0 bg-foreground/25" style={{ width: `${stockWidth}%` }} />
        <div className="relative h-full flex-1 overflow-hidden">
          <div
            className="h-full origin-left bg-heat transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: barReady ? "scaleX(1)" : "scaleX(0)" }}
          />
          <span
            className={`absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-white/35 transition-opacity delay-700 duration-300 ${barReady ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
      <p
        className={`mt-2 text-right text-xs font-semibold uppercase tracking-wider text-primary transition-all delay-500 duration-500 ${barReady ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
      >
        {gainMax > 0 ? "+" : ""}
        {animatedGainMin}~{animatedGainMax} {unit}
      </p>
    </div>
  );
}

function useAnimatedNumber(target: number, initialValue: number) {
  const [value, setValue] = useState(initialValue);
  const currentValue = useRef(initialValue);

  useEffect(() => {
    const from = currentValue.current;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      currentValue.current = target;
      setValue(target);
      return;
    }

    let frame = 0;
    let startedAt: number | null = null;
    const duration = 1300;

    const tick = (time: number) => {
      startedAt ??= time;
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(from + (target - from) * eased);
      currentValue.current = nextValue;
      setValue(nextValue);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    setValue(from);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}
