import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Gauge, Loader2 } from "lucide-react";
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

  const { data: brands } = useQuery({
    queryKey: ["tuning-catalog"],
    queryFn: () => catalogFn(),
  });

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [stage, setStage] = useState<Stage>("stage1");

  const models = brands?.find((x) => x.name === brand)?.models ?? [];
  const engines = models.find((m) => m.name === model)?.engines ?? [];

  const mutation = useMutation({
    mutationFn: () => estimateFn({ data: { brand, model, engine, stage } }),
  });

  const result = mutation.data;

  return (
    <div className="grid gap-6 rounded-xl border border-border bg-surface p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Gauge className="size-5" />
          <span className="text-sm font-semibold uppercase tracking-widest">Tuningkalkylator</span>
        </div>

        <Field label="Märke">
          <Select
            value={brand}
            onValueChange={(v) => {
              setBrand(v);
              setModel("");
              setEngine("");
              mutation.reset();
            }}
          >
            <SelectTrigger><SelectValue placeholder="Välj märke" /></SelectTrigger>
            <SelectContent>
              {(brands ?? []).map((x) => (
                <SelectItem key={x.name} value={x.name}>{x.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Modell">
          <Select
            value={model}
            disabled={!brand}
            onValueChange={(v) => {
              setModel(v);
              setEngine("");
              mutation.reset();
            }}
          >
            <SelectTrigger><SelectValue placeholder="Välj modell" /></SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Motor">
          <Select
            value={engine}
            disabled={!model}
            onValueChange={(v) => {
              setEngine(v);
              mutation.reset();
            }}
          >
            <SelectTrigger><SelectValue placeholder="Välj motor" /></SelectTrigger>
            <SelectContent>
              {engines.map((e) => (
                <SelectItem key={e.name} value={e.name}>
                  {e.name} — {e.hp} hk / {e.nm} Nm
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Steg">
          <div className="grid grid-cols-2 gap-2">
            {(["stage1", "stage2"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStage(s);
                  mutation.reset();
                }}
                className={`rounded-md border px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                  stage === s
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "stage1" ? "Steg 1" : "Steg 2"}
              </button>
            ))}
          </div>
        </Field>

        <Button
          className="w-full bg-heat text-primary-foreground shadow-heat"
          disabled={!engine || mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          {mutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          Beräkna effekt
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background p-6">
        {!result ? (
          <p className="text-sm text-muted-foreground">
            Välj bil och steg för att se uppskattad effekt efter motoroptimering.
          </p>
        ) : (
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {result.brand} {result.model}
              </p>
              <h3 className="text-2xl">{result.engine}</h3>
            </div>

            <ResultRow label="Effekt" unit="hk" stock={result.stockHp} tuned={result.tunedHp} gain={result.gainHp} />
            <ResultRow label="Vridmoment" unit="Nm" stock={result.stockNm} tuned={result.tunedNm} gain={result.gainNm} />

            <p className="text-xs text-muted-foreground">
              Värdena är uppskattningar. Exakt resultat beror på bilens skick och utrustning.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href={`tel:${SITE.phone}`}>Ring för exakt offert</a>
            </Button>
          </div>
        )}
        {mutation.isError && (
          <p className="mt-4 text-sm text-destructive">Något gick fel, försök igen.</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </div>
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
  const pct = Math.min(100, (stock / tuned) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-display text-2xl">
          {stock} → <span className="text-heat">{tuned}</span> {unit}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full bg-heat" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-primary">+{gain} {unit}</p>
    </div>
  );
}
