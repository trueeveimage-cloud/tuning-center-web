import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type ReactNode } from "react";
import { ArrowRight, Car, Gauge, Loader2, Phone, TrendingUp } from "lucide-react";
import { getTuningCatalog, estimateTuning } from "@/lib/tuning.functions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE } from "@/lib/site";

type Stage = "stage1" | "stage2";

export function TuningCalculator() {
  const catalogFn = useServerFn(getTuningCatalog);
  const estimateFn = useServerFn(estimateTuning);
  const { data: brands, isLoading } = useQuery({
    queryKey: ["tuning-catalog"],
    queryFn: () => catalogFn(),
  });

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [stage, setStage] = useState<Stage>("stage1");
  const models = brands?.find((item) => item.name === brand)?.models ?? [];
  const engines = models.find((item) => item.name === model)?.engines ?? [];
  const mutation = useMutation({
    mutationFn: () => estimateFn({ data: { brand, model, engine, stage } }),
  });
  const result = mutation.data;

  const resetResult = () => mutation.reset();

  return (
    <div className="grid overflow-hidden border border-border bg-surface shadow-2xl shadow-black/20 lg:grid-cols-[0.92fr_1.08fr]">
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

          <Field label="Tuningsteg">
            <div className="grid grid-cols-2 gap-2">
              {(["stage1", "stage2"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setStage(item);
                    resetResult();
                  }}
                  className={`h-11 border text-sm font-semibold uppercase tracking-wider ${stage === item ? "border-primary bg-primary/12 text-primary" : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
                >
                  {item === "stage1" ? "Steg 1" : "Steg 2"}
                </button>
              ))}
            </div>
          </Field>

          <Button
            className="h-12 w-full bg-heat font-semibold shadow-heat hover:-translate-y-0.5"
            disabled={!engine || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? (
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
                Uppskattat resultat
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">Före och efter optimering</p>
            </div>
          </div>
          <span className="font-display text-3xl text-foreground/15">02</span>
        </div>

        {!result ? (
          <div className="relative grid flex-1 place-items-center py-10 text-center">
            <div className="max-w-sm">
              <Car className="mx-auto size-14 stroke-1 text-foreground/20" />
              <h3 className="mt-5 text-2xl text-foreground/60">Din potential visas här</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Välj märke, modell, motor och tuningsteg för att se uppskattad effekt och
                vridmoment.
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
                tuned={result.tunedHp}
                gain={result.gainHp}
              />
              <ResultRow
                label="Vridmoment"
                unit="Nm"
                stock={result.stockNm}
                tuned={result.tunedNm}
                gain={result.gainNm}
              />
            </div>
            <div className="mt-auto pt-8">
              <p className="text-xs leading-5 text-muted-foreground">
                Värdena är uppskattningar. Exakt resultat beror på bilens skick, motorvariant och
                utrustning.
              </p>
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
        {mutation.isError && (
          <p className="relative mt-4 text-sm text-destructive">
            Något gick fel. Försök igen eller ring oss så hjälper vi dig.
          </p>
        )}
      </div>
    </div>
  );
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
  tuned,
  gain,
}: {
  label: string;
  unit: string;
  stock: number;
  tuned: number;
  gain: number;
}) {
  const stockWidth = Math.max(55, Math.round((stock / tuned) * 100));
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-display text-2xl">
          <span className="text-muted-foreground">{stock}</span>
          <span className="mx-2 text-foreground/25">→</span>
          <span className="text-heat">
            {tuned} {unit}
          </span>
        </span>
      </div>
      <div className="mt-3 flex h-2 overflow-hidden bg-surface-2">
        <div className="h-full bg-foreground/25" style={{ width: `${stockWidth}%` }} />
        <div className="h-full flex-1 bg-heat" />
      </div>
      <p className="mt-2 text-right text-xs font-semibold uppercase tracking-wider text-primary">
        +{gain} {unit}
      </p>
    </div>
  );
}
