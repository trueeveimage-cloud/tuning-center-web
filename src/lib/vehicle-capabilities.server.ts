type UnknownRecord = Record<string, unknown>;

export const VEHICLE_FEATURES = [
  { key: "adblue", label: "AdBlue" },
  { key: "dpf", label: "DPF" },
  { key: "egr", label: "EGR" },
  { key: "start_stop", label: "Start/Stop" },
  { key: "vmax", label: "Vmax" },
  { key: "swirl_flaps", label: "Swirl flaps" },
  { key: "dtc", label: "DTC" },
  { key: "coding", label: "Kodning" },
  { key: "diagnostics", label: "Diagnostik" },
  { key: "repair", label: "Reparation" },
  { key: "track", label: "Tävlingsfordon" },
] as const;

export type VehicleFeatureKey = (typeof VEHICLE_FEATURES)[number]["key"];
export type CapabilityStatus =
  "provider_verified" | "available" | "not_applicable" | "manual_review";
export type CapabilitySource = "provider" | "fallback";

export type VehicleFeature = {
  key: VehicleFeatureKey;
  label: string;
  status: CapabilityStatus;
  source: CapabilitySource;
  detail?: string;
};

export type VehicleCapabilities = {
  source: CapabilitySource;
  sourceLabel: string;
  ecu: string | null;
  ecuStatus: CapabilityStatus;
  features: VehicleFeature[];
};

type ProviderCapabilities = {
  ecu: string | null;
  features: VehicleFeature[];
};

function asRecord(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null ? (value as UnknownRecord) : {};
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function firstString(records: UnknownRecord[], keys: string[]) {
  for (const record of records) {
    for (const key of keys) {
      const value = asString(record[key]);
      if (value) return value;
    }
  }
  return null;
}

function createFeature(
  definition: (typeof VEHICLE_FEATURES)[number],
  status: CapabilityStatus,
  source: CapabilitySource,
  detail?: string,
): VehicleFeature {
  return detail ? { ...definition, status, source, detail } : { ...definition, status, source };
}

function fallbackFeatureList(): VehicleFeature[] {
  return VEHICLE_FEATURES.map((definition) =>
    createFeature(
      definition,
      "manual_review",
      "fallback",
      "Kan inte avgöras säkert från fordonsregistret.",
    ),
  );
}

export function buildFallbackCapabilities(): VehicleCapabilities {
  return {
    source: "fallback",
    sourceLabel: "Registreringsdata",
    ecu: null,
    ecuStatus: "manual_review",
    features: fallbackFeatureList(),
  };
}

function statusFromValue(value: unknown): CapabilityStatus | null {
  if (typeof value === "boolean") return value ? "available" : "not_applicable";
  const normalized = normalize(String(value ?? ""));
  if (!normalized) return null;
  if (/(manual|review|unknown|check|kontroll|bedom)/.test(normalized)) return "manual_review";
  if (
    /(not applicable|not supported|unsupported|unavailable|not available|ej till|saknas)/.test(
      normalized,
    )
  ) {
    return "not_applicable";
  }
  if (/(provider|verified|confirmed)/.test(normalized)) {
    return "provider_verified";
  }
  if (/(supported|available|yes|true|ja|tillgang)/.test(normalized)) return "available";
  return null;
}

function featureKeyFor(value: string) {
  const normalized = normalize(value);
  if (normalized.includes("adblue") || normalized.includes("scr")) return "adblue" as const;
  if (normalized.includes("dpf") || normalized.includes("particulate")) return "dpf" as const;
  if (normalized.includes("egr")) return "egr" as const;
  if (normalized.includes("start stop") || normalized.includes("startstop")) {
    return "start_stop" as const;
  }
  if (
    normalized.includes("vmax") ||
    normalized.includes("speed limiter") ||
    normalized.includes("top speed")
  ) {
    return "vmax" as const;
  }
  if (normalized.includes("swirl") || normalized.includes("flap")) {
    return "swirl_flaps" as const;
  }
  if (normalized.includes("dtc") || normalized.includes("fault code")) return "dtc" as const;
  if (normalized.includes("coding") || normalized.includes("kodning")) return "coding" as const;
  if (normalized.includes("diagnos") || normalized.includes("diagnostic"))
    return "diagnostics" as const;
  if (normalized.includes("repair") || normalized.includes("reparation")) return "repair" as const;
  if (
    normalized.includes("track") ||
    normalized.includes("race") ||
    normalized.includes("competition")
  ) {
    return "track" as const;
  }
  return null;
}

function featureEntries(value: unknown): Array<[string, unknown]> {
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      const record = asRecord(item);
      const key = firstString([record], ["key", "id", "name", "label", "feature", "function"]);
      return key ? ([[key, item]] as Array<[string, unknown]>) : [];
    });
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(asRecord(value));
  }
  return [];
}

