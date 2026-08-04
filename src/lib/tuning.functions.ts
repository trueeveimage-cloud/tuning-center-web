import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BRANDS, calculateTuning, type Stage } from "./tuning-data";

export const getTuningCatalog = createServerFn({ method: "GET" }).handler(async () => BRANDS);

const inputSchema = z.object({
  brand: z.string().min(1).max(60),
  model: z.string().min(1).max(60),
  engine: z.string().min(1).max(60),
  stage: z.enum(["stage1", "stage2"]),
});

export const estimateTuning = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
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
      ...calculateTuning(engine, data.stage as Stage),
    };
  });
