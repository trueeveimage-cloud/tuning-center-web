import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BRANDS, calculateTuning, type Stage } from "./tuning-data";
import { lookupAndEstimateRegistration } from "./vehicle-lookup.server";

export const getTuningCatalog = createServerFn({ method: "GET" }).handler(async () => BRANDS);

const registrationSchema = z.object({
  registration: z
    .string()
    .transform((value) => value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
    .pipe(z.string().regex(/^[A-Z0-9]{6,7}$/, "Ange ett giltigt registreringsnummer")),
  stage: z.enum(["stage1", "stage2"]),
});

export const estimateByRegistration = createServerFn({ method: "POST" })
  .validator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => lookupAndEstimateRegistration(data.registration, data.stage));

const inputSchema = z.object({
  brand: z.string().min(1).max(60),
  model: z.string().min(1).max(60),
  engine: z.string().min(1).max(60),
  stage: z.enum(["stage1", "stage2"]),
});

export const estimateTuning = createServerFn({ method: "POST" })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const brand = BRANDS.find((x) => x.name === data.brand);
    const model = brand?.models.find((m) => m.name === data.model);
    const engine = model?.engines.find((e) => e.name === data.engine);
    if (!engine) throw new Error("Motorn hittades inte");
    return {
      brand: data.brand,
      model: data.model,
      engine: engine.name,
      fuel: engine.fuel,
      stage: data.stage as Stage,
      source: "catalog" as const,
      ...calculateTuning(engine, data.stage as Stage),
    };
  });