function providerFeatureList(records: UnknownRecord[], fallback: VehicleFeature[]) {
  const rawFeatures = records.flatMap((record) =>
    ["features", "functions", "capabilities", "available_functions"].flatMap((key) =>
      featureEntries(record[key]),
    ),
  );
  const parsed = new Map<VehicleFeatureKey, VehicleFeature>();

  for (const [rawKey, rawValue] of rawFeatures) {
    const key = featureKeyFor(rawKey);
    if (!key) continue;
    const definition = VEHICLE_FEATURES.find((item) => item.key === key);
    if (!definition) continue;
    const valueRecord = asRecord(rawValue);
    const status =
      statusFromValue(rawValue) ??
      statusFromValue(valueRecord["status"]) ??
      statusFromValue(valueRecord["available"]) ??
      statusFromValue(valueRecord["supported"]);
    if (!status) continue;
    const detail = firstString([valueRecord], ["detail", "description", "note", "reason"]);
    parsed.set(key, createFeature(definition, status, "provider", detail ?? undefined));
  }

  return fallback.map((feature) => parsed.get(feature.key) ?? feature);
}

export function parseProviderCapabilities(payload: unknown): ProviderCapabilities | null {
  const root = asRecord(payload);
  const data = asRecord(root["data"]);
  const vehicle = asRecord(root["vehicle"]);
  const technical = asRecord(root["technical"]);
  const dataVehicle = asRecord(data["vehicle"]);
  const dataTechnical = asRecord(data["technical"]);
  const records = [root, data, vehicle, technical, dataVehicle, dataTechnical];
  const ecu = firstString(records, [
    "ecu",
    "ecu_name",
    "ecu_type",
    "control_unit",
    "controlUnit",
    "engine_control_unit",
    "engineControlUnit",
  ]);
  const features = providerFeatureList(records, fallbackFeatureList());
  const hasProviderFeature = features.some((feature) => feature.source === "provider");

  if (!ecu && !hasProviderFeature) return null;
  return { ecu, features };
}

export async function lookupProviderCapabilities(
  registration: string,
): Promise<VehicleCapabilities | null> {
  const endpoint = process.env["VEHICLE_CAPABILITY_API_URL"]?.trim();
  if (!endpoint) return null;

  try {
    const url = new URL(endpoint);
    url.searchParams.set("registration", registration);
    const apiKey = process.env["VEHICLE_CAPABILITY_API_KEY"]?.trim();
    const headers: Record<string, string> = { Accept: "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

    const response = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;

    const parsed = parseProviderCapabilities(await response.json());
    if (!parsed) return null;

    return {
      source: "provider",
      sourceLabel: "Provider-verifierad",
      ecu: parsed.ecu,
      ecuStatus: parsed.ecu ? "provider_verified" : "manual_review",
      features: parsed.features,
    };
  } catch {
    return null;
  }
}

export async function resolveVehicleCapabilities(
  registration: string,
): Promise<VehicleCapabilities> {
  return (await lookupProviderCapabilities(registration)) ?? buildFallbackCapabilities();
}
